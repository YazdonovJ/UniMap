import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const protectedPaths = ["/dashboard", "/onboarding", "/essays", "/activities", "/portfolio", "/analytics", "/messages"];
const authPaths = ["/login", "/signup"];

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    );
                    supabaseResponse = NextResponse.next({
                        request,
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    const isProtectedRoute = protectedPaths.some((path) =>
        request.nextUrl.pathname.startsWith(path)
    );
    const isAuthRoute = authPaths.some((path) =>
        request.nextUrl.pathname.startsWith(path)
    );

    try {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (isProtectedRoute && !user) {
            const url = request.nextUrl.clone();
            url.pathname = "/login";
            return NextResponse.redirect(url);
        }

        if (isAuthRoute && user) {
            const url = request.nextUrl.clone();
            url.pathname = "/dashboard";
            return NextResponse.redirect(url);
        }
    } catch {
        if (isProtectedRoute) {
            const url = request.nextUrl.clone();
            url.pathname = "/login";
            url.searchParams.set("error", "Authentication service is temporarily unavailable.");
            return NextResponse.redirect(url);
        }
    }

    return supabaseResponse;
}
