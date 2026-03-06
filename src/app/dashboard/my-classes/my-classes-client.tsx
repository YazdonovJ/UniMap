"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
    BookOpen, Calendar, CheckCircle2, Clock, FileText,
    Megaphone, AlertCircle, Send, Pin
} from "lucide-react";
import "./my-classes.css";

/* ── Types ── */
interface MyClassesClientProps {
    classes: Record<string, unknown>[];
    assignments: Record<string, unknown>[];
    submissions: Record<string, unknown>[];
    announcements: Record<string, unknown>[];
}

type TabKey = "classes" | "assignments" | "announcements";

/* ── Helpers ── */
function getTimeUntil(dateStr: string): { text: string; urgency: "urgent" | "soon" | "safe" } {
    const now = Date.now();
    const target = new Date(dateStr).getTime();
    const diff = target - now;

    if (diff < 0) return { text: "Overdue", urgency: "urgent" };

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 6) return { text: `${hours}h left`, urgency: "urgent" };
    if (hours < 24) return { text: `${hours} hours left`, urgency: "soon" };
    if (days === 1) return { text: "Tomorrow", urgency: "soon" };
    if (days <= 3) return { text: `${days} days left`, urgency: "soon" };
    return { text: `${days} days left`, urgency: "safe" };
}

function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/* ── Progress Ring SVG ── */
function ProgressRing({ percent, color }: { percent: number; color: string }) {
    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;

    return (
        <div className="mcl-progress-ring">
            <svg viewBox="0 0 48 48">
                <circle className="mcl-progress-ring-bg" cx="24" cy="24" r={radius} />
                <circle
                    className="mcl-progress-ring-fill"
                    cx="24" cy="24" r={radius}
                    stroke={color}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                />
            </svg>
            <span className="mcl-progress-ring-text" data-color={color}>{Math.round(percent)}%</span>
        </div>
    );
}

