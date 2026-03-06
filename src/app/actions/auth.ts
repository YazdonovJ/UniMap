"use server";

import { randomBytes } from "crypto";
import { createClient } from "@/lib/supabase/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { getURL } from "@/lib/utils";

type Role = "admin" | "counselor" | "alumni";

function generateSecureInviteCode() {
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const bytes = randomBytes(8);
    let suffix = "";
    for (let i = 0; i < bytes.length; i++) {
        suffix += alphabet[bytes[i] % alphabet.length];
    }
    return `UNI-${suffix}`;
}

export async function signUp(formData: FormData) {
    const supabase = await createClient();
    const email = (formData.get("email") as string | null)?.trim();
    const password = (formData.get("password") as string | null) || "";
    const fullName = (formData.get("fullName") as string | null)?.trim();
    const inviteCode = (formData.get("inviteCode") as string | null)?.trim().toUpperCase();

    if (!email || !password || !fullName || !inviteCode) {
        return { error: "Please fill all required fields." };
    }

    const supabaseAdmin = createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Reserve invite atomically to prevent concurrent double-redeem.
    const nowIso = new Date().toISOString();
    const { data: reservedInvite, error: reserveError } = await supabaseAdmin
        .from("invite_codes")
        .update({ is_used: true })
        .eq("code", inviteCode)
        .eq("is_used", false)
        .or(`expires_at.is.null,expires_at.gt.${nowIso}`)
        .select("id, class_id, cohort_id")
        .maybeSingle();

    if (reserveError || !reservedInvite) {
        return { error: "Invalid or expired invite code." };
    }

    // Sign up user
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { full_name: fullName },
            emailRedirectTo: `${getURL()}auth/callback`,
        },
    });

    if (signUpError) {
        // Release reserved code on signup failure.
        await supabaseAdmin
            .from("invite_codes")
            .update({ is_used: false })
            .eq("id", reservedInvite.id)
            .is("used_by", null);
        return { error: signUpError.message };
    }

    // Finalize invite and profile linkage.
    if (authData.user) {
        const { error: finalizeInviteError } = await supabaseAdmin
            .from("invite_codes")
            .update({ used_by: authData.user.id })
            .eq("id", reservedInvite.id)
            .eq("is_used", true);

        if (finalizeInviteError) {
            return { error: "Account created, but invite linking failed. Please contact support." };
        }

        const { error: profileError } = await supabaseAdmin
            .from("profiles")
            .update({
                cohort_id: reservedInvite.cohort_id,
                full_name: fullName,
            })
            .eq("id", authData.user.id);

        if (profileError) {
            return { error: "Account created, but profile setup failed. Please contact support." };
        }

        if (reservedInvite.class_id) {
            const { error: enrollmentError } = await supabaseAdmin
                .from("class_enrollments")
                .insert({
                    class_id: reservedInvite.class_id,
                    student_id: authData.user.id,
                });
            if (enrollmentError) {
                console.error("Enrollment failed:", enrollmentError);
                // We don't fail the entire signup here, but we could
            }
        }
    }

    redirect("/onboarding");
}

export async function signIn(formData: FormData) {
    try {
        const supabase = await createClient();
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            // Check if this is a network/connectivity error
            const msg = error.message || "";
            if (msg.includes("aborted") || msg.includes("timeout") || msg.includes("fetch failed") || msg.includes("DOCTYPE") || msg.includes("ECONNREFUSED")) {
                return { error: "Unable to reach the authentication server. Please try again in a moment." };
            }
            return { error: error.message };
        }

        // Check if onboarding is complete
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const { data: profile } = await supabase
                .from("profiles")
                .select("onboarding_complete")
                .eq("id", user.id)
                .single();

            if (profile && !profile.onboarding_complete) {
                redirect("/onboarding");
            }
        }

        redirect("/dashboard");
    } catch (err: unknown) {
        // Re-throw Next.js redirect errors so they work properly
        if (err && typeof err === "object" && "digest" in err && typeof (err as { digest: unknown }).digest === "string" && ((err as { digest: string }).digest.startsWith("NEXT_REDIRECT") || (err as { digest: string }).digest.startsWith("NEXT_NOT_FOUND"))) {
            throw err;
        }
        // Handle timeout/network errors with a friendly message
        const message = err instanceof Error ? err.message : "";
        if (message.includes("aborted") || message.includes("timeout") || message.includes("ECONNREFUSED") || message.includes("fetch failed")) {
            return { error: "Unable to reach the authentication server. Please try again in a moment." };
        }
        return { error: "Something went wrong. Please try again." };
    }
}

