import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Syne } from "next/font/google";
import InviteCodesClient from "./invite-codes-client";

const syne = Syne({
    subsets: ["latin"],
    weight: ["600", "700", "800"],
    variable: "--font-invite-display",
});

export default async function InviteCodesPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/login");

    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (!profile || !["admin", "counselor"].includes(profile.role)) {
        redirect("/dashboard");
    }

    const [codesRes, classesRes] = await Promise.all([
        supabase.from("invite_codes").select("*").eq("created_by", user.id).order("created_at", { ascending: false }),
        supabase.from("classes").select("*").order("name"),
    ]);

    return (
        <div className={syne.variable}>
            <InviteCodesClient
                initialCodes={codesRes.data || []}
                classes={classesRes.data || []}
            />
        </div>
    );
}