/* ── Main Component ── */
export function MyClassesClient({ classes, assignments, submissions, announcements }: MyClassesClientProps) {
    const [activeTab, setActiveTab] = useState<TabKey>("classes");
    const [classFilter, setClassFilter] = useState<string | null>(null);
    const [indicatorStyle, setIndicatorStyle] = useState<Record<string, string>>({});
    const tabRefs = useRef<Record<TabKey, HTMLButtonElement | null>>({ classes: null, assignments: null, announcements: null });

    /* ── Computed data ── */
    const getSubmission = useCallback(
        (assignmentId: string) => submissions.find(s => s.assignment_id === assignmentId),
        [submissions]
    );

    const gradedSubmissions = submissions.filter(s => s.status === "graded");

    const gradeOverview = useMemo(() => {
        if (gradedSubmissions.length === 0) return null;
        let totalEarned = 0;
        let totalPossible = 0;
        gradedSubmissions.forEach(sub => {
            const assignment = assignments.find(a => (a as Record<string, unknown>).id === sub.assignment_id);
            if (assignment && sub.grade != null) {
                totalEarned += sub.grade as number;
                totalPossible += (assignment as Record<string, unknown>).max_points as number;
            }
        });
        if (totalPossible === 0) return null;
        return Math.round((totalEarned / totalPossible) * 100);
    }, [gradedSubmissions, assignments]);

    const classProgress = useMemo(() => {
        const progress: Record<string, { total: number; submitted: number }> = {};
        classes.forEach(cls => {
            const classId = cls.id as string;
            const classAssignments = assignments.filter(a => (a as Record<string, unknown>).class_id === classId);
            const classSubmissions = classAssignments.filter(a => {
                return submissions.some(s => s.assignment_id === (a as Record<string, unknown>).id);
            });
            progress[classId] = { total: classAssignments.length, submitted: classSubmissions.length };
        });
        return progress;
    }, [classes, assignments, submissions]);

    const nextDueAssignment = useMemo(() => {
        const now = new Date();
        const upcoming = assignments
            .filter(a => new Date(a.due_date as string) > now && !getSubmission(a.id as string))
            .sort((a, b) => new Date(a.due_date as string).getTime() - new Date(b.due_date as string).getTime());
        return upcoming[0] || null;
    }, [assignments, getSubmission]);

    const filteredAssignments = useMemo(() => {
        if (!classFilter) return assignments;
        return assignments.filter(a => (a as Record<string, unknown>).class_id === classFilter);
    }, [assignments, classFilter]);

    const filteredAnnouncements = useMemo(() => {
        let items = [...announcements];
        if (classFilter) {
            items = items.filter(a => (a as Record<string, unknown>).class_id === classFilter);
        }
        // Sort: pinned first, then by date
        return items.sort((a, b) => {
            if (a.pinned && !b.pinned) return -1;
            if (!a.pinned && b.pinned) return 1;
            return 0;
        });
    }, [announcements, classFilter]);

    /* ── Tab indicator position ── */
    const tabs: Array<{ key: TabKey; label: string; icon: typeof BookOpen; count: number }> = [
        { key: "classes", label: "My Classes", icon: BookOpen, count: classes.length },
        { key: "assignments", label: "Assignments", icon: FileText, count: assignments.length },
        { key: "announcements", label: "Announcements", icon: Megaphone, count: announcements.length },
    ];

    useEffect(() => {
        const updateIndicator = () => {
            const activeTabRef = tabRefs.current[activeTab];
            if (!activeTabRef) return;
            setIndicatorStyle({
                "--transform": `translateX(${activeTabRef.offsetLeft - 4}px)`,
                "--width": `${activeTabRef.offsetWidth}px`,
            });
        };

        updateIndicator();
        window.addEventListener("resize", updateIndicator);
        return () => window.removeEventListener("resize", updateIndicator);
    }, [activeTab, classes.length, assignments.length, announcements.length]);

    function getProgressColor(percent: number): string {
        if (percent >= 75) return "#059669";
        if (percent >= 50) return "#d97706";
        return "#dc2626";
    }

    return (
        <div className="mcl-page">
            {/* ── Hero ── */}
            <section className="mcl-hero mcl-reveal">
                <div>
                    <h1 className="mcl-hero-greeting">My Classes</h1>
                    <p className="mcl-hero-sub">View your enrolled classes, assignments, and announcements</p>
                </div>

                {nextDueAssignment && (() => {
                    const countdown = getTimeUntil(nextDueAssignment.due_date as string);
                    const cls = classes.find(c => (c as Record<string, unknown>).id === (nextDueAssignment as Record<string, unknown>).class_id);
                    return (
                        <div className="mcl-next-due">
                            <div className={`mcl-next-due-icon is-${countdown.urgency}`}>
                                <Clock size={20} />
                            </div>
                            <div className="mcl-next-due-info">
                                <span className="mcl-next-due-label">Next Due</span>
                                <p className="mcl-next-due-title">{nextDueAssignment.title as string}</p>
                                <p className="mcl-next-due-meta">
                                    {cls ? (cls as Record<string, unknown>).name as string : ""}
                                    {" · "}
                                    {formatDate(nextDueAssignment.due_date as string)}
                                </p>
                            </div>
                            <span className={`mcl-countdown-badge is-${countdown.urgency}`}>
                                {countdown.text}
                            </span>
                        </div>
                    );
                })()}
            </section>

            {/* ── Stats ── */}
            <div className="mcl-stats mcl-reveal" data-delay-idx={1}>
                <div className="mcl-stat">
                    <div className="mcl-stat-icon is-classes"><BookOpen size={18} /></div>
                    <div>
                        <p className="mcl-stat-value">{classes.length}</p>
                        <p className="mcl-stat-label">Enrolled Classes</p>
                    </div>
                </div>
                <div className="mcl-stat">
                    <div className="mcl-stat-icon is-tasks"><Clock size={18} /></div>
                    <div>
                        <p className="mcl-stat-value">{assignments.length}</p>
                        <p className="mcl-stat-label">Upcoming Tasks</p>
                    </div>
                </div>
                <div className="mcl-stat">
                    <div className="mcl-stat-icon is-graded"><CheckCircle2 size={18} /></div>
                    <div>
                        <p className="mcl-stat-value">{gradedSubmissions.length}</p>
                        <p className="mcl-stat-label">Graded</p>
                    </div>
                </div>
                <div className="mcl-stat">
                    <div className="mcl-stat-icon is-announcements"><Megaphone size={18} /></div>
                    <div>
                        <p className="mcl-stat-value">{announcements.length}</p>
                        <p className="mcl-stat-label">Announcements</p>
                    </div>
                </div>
            </div>

            {/* ── Grade Overview Bar ── */}
            {gradeOverview !== null && (
                <div className="mcl-grade-bar mcl-reveal" data-delay-idx={2}>
                    <span className="mcl-grade-bar-label">Overall Grade</span>
                    <div className="mcl-grade-bar-track">
                        <div className="mcl-grade-bar-fill" data-progress={gradeOverview} />
                    </div>
                    <span className="mcl-grade-bar-value">{gradeOverview}%</span>
                </div>
            )}

            {/* ── Tabs ── */}
            <div className="mcl-tabs mcl-reveal" data-delay-idx={3}>
                <span className="mcl-tab-indicator" data-transform={indicatorStyle["--transform"]} data-width={indicatorStyle["--width"]} aria-hidden />
                {tabs.map(tab => (
                    <button
                        key={tab.key}
                        ref={el => { tabRefs.current[tab.key] = el; }}
                        type="button"
                        className={`mcl-tab ${activeTab === tab.key ? "is-active" : ""}`}
                        onClick={() => setActiveTab(tab.key)}
                    >
                        <tab.icon size={15} />
                        {tab.label}
                        <span className="mcl-tab-count">{tab.count}</span>
                    </button>
                ))}
            </div>

            {/* ── Class Filter Chips (for assignments & announcements tabs) ── */}
            {activeTab !== "classes" && classes.length > 0 && (
                <div className="mcl-class-filters mcl-reveal" data-delay-idx={4}>
                    <button
                        type="button"
                        className={`mcl-class-chip ${classFilter === null ? "is-active" : ""}`}
                        onClick={() => setClassFilter(null)}
                    >
                        All Classes
                    </button>
                    {classes.map(cls => (
                        <button
                            key={cls.id as string}
                            type="button"
                            className={`mcl-class-chip ${classFilter === (cls.id as string) ? "is-active" : ""}`}
                            onClick={() => setClassFilter(classFilter === (cls.id as string) ? null : cls.id as string)}
                        >
                            <span className="mcl-class-dot" data-bg={(cls.color as string) || "#6366f1"} />
                            {cls.name as string}
                        </button>
                    ))}
                </div>
            )}

            {/* ══════════════ CLASSES VIEW ══════════════ */}
            {activeTab === "classes" && (
                <div>
                    {classes.length === 0 ? (
                        <div className="mcl-empty">
                            <div className="mcl-empty-icon"><BookOpen size={24} /></div>
                            <h3 className="mcl-empty-title">Not enrolled in any classes</h3>
                            <p className="mcl-empty-desc">Ask your counselor to enroll you in a class to get started</p>
                        </div>
                    ) : (
                        <div className="mcl-classes-grid">
                            {classes.map((cls, i) => {
                                const classId = cls.id as string;
                                const progress = classProgress[classId];
                                const pct = progress && progress.total > 0 ? Math.round((progress.submitted / progress.total) * 100) : 0;
                                const color = (cls.color as string) || "#6366f1";

                                // Find next due assignment for this class
                                const nextAssignment = assignments
                                    .filter(a => (a as Record<string, unknown>).class_id === classId)
                                    .filter(a => new Date(a.due_date as string) > new Date() && !getSubmission(a.id as string))
                                    .sort((a, b) => new Date(a.due_date as string).getTime() - new Date(b.due_date as string).getTime())[0];

                                return (
                                    <article
                                        key={classId}
                                        className="mcl-class-card"
                                        data-index={i}
                                    >
                                        <div className="mcl-class-top">
                                            <div className="mcl-class-info">
                                                <h3 className="mcl-class-name">{cls.name as string}</h3>
                                                <p className="mcl-class-subject">{cls.subject as string}</p>
                                            </div>
                                            {progress && progress.total > 0 && (
                                                <ProgressRing percent={pct} color={getProgressColor(pct)} />
                                            )}
                                        </div>

                                        {(cls.description as string) && (
                                            <p className="mcl-class-desc">{String(cls.description)}</p>
                                        )}

                                        <div className="mcl-class-footer">
                                            <span className="mcl-class-schedule">
                                                <Calendar size={13} />
                                                {cls.schedule && typeof cls.schedule === "object"
                                                    ? Object.keys(cls.schedule as Record<string, string>).join(", ")
                                                    : "Schedule TBD"
                                                }
                                            </span>
                                            {nextAssignment && (
                                                <span className="mcl-class-next-due">
                                                    Due: {(nextAssignment as Record<string, unknown>).title as string} · {formatDate((nextAssignment as Record<string, unknown>).due_date as string)}
                                                </span>
                                            )}
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}

            {/* ══════════════ ASSIGNMENTS VIEW ══════════════ */}
            {activeTab === "assignments" && (
                <div className="mcl-assignments">
                    {filteredAssignments.length === 0 ? (
                        <div className="mcl-empty">
                            <div className="mcl-empty-icon"><FileText size={24} /></div>
                            <h3 className="mcl-empty-title">No upcoming assignments</h3>
                            <p className="mcl-empty-desc">Check back later for new assignments from your classes</p>
                        </div>
                    ) : filteredAssignments.map((a, i) => {
                        const sub = getSubmission(a.id as string);
                        const dueDate = new Date(a.due_date as string);
                        const isOverdue = dueDate < new Date() && !sub;
                        const isGraded = !!sub && sub.status === "graded";
                        const isSubmitted = !!sub && sub.status !== "graded";
                        const countdown = getTimeUntil(a.due_date as string);
                        const cls = classes.find(c => (c as Record<string, unknown>).id === (a as Record<string, unknown>).class_id);
                        const assignmentType = ((a.type as string) || "other").toLowerCase();

                        let dotClass = "is-pending";
                        if (isGraded) dotClass = "is-graded";
                        else if (isSubmitted) dotClass = "is-submitted";
                        else if (isOverdue) dotClass = "is-overdue";

                        return (
                            <article
                                key={a.id as string}
                                className="mcl-assignment"
                                data-index={i}
                            >
                                <span className={`mcl-assignment-status-dot ${dotClass}`} />
                                <div className="mcl-assignment-main">
                                    <h4 className="mcl-assignment-title">{a.title as string}</h4>
                                    <div className="mcl-assignment-meta">
                                        <span className="mcl-assignment-date">
                                            <Calendar size={12} />
                                            {formatDate(a.due_date as string)}
                                        </span>
                                        <span className={`mcl-assignment-type is-${assignmentType}`}>
                                            {a.type as string}
                                        </span>
                                        <span className="mcl-assignment-points">{a.max_points as number} pts</span>
                                        {cls && (
                                            <span className="mcl-assignment-class-badge">
                                                <span className="mcl-class-dot" data-bg={(cls.color as string) || "#6366f1"} />
                                                {(cls as Record<string, unknown>).name as string}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="mcl-assignment-actions">
                                    {!sub && !isOverdue && (
                                        <span className={`mcl-countdown-badge is-${countdown.urgency}`}>
                                            {countdown.text}
                                        </span>
                                    )}
                                    {isGraded ? (
                                        <span className="mcl-grade-badge">
                                            {sub.grade as number}/{a.max_points as number}
                                        </span>
                                    ) : isSubmitted ? (
                                        <span className="mcl-grade-badge" data-status="submitted">
                                            <CheckCircle2 size={13} />
                                            Submitted
                                        </span>
                                    ) : (
                                        <button type="button" className={`mcl-submit-btn ${isOverdue ? "is-overdue" : ""}`}>
                                            <Send size={13} />
                                            {isOverdue ? "Late Submit" : "Submit"}
                                        </button>
                                    )}
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}

            {/* ══════════════ ANNOUNCEMENTS VIEW ══════════════ */}
            {activeTab === "announcements" && (
                <div className="mcl-announcements">
                    {filteredAnnouncements.length === 0 ? (
                        <div className="mcl-empty">
                            <div className="mcl-empty-icon"><Megaphone size={24} /></div>
                            <h3 className="mcl-empty-title">No announcements yet</h3>
                            <p className="mcl-empty-desc">Your teachers will post updates and announcements here</p>
                        </div>
                    ) : filteredAnnouncements.map((a, i) => {
                        const priority = ((a.priority as string) || "info").toLowerCase();
                        const isPinned = !!(a.pinned);
                        const isUrgent = priority === "urgent";
                        const IconComponent = priority === "urgent" ? AlertCircle : priority === "warning" ? AlertCircle : Megaphone;

                        return (
                            <article
                                key={a.id as string}
                                className={`mcl-announcement is-${priority} ${isPinned ? "is-pinned" : ""}`}
                                data-index={i}
                            >
                                <div className={`mcl-announcement-icon is-${priority}`}>
                                    <IconComponent size={16} />
                                </div>
                                <div className="mcl-announcement-body">
                                    <div className="mcl-announcement-header">
                                        <h4 className="mcl-announcement-title">{a.title as string}</h4>
                                        <span className={`mcl-priority-badge is-${priority}`}>{priority}</span>
                                        {isPinned && <Pin size={13} className="mcl-pin-icon" />}
                                        {isUrgent && <span className="mcl-urgent-dot" />}
                                    </div>
                                    <p className="mcl-announcement-content">{a.content as string}</p>
                                    <p className="mcl-announcement-date">{formatDate(a.created_at as string)}</p>
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
