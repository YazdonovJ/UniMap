"use client";

import { useMemo, useState } from "react";
import {
    Users, AlertCircle, CheckCircle2, Clock, Search,
    FileText, ArrowUpDown, ChevronUp, ChevronDown
} from "lucide-react";
import "./oversight.css";

/* ── Types ── */
interface AlumniData {
    id: string;
    full_name: string | null;
    email: string;
    onboarding_complete: boolean;
    essayCount: number;
    draftEssays: number;
    totalMilestones: number;
    overdueMilestones: number;
    completedMilestones: number;
    activitiesCount: number;
}

interface OversightClientProps {
    alumni: AlumniData[];
}

type FilterKey = "all" | "at_risk" | "on_track" | "onboarding";
type SortKey = "name" | "essays" | "activities" | "milestones" | "overdue";
type SortDir = "asc" | "desc";

/* ── Avatar colors ── */
const AVATAR_COLORS = [
    "#4f46e5", "#7c3aed", "#2563eb", "#0891b2", "#059669",
    "#d97706", "#dc2626", "#db2777", "#9333ea", "#0d9488",
];

function getAvatarColorIndex(name: string): number {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return Math.abs(hash) % AVATAR_COLORS.length;
}

function getInitials(name: string | null): string {
    if (!name) return "?";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0][0]?.toUpperCase() || "?";
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/* ── Health Ring ── */
function HealthRing({ percent, color }: { percent: number; color: string }) {
    const r = 22;
    const c = 2 * Math.PI * r;
    const offset = c - (percent / 100) * c;
    return (
        <div className="ovs-health-ring">
            <svg viewBox="0 0 52 52">
                <circle className="ovs-health-ring-bg" cx="26" cy="26" r={r} />
                <circle className="ovs-health-ring-fill" cx="26" cy="26" r={r} stroke={color} strokeDasharray={c} strokeDashoffset={offset} />
            </svg>
            <span className="ovs-health-ring-text" data-percent={Math.round(percent)}>{Math.round(percent)}%</span>
        </div>
    );
}

/* ── Mini Ring ── */
function MiniRing({ completed, total }: { completed: number; total: number }) {
    const pct = total > 0 ? (completed / total) * 100 : 0;
    const r = 12;
    const c = 2 * Math.PI * r;
    const offset = c - (pct / 100) * c;
    const color = pct >= 75 ? "#059669" : pct >= 50 ? "#d97706" : "#dc2626";
    return (
        <div className="ovs-mini-ring">
            <svg viewBox="0 0 28 28">
                <circle className="ovs-mini-ring-bg" cx="14" cy="14" r={r} />
                <circle className="ovs-mini-ring-fill" cx="14" cy="14" r={r} stroke={color} strokeDasharray={c} strokeDashoffset={offset} />
            </svg>
        </div>
    );
}

function SortIcon({ activeSortKey, sortDir, col }: { activeSortKey: SortKey; sortDir: SortDir; col: SortKey }) {
    if (activeSortKey !== col) return <ArrowUpDown size={11} className="ovs-sort-icon" data-active="false" />;
    return sortDir === "asc"
        ? <ChevronUp size={12} className="ovs-sort-icon" />
        : <ChevronDown size={12} className="ovs-sort-icon" />;
}

