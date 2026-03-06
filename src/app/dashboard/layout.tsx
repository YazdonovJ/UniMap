import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardClientLayout } from "@/components/layout/dashboard-client-layout";
import "@/app/dashboard/dashboard.css";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) redirect("/login");

    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    if (profile && !profile.onboarding_complete) {
        redirect("/onboarding");
    }

    return (
        <DashboardClientLayout
            userRole={profile?.role || "alumni"}
            userName={profile?.full_name || user.email || "User"}
        >
            {children}
        </DashboardClientLayout>
    );
}
