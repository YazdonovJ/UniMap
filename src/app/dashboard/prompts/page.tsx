import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import EssayExamplesClient from "./essay-examples-client";

export default async function PromptsPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/login");

    return <EssayExamplesClient />;
}