/* ── Main Component ── */
export function OversightClient({ alumni }: OversightClientProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState<FilterKey>("all");
    const [sortKey, setSortKey] = useState<SortKey>("name");
    const [sortDir, setSortDir] = useState<SortDir>("asc");

    /* ── Computed stats ── */
    const totalAlumni = alumni.length;
    const withOverdue = alumni.filter(a => a.overdueMilestones > 0).length;
    const totalDrafts = alumni.reduce((acc, a) => acc + a.draftEssays, 0);
    const onboarded = alumni.filter(a => a.onboarding_complete).length;

    const atRiskStudents = useMemo(
        () => alumni.filter(a => a.overdueMilestones > 0).sort((a, b) => b.overdueMilestones - a.overdueMilestones),
        [alumni]
    );

    /* ── Cohort health ── */
    const cohortHealth = useMemo(() => {
        if (alumni.length === 0) return 0;
        const onboardingRate = (onboarded / alumni.length) * 100;
        const totalMilestones = alumni.reduce((s, a) => s + a.totalMilestones, 0);
        const completedMilestones = alumni.reduce((s, a) => s + a.completedMilestones, 0);
        const milestoneRate = totalMilestones > 0 ? (completedMilestones / totalMilestones) * 100 : 100;
        const noOverdueRate = ((alumni.length - withOverdue) / alumni.length) * 100;
        return Math.round((onboardingRate * 0.3 + milestoneRate * 0.4 + noOverdueRate * 0.3));
    }, [alumni, onboarded, withOverdue]);

    const healthColor = cohortHealth >= 75 ? "#059669" : cohortHealth >= 50 ? "#d97706" : "#dc2626";

    /* ── Filter counts ── */
    const filterCounts: Record<FilterKey, number> = {
        all: alumni.length,
        at_risk: withOverdue,
        on_track: alumni.filter(a => a.onboarding_complete && a.overdueMilestones === 0).length,
        onboarding: alumni.filter(a => !a.onboarding_complete).length,
    };

    /* ── Filtered + sorted ── */
    const displayedAlumni = useMemo(() => {
        let list = [...alumni];

        // Filter
        if (filter === "at_risk") list = list.filter(a => a.overdueMilestones > 0);
        else if (filter === "on_track") list = list.filter(a => a.onboarding_complete && a.overdueMilestones === 0);
        else if (filter === "onboarding") list = list.filter(a => !a.onboarding_complete);

        // Search
        const q = searchTerm.trim().toLowerCase();
        if (q) {
            list = list.filter(a =>
                (a.full_name || "").toLowerCase().includes(q)
                || a.email.toLowerCase().includes(q)
            );
        }

        // Sort
        list.sort((a, b) => {
            let cmp = 0;
            switch (sortKey) {
                case "name": cmp = (a.full_name || "").localeCompare(b.full_name || ""); break;
                case "essays": cmp = a.essayCount - b.essayCount; break;
                case "activities": cmp = a.activitiesCount - b.activitiesCount; break;
                case "milestones": {
                    const pctA = a.totalMilestones > 0 ? a.completedMilestones / a.totalMilestones : 0;
                    const pctB = b.totalMilestones > 0 ? b.completedMilestones / b.totalMilestones : 0;
                    cmp = pctA - pctB;
                    break;
                }
                case "overdue": cmp = a.overdueMilestones - b.overdueMilestones; break;
            }
            return sortDir === "asc" ? cmp : -cmp;
        });

        return list;
    }, [alumni, filter, searchTerm, sortKey, sortDir]);

    function handleSort(key: SortKey) {
        if (sortKey === key) {
            setSortDir(d => d === "asc" ? "desc" : "asc");
        } else {
            setSortKey(key);
            setSortDir("asc");
        }
    }

    const filters: Array<{ key: FilterKey; label: string }> = [
        { key: "all", label: "All" },
        { key: "at_risk", label: "At Risk" },
        { key: "on_track", label: "On Track" },
        { key: "onboarding", label: "Onboarding" },
    ];

    return (
        <div className="ovs-page">
            {/* ── Hero ── */}
            <section className="ovs-hero ovs-reveal">
                <div>
                    <h1 className="ovs-hero-title">Operational Oversight</h1>
                    <p className="ovs-hero-sub">Monitor progress across all alumni in your cohort</p>
                </div>
                {alumni.length > 0 && (
                    <div className="ovs-health" data-status={cohortHealth >= 75 ? "good" : cohortHealth >= 50 ? "warn" : "risk"}>
                        <HealthRing percent={cohortHealth} color={healthColor} />
                        <div>
                            <p className="ovs-health-label">Cohort Health</p>
                            <p className="ovs-health-subtitle">Weighted avg of progress metrics</p>
                        </div>
                    </div>
                )}
            </section>

            {/* ── Stats ── */}
            <div className="ovs-stats ovs-reveal" data-delay-idx={1}>
                <div className="ovs-stat">
                    <div className="ovs-stat-icon is-total"><Users size={19} /></div>
                    <div>
                        <p className="ovs-stat-value">{totalAlumni}</p>
                        <p className="ovs-stat-label">Total Alumni</p>
                    </div>
                </div>
                <div className="ovs-stat">
                    <div className="ovs-stat-icon is-overdue"><AlertCircle size={19} /></div>
                    <div>
                        <p className="ovs-stat-value">{withOverdue}</p>
                        <p className="ovs-stat-label">With Overdue Tasks</p>
                    </div>
                </div>
                <div className="ovs-stat">
                    <div className="ovs-stat-icon is-drafts"><Clock size={19} /></div>
                    <div>
                        <p className="ovs-stat-value">{totalDrafts}</p>
                        <p className="ovs-stat-label">Draft Essays</p>
                    </div>
                </div>
                <div className="ovs-stat">
                    <div className="ovs-stat-icon is-onboarded"><CheckCircle2 size={19} /></div>
                    <div>
                        <p className="ovs-stat-value">{onboarded}</p>
                        <p className="ovs-stat-label">Onboarded</p>
                    </div>
                </div>
            </div>

            {/* ── Controls ── */}
            <div className="ovs-controls ovs-reveal" data-delay-idx={2}>
                <label className="ovs-search">
                    <Search size={16} />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </label>
                {filters.map(f => (
                    <button
                        key={f.key}
                        type="button"
                        className={`ovs-filter-chip ${filter === f.key ? "is-active" : ""}`}
                        onClick={() => setFilter(f.key)}
                    >
                        {f.label}
                        <span className="ovs-filter-count">{filterCounts[f.key]}</span>
                    </button>
                ))}
            </div>

            {/* ── Layout: Table + At-Risk Sidebar ── */}
            <div className="ovs-layout ovs-reveal" data-delay-idx={3}>
                {/* Table Panel */}
                <div className="ovs-table-panel">
                    <div className="ovs-table-header">
                        <div>
                            <h2 className="ovs-table-title">Alumni Progress</h2>
                            <p className="ovs-table-subtitle">Showing {displayedAlumni.length} of {alumni.length} students</p>
                        </div>
                    </div>

                    {displayedAlumni.length === 0 ? (
                        <div className="ovs-empty">
                            <div className="ovs-empty-icon"><Users size={24} /></div>
                            <h3 className="ovs-empty-title">
                                {alumni.length === 0 ? "No alumni in your cohort yet" : "No students match this filter"}
                            </h3>
                            <p className="ovs-empty-desc">
                                {alumni.length === 0
                                    ? "Alumni will appear here once they join your cohort"
                                    : "Try adjusting your search or filter criteria"
                                }
                            </p>
                        </div>
                    ) : (
                        <table className="ovs-table">
                            <thead>
                                <tr>
                                    <th onClick={() => handleSort("name")} className={sortKey === "name" ? "is-sorted" : ""}>
                                        Student <SortIcon activeSortKey={sortKey} sortDir={sortDir} col="name" />
                                    </th>
                                    <th>Status</th>
                                    <th onClick={() => handleSort("essays")} className={sortKey === "essays" ? "is-sorted" : ""}>
                                        Essays <SortIcon activeSortKey={sortKey} sortDir={sortDir} col="essays" />
                                    </th>
                                    <th onClick={() => handleSort("activities")} className={sortKey === "activities" ? "is-sorted" : ""}>
                                        Activities <SortIcon activeSortKey={sortKey} sortDir={sortDir} col="activities" />
                                    </th>
                                    <th onClick={() => handleSort("milestones")} className={sortKey === "milestones" ? "is-sorted" : ""}>
                                        Milestones <SortIcon activeSortKey={sortKey} sortDir={sortDir} col="milestones" />
                                    </th>
                                    <th onClick={() => handleSort("overdue")} className={sortKey === "overdue" ? "is-sorted" : ""}>
                                        Overdue <SortIcon activeSortKey={sortKey} sortDir={sortDir} col="overdue" />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedAlumni.map(a => {
                                    const name = a.full_name || "Unnamed";
                                    const actPct = Math.min(100, (a.activitiesCount / 10) * 100);
                                    const actColor = actPct >= 70 ? "#059669" : actPct >= 40 ? "#d97706" : "#dc2626";

                                    return (
                                        <tr key={a.id}>
                                            <td>
                                                <div className="ovs-student">
                                                    <div className="ovs-avatar" data-color-idx={getAvatarColorIndex(name)}>
                                                        {getInitials(a.full_name)}
                                                    </div>
                                                    <div>
                                                        <p className="ovs-student-name">{name}</p>
                                                        <p className="ovs-student-email">{a.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`ovs-status-badge ${a.onboarding_complete ? "is-active" : "is-onboarding"}`}>
                                                    {a.onboarding_complete ? "Active" : "Onboarding"}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="ovs-essay-cell">
                                                    <FileText size={14} className="ovs-essay-icon" />
                                                    <span>{a.essayCount}</span>
                                                    {a.draftEssays > 0 && <span className="ovs-draft-tag">({a.draftEssays} drafts)</span>}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="ovs-progress-cell">
                                                    <div className="ovs-progress-bar">
                                                        <div className="ovs-progress-bar-fill" data-width={Math.round(actPct)} data-status={actPct >= 70 ? "good" : actPct >= 40 ? "warn" : "risk"} />
                                                    </div>
                                                    <span className="ovs-progress-text">{a.activitiesCount}/10</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="ovs-milestone-cell">
                                                    <MiniRing completed={a.completedMilestones} total={a.totalMilestones} />
                                                    <span className="ovs-progress-text">{a.completedMilestones}/{a.totalMilestones}</span>
                                                </div>
                                            </td>
                                            <td>
                                                {a.overdueMilestones > 0 ? (
                                                    <span className="ovs-overdue-badge">
                                                        <AlertCircle size={12} />
                                                        {a.overdueMilestones} overdue
                                                    </span>
                                                ) : (
                                                    <span className="ovs-on-track">
                                                        <CheckCircle2 size={13} /> On track
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* At-Risk Sidebar */}
                <aside className="ovs-risk-panel">
                    <h3 className="ovs-risk-title">
                        <span className="ovs-risk-dot" />
                        At Risk Students
                    </h3>
                    <p className="ovs-risk-sub">Students with overdue milestones</p>

                    {atRiskStudents.length === 0 ? (
                        <div className="ovs-risk-empty">
                            <CheckCircle2 size={20} className="ovs-risk-empty-icon" />
                            All students on track! 🎉
                        </div>
                    ) : (
                        <div className="ovs-risk-list">
                            {atRiskStudents.slice(0, 10).map(a => (
                                <div key={a.id} className="ovs-risk-card">
                                    <div className="ovs-risk-avatar">{getInitials(a.full_name)}</div>
                                    <span className="ovs-risk-name">{a.full_name || "Unnamed"}</span>
                                    <span className="ovs-risk-count">{a.overdueMilestones} overdue</span>
                                </div>
                            ))}
                        </div>
                    )}
                </aside>
            </div>
        </div>
    );
}
