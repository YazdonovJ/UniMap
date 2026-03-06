import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import PortfolioClient from "./portfolio-client";

export default async function PortfolioPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/login");

    const { data: items } = await supabase
        .from("portfolios")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

    return <PortfolioClient initialItems={items || []} userId={user.id} />;
}
