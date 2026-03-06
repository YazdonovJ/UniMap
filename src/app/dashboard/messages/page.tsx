import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import MessagesClient from "./messages-client";

export default async function MessagesPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/login");

    const { data: profile } = await supabase
        .from("profiles")
        .select("cohort_id, role")
        .eq("id", user.id)
        .single();

    /* ─── 1. Direct contacts: all counselors/admins always visible ─── */
    const { data: counselors } = await supabase
        .from("profiles")
        .select("id, full_name, role, avatar_url")
        .in("role", ["counselor", "admin"])
        .neq("id", user.id);

    /* ─── 2. Cohort members (students in same cohort) ─── */
    let cohortMembers: { id: string; full_name: string; role: string; avatar_url?: string }[] = [];
    if (profile?.cohort_id) {
        const { data } = await supabase
            .from("profiles")
            .select("id, full_name, role, avatar_url")
            .eq("cohort_id", profile.cohort_id)
            .not("role", "in", '("counselor","admin")')
            .neq("id", user.id);
        cohortMembers = data || [];
    }

    /* ─── 3. Classmates (enrolled in same classes) ─── */
    const { data: myEnrollments } = await supabase
        .from("class_enrollments")
        .select("class_id")
        .eq("student_id", user.id)
        .eq("status", "active");

    const myClassIds = (myEnrollments || []).map(e => e.class_id);

    let classmates: { id: string; full_name: string; role: string; avatar_url?: string }[] = [];
    if (myClassIds.length > 0) {
        const { data: classmateEnrollments } = await supabase
            .from("class_enrollments")
            .select("student_id, class_id")
            .in("class_id", myClassIds)
            .neq("student_id", user.id)
            .eq("status", "active");

        const classmateIds = [...new Set((classmateEnrollments || []).map(e => e.student_id))];
        if (classmateIds.length > 0) {
            const { data } = await supabase
                .from("profiles")
                .select("id, full_name, role, avatar_url")
                .in("id", classmateIds);
            classmates = data || [];
        }
    }

    /* ─── 4. Enrolled classes (for group chat channels) ─── */
    let classGroups: { id: string; name: string; subject: string; memberCount: number }[] = [];
    if (myClassIds.length > 0) {
        const { data: classes } = await supabase
            .from("classes")
            .select("id, name, subject")
            .in("id", myClassIds)
            .eq("is_active", true);

        classGroups = (classes || []).map(c => ({
            id: c.id,
            name: c.name,
            subject: c.subject,
            memberCount: 0,
        }));
    }

    /* ─── 5. Also check if user is a teacher ─── */
    const { data: teacherClasses } = await supabase
        .from("classes")
        .select("id, name, subject")
        .eq("teacher_id", user.id)
        .eq("is_active", true);

    let teacherStudents: { id: string; full_name: string; role: string; avatar_url?: string }[] = [];
    if (teacherClasses && teacherClasses.length > 0) {
        const teacherGroups = teacherClasses.map(c => ({
            id: c.id,
            name: c.name,
            subject: c.subject,
            memberCount: 0,
        }));
        classGroups = [...classGroups, ...teacherGroups];

        const teacherClassIds = teacherClasses.map(c => c.id);
        const { data: enrollments } = await supabase
            .from("class_enrollments")
            .select("student_id")
            .in("class_id", teacherClassIds)
            .eq("status", "active");

        const studentIds = [...new Set((enrollments || []).map(e => e.student_id))];
        if (studentIds.length > 0) {
            const { data } = await supabase
                .from("profiles")
                .select("id, full_name, role, avatar_url")
                .in("id", studentIds);
            teacherStudents = data || [];
        }
    }

    /* ─── 6. Active Conversations ─── */
    const { data: myMessages } = await supabase
        .from("messages")
        .select("sender_id, receiver_id")
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`);

    const activeChatUserIds = new Set<string>();
    myMessages?.forEach(m => {
        if (m.sender_id !== user.id) activeChatUserIds.add(m.sender_id);
        if (m.receiver_id !== user.id) activeChatUserIds.add(m.receiver_id);
    });

    let activeChatProfiles: { id: string; full_name: string; role: string; avatar_url?: string }[] = [];
    if (activeChatUserIds.size > 0) {
        const { data } = await supabase
            .from("profiles")
            .select("id, full_name, role, avatar_url")
            .in("id", Array.from(activeChatUserIds));
        activeChatProfiles = data || [];
    }

    /* ─── Deduplicate contacts ─── */
    const seen = new Set<string>();
    const allContacts = [
        ...(counselors || []),
        ...cohortMembers,
        ...classmates,
        ...teacherStudents,
        ...activeChatProfiles
    ].filter(c => {
        if (seen.has(c.id)) return false;
        seen.add(c.id);
        return true;
    });

    /* ─── All users for "new message" search ─── */
    const { data: allUsers } = await supabase
        .from("profiles")
        .select("id, full_name, role, avatar_url")
        .neq("id", user.id)
        .limit(100);

    return (
        <MessagesClient
            userId={user.id}
            contacts={allContacts}
            classGroups={classGroups}
            allUsers={allUsers || []}
        />
    );
}
