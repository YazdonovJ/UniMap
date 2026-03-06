"use client";

import { useState, useCallback, useMemo, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Milestone, MilestoneStatus, MilestoneType } from "@/types";
import "./timeline.css";

/* ═══════════════════════════════════════════════════
   Inline SVG Icons
   ═══════════════════════════════════════════════════ */
const icons = {
    plus: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>,
    check: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20,6 9,17 4,12" /></svg>,
    clock: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><polyline points="12,6 12,12 16,14" /></svg>,
    alert: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>,
    calendar: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M8 2v4M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /></svg>,
    x: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>,
    trash: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>,
    list: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="8" x2="21" y1="6" y2="6" /><line x1="8" x2="21" y1="12" y2="12" /><line x1="8" x2="21" y1="18" y2="18" /><line x1="3" x2="3.01" y1="6" y2="6" /><line x1="3" x2="3.01" y1="12" y2="12" /><line x1="3" x2="3.01" y1="18" y2="18" /></svg>,
    grid: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /></svg>,
    chevronLeft: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m15 18-6-6 6-6" /></svg>,
    chevronRight: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m9 18 6-6-6-6" /></svg>,
    note: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14,2 14,8 20,8" /></svg>,
    target: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
    pen: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m12 19 7-7 3 3-7 7-3-3z" /><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="m2 2 7.586 7.586" /><circle cx="11" cy="11" r="2" /></svg>,
    dollar: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" x2="12" y1="2" y2="22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>,
    video: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m22 8-6 4 6 4V8Z" /><rect width="14" height="12" x="2" y="6" rx="2" ry="2" /></svg>,
    fileText: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14,2 14,8 20,8" /><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /></svg>,
    sparkle: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z" /></svg>,
    zap: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10" /></svg>,
};

/* ═══════════════════════════════════════════════════
   Config
   ═══════════════════════════════════════════════════ */
const milestoneTypes: { value: MilestoneType; label: string; icon: keyof typeof icons }[] = [
    { value: "ed_deadline", label: "Early Decision", icon: "zap" },
    { value: "ea_deadline", label: "Early Action", icon: "target" },
    { value: "rd_deadline", label: "Regular Decision", icon: "calendar" },
    { value: "loci", label: "LOCI", icon: "fileText" },
    { value: "document_submission", label: "Documents", icon: "note" },
    { value: "essay_draft", label: "Essay Draft", icon: "pen" },
    { value: "interview", label: "Interview", icon: "video" },
    { value: "financial_aid", label: "Financial Aid", icon: "dollar" },
    { value: "custom", label: "Custom", icon: "sparkle" },
];

