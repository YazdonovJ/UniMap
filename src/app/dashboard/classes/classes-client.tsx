"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
    AlertTriangle,
    ArrowLeft,
    Bell,
    CalendarClock,
    CheckCircle2,
    ClipboardList,
    Filter,
    GraduationCap,
    Megaphone,
    Plus,
    Search,
    Sparkles,
    UserPlus,
    Users,
    Trash2,
} from "lucide-react";
import { createAnnouncement, createAssignment, createClass, enrollStudent, removeStudent, deleteClass } from "@/app/actions/classes";
import styles from "./classes.module.css";
import type { CSSProperties } from "react";

interface ClassData {
    id: string;
    name: string;
    subject: string;
    description: string;
    schedule: Record<string, string>;
    max_capacity: number;
    color: string;
    is_active: boolean;
    created_at: string;
    enrolled_count: number;
    assignment_count: number;
    announcement_count: number;
    next_due_title: string | null;
    next_due_date: string | null;
}

interface StudentData {
    id: string;
    full_name: string;
    email: string;
    avatar_url?: string | null;
}

interface EnrollmentData {
    id: string;
    class_id: string;
    student_id: string;
    status: string;
    enrolled_at: string;
}

interface AssignmentData {
    id: string;
    class_id: string;
    title: string;
    description: string | null;
    type: string | null;
    max_points: number | null;
    due_date: string | null;
    created_at: string;
}

interface AnnouncementData {
    id: string;
    class_id: string;
    title: string;
    content: string | null;
    priority: string | null;
    created_at: string;
}

interface ClassesClientProps {
    classes: ClassData[];
    students: StudentData[];
    enrollments: EnrollmentData[];
    assignments: AssignmentData[];
    announcements: AnnouncementData[];
}

type StatusFilter = "all" | "active" | "inactive";
type SortMode = "newest" | "name" | "enrollment" | "capacity";
type WorkspaceTab = "overview" | "students" | "assignments" | "announcements";

const CLASS_COLORS = ["#0f5b8f", "#2f8467", "#b56e2d", "#9e4a3f", "#5f5ec4", "#18709b", "#2d7f8f"];

