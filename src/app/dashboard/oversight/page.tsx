import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { OversightClient } from "./oversight-client";

export default async function OversightPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/login");

    const { data: profile } = await supabase
        .from("profiles")
        .select("role, cohort_id")
        .eq("id", user.id)
        .single();

    if (!profile || !["admin", "counselor"].includes(profile.role)) {
        redirect("/dashboard");
    }

    // Get all alumni in the cohort
    const query = supabase
        .from("profiles")
        .select("id, full_name, email, onboarding_complete")
        .eq("role", "alumni");

    if (profile.cohort_id) {
        query.eq("cohort_id", profile.cohort_id);
    }

    const { data: alumni } = await query;

    // Get essay and milestone data for each alumnus
    const alumniWithData = await Promise.all(
        (alumni || []).map(async (a) => {
            const [essayRes, milestoneRes, activitiesRes] = await Promise.all([
                supabase.from("essays").select("id, status").eq("user_id", a.id),
                supabase
                    .from("milestones")
                    .select("id, status, due_date, timelines!inner(user_id)")
                    .eq("timelines.user_id", a.id),
                supabase.from("activities").select("id").eq("user_id", a.id),
            ]);

            const milestones = milestoneRes.data || [];
            const overdue = milestones.filter(
                (m) => m.status !== "completed" && new Date(m.due_date) < new Date()
            );

            return {
                id: a.id,
                full_name: a.full_name,
                email: a.email,
                onboarding_complete: a.onboarding_complete,
                essayCount: essayRes.data?.length || 0,
                draftEssays: essayRes.data?.filter((e) => e.status === "draft").length || 0,
                totalMilestones: milestones.length,
                overdueMilestones: overdue.length,
                completedMilestones: milestones.filter((m) => m.status === "completed").length,
                activitiesCount: activitiesRes.data?.length || 0,
            };
        })
    );

    return <OversightClient alumni={alumniWithData} />;
}