const statusFilters: { value: string; label: string }[] = [
    { value: "all", label: "All" },
    { value: "pending", label: "Pending" },
    { value: "in_progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
    { value: "overdue", label: "Overdue" },
];

const typeFilters: { value: string; label: string }[] = [
    { value: "all", label: "All Types" },
    { value: "deadlines", label: "Deadlines" },
    { value: "essays", label: "Essays" },
    { value: "interview", label: "Interviews" },
    { value: "financial_aid", label: "Financial Aid" },
];

const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const confettiColors = ["#d63a43", "#10b981", "#f59e0b", "#3b82f6", "#8b5cf6", "#ec4899", "#f5c518"];

function seededRandom(seed: number) {
    const value = Math.sin(seed * 9999 + 0.1234) * 10000;
    return value - Math.floor(value);
}

const confettiParticles = Array.from({ length: 30 }, (_, i) => {
    const angle = (i / 30) * 360;
    const distance = 80 + seededRandom(i + 1) * 140;
    const dx = Math.cos(angle * Math.PI / 180) * distance;
    const dy = Math.sin(angle * Math.PI / 180) * distance - 100;
    return {
        key: i,
        dx,
        dy,
        color: confettiColors[i % confettiColors.length],
        size: 5 + seededRandom(i + 101) * 7,
        delay: seededRandom(i + 201) * 0.2,
        borderRadius: seededRandom(i + 301) > 0.5 ? "50%" : "2px",
    };
});

/* ═══════════════════════════════════════════════════
   Helpers
   ═══════════════════════════════════════════════════ */
function getCountdown(dueDate: string, status: MilestoneStatus) {
    if (status === "completed") return { text: "Done!", cls: "tl-countdown--done" };
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    const diff = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (diff < 0) return { text: `Overdue by ${Math.abs(diff)}d`, cls: "tl-countdown--overdue" };
    if (diff === 0) return { text: "Due today!", cls: "tl-countdown--danger" };
    if (diff === 1) return { text: "Due tomorrow!", cls: "tl-countdown--danger" };
    if (diff <= 3) return { text: `${diff} days left`, cls: "tl-countdown--danger" };
    if (diff <= 7) return { text: `${diff} days left`, cls: "tl-countdown--warning" };
    if (diff <= 14) return { text: `${diff} days left`, cls: "tl-countdown--warning" };
    return { text: `${diff} days left`, cls: "tl-countdown--safe" };
}

function getRelativeGroup(dueDate: string): string {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    const diff = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (diff < 0) return "Overdue";
    if (diff <= 7) return "This Week";
    if (diff <= 14) return "Next Week";
    if (diff <= 30) return "This Month";
    return new Date(dueDate).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function matchesTypeFilter(type: MilestoneType, filter: string): boolean {
    if (filter === "all") return true;
    if (filter === "deadlines") return ["ed_deadline", "ea_deadline", "rd_deadline", "document_submission"].includes(type);
    if (filter === "essays") return type === "essay_draft" || type === "loci";
    return type === filter;
}

function normalizeMilestoneStatus(milestone: Milestone): MilestoneStatus {
    if (milestone.status === "completed" || milestone.status === "overdue") {
        return milestone.status;
    }
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const due = new Date(milestone.due_date);
    due.setHours(0, 0, 0, 0);
    return due < now ? "overdue" : milestone.status;
}

function getTypeIcon(type: MilestoneType) {
    const t = milestoneTypes.find(mt => mt.value === type);
    if (!t) return icons.sparkle;
    return icons[t.icon];
}

/* ═══════════════════════════════════════════════════
   Confetti Component
   ═══════════════════════════════════════════════════ */
function Confetti({ active, x, y }: { active: boolean; x: number; y: number }) {
    if (!active) return null;
    const particles = confettiParticles.map((particle) => (
        <div
            key={particle.key}
            className="tl-confetti"
            data-dx={Math.round(particle.dx)}
            data-dy={Math.round(particle.dy)}
            data-color={particle.color.replace("#", "")}
            data-delay={Math.round(particle.delay * 10)}
        />
    ));
    return <div className="tl-confetti-wrap">{particles}</div>;
}

/* ═══════════════════════════════════════════════════
   Progress Ring Component
   ═══════════════════════════════════════════════════ */
function ProgressRing({ value, max, colorClass }: { value: number; max: number; colorClass: string }) {
    const r = 20;
    const circumference = 2 * Math.PI * r;
    const pct = max > 0 ? value / max : 0;
    const offset = circumference * (1 - pct);
    return (
        <div className="tl-stat-ring">
            <svg viewBox="0 0 48 48">
                <circle className="tl-stat-ring-bg" cx="24" cy="24" r={r} />
                <circle
                    className={`tl-stat-ring-fill ${colorClass}`}
                    cx="24" cy="24" r={r}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                />
            </svg>
            <div className="tl-stat-ring-value">{max > 0 ? Math.round(pct * 100) : 0}%</div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════
   Calendar View Component
   ═══════════════════════════════════════════════════ */
function CalendarView({ milestones, calMonth, setCalMonth }: {
    milestones: Milestone[];
    calMonth: Date;
    setCalMonth: (d: Date) => void;
}) {
    const year = calMonth.getFullYear();
    const month = calMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const cells: { day: number; isOther: boolean; isToday: boolean; date: Date }[] = [];
    for (let i = firstDay - 1; i >= 0; i--) {
        const d = daysInPrevMonth - i;
        cells.push({ day: d, isOther: true, isToday: false, date: new Date(year, month - 1, d) });
    }
    for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(year, month, d);
        cells.push({ day: d, isOther: false, isToday: date.getTime() === today.getTime(), date });
    }
    const remaining = 42 - cells.length;
    for (let d = 1; d <= remaining; d++) {
        cells.push({ day: d, isOther: true, isToday: false, date: new Date(year, month + 1, d) });
    }

    const getMilestonesForDate = (date: Date) => {
        const ds = date.toISOString().split("T")[0];
        return milestones.filter(m => m.due_date.startsWith(ds));
    };

    const dotColor = (status: MilestoneStatus) => {
        switch (status) {
            case "completed": return "#10b981";
            case "in_progress": return "#a91d2e";
            case "overdue": return "#ef4444";
            default: return "#c0c5d0";
        }
    };

    return (
        <>
            <div className="tl-calendar-nav">
                <button className="tl-calendar-nav-btn" onClick={() => setCalMonth(new Date(year, month - 1, 1))}>{icons.chevronLeft()}</button>
                <span className="tl-calendar-month-label">{MONTHS_SHORT[month]} {year}</span>
                <button className="tl-calendar-nav-btn" onClick={() => setCalMonth(new Date(year, month + 1, 1))}>{icons.chevronRight()}</button>
            </div>
            <div className="tl-calendar">
                {DAY_NAMES.map(d => <div key={d} className="tl-calendar-day-header">{d}</div>)}
                {cells.map((cell, idx) => {
                    const dayMs = getMilestonesForDate(cell.date);
                    return (
                        <div key={idx} className={`tl-calendar-day ${cell.isOther ? "tl-calendar-day--other" : ""} ${cell.isToday ? "tl-calendar-day--today" : ""}`}>
                            <div className="tl-calendar-day-num">{cell.day}</div>
                            <div className="tl-calendar-dot-row">
                                {dayMs.map(m => (
                                    <div key={m.id} className={`tl-calendar-event-dot tl-calendar-event-dot--${m.status}`} title={m.title} />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

/* ═══════════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════════ */
interface TimelineClientProps {
    initialMilestones: Milestone[];
    timelineId: string;
}

export default function TimelineClient({ initialMilestones, timelineId }: TimelineClientProps) {
    const [milestones, setMilestones] = useState<Milestone[]>(initialMilestones);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [statusFilter, setStatusFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");
    const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
    const [calMonth, setCalMonth] = useState(new Date());
    const [confetti, setConfetti] = useState<{ active: boolean; x: number; y: number }>({ active: false, x: 0, y: 0 });
    const [notes, setNotes] = useState<Record<string, string>>({});
    const [editingNote, setEditingNote] = useState<string | null>(null);
    const confettiTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const supabase = createClient();

    const displayMilestones = useMemo(
        () =>
            milestones.map((milestone) => {
                const normalizedStatus = normalizeMilestoneStatus(milestone);
                return normalizedStatus === milestone.status
                    ? milestone
                    : { ...milestone, status: normalizedStatus };
            }),
        [milestones]
    );

    /* ─── CRUD ─── */
    async function addMilestone(formData: FormData) {
        setLoading(true);
        const title = formData.get("title") as string;
        const dueDate = formData.get("dueDate") as string;
        const type = formData.get("type") as MilestoneType;
        const description = formData.get("description") as string;

        const { data, error } = await supabase
            .from("milestones")
            .insert({ timeline_id: timelineId, title, due_date: dueDate, type, description, status: "pending" })
            .select()
            .single();

        if (!error && data) {
            setMilestones(prev => [...prev, data].sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime()));
            setShowForm(false);
        }
        setLoading(false);
    }

    const toggleStatus = useCallback(async (milestone: Milestone, e?: React.MouseEvent) => {
        const nextStatus: Record<string, MilestoneStatus> = {
            pending: "in_progress",
            in_progress: "completed",
            completed: "pending",
            overdue: "in_progress",
        };
        const newStatus = nextStatus[milestone.status];

        // Confetti on completion
        if (newStatus === "completed" && e) {
            const rect = (e.target as HTMLElement).getBoundingClientRect();
            setConfetti({ active: true, x: rect.left + rect.width / 2, y: rect.top });
            if (confettiTimer.current) clearTimeout(confettiTimer.current);
            confettiTimer.current = setTimeout(() => setConfetti({ active: false, x: 0, y: 0 }), 1500);
        }

        await supabase.from("milestones").update({ status: newStatus }).eq("id", milestone.id);
        setMilestones(prev => prev.map(m => m.id === milestone.id ? { ...m, status: newStatus } : m));
    }, [supabase]);

    async function deleteMilestone(id: string) {
        await supabase.from("milestones").delete().eq("id", id);
        setMilestones(prev => prev.filter(m => m.id !== id));
    }

    /* ─── Derived data ─── */
    const filtered = useMemo(() => {
        return displayMilestones.filter(m => {
            if (statusFilter !== "all" && m.status !== statusFilter) return false;
            if (!matchesTypeFilter(m.type, typeFilter)) return false;
            return true;
        });
    }, [displayMilestones, statusFilter, typeFilter]);

    const grouped = useMemo(() => {
        const groups: Record<string, Milestone[]> = {};
        filtered.forEach(m => {
            const key = getRelativeGroup(m.due_date);
            (groups[key] = groups[key] || []).push(m);
        });
        return groups;
    }, [filtered]);

    const completedCount = displayMilestones.filter(m => m.status === "completed").length;
    const overdueCount = displayMilestones.filter(m => m.status === "overdue").length;
    const totalCount = displayMilestones.length;

    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const upcoming7d = displayMilestones.filter(m => {
        if (m.status === "completed") return false;
        const d = new Date(m.due_date);
        d.setHours(0, 0, 0, 0);
        const diff = (d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
        return diff >= 0 && diff <= 7;
    });

    const nextDeadline = displayMilestones
        .filter(m => m.status !== "completed" && new Date(m.due_date) >= now)
        .sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime())[0];

    const nextCountdown = nextDeadline ? getCountdown(nextDeadline.due_date, nextDeadline.status) : null;

    /* ─── Overview bar months ─── */
    const overviewMonths = useMemo(() => {
        const anchorDate = new Date();
        const months: { label: string; month: number; year: number }[] = [];
        const startMonth = 8; // Sep
        const startYear = anchorDate.getMonth() >= 8 ? anchorDate.getFullYear() : anchorDate.getFullYear() - 1;
        for (let i = 0; i < 10; i++) {
            const m = (startMonth + i) % 12;
            const y = startYear + Math.floor((startMonth + i) / 12);
            months.push({ label: MONTHS_SHORT[m], month: m, year: y });
        }
        return months;
    }, []);

    // Group title ordering
    const groupOrder = ["Overdue", "This Week", "Next Week", "This Month"];
    const sortedGroupKeys = Object.keys(grouped).sort((a, b) => {
        const ai = groupOrder.indexOf(a);
        const bi = groupOrder.indexOf(b);
        if (ai !== -1 && bi !== -1) return ai - bi;
        if (ai !== -1) return -1;
        if (bi !== -1) return 1;
        return 0;
    });

    return (
        <>
            <Confetti active={confetti.active} x={confetti.x} y={confetti.y} />

            {/* ─── Header ─── */}
            <div className="tl-header">
                <div className="tl-header-left">
                    <h1>Timeline</h1>
                    <p>Track every deadline and milestone</p>
                </div>
                <button className="tl-add-btn" onClick={() => setShowForm(true)}>
                    {icons.plus()} Add Milestone
                </button>
            </div>

            {/* ─── Smart Alert ─── */}
            {(upcoming7d.length > 0 || overdueCount > 0) && (
                <div className="tl-alert">
                    <div className="tl-alert-icon">{icons.alert()}</div>
                    <div className="tl-alert-text">
                        {overdueCount > 0 && <><span>{overdueCount} overdue</span>{upcoming7d.length > 0 ? " · " : ""}</>}
                        {upcoming7d.length > 0 && <><span>{upcoming7d.length} deadline{upcoming7d.length !== 1 ? "s" : ""}</span> in the next 7 days</>}
                    </div>
                </div>
            )}

            {/* ─── Stats ─── */}
            {totalCount > 0 && (
                <div className="tl-stats">
                    <div className="tl-stat-card">
                        <ProgressRing value={completedCount} max={totalCount} colorClass="tl-stat-ring-fill--green" />
                        <div className="tl-stat-info">
                            <h4>Completion</h4>
                            <p>{completedCount} / {totalCount}</p>
                        </div>
                    </div>
                    <div className="tl-stat-card">
                        <ProgressRing value={totalCount - completedCount - overdueCount} max={totalCount} colorClass="tl-stat-ring-fill--amber" />
                        <div className="tl-stat-info">
                            <h4>In Progress</h4>
                            <p>{totalCount - completedCount - overdueCount} remaining</p>
                        </div>
                    </div>
                    <div className="tl-stat-card">
                        <div className="tl-stat-ring">
                            <div className="tl-stat-ring-value tl-stat-ring-value--icon">{icons.calendar()}</div>
                        </div>
                        <div className="tl-stat-info">
                            <h4>Next Deadline</h4>
                            {nextDeadline ? (
                                <>
                                    <p className="tl-stat-next-title">{nextDeadline.title}</p>
                                    <div className={`tl-countdown-inline ${nextCountdown?.cls || ""}`}>{nextCountdown?.text}</div>
                                </>
                            ) : (
                                <p className="tl-stat-next-title tl-stat-next-title--none">None</p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* ─── Overview Bar ─── */}
            {totalCount > 0 && (
                <div className="tl-overview">
                    <div className="tl-overview-label">Application Season Overview</div>
                    <div className="tl-overview-track">
                        <div className="tl-overview-line" />
                        {overviewMonths.map((m, idx) => {
                            const monthMs = displayMilestones.filter(ms => {
                                const d = new Date(ms.due_date);
                                return d.getMonth() === m.month && d.getFullYear() === m.year;
                            });
                            return (
                                <div key={idx} className="tl-overview-segment" onClick={() => {
                                    setViewMode("calendar");
                                    setCalMonth(new Date(m.year, m.month, 1));
                                }}>
                                    <div className="tl-overview-segment-label">{m.label}</div>
                                    {monthMs.map((ms, di) => (
                                        <div
                                            key={ms.id}
                                            className={`tl-overview-dot tl-overview-dot--${ms.status}`}
                                            data-pos={di}
                                            title={ms.title}
                                        />
                                    ))}
                                </div>
                            );
                        })}
                        {/* Today marker on overview */}
                        {(() => {
                            const startDate = new Date(overviewMonths[0].year, overviewMonths[0].month, 1);
                            const endDate = new Date(overviewMonths[overviewMonths.length - 1].year, overviewMonths[overviewMonths.length - 1].month + 1, 0);
                            const total = endDate.getTime() - startDate.getTime();
                            const elapsed = now.getTime() - startDate.getTime();
                            const pct = Math.max(0, Math.min(100, (elapsed / total) * 100));
                            return <div className="tl-overview-today" data-progress={Math.round(pct)} />;
                        })()}
                    </div>
                </div>
            )}

            {/* ─── Toolbar: Filters + View Toggle ─── */}
            <div className="tl-toolbar">
                <div className="tl-filters">
                    {statusFilters.map(f => {
                        const count = f.value === "all" ? displayMilestones.length : displayMilestones.filter(m => m.status === f.value).length;
                        return (
                            <button
                                key={f.value}
                                className={`tl-filter-btn ${statusFilter === f.value ? "tl-filter-btn--active" : ""}`}
                                onClick={() => setStatusFilter(f.value)}
                            >
                                {f.label}
                                <span className="tl-filter-count">{count}</span>
                            </button>
                        );
                    })}
                    <span className="tl-filter-sep" />
                    {typeFilters.map(f => (
                        <button
                            key={f.value}
                            className={`tl-filter-btn ${typeFilter === f.value ? "tl-filter-btn--active" : ""}`}
                            onClick={() => setTypeFilter(f.value)}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
                <div className="tl-view-toggles">
                    <button className={`tl-view-btn ${viewMode === "list" ? "tl-view-btn--active" : ""}`} onClick={() => setViewMode("list")} title="List view">
                        {icons.list()}
                    </button>
                    <button className={`tl-view-btn ${viewMode === "calendar" ? "tl-view-btn--active" : ""}`} onClick={() => setViewMode("calendar")} title="Calendar view">
                        {icons.grid()}
                    </button>
                </div>
            </div>

            {/* ─── Add Form ─── */}
            {showForm && (
                <div className="tl-form-card">
                    <h3 className="tl-form-title">New Milestone</h3>

                    <form action={addMilestone}>
                        <div className="tl-form-grid">
                            <input className="tl-form-input" name="title" placeholder="Milestone title" aria-label="Milestone title" required />
                            <input className="tl-form-input" name="dueDate" type="date" aria-label="Due date" required />
                        </div>
                        <input className="tl-form-input tl-form-input--desc" name="description" placeholder="Description (optional)" />
                        <div className="tl-form-types" role="radiogroup" aria-label="Milestone type">
                            {milestoneTypes.map(t => {
                                const Icon = icons[t.icon];
                                const id = `tl-type-${t.value}`;
                                return (
                                    <label key={t.value} htmlFor={id}>
                                        <input id={id} type="radio" name="type" value={t.value} className="tl-form-type-radio" defaultChecked={t.value === "custom"} />
                                        <span className="tl-form-type-label"><Icon />{t.label}</span>
                                    </label>
                                );
                            })}
                        </div>
                        <div className="tl-form-actions">
                            <button type="submit" className="tl-form-submit" disabled={loading}>
                                {loading ? "Adding..." : "Add Milestone"}
                            </button>
                            <button type="button" className="tl-form-cancel" onClick={() => setShowForm(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            {/* ─── Calendar View ─── */}
            {viewMode === "calendar" && (
                <CalendarView milestones={displayMilestones} calMonth={calMonth} setCalMonth={setCalMonth} />
            )}

            {/* ─── List View ─── */}
            {viewMode === "list" && (
                <>
                    {sortedGroupKeys.length === 0 ? (
                        <div className="tl-empty">
                            <div className="tl-empty-icon">{icons.calendar()}</div>
                            <h3>No milestones yet</h3>
                            <p>Add your first deadline to get started</p>
                        </div>
                    ) : (
                        sortedGroupKeys.map(groupKey => {
                            const items = grouped[groupKey];
                            const completedInGroup = items.filter(m => m.status === "completed").length;

                            return (
                                <div key={groupKey} className="tl-swimlane">
                                    {/* Swimlane header with progress */}
                                    <div className="tl-swimlane-header">
                                        <h2 className="tl-swimlane-title">{groupKey}</h2>
                                        <div className="tl-swimlane-progress">
                                            <span className="tl-swimlane-progress-text">
                                                {completedInGroup} of {items.length} done
                                            </span>
                                            <div className="tl-swimlane-progress-bar">
                                                <div
                                                    className="tl-swimlane-progress-fill"
                                                    data-progress={items.length > 0 ? Math.round((completedInGroup / items.length) * 100) : 0}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Timeline rail */}
                                    <div className="tl-rail">
                                        <div className="tl-rail-line" />

                                        {items.map((milestone) => {
                                            const countdown = getCountdown(milestone.due_date, milestone.status);
                                            const TypeIcon = getTypeIcon(milestone.type);
                                            const typeInfo = milestoneTypes.find(t => t.value === milestone.type);
                                            const isToday = (() => {
                                                const d = new Date(milestone.due_date);
                                                d.setHours(0, 0, 0, 0);
                                                return d.getTime() === now.getTime();
                                            })();

                                            return (
                                                <div key={milestone.id}>
                                                    {/* Today marker */}
                                                    {isToday && (
                                                        <div className="tl-today-marker">
                                                            <div className="tl-today-dot" />
                                                            <div className="tl-today-line" />
                                                            <span className="tl-today-label">Today</span>
                                                        </div>
                                                    )}

                                                    <div className="tl-item">
                                                        {/* Status dot */}
                                                        <div className="tl-dot-wrap">
                                                            <button
                                                                className={`tl-dot tl-dot--${milestone.status}`}
                                                                onClick={(e) => toggleStatus(milestone, e)}
                                                                title="Toggle status"
                                                                aria-label="Toggle milestone status"
                                                            >
                                                                {milestone.status === "completed" ? icons.check() :
                                                                    milestone.status === "overdue" ? icons.alert() :
                                                                        milestone.status === "in_progress" ? <span className="tl-dot-inner tl-dot-inner--active" /> :
                                                                            <span className="tl-dot-inner tl-dot-inner--pending" />}
                                                            </button>
                                                        </div>

                                                        {/* Card */}
                                                        <div className={`tl-card ${milestone.status === "completed" ? "tl-card--completed" : ""} ${milestone.status === "overdue" ? "tl-card--overdue" : ""}`}>
                                                            <div className="tl-card-top">
                                                                <h3 className="tl-card-title">{milestone.title}</h3>
                                                                <div className="tl-card-actions">
                                                                    <button
                                                                        className="tl-card-action-btn"
                                                                        onClick={() => setEditingNote(editingNote === milestone.id ? null : milestone.id)}
                                                                        title="Add note"
                                                                    >
                                                                        {icons.note()}
                                                                    </button>
                                                                    <button
                                                                        className="tl-card-action-btn tl-card-action-btn--delete"
                                                                        onClick={() => deleteMilestone(milestone.id)}
                                                                        title="Delete"
                                                                    >
                                                                        {icons.trash()}
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            {milestone.description && (
                                                                <p className="tl-card-desc">{milestone.description}</p>
                                                            )}

                                                            <div className="tl-card-meta">
                                                                <span className="tl-date">
                                                                    {new Date(milestone.due_date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                                                                </span>
                                                                <span className={`tl-type-badge tl-type--${milestone.type}`}>
                                                                    <TypeIcon />
                                                                    {typeInfo?.label || milestone.type}
                                                                </span>
                                                                <span className={countdown.cls + " tl-countdown"}>
                                                                    {icons.clock()}
                                                                    {countdown.text}
                                                                </span>
                                                                <span className={`tl-status-badge tl-status--${milestone.status}`}>
                                                                    {milestone.status.replace("_", " ")}
                                                                </span>
                                                            </div>

                                                            {/* Notes */}
                                                            {(notes[milestone.id] || editingNote === milestone.id) && (
                                                                <div className="tl-card-notes">
                                                                    {notes[milestone.id] && (
                                                                        <div className="tl-note">
                                                                            {icons.note()}
                                                                            <span>{notes[milestone.id]}</span>
                                                                        </div>
                                                                    )}
                                                                    {editingNote === milestone.id && (
                                                                        <input
                                                                            className="tl-note-input"
                                                                            placeholder="Add a note..."
                                                                            value={notes[milestone.id] || ""}
                                                                            onChange={(e) => setNotes(prev => ({ ...prev, [milestone.id]: e.target.value }))}
                                                                            onKeyDown={(e) => { if (e.key === "Enter") setEditingNote(null); }}
                                                                            onBlur={() => setEditingNote(null)}
                                                                            autoFocus
                                                                        />
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </>
            )}
        </>
    );
}
