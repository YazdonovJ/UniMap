import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import TimelineClient from "./timeline-client";

export default async function TimelinePage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/login");

    // Get or create timeline
    let { data: timeline } = await supabase
        .from("timelines")
        .select("*")
        .eq("user_id", user.id)
        .single();

    if (!timeline) {
        const { data: newTimeline } = await supabase
            .from("timelines")
            .insert({ user_id: user.id, name: "My Application Timeline" })
            .select()
            .single();
        timeline = newTimeline;
    }

    if (!timeline) return null;

    const { data: milestones } = await supabase
        .from("milestones")
        .select("*")
        .eq("timeline_id", timeline.id)
        .order("due_date", { ascending: true });

    return <TimelineClient initialMilestones={milestones || []} timelineId={timeline.id} />;
}
