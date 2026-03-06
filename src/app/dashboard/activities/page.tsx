import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ActivitiesClient from "./activities-client";

export default async function ActivitiesPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/login");

    const { data: activities } = await supabase
        .from("activities")
        .select("*")
        .eq("user_id", user.id)
        .order("position", { ascending: true });

    return <ActivitiesClient initialActivities={activities || []} userId={user.id} />;
}