export async function signOut() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
}

export async function generateInviteCodes(classId: string, count: number) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };
    if (!classId) return { error: "Class is required." };

    const safeCount = Math.min(50, Math.max(1, Math.floor(Number(count) || 0)));
    if (!Number.isFinite(safeCount) || safeCount < 1) {
        return { error: "Invalid number of codes requested." };
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("role, cohort_id")
        .eq("id", user.id)
        .single();

    if (!profile || !["admin", "counselor"].includes(profile.role as Role)) {
        return { error: "Forbidden" };
    }

    const { data: classData } = await supabase
        .from("classes")
        .select("id, cohort_id")
        .eq("id", classId)
        .maybeSingle();
    if (!classData) return { error: "Class not found." };

    if (profile.role === "counselor" && profile.cohort_id && profile.cohort_id !== classData.cohort_id) {
        return { error: "Counselors can only generate codes for classes within their own cohort." };
    }

    const generatedCodes = new Set<string>();
    while (generatedCodes.size < safeCount) {
        generatedCodes.add(generateSecureInviteCode());
    }

    let codes = Array.from(generatedCodes).map((code) => ({
        code,
        class_id: classId,
        cohort_id: classData.cohort_id,
        created_by: user.id,
    }));

    // Remove rare collisions with existing rows and regenerate replacements.
    const { data: existingCodes, error: existingError } = await supabase
        .from("invite_codes")
        .select("code")
        .in("code", codes.map((entry) => entry.code));
    if (existingError) return { error: existingError.message };

    const existing = new Set((existingCodes || []).map((row) => row.code));
    if (existing.size > 0) {
        codes = codes.filter((entry) => !existing.has(entry.code));
        while (codes.length < safeCount) {
            const code = generateSecureInviteCode();
            if (existing.has(code) || codes.some((entry) => entry.code === code)) continue;
            codes.push({
                code,
                class_id: classId,
                cohort_id: classData.cohort_id,
                created_by: user.id,
            });
        }
    }

    const { error } = await supabase.from("invite_codes").insert(codes);

    if (error) return { error: error.message };
    return { codes: codes.map((c) => c.code) };
}

export async function saveAcademicProfile(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    const satScore = formData.get("satScore") ? Number(formData.get("satScore")) : null;
    const actScore = formData.get("actScore") ? Number(formData.get("actScore")) : null;
    const ieltsScore = formData.get("ieltsScore") ? Number(formData.get("ieltsScore")) : null;
    const toeflScore = formData.get("toeflScore") ? Number(formData.get("toeflScore")) : null;
    const gpa = Number(formData.get("gpa"));
    const gradingScale = formData.get("gradingScale") as string;
    const intendedMajors = (formData.get("intendedMajors") as string).split(",").map((s) => s.trim()).filter(Boolean);

    // Convert GPA to 4.0 scale
    let gpaConverted: number | null = null;
    switch (gradingScale) {
        case "4.0": gpaConverted = gpa; break;
        case "5.0": gpaConverted = Math.round((gpa / 5) * 4 * 100) / 100; break;
        case "10.0": gpaConverted = Math.round((gpa / 10) * 4 * 100) / 100; break;
        case "100":
        case "percentage": gpaConverted = Math.round((gpa / 100) * 4 * 100) / 100; break;
    }

    const { error } = await supabase.from("academic_profiles").upsert({
        user_id: user.id,
        sat_score: satScore,
        act_score: actScore,
        ielts_score: ieltsScore,
        toefl_score: toeflScore,
        gpa,
        grading_scale: gradingScale,
        gpa_converted: gpaConverted,
        intended_majors: intendedMajors,
    });

    if (error) return { error: error.message };

    // Mark onboarding as complete
    await supabase
        .from("profiles")
        .update({ onboarding_complete: true })
        .eq("id", user.id);

    // Create a default timeline
    await supabase.from("timelines").insert({
        user_id: user.id,
        name: "My Application Timeline",
    });

    redirect("/dashboard");
}
