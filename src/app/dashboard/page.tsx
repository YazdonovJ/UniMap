import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { AdviceCard } from "@/components/dashboard/advice-card";

/* ─── Inline SVG icons ─── */
const CalendarIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 2v4M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" />
    </svg>
);
const MessageSquareIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
);
const PenToolIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 19 7-7 3 3-7 7-3-3z" /><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="m2 2 7.586 7.586" /><circle cx="11" cy="11" r="2" />
    </svg>
);
const TargetIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
);
const TrendingUpIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22,7 13.5,15.5 8.5,10.5 2,17" /><polyline points="16,7 22,7 22,13" />
    </svg>
);

async function getDashboardData(userId: string) {
    const supabase = await createClient();

    const [milestonesRes, essaysRes, activitiesRes, collegeListRes, messagesRes] =
        await Promise.all([
            supabase
                .from("milestones")
                .select("*, timelines!inner(user_id)")
                .eq("timelines.user_id", userId)
                .order("due_date", { ascending: true })
                .limit(5),
            supabase
                .from("essays")
                .select("*")
                .eq("user_id", userId)
                .order("updated_at", { ascending: false })
                .limit(5),
            supabase
                .from("activities")
                .select("*")
                .eq("user_id", userId),
            supabase
                .from("college_list")
                .select("*, universities(*)")
                .eq("user_id", userId),
            supabase
                .from("messages")
                .select("*")
                .eq("receiver_id", userId)
                .eq("is_read", false),
        ]);

    return {
        milestones: milestonesRes.data || [],
        essays: essaysRes.data || [],
        activities: activitiesRes.data || [],
        collegeList: collegeListRes.data || [],
        unreadMessages: messagesRes.data?.length || 0,
    };
}

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    const data = await getDashboardData(user.id);

    const upcomingMilestones = data.milestones.filter(
        (m) => m.status !== "completed" && new Date(m.due_date) >= new Date()
    );

    const stats = [
        {
            label: "Upcoming Deadlines",
            value: upcomingMilestones.length,
            icon: CalendarIcon,
            color: "red" as const,
            href: "/dashboard/timeline",
        },
        {
            label: "Unread Messages",
            value: data.unreadMessages,
            icon: MessageSquareIcon,
            color: "green" as const,
            href: "/dashboard/messages",
        },
        {
            label: "Essays In Progress",
            value: data.essays.filter((e) => e.status !== "final").length,
            icon: PenToolIcon,
            color: "blue" as const,
            href: "/dashboard/essays",
        },
        {
            label: "College List",
            value: data.collegeList.length,
            icon: TargetIcon,
            color: "amber" as const,
            href: "/dashboard/college-match",
        },
    ];

    return (
        <>
            {/* ─── Header ─── */}
            <div className="dash-header">
                <h1 className="dash-header-greeting">
                    Welcome back, <span>{profile?.full_name || "Student"}</span>
                </h1>
                <p className="dash-header-subtitle">Here&apos;s your application command center</p>
            </div>

            {/* ─── Stats Grid ─── */}
            <div className="dash-stats">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Link key={stat.label} href={stat.href} className={`dash-stat-card dash-stat-card--${stat.color}`}>
                            <div className="dash-stat-card-top">
                                <div className={`dash-stat-icon dash-stat-icon--${stat.color}`}>
                                    <Icon />
                                </div>
                                <div className="dash-stat-trend">
                                    <TrendingUpIcon />
                                </div>
                            </div>
                            <p className="dash-stat-value">{stat.value}</p>
                            <p className="dash-stat-label">{stat.label}</p>
                        </Link>
                    );
                })}
            </div>

            {/* ─── Panel Grid ─── */}
            <div className="dash-panels">
                <AdviceCard />
            </div>
        </>
    );
}
