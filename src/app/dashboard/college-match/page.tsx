import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Syne } from "next/font/google";
import CollegeMatchClient from "./college-match-client";

const syne = Syne({
    subsets: ["latin"],
    weight: ["600", "700", "800"],
    variable: "--font-cmx-display",
});

export default async function CollegeMatchPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/login");

    const [universitiesRes, listRes, profileRes] = await Promise.all([
        supabase.from("universities").select("*").order("name"),
        supabase.from("college_list").select("*, universities(*)").eq("user_id", user.id),
        supabase.from("academic_profiles").select("sat_score, gpa_converted").eq("user_id", user.id).single(),
    ]);

    return (
        <div className={syne.variable}>
            <CollegeMatchClient
                universities={universitiesRes.data || []}
                initialList={listRes.data || []}
                userId={user.id}
                academicProfile={profileRes.data}
            />
        </div>
    );
}
