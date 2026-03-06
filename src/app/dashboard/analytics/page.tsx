import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Syne } from "next/font/google";
import AnalyticsClient, { type AnalyticsPayload } from "./analytics-client";

const syne = Syne({
    subsets: ["latin"],
    weight: ["600", "700", "800"],
    variable: "--font-analytics-display",
});

type ProfileRow = {
    sat_score: number | null;
    ielts_score: number | null;
    gpa_converted: number | null;
    intended_majors: string[] | null;
} | null;

type EssayRow = {
    status: string | null;
};

type ActivityRow = {
    id: string;
};

type CollegeRow = {
    match_category: string | null;
    application_status: string | null;
    universities?: {
        name?: string | null;
    } | null;
};

type MilestoneRow = {
    id: string;
    title: string;
    status: string | null;
    due_date: string | null;
};

export default async function AnalyticsPage() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) redirect("/login");

    const [profileRes, essaysRes, activitiesRes, collegeRes, milestonesRes] = await Promise.all([
        supabase.from("academic_profiles").select("sat_score, ielts_score, gpa_converted, intended_majors").eq("user_id", user.id).single(),
        supabase.from("essays").select("status").eq("user_id", user.id),
        supabase.from("activities").select("id").eq("user_id", user.id),
        supabase.from("college_list").select("match_category, application_status, universities(name)").eq("user_id", user.id),
        supabase
            .from("milestones")
            .select("id, title, status, due_date, timelines!inner(user_id)")
            .eq("timelines.user_id", user.id),
    ]);

    const profile = (profileRes.data ?? null) as ProfileRow;
    const essays = (essaysRes.data ?? []) as EssayRow[];
    const activities = (activitiesRes.data ?? []) as ActivityRow[];
    const colleges = (collegeRes.data ?? []) as CollegeRow[];
    const milestones = (milestonesRes.data ?? []) as MilestoneRow[];

    const finalEssays = essays.filter((essay) => essay.status === "final").length;
    const completedMilestones = milestones.filter((milestone) => milestone.status === "completed").length;
    const overdueMilestones = milestones.filter((milestone) => milestone.status === "overdue").length;

    const reachCount = colleges.filter((college) => college.match_category === "reach").length;
    const targetCount = colleges.filter((college) => college.match_category === "target").length;
    const safetyCount = colleges.filter((college) => college.match_category === "safety").length;

    const readinessFactors: AnalyticsPayload["readinessFactors"] = [
        {
            id: "profile",
            label: "Academic Profile",
            score: profile ? 100 : 0,
            weight: 15,
            current: profile ? "Completed" : "Missing",
            goal: "Complete profile",
            helper: "SAT/GPA/majors baseline",
        },
        {
            id: "activities",
            label: "Activities Depth",
            score: Math.min(100, (activities.length / 10) * 100),
            weight: 20,
            current: `${activities.length}/10`,
            goal: "10 high-impact activities",
            helper: "Academic + leadership balance",
        },
        {
            id: "essays",
            label: "Essay Finalization",
            score: essays.length > 0 ? Math.min(100, (finalEssays / essays.length) * 100) : 0,
            weight: 30,
            current: `${finalEssays}/${essays.length}`,
            goal: "Finalize all active essays",
            helper: "Largest readiness driver",
        },
        {
            id: "colleges",
            label: "College Strategy",
            score: colleges.length > 0 ? Math.min(100, (colleges.length / 12) * 100) : 0,
            weight: 20,
            current: `${colleges.length} schools`,
            goal: "8-12 balanced schools",
            helper: "Reach / target / safety mix",
        },
        {
            id: "milestones",
            label: "Execution Timeline",
            score: milestones.length > 0 ? Math.min(100, (completedMilestones / milestones.length) * 100) : 0,
            weight: 15,
            current: `${completedMilestones}/${milestones.length}`,
            goal: "No overdue milestones",
            helper: "Deadline completion health",
        },
    ];

    const overallReadiness = Math.round(
        readinessFactors.reduce((sum, factor) => sum + (factor.score * factor.weight) / 100, 0),
    );

    const payload: AnalyticsPayload = {
        overallReadiness,
        readinessFactors,
        essayTotal: essays.length,
        essayFinal: finalEssays,
        activityTotal: activities.length,
        collegeTotal: colleges.length,
        milestoneTotal: milestones.length,
        milestoneCompleted: completedMilestones,
        milestoneOverdue: overdueMilestones,
        reachCount,
        targetCount,
        safetyCount,
        satScore: profile?.sat_score ?? null,
        ieltsScore: profile?.ielts_score ?? null,
        gpaConverted: profile?.gpa_converted ?? null,
        intendedMajors: profile?.intended_majors ?? [],
        milestones: milestones.map((milestone) => ({
            id: milestone.id,
            title: milestone.title,
            status: milestone.status ?? "pending",
            dueDate: milestone.due_date,
        })),
    };

    return (
        <div className={syne.variable}>
            <AnalyticsClient data={payload} />
        </div>
    );
}