function formatDate(value: string | null) {
    if (!value) return "No date";
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return "Invalid date";
    return parsed.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

function daysUntil(value: string | null) {
    if (!value) return null;
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return null;
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    parsed.setHours(0, 0, 0, 0);
    return Math.round((parsed.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function initials(fullName: string) {
    if (!fullName.trim()) return "?";
    const parts = fullName.trim().split(/\s+/).slice(0, 2);
    return parts.map((part) => part[0]?.toUpperCase() || "").join("");
}

export function ClassesClient({
    classes,
    students,
    enrollments,
    assignments,
    announcements,
}: ClassesClientProps) {
    const router = useRouter();

    const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
    const [workspaceTab, setWorkspaceTab] = useState<WorkspaceTab>("overview");
    const [showCreateClass, setShowCreateClass] = useState(false);
    const [showCreateAssignment, setShowCreateAssignment] = useState(false);
    const [showCreateAnnouncement, setShowCreateAnnouncement] = useState(false);
    const [showEnrollStudent, setShowEnrollStudent] = useState(false);
    const [deletingClassId, setDeletingClassId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
    const [subjectFilter, setSubjectFilter] = useState("all");
    const [sortMode, setSortMode] = useState<SortMode>("newest");
    const [notice, setNotice] = useState<{ tone: "success" | "error" | "info"; text: string } | null>(null);
    const [classList, setClassList] = useState<ClassData[]>(classes);
    const [enrollmentList, setEnrollmentList] = useState<EnrollmentData[]>(enrollments);
    const [assignmentList, setAssignmentList] = useState<AssignmentData[]>(assignments);
    const [announcementList, setAnnouncementList] = useState<AnnouncementData[]>(announcements);

    useEffect(() => {
        setClassList(classes);
    }, [classes]);

    useEffect(() => {
        setEnrollmentList(enrollments);
    }, [enrollments]);

    useEffect(() => {
        setAssignmentList(assignments);
    }, [assignments]);

    useEffect(() => {
        setAnnouncementList(announcements);
    }, [announcements]);

    const totalStudents = useMemo(
        () => classList.reduce((sum, classItem) => sum + classItem.enrolled_count, 0),
        [classList],
    );

    const avgClassSize = useMemo(
        () => Math.round(totalStudents / Math.max(1, classList.length)),
        [totalStudents, classList.length],
    );

    const upcomingThisWeek = useMemo(() => {
        return assignmentList.filter((item) => {
            const days = daysUntil(item.due_date);
            return days != null && days >= 0 && days <= 7;
        }).length;
    }, [assignmentList]);

    const utilization = useMemo(() => {
        const totalCapacity = classList.reduce((sum, classItem) => sum + Math.max(classItem.max_capacity, 1), 0);
        if (totalCapacity === 0) return 0;
        return Math.round((totalStudents / totalCapacity) * 100);
    }, [classList, totalStudents]);

    const insights = useMemo(() => {
        const fullClasses = classList.filter(
            (classItem) => Math.round((classItem.enrolled_count / Math.max(classItem.max_capacity, 1)) * 100) >= 85,
        );
        const noAssignments = classList.filter((classItem) => classItem.assignment_count === 0);
        const inactive = classList.filter((classItem) => !classItem.is_active);

        const smartInsights = [
            {
                title: "Capacity pressure",
                detail: `${fullClasses.length} class(es) are at or above 85% occupancy.`,
                tone: fullClasses.length > 0 ? "warn" : "good",
            },
            {
                title: "Assignment pipeline",
                detail: `${noAssignments.length} class(es) have no assignments scheduled yet.`,
                tone: noAssignments.length > 0 ? "warn" : "good",
            },
            {
                title: "Dormant classes",
                detail: `${inactive.length} class(es) are currently marked inactive.`,
                tone: inactive.length > 0 ? "risk" : "good",
            },
        ] as const;

        return smartInsights;
    }, [classList]);

    const subjectOptions = useMemo(() => {
        const subjects = Array.from(new Set(classList.map((classItem) => classItem.subject).filter(Boolean)));
        return subjects.sort((a, b) => a.localeCompare(b));
    }, [classList]);

    const filteredClasses = useMemo(() => {
        const normalized = searchQuery.trim().toLowerCase();
        const next = classList.filter((classItem) => {
            if (statusFilter === "active" && !classItem.is_active) return false;
            if (statusFilter === "inactive" && classItem.is_active) return false;
            if (subjectFilter !== "all" && classItem.subject !== subjectFilter) return false;
            if (!normalized) return true;

            const searchable = [classItem.name, classItem.subject, classItem.description].join(" ").toLowerCase();
            return searchable.includes(normalized);
        });

        next.sort((a, b) => {
            if (sortMode === "name") return a.name.localeCompare(b.name);
            if (sortMode === "enrollment") return b.enrolled_count - a.enrolled_count;
            if (sortMode === "capacity") {
                const fillA = Math.round((a.enrolled_count / Math.max(a.max_capacity, 1)) * 100);
                const fillB = Math.round((b.enrolled_count / Math.max(b.max_capacity, 1)) * 100);
                return fillB - fillA;
            }
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });

        return next;
    }, [classList, searchQuery, sortMode, statusFilter, subjectFilter]);

    const selectedClass = useMemo(
        () => classList.find((classItem) => classItem.id === selectedClassId) || null,
        [classList, selectedClassId],
    );

    const selectedEnrollments = useMemo(() => {
        if (!selectedClassId) return [];
        return enrollmentList.filter((entry) => entry.class_id === selectedClassId && entry.status === "active");
    }, [enrollmentList, selectedClassId]);

    const selectedAssignments = useMemo(() => {
        if (!selectedClassId) return [];
        return assignmentList
            .filter((entry) => entry.class_id === selectedClassId)
            .sort((a, b) => {
                const timeA = new Date(a.due_date || a.created_at).getTime();
                const timeB = new Date(b.due_date || b.created_at).getTime();
                return timeA - timeB;
            });
    }, [assignmentList, selectedClassId]);

    const selectedAnnouncements = useMemo(() => {
        if (!selectedClassId) return [];
        return announcementList
            .filter((entry) => entry.class_id === selectedClassId)
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }, [announcementList, selectedClassId]);

    const studentMap = useMemo(() => {
        return new Map(students.map((student) => [student.id, student]));
    }, [students]);

    const roster = useMemo(() => {
        return selectedEnrollments
            .map((entry) => {
                const student = studentMap.get(entry.student_id);
                if (!student) return null;
                return {
                    ...student,
                    enrolled_at: entry.enrolled_at,
                };
            })
            .filter(Boolean) as Array<StudentData & { enrolled_at: string }>;
    }, [selectedEnrollments, studentMap]);

    const availableStudents = useMemo(() => {
        const enrolledIds = new Set(selectedEnrollments.map((entry) => entry.student_id));
        return students.filter((student) => !enrolledIds.has(student.id));
    }, [selectedEnrollments, students]);

    function showNotice(tone: "success" | "error" | "info", text: string) {
        setNotice({ tone, text });
    }

    async function handleCreateClass(payload: {
        name: string;
        subject: string;
        description: string;
        max_capacity: number;
        color: string;
    }) {
        const result = await createClass({ ...payload, schedule: {} });
        if ("error" in result && result.error) {
            showNotice("error", result.error);
            return;
        }

        if ("class" in result && result.class) {
            const createdClass = result.class as ClassData;
            setClassList((prev) => [
                {
                    ...createdClass,
                    enrolled_count: 0,
                    assignment_count: 0,
                    announcement_count: 0,
                    next_due_title: null,
                    next_due_date: null,
                },
                ...prev,
            ]);
            setSelectedClassId(createdClass.id);
        }

        setSearchQuery("");
        setStatusFilter("all");
        setSubjectFilter("all");
        setSortMode("newest");
        setShowCreateClass(false);
        showNotice("success", "Class created successfully.");
        router.refresh();
    }

    async function handleCreateAssignment(payload: {
        title: string;
        description: string;
        type: string;
        max_points: number;
        due_date: string;
        allow_late: boolean;
    }) {
        if (!selectedClass) return;

        const result = await createAssignment({
            class_id: selectedClass.id,
            ...payload,
        });

        if ("error" in result && result.error) {
            showNotice("error", result.error);
            return;
        }

        setShowCreateAssignment(false);
        showNotice("success", "Assignment published.");
        router.refresh();
    }

    async function handleCreateAnnouncement(payload: {
        title: string;
        content: string;
        priority: string;
    }) {
        if (!selectedClass) return;

        const result = await createAnnouncement({
            class_id: selectedClass.id,
            ...payload,
        });

        if ("error" in result && result.error) {
            showNotice("error", result.error);
            return;
        }

        setShowCreateAnnouncement(false);
        showNotice("success", "Announcement posted.");
        router.refresh();
    }

    async function handleEnrollStudent(studentId: string) {
        if (!selectedClass) return;
        const alreadyActive = selectedEnrollments.some((entry) => entry.student_id === studentId);

        const result = await enrollStudent(selectedClass.id, studentId);
        if ("error" in result && result.error) {
            showNotice("error", result.error);
            return;
        }

        if ("enrollment" in result && result.enrollment) {
            const nextEnrollment = result.enrollment as EnrollmentData;
            setEnrollmentList((prev) => {
                const withoutExisting = prev.filter(
                    (entry) => !(entry.class_id === nextEnrollment.class_id && entry.student_id === nextEnrollment.student_id),
                );
                return [nextEnrollment, ...withoutExisting];
            });
        }

        if (!alreadyActive) {
            setClassList((prev) =>
                prev.map((classItem) =>
                    classItem.id === selectedClass.id
                        ? {
                            ...classItem,
                            enrolled_count: Math.min(classItem.max_capacity, classItem.enrolled_count + 1),
                        }
                        : classItem,
                ),
            );
        }

        setShowEnrollStudent(false);
        showNotice("success", "Student enrolled successfully.");
        router.refresh();
    }

    async function handleRemoveStudent(studentId: string) {
        if (!selectedClass) return;

        const result = await removeStudent(selectedClass.id, studentId);
        if ("error" in result && result.error) {
            showNotice("error", result.error);
            return;
        }

        setEnrollmentList((prev) =>
            prev.map((entry) =>
                entry.class_id === selectedClass.id && entry.student_id === studentId
                    ? { ...entry, status: "dropped" }
                    : entry,
            ),
        );
        setClassList((prev) =>
            prev.map((classItem) =>
                classItem.id === selectedClass.id
                    ? { ...classItem, enrolled_count: Math.max(0, classItem.enrolled_count - 1) }
                    : classItem,
            ),
        );
        showNotice("success", "Student removed from class.");
        router.refresh();
    }

    async function handleDeleteClass(classId: string, className: string, e: React.MouseEvent) {
        e.stopPropagation();
        if (!window.confirm(`Are you sure you want to permanently delete the class "${className}"? This action cannot be undone.`)) {
            return;
        }

        setDeletingClassId(classId);
        const result = await deleteClass(classId);

        if ("error" in result && result.error) {
            showNotice("error", result.error);
            setDeletingClassId(null);
            return;
        }

        setClassList((prev) => prev.filter(c => c.id !== classId));
        if (selectedClassId === classId) {
            setSelectedClassId(null);
            setWorkspaceTab("overview");
        }

        showNotice("success", "Class deleted successfully.");
        setDeletingClassId(null);
        router.refresh();
    }

    if (selectedClass) {
        const fillRate = Math.round((selectedClass.enrolled_count / Math.max(selectedClass.max_capacity, 1)) * 100);

        return (
            <div className={styles.page}>
                <section className={styles.workspaceHero}>
                    <button
                        type="button"
                        onClick={() => {
                            setSelectedClassId(null);
                            setWorkspaceTab("overview");
                        }}
                        className={styles.backButton}
                    >
                        <ArrowLeft size={15} />
                        <span>Back to classes</span>
                    </button>

                    <div className={styles.workspaceHeading}>
                        <span className={styles.subjectTag}>{selectedClass.subject || "General"}</span>
                        <h1>{selectedClass.name}</h1>
                        <p>{selectedClass.description || "No class description yet."}</p>
                    </div>

                    <div className={styles.workspaceActions}>
                        <button type="button" onClick={() => setShowEnrollStudent(true)}>
                            <UserPlus size={14} />
                            <span>Enroll Student</span>
                        </button>
                        <button type="button" onClick={() => setShowCreateAssignment(true)}>
                            <ClipboardList size={14} />
                            <span>New Assignment</span>
                        </button>
                        <button type="button" onClick={() => setShowCreateAnnouncement(true)}>
                            <Megaphone size={14} />
                            <span>Post Update</span>
                        </button>
                    </div>
                </section>

                <section className={styles.kpiGrid}>
                    <article className={styles.kpiCard}>
                        <p className={styles.kpiLabel}>Enrollment</p>
                        <p className={styles.kpiValue}>{selectedClass.enrolled_count}/{selectedClass.max_capacity}</p>
                        <p className={styles.kpiMeta}>{fillRate}% filled</p>
                    </article>
                    <article className={styles.kpiCard}>
                        <p className={styles.kpiLabel}>Assignments</p>
                        <p className={styles.kpiValue}>{selectedAssignments.length}</p>
                        <p className={styles.kpiMeta}>Total published tasks</p>
                    </article>
                    <article className={styles.kpiCard}>
                        <p className={styles.kpiLabel}>Announcements</p>
                        <p className={styles.kpiValue}>{selectedAnnouncements.length}</p>
                        <p className={styles.kpiMeta}>Class communications</p>
                    </article>
                    <article className={styles.kpiCard}>
                        <p className={styles.kpiLabel}>Next Deadline</p>
                        <p className={styles.kpiValueSmall}>{formatDate(selectedClass.next_due_date)}</p>
                        <p className={styles.kpiMeta}>{selectedClass.next_due_title || "No upcoming assignment"}</p>
                    </article>
                </section>

                <div className={styles.segmented}>
                    {([
                        { key: "overview", label: "Overview" },
                        { key: "students", label: "Students" },
                        { key: "assignments", label: "Assignments" },
                        { key: "announcements", label: "Announcements" },
                    ] as Array<{ key: WorkspaceTab; label: string }>).map((tab) => (
                        <button
                            key={tab.key}
                            type="button"
                            onClick={() => setWorkspaceTab(tab.key)}
                            className={workspaceTab === tab.key ? styles.segmentedActive : ""}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {workspaceTab === "overview" && (
                    <section className={styles.workspaceGrid}>
                        <article className={styles.panel}>
                            <header className={styles.panelHeader}>
                                <h2>Execution Radar</h2>
                                <Sparkles size={15} />
                            </header>
                            <div className={styles.radarList}>
                                <div className={styles.radarItem}>
                                    <p>Capacity utilization</p>
                                    <span>{fillRate}%</span>
                                </div>
                                <div className={styles.progressBar}>
                                    <span data-width={fillRate} data-color-idx={CLASS_COLORS.indexOf(selectedClass.color)} />
                                </div>
                                <div className={styles.radarItem}>
                                    <p>Upcoming assignments</p>
                                    <span>{selectedAssignments.filter((item) => {
                                        const days = daysUntil(item.due_date);
                                        return days != null && days >= 0;
                                    }).length}</span>
                                </div>
                                <div className={styles.radarItem}>
                                    <p>Overdue assignments</p>
                                    <span>{selectedAssignments.filter((item) => {
                                        const days = daysUntil(item.due_date);
                                        return days != null && days < 0;
                                    }).length}</span>
                                </div>
                            </div>
                        </article>

                        <article className={styles.panel}>
                            <header className={styles.panelHeader}>
                                <h2>Next Deadlines</h2>
                                <CalendarClock size={15} />
                            </header>
                            {selectedAssignments.length === 0 ? (
                                <div className={styles.emptyInline}>No assignments yet. Create one to activate this timeline.</div>
                            ) : (
                                <div className={styles.timelineList}>
                                    {selectedAssignments.slice(0, 6).map((item) => {
                                        const due = daysUntil(item.due_date);
                                        const tone = due == null ? styles.toneCalm : due < 0 ? styles.toneRisk : due <= 7 ? styles.toneWarn : styles.toneCalm;
                                        return (
                                            <div key={item.id} className={`${styles.timelineRow} ${tone}`}>
                                                <div>
                                                    <p>{item.title}</p>
                                                    <span>{item.type || "Task"}</span>
                                                </div>
                                                <div>
                                                    <p>{formatDate(item.due_date)}</p>
                                                    <span>{due == null ? "No due date" : due < 0 ? `${Math.abs(due)}d late` : `${due}d left`}</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </article>

                        <article className={`${styles.panel} ${styles.panelWide}`}>
                            <header className={styles.panelHeader}>
                                <h2>Recent Announcements</h2>
                                <Bell size={15} />
                            </header>
                            {selectedAnnouncements.length === 0 ? (
                                <div className={styles.emptyInline}>No announcements posted for this class.</div>
                            ) : (
                                <div className={styles.announcementList}>
                                    {selectedAnnouncements.slice(0, 5).map((announcement) => (
                                        <div key={announcement.id} className={styles.announcementItem}>
                                            <div>
                                                <p>{announcement.title}</p>
                                                <span>{announcement.content || "No description"}</span>
                                            </div>
                                            <div>
                                                <b className={styles.priorityBadge}>{announcement.priority || "info"}</b>
                                                <span>{formatDate(announcement.created_at)}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </article>
                    </section>
                )}

                {workspaceTab === "students" && (
                    <section className={styles.panel}>
                        <header className={styles.panelHeader}>
                            <h2>Student Roster ({roster.length})</h2>
                            <div className={styles.headerActions}>
                                <Link href="/dashboard/invite-codes" className={styles.inlineAction}>
                                    <Sparkles size={14} />
                                    <span>Invite Codes</span>
                                </Link>
                                <button type="button" className={styles.inlineAction} onClick={() => setShowEnrollStudent(true)}>
                                    <UserPlus size={14} />
                                    <span>Add Student</span>
                                </button>
                            </div>
                        </header>
                        {roster.length === 0 ? (
                            <div className={styles.emptyState}>
                                <Users size={22} />
                                <h3>No students enrolled</h3>
                                <p>Enroll students to start attendance and assignment tracking.</p>
                                <Link href="/dashboard/invite-codes" className={styles.secondaryButton}>
                                    Create Invite Codes
                                </Link>
                            </div>
                        ) : (
                            <div className={styles.studentGrid}>
                                {roster.map((student) => (
                                    <article key={student.id} className={styles.studentCard}>
                                        <div className={styles.studentAvatar}>{initials(student.full_name || "Student")}</div>
                                        <div className={styles.studentMain}>
                                            <p>{student.full_name || "Unnamed Student"}</p>
                                            <span>{student.email}</span>
                                            <small>Enrolled {formatDate(student.enrolled_at)}</small>
                                        </div>
                                        <div className={styles.studentActions}>
                                            <button
                                                type="button"
                                                className={styles.dangerButton}
                                                onClick={() => handleRemoveStudent(student.id)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </section>
                )}

                {workspaceTab === "assignments" && (
                    <section className={styles.panel}>
                        <header className={styles.panelHeader}>
                            <h2>Assignments ({selectedAssignments.length})</h2>
                            <button type="button" className={styles.inlineAction} onClick={() => setShowCreateAssignment(true)}>
                                <Plus size={14} />
                                <span>New Assignment</span>
                            </button>
                        </header>
                        {selectedAssignments.length === 0 ? (
                            <div className={styles.emptyState}>
                                <ClipboardList size={22} />
                                <h3>No assignments yet</h3>
                                <p>Create your first assignment to launch class workflow.</p>
                            </div>
                        ) : (
                            <div className={styles.assignmentList}>
                                {selectedAssignments.map((assignment) => {
                                    const due = daysUntil(assignment.due_date);
                                    return (
                                        <article key={assignment.id} className={styles.assignmentItem}>
                                            <div>
                                                <p>{assignment.title}</p>
                                                <span>{assignment.description || "No description"}</span>
                                            </div>
                                            <div>
                                                <b>{assignment.max_points ?? 100} pts</b>
                                                <span>{formatDate(assignment.due_date)}</span>
                                                <small>
                                                    {due == null ? "No due date" : due < 0 ? `${Math.abs(due)}d late` : `${due}d left`}
                                                </small>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        )}
                    </section>
                )}

                {workspaceTab === "announcements" && (
                    <section className={styles.panel}>
                        <header className={styles.panelHeader}>
                            <h2>Announcements ({selectedAnnouncements.length})</h2>
                            <button type="button" className={styles.inlineAction} onClick={() => setShowCreateAnnouncement(true)}>
                                <Megaphone size={14} />
                                <span>Post Update</span>
                            </button>
                        </header>
                        {selectedAnnouncements.length === 0 ? (
                            <div className={styles.emptyState}>
                                <Megaphone size={22} />
                                <h3>No announcements yet</h3>
                                <p>Share updates, reminders, and urgent notices with your class.</p>
                            </div>
                        ) : (
                            <div className={styles.announcementList}>
                                {selectedAnnouncements.map((announcement) => (
                                    <article key={announcement.id} className={styles.announcementItem}>
                                        <div>
                                            <p>{announcement.title}</p>
                                            <span>{announcement.content || "No content"}</span>
                                        </div>
                                        <div>
                                            <b className={styles.priorityBadge}>{announcement.priority || "info"}</b>
                                            <span>{formatDate(announcement.created_at)}</span>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </section>
                )}

                {showCreateAssignment && (
                    <CreateAssignmentModal
                        onClose={() => setShowCreateAssignment(false)}
                        onSubmit={handleCreateAssignment}
                    />
                )}
                {showCreateAnnouncement && (
                    <CreateAnnouncementModal
                        onClose={() => setShowCreateAnnouncement(false)}
                        onSubmit={handleCreateAnnouncement}
                    />
                )}
                {showEnrollStudent && (
                    <EnrollStudentModal
                        students={availableStudents}
                        onClose={() => setShowEnrollStudent(false)}
                        onEnroll={handleEnrollStudent}
                    />
                )}

                {notice && (
                    <div className={`${styles.notice} ${notice.tone === "error" ? styles.noticeError : notice.tone === "success" ? styles.noticeSuccess : styles.noticeInfo}`}>
                        {notice.tone === "error" ? <AlertTriangle size={14} /> : <CheckCircle2 size={14} />}
                        <span>{notice.text}</span>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <div>
                    <p className={styles.kicker}>Academic Operations</p>
                    <h1 className={styles.title}>Class Command Center</h1>
                    <p className={styles.subtitle}>
                        Run your teaching workflow from one premium workspace: capacity planning, assignment velocity, communication, and student operations.
                    </p>
                </div>
                <button type="button" className={styles.primaryAction} onClick={() => setShowCreateClass(true)}>
                    <Plus size={15} />
                    <span>Create Class</span>
                </button>
            </section>

            {notice && (
                <div className={`${styles.notice} ${notice.tone === "error" ? styles.noticeError : notice.tone === "success" ? styles.noticeSuccess : styles.noticeInfo}`}>
                    {notice.tone === "error" ? <AlertTriangle size={14} /> : <CheckCircle2 size={14} />}
                    <span>{notice.text}</span>
                </div>
            )}

            <section className={styles.kpiGrid}>
                <article className={styles.kpiCard}>
                    <p className={styles.kpiLabel}>Total Classes</p>
                    <p className={styles.kpiValue}>{classList.length}</p>
                    <p className={styles.kpiMeta}>All classrooms managed</p>
                </article>
                <article className={styles.kpiCard}>
                    <p className={styles.kpiLabel}>Active Classes</p>
                    <p className={styles.kpiValue}>{classList.filter((item) => item.is_active).length}</p>
                    <p className={styles.kpiMeta}>Currently running cohorts</p>
                </article>
                <article className={styles.kpiCard}>
                    <p className={styles.kpiLabel}>Total Students</p>
                    <p className={styles.kpiValue}>{totalStudents}</p>
                    <p className={styles.kpiMeta}>Enrolled learners</p>
                </article>
                <article className={styles.kpiCard}>
                    <p className={styles.kpiLabel}>Avg Class Size</p>
                    <p className={styles.kpiValue}>{avgClassSize}</p>
                    <p className={styles.kpiMeta}>{utilization}% total utilization</p>
                </article>
                <article className={styles.kpiCard}>
                    <p className={styles.kpiLabel}>Due This Week</p>
                    <p className={styles.kpiValue}>{upcomingThisWeek}</p>
                    <p className={styles.kpiMeta}>Assignments approaching deadlines</p>
                </article>
            </section>

            <section className={styles.insightGrid}>
                {insights.map((insight) => (
                    <article key={insight.title} className={styles.insightCard}>
                        <div className={`${styles.insightDot} ${insight.tone === "good" ? styles.dotGood : insight.tone === "warn" ? styles.dotWarn : styles.dotRisk}`} />
                        <div>
                            <p>{insight.title}</p>
                            <span>{insight.detail}</span>
                        </div>
                    </article>
                ))}
            </section>

            <section className={styles.panel}>
                <header className={styles.panelHeader}>
                    <h2>Class Portfolio</h2>
                    <span>{filteredClasses.length} class(es) in current view</span>
                </header>

                <div className={styles.filters}>
                    <label className={styles.search}>
                        <Search size={14} />
                        <input
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                            placeholder="Search class name, subject, or description..."
                        />
                    </label>

                    <label className={styles.filterSelect}>
                        <Filter size={13} />
                        <select
                            value={statusFilter}
                            onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
                            aria-label="Filter by status"
                        >
                            <option value="all">All statuses</option>
                            <option value="active">Active only</option>
                            <option value="inactive">Inactive only</option>
                        </select>
                    </label>

                    <select
                        value={subjectFilter}
                        onChange={(event) => setSubjectFilter(event.target.value)}
                        aria-label="Filter by subject"
                    >
                        <option value="all">All subjects</option>
                        {subjectOptions.map((subject) => (
                            <option key={subject} value={subject}>{subject}</option>
                        ))}
                    </select>

                    <select
                        value={sortMode}
                        onChange={(event) => setSortMode(event.target.value as SortMode)}
                        aria-label="Sort classes"
                    >
                        <option value="newest">Newest</option>
                        <option value="name">Name A-Z</option>
                        <option value="enrollment">Most students</option>
                        <option value="capacity">Highest fill rate</option>
                    </select>
                </div>

                {filteredClasses.length === 0 ? (
                    <div className={styles.emptyState}>
                        <GraduationCap size={22} />
                        <h3>No classes found</h3>
                        <p>Adjust filters or create a new class to start building your portfolio.</p>
                        <button type="button" className={styles.primaryAction} onClick={() => setShowCreateClass(true)}>
                            <Plus size={14} />
                            <span>Create Class</span>
                        </button>
                    </div>
                ) : (
                    <div className={styles.classGrid}>
                        {filteredClasses.map((classItem) => {
                            const fillRate = Math.round((classItem.enrolled_count / Math.max(classItem.max_capacity, 1)) * 100);
                            const color = classItem.color || CLASS_COLORS[0];
                            return (
                                <article key={classItem.id} className={styles.classCard}>
                                    <div className={styles.classCardTop}>
                                        <div className={styles.classDot} data-color-idx={CLASS_COLORS.indexOf(color)} />
                                        <div>
                                            <h3>{classItem.name}</h3>
                                            <p>{classItem.subject || "General subject"}</p>
                                        </div>
                                        <div className={styles.classTopActions}>
                                            <b className={classItem.is_active ? styles.statusActive : styles.statusInactive}>
                                                {classItem.is_active ? "Active" : "Inactive"}
                                            </b>
                                            <button
                                                type="button"
                                                className={styles.deleteClassBtn}
                                                onClick={(e) => handleDeleteClass(classItem.id, classItem.name, e)}
                                                disabled={deletingClassId === classItem.id}
                                                title="Delete class"
                                                aria-label="Delete class"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>

                                    <p className={styles.classDescription}>{classItem.description || "No description added yet."}</p>

                                    <div className={styles.classStats}>
                                        <div>
                                            <span>Students</span>
                                            <p>{classItem.enrolled_count}/{classItem.max_capacity}</p>
                                        </div>
                                        <div>
                                            <span>Assignments</span>
                                            <p>{classItem.assignment_count}</p>
                                        </div>
                                        <div>
                                            <span>Announcements</span>
                                            <p>{classItem.announcement_count}</p>
                                        </div>
                                    </div>

                                    <div className={styles.progressBar}>
                                        <span data-width={Math.round(fillRate / 20) * 20} data-bg={color} />
                                    </div>
                                    <div className={styles.cardFooter}>
                                        <small>{fillRate}% capacity used</small>
                                        <small>{classItem.next_due_date ? `Next: ${formatDate(classItem.next_due_date)}` : "No upcoming deadlines"}</small>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setSelectedClassId(classItem.id)}
                                        className={styles.openButton}
                                    >
                                        Open Class Workspace
                                    </button>
                                </article>
                            );
                        })}
                    </div>
                )}
            </section>

            {showCreateClass && (
                <CreateClassModal
                    onClose={() => setShowCreateClass(false)}
                    onSubmit={handleCreateClass}
                />
            )}
        </div>
    );
}

function CreateClassModal({
    onClose,
    onSubmit,
}: {
    onClose: () => void;
    onSubmit: (payload: {
        name: string;
        subject: string;
        description: string;
        max_capacity: number;
        color: string;
    }) => Promise<void>;
}) {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [maxCapacity, setMaxCapacity] = useState(30);
    const [color, setColor] = useState(CLASS_COLORS[0]);

    async function handleSubmit() {
        if (!name.trim()) return;
        setLoading(true);
        await onSubmit({
            name,
            subject,
            description,
            max_capacity: Math.max(1, maxCapacity),
            color,
        });
        setLoading(false);
    }

    return (
        <ModalShell title="Create New Class" onClose={onClose}>
            <div className={styles.formGrid}>
                <label>
                    Class Name *
                    <input value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g., AP Literature" />
                </label>
                <label>
                    Subject
                    <input value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="e.g., English" />
                </label>
                <label>
                    Description
                    <textarea
                        rows={3}
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="Short class overview"
                    />
                </label>
                <div className={styles.formSplit}>
                    <label>
                        Max Capacity
                        <input
                            type="number"
                            min={1}
                            value={maxCapacity}
                            onChange={(event) => setMaxCapacity(Number(event.target.value) || 1)}
                        />
                    </label>
                    <label>
                        Color Theme
                        <div className={styles.colorRow}>
                            {CLASS_COLORS.map((item) => (
                                <button
                                    key={item}
                                    type="button"
                                    className={color === item ? styles.colorActive : ""}
                                    data-bg={item}
                                    onClick={() => setColor(item)}
                                    aria-label={`Choose ${item}`}
                                    title={`Choose ${item}`}
                                />
                            ))}
                        </div>
                    </label>
                </div>
            </div>
            <div className={styles.modalFooter}>
                <button type="button" className={styles.secondaryButton} onClick={onClose}>Cancel</button>
                <button type="button" className={styles.primaryAction} onClick={handleSubmit} disabled={loading || !name.trim()}>
                    <Plus size={14} />
                    <span>{loading ? "Creating..." : "Create Class"}</span>
                </button>
            </div>
        </ModalShell>
    );
}

function CreateAssignmentModal({
    onClose,
    onSubmit,
}: {
    onClose: () => void;
    onSubmit: (payload: {
        title: string;
        description: string;
        type: string;
        max_points: number;
        due_date: string;
        allow_late: boolean;
    }) => Promise<void>;
}) {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("homework");
    const [maxPoints, setMaxPoints] = useState(100);
    const [dueDate, setDueDate] = useState("");
    const [allowLate, setAllowLate] = useState(false);

    async function handleSubmit() {
        if (!title.trim() || !dueDate) return;
        setLoading(true);
        await onSubmit({
            title,
            description,
            type,
            max_points: Math.max(1, maxPoints),
            due_date: dueDate,
            allow_late: allowLate,
        });
        setLoading(false);
    }

    return (
        <ModalShell title="Create Assignment" onClose={onClose}>
            <div className={styles.formGrid}>
                <label>
                    Assignment Title *
                    <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g., Midterm Essay" />
                </label>
                <label>
                    Description
                    <textarea
                        rows={3}
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="Instructions and expectations"
                    />
                </label>
                <div className={styles.formTriple}>
                    <label>
                        Type
                        <select value={type} onChange={(event) => setType(event.target.value)}>
                            <option value="homework">Homework</option>
                            <option value="essay">Essay</option>
                            <option value="project">Project</option>
                            <option value="quiz">Quiz</option>
                            <option value="exam">Exam</option>
                            <option value="other">Other</option>
                        </select>
                    </label>
                    <label>
                        Points
                        <input
                            type="number"
                            min={1}
                            value={maxPoints}
                            onChange={(event) => setMaxPoints(Number(event.target.value) || 1)}
                        />
                    </label>
                    <label>
                        Due Date *
                        <input type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} />
                    </label>
                </div>
                <label className={styles.checkboxRow}>
                    <input type="checkbox" checked={allowLate} onChange={(event) => setAllowLate(event.target.checked)} />
                    <span>Allow late submissions</span>
                </label>
            </div>
            <div className={styles.modalFooter}>
                <button type="button" className={styles.secondaryButton} onClick={onClose}>Cancel</button>
                <button type="button" className={styles.primaryAction} onClick={handleSubmit} disabled={loading || !title.trim() || !dueDate}>
                    <ClipboardList size={14} />
                    <span>{loading ? "Publishing..." : "Publish Assignment"}</span>
                </button>
            </div>
        </ModalShell>
    );
}

function CreateAnnouncementModal({
    onClose,
    onSubmit,
}: {
    onClose: () => void;
    onSubmit: (payload: { title: string; content: string; priority: string }) => Promise<void>;
}) {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [priority, setPriority] = useState("info");

    async function handleSubmit() {
        if (!title.trim() || !content.trim()) return;
        setLoading(true);
        await onSubmit({ title, content, priority });
        setLoading(false);
    }

    return (
        <ModalShell title="Post Announcement" onClose={onClose}>
            <div className={styles.formGrid}>
                <label>
                    Title *
                    <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g., Deadline Reminder" />
                </label>
                <label>
                    Message *
                    <textarea
                        rows={4}
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                        placeholder="Write a class update"
                    />
                </label>
                <label>
                    Priority
                    <select value={priority} onChange={(event) => setPriority(event.target.value)}>
                        <option value="info">Info</option>
                        <option value="warning">Warning</option>
                        <option value="urgent">Urgent</option>
                    </select>
                </label>
            </div>
            <div className={styles.modalFooter}>
                <button type="button" className={styles.secondaryButton} onClick={onClose}>Cancel</button>
                <button type="button" className={styles.primaryAction} onClick={handleSubmit} disabled={loading || !title.trim() || !content.trim()}>
                    <Megaphone size={14} />
                    <span>{loading ? "Posting..." : "Post Announcement"}</span>
                </button>
            </div>
        </ModalShell>
    );
}

function EnrollStudentModal({
    students,
    onClose,
    onEnroll,
}: {
    students: StudentData[];
    onClose: () => void;
    onEnroll: (studentId: string) => Promise<void>;
}) {
    const [search, setSearch] = useState("");
    const [loadingId, setLoadingId] = useState<string | null>(null);

    const visibleStudents = useMemo(() => {
        const normalized = search.trim().toLowerCase();
        if (!normalized) return students;
        return students.filter((student) => {
            const value = `${student.full_name} ${student.email}`.toLowerCase();
            return value.includes(normalized);
        });
    }, [search, students]);

    async function handleEnroll(studentId: string) {
        setLoadingId(studentId);
        await onEnroll(studentId);
        setLoadingId(null);
    }

    return (
        <ModalShell title="Enroll Student" onClose={onClose}>
            <label className={styles.modalSearch}>
                <Search size={14} />
                <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search student name or email..."
                />
            </label>
            {visibleStudents.length === 0 ? (
                <div className={styles.emptyInline}>
                    <p>No matching students available for enrollment.</p>
                    <Link href="/dashboard/invite-codes" className={styles.inlineLink}>
                        Generate invite codes for new students
                    </Link>
                </div>
            ) : (
                <div className={styles.modalList}>
                    {visibleStudents.map((student) => (
                        <article key={student.id} className={styles.modalListItem}>
                            <div>
                                <p>{student.full_name || "Unnamed Student"}</p>
                                <span>{student.email}</span>
                            </div>
                            <button
                                type="button"
                                className={styles.secondaryButton}
                                onClick={() => handleEnroll(student.id)}
                                disabled={loadingId === student.id}
                            >
                                {loadingId === student.id ? "Adding..." : "Add"}
                            </button>
                        </article>
                    ))}
                </div>
            )}
        </ModalShell>
    );
}

function ModalShell({
    title,
    children,
    onClose,
}: {
    title: string;
    children: React.ReactNode;
    onClose: () => void;
}) {
    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalCard} onClick={(event) => event.stopPropagation()}>
                <header className={styles.modalHead}>
                    <h3>{title}</h3>
                    <button type="button" onClick={onClose} aria-label="Close">×</button>
                </header>
                {children}
            </div>
        </div>
    );
}
