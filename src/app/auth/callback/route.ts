import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

function getSafeNextPath(rawNext: string | null) {
    if (!rawNext) return "/onboarding";
    if (!rawNext.startsWith("/") || rawNext.startsWith("//")) return "/onboarding";
    if (rawNext.includes("\r") || rawNext.includes("\n")) return "/onboarding";
    return rawNext;
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const next = getSafeNextPath(searchParams.get("next"));

    if (code) {
        const supabase = await createClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
            const redirectUrl = new URL(next, request.url);
            return NextResponse.redirect(redirectUrl);
        }
    }

    // return the user to an error page with instructions
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("error", "Authentication failed. Please try again.");
    return NextResponse.redirect(loginUrl);
}
