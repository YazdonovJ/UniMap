import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import EssaysClient from "./essays-client";

type EssayVersionRow = {
    id: string;
    essay_id: string;
    content: string;
    version: number;
    created_at: string;
};

export default async function EssaysPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/login");

    const { data: essays } = await supabase
        .from("essays")
        .select("*")
        .eq("user_id", user.id)
        .order("sort_order", { ascending: true })
        .order("updated_at", { ascending: false });

    // Fetch all essay versions for version history
    const essayIds = (essays || []).map(e => e.id);
    const versions: Record<string, EssayVersionRow[]> = {};
    if (essayIds.length > 0) {
        const { data: allVersions } = await supabase
            .from("essay_versions")
            .select("*")
            .in("essay_id", essayIds)
            .order("version", { ascending: false });

        // Group versions by essay_id
        for (const v of (allVersions || [])) {
            if (!versions[v.essay_id]) versions[v.essay_id] = [];
            versions[v.essay_id].push(v);
        }
    }

    return <EssaysClient initialEssays={essays || []} userId={user.id} initialVersions={versions} />;
}
