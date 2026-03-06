"use client";

import { useState, useMemo, type CSSProperties } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Activity } from "@/types";
import { ACTIVITY_SUGGESTIONS } from "./activity-suggestions-data";
import "./activities.css";

/* ═══════════════════════════════════════════════════
   Constants
   ═══════════════════════════════════════════════════ */
const CHAR_LIMIT_DESC = 150;
const CHAR_LIMIT_TITLE = 50;
const MAX_ACTIVITIES = 10;

const ACTIVITY_TYPES = [
    "Academic", "Art", "Athletics", "Community Service",
    "Computer/Technology", "Cultural", "Dance", "Debate/Speech",
    "Environmental", "Family Responsibilities", "Foreign Exchange",
    "Journalism/Publication", "LGBTQ+", "Music", "Religious",
    "Research", "Robotics", "School Spirit", "Science/Math",
    "Student Government", "Theater", "Volunteering", "Work (Paid)", "Other",
];

const TYPE_COLORS: Record<string, { bg: string; color: string }> = {
    "Academic": { bg: "rgba(59,130,246,0.1)", color: "#2563eb" },
    "Art": { bg: "rgba(168,85,247,0.1)", color: "#7c3aed" },
    "Athletics": { bg: "rgba(239,68,68,0.1)", color: "#dc2626" },
    "Community Service": { bg: "rgba(16,185,129,0.1)", color: "#059669" },
    "Computer/Technology": { bg: "rgba(6,182,212,0.1)", color: "#0891b2" },
    "Cultural": { bg: "rgba(245,158,11,0.1)", color: "#d97706" },
    "Dance": { bg: "rgba(236,72,153,0.1)", color: "#db2777" },
    "Debate/Speech": { bg: "rgba(99,102,241,0.1)", color: "#4f46e5" },
    "Environmental": { bg: "rgba(34,197,94,0.1)", color: "#16a34a" },
    "Family Responsibilities": { bg: "rgba(244,114,182,0.1)", color: "#ec4899" },
    "Foreign Exchange": { bg: "rgba(14,165,233,0.1)", color: "#0284c7" },
    "Journalism/Publication": { bg: "rgba(161,161,170,0.1)", color: "#71717a" },
    "LGBTQ+": { bg: "rgba(168,85,247,0.1)", color: "#9333ea" },
    "Music": { bg: "rgba(249,115,22,0.1)", color: "#ea580c" },
    "Religious": { bg: "rgba(120,113,108,0.1)", color: "#78716c" },
    "Research": { bg: "rgba(59,130,246,0.1)", color: "#2563eb" },
    "Robotics": { bg: "rgba(20,184,166,0.1)", color: "#0d9488" },
    "School Spirit": { bg: "rgba(251,146,60,0.1)", color: "#ea580c" },
    "Science/Math": { bg: "rgba(34,197,94,0.1)", color: "#16a34a" },
    "Student Government": { bg: "rgba(169,29,46,0.1)", color: "#a91d2e" },
    "Theater": { bg: "rgba(217,70,239,0.1)", color: "#c026d3" },
    "Volunteering": { bg: "rgba(16,185,129,0.1)", color: "#059669" },
    "Work (Paid)": { bg: "rgba(107,114,128,0.1)", color: "#4b5563" },
    "Other": { bg: "rgba(148,163,184,0.1)", color: "#64748b" },
};

const STRENGTH_CATEGORIES = [
    { name: "Academics", types: ["Academic", "Research", "Science/Math", "Debate/Speech"], color: "#2563eb" },
    { name: "Athletics", types: ["Athletics", "Dance"], color: "#dc2626" },
    { name: "Leadership", types: ["Student Government", "School Spirit"], color: "#a91d2e" },
    { name: "Community", types: ["Community Service", "Volunteering", "Environmental", "Religious"], color: "#059669" },
    { name: "Arts", types: ["Art", "Music", "Theater", "Cultural"], color: "#7c3aed" },
    { name: "STEM", types: ["Computer/Technology", "Robotics"], color: "#0891b2" },
];

const ACTION_VERBS = [
    "Founded", "Launched", "Led", "Organized", "Directed", "Coordinated", "Managed",
    "Developed", "Created", "Designed", "Implemented", "Established", "Pioneered",
    "Orchestrated", "Spearheaded", "Mentored", "Trained", "Advocated", "Campaigned",
    "Negotiated", "Secured", "Elevated", "Streamlined", "Transformed", "Revitalized",
    "Facilitated", "Mobilized", "Initiated", "Championed", "Cultivated",
    "Collaborated", "Analyzed", "Researched", "Published", "Presented",
    "Programmed", "Engineered", "Authored", "Curated", "Innovated",
];

/* ═══════════════════════════════════════════════════
   Inline SVG Icons
   ═══════════════════════════════════════════════════ */
const icons = {
    grip: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="5" r="1" /><circle cx="9" cy="12" r="1" /><circle cx="9" cy="19" r="1" /><circle cx="15" cy="5" r="1" /><circle cx="15" cy="12" r="1" /><circle cx="15" cy="19" r="1" /></svg>,
    plus: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>,
    trash: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>,
    edit: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /></svg>,
    copy: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>,
    award: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></svg>,
    clock: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
    calendar: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>,
    target: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
    download: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>,
    book: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>,
    lightbulb: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></svg>,
    zap: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
    check: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6 9 17l-5-5" /></svg>,
};

/* ═══════════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════════ */
export default function ActivitiesClient({ initialActivities, userId }: { initialActivities: Activity[]; userId: string }) {
    const [activities, setActivities] = useState<Activity[]>(initialActivities);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<string | null>(null);
    const [selectedMajor, setSelectedMajor] = useState("Computer Science");
    const [dragIdx, setDragIdx] = useState<number | null>(null);
    const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

    // Flashcard State
    const [suggFilter, setSuggFilter] = useState<"All" | "essential" | "recommended">("All");
    const [expandedCard, setExpandedCard] = useState<string | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        activityType: ACTIVITY_TYPES[0],
        organization: "",
        title: "",
        description: "",
        grades: new Set<string>(),
        hoursPerWeek: "",
        weeksPerYear: "",
        impactMetrics: "",
    });

    const supabase = createClient();

    /* ─── CRUD ─── */
    async function addActivity() {
        if (!formData.title.trim() || !formData.organization.trim()) return;
        setLoading(true);

        const { data, error } = await supabase
            .from("activities")
            .insert({
                user_id: userId,
                position: activities.length + 1,
                activity_type: formData.activityType,
                organization: formData.organization,
                title: formData.title,
                description_draft: formData.description,
                final_description: formData.description,
                grades_participated: [...formData.grades].sort().join(", "),
                hours_per_week: Number(formData.hoursPerWeek) || 0,
                weeks_per_year: Number(formData.weeksPerYear) || 0,
                impact_metrics: formData.impactMetrics,
            })
            .select().single();

        if (!error && data) {
            setActivities(prev => [...prev, data]);
            setShowForm(false);
            resetForm();
            showToast("Activity added! 🎉");
        }
        setLoading(false);
    }

    async function updateField(id: string, field: string, value: string) {
        await supabase.from("activities").update({ [field]: value }).eq("id", id);
        setActivities(prev => prev.map(a => a.id === id ? { ...a, [field]: value } : a));
    }

    async function deleteActivity(id: string) {
        await supabase.from("activities").delete().eq("id", id);
        setActivities(prev => prev.filter(a => a.id !== id));
        showToast("Activity removed");
    }

    function resetForm() {
        setFormData({
            activityType: ACTIVITY_TYPES[0],
            organization: "",
            title: "",
            description: "",
            grades: new Set(),
            hoursPerWeek: "",
            weeksPerYear: "",
            impactMetrics: "",
        });
    }

    function showToast(msg: string) {
        setToast(msg);
        setTimeout(() => setToast(null), 2500);
    }

    /* ─── Drag and Drop ─── */
    async function handleDrop(targetIdx: number) {
        if (dragIdx === null || dragIdx === targetIdx) return;
        const newList = [...activities];
        const [moved] = newList.splice(dragIdx, 1);
        newList.splice(targetIdx, 0, moved);

        // Update positions
        const updated = newList.map((a, i) => ({ ...a, position: i + 1 }));
        setActivities(updated);
        setDragIdx(null);
        setDragOverIdx(null);

        // Persist reorder
        for (const a of updated) {
            await supabase.from("activities").update({ position: a.position }).eq("id", a.id);
        }
        showToast("Order updated ✓");
    }

    /* ─── Export ─── */
    function exportToCommonApp() {
        const text = activities.map((a, i) => {
            return [
                `Activity ${i + 1}: ${a.activity_type}`,
                `Position/Title: ${a.title}`,
                `Organization: ${a.organization}`,
                `Grades: ${a.grades_participated}`,
                `Hours/Week: ${a.hours_per_week} | Weeks/Year: ${a.weeks_per_year}`,
                `Description: ${a.final_description}`,
                a.impact_metrics ? `Impact: ${a.impact_metrics}` : "",
                "─".repeat(40),
            ].filter(Boolean).join("\n");
        }).join("\n\n");

        navigator.clipboard.writeText(text);
        showToast("Copied to clipboard! 📋");
    }

    /* ─── Derived data ─── */
    const completionPct = Math.round((activities.length / MAX_ACTIVITIES) * 100);
    const totalHours = activities.reduce((sum, a) => sum + (a.hours_per_week * a.weeks_per_year), 0);

    const strengthData = useMemo(() => {
        return STRENGTH_CATEGORIES.map(cat => {
            const count = activities.filter(a => cat.types.includes(a.activity_type)).length;
            return { ...cat, count };
        });
    }, [activities]);

    const maxStrength = Math.max(...strengthData.map(s => s.count), 1);

    return (
        <div className="act-page">
            {/* ─── Header ─── */}
            <div className="act-header">
                <div>
                    <h1>Activities</h1>
                    <p>Common App Extracurricular Activities ({activities.length}/{MAX_ACTIVITIES})</p>
                </div>
                <div className="act-header-actions">
                    {activities.length > 0 && (
                        <button className="act-btn" onClick={exportToCommonApp}>
                            {icons.copy()} Export
                        </button>
                    )}
                    {activities.length < MAX_ACTIVITIES && (
                        <button className="act-btn act-btn--primary" onClick={() => setShowForm(true)}>
                            {icons.plus()} Add Activity
                        </button>
                    )}
                </div>
            </div>

            {/* ─── Stats Bar ─── */}
            <div className="act-stats">
                {/* Progress Ring */}
                <div className="act-stat-card">
                    <svg className="act-progress-ring" viewBox="0 0 52 52">
                        <circle className="ring-bg" cx="26" cy="26" r="22" />
                        <circle
                            className="ring-fill"
                            cx="26" cy="26" r="22"
                            strokeDasharray={`${completionPct * 1.38} 138`}
                            transform="rotate(-90 26 26)"
                        />
                        <text x="26" y="26" className="ring-text">
                            {activities.length}/{MAX_ACTIVITIES}
                        </text>
                    </svg>
                    <div className="act-stat-info">
                        <div className="act-stat-label">Completion</div>
                        <div className="act-stat-value">{completionPct}%</div>
                        <div className="act-stat-sub">{MAX_ACTIVITIES - activities.length} slots remaining</div>
                    </div>
                </div>

                {/* Total Hours */}
                <div className="act-stat-card">
                    <svg className="act-progress-ring" viewBox="0 0 52 52">
                        <circle className="ring-bg" cx="26" cy="26" r="22" />
                        <circle
                            className="ring-fill ring-fill--blue"
                            cx="26" cy="26" r="22"
                            strokeDasharray={`${Math.min(totalHours / 20, 138)} 138`}
                            transform="rotate(-90 26 26)"
                        />
                        <text x="26" y="26" className="ring-text-small">
                            {icons.clock()}
                        </text>
                    </svg>
                    <div className="act-stat-info">
                        <div className="act-stat-label">Total Hours</div>
                        <div className="act-stat-value">{totalHours.toLocaleString()}</div>
                        <div className="act-stat-sub">hrs/year across all</div>
                    </div>
                </div>

                {/* Types Used */}
                <div className="act-stat-card">
                    <svg className="act-progress-ring" viewBox="0 0 52 52">
                        <circle className="ring-bg" cx="26" cy="26" r="22" />
                        <circle
                            className="ring-fill ring-fill--purple"
                            cx="26" cy="26" r="22"
                            strokeDasharray={`${(new Set(activities.map(a => a.activity_type)).size / 6) * 138} 138`}
                            transform="rotate(-90 26 26)"
                        />
                        <text x="26" y="26" className="ring-text">
                            {new Set(activities.map(a => a.activity_type)).size}
                        </text>
                    </svg>
                    <div className="act-stat-info">
                        <div className="act-stat-label">Diversity</div>
                        <div className="act-stat-value">{new Set(activities.map(a => a.activity_type)).size} types</div>
                        <div className="act-stat-sub">unique categories</div>
                    </div>
                </div>
            </div>

            {/* ─── Strength Analysis ─── */}
            {activities.length > 0 && (
                <div className="act-strength">
                    <div className="act-strength-title">🎯 Activity Strength Analysis</div>
                    <div className="act-strength-bars">
                        {strengthData.map(cat => (
                            <div key={cat.name} className="act-strength-item">
                                <div className="act-strength-item-header">
                                    <span className="act-strength-item-name">{cat.name}</span>
                                    <span className="act-strength-item-count">{cat.count}</span>
                                </div>
                                <div className="act-strength-bar">
                                    <div
                                        className="act-strength-fill"
                                        data-progress={Math.round((cat.count / maxStrength) * 100)}
                                        data-bg={cat.color}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ─── Main Grid ─── */}
            <div className="act-grid">
                <div className="act-list">
                    {/* Add Form */}
                    {showForm && (
                        <div className="act-form-card">
                            <div className="act-form-title">✨ New Activity</div>
                            <div className="act-form-grid">
                                <div className="act-form-group">
                                    <label className="act-form-label" htmlFor="act-type">Activity Type</label>
                                    <select
                                        id="act-type"
                                        className="act-form-select"
                                        value={formData.activityType}
                                        onChange={e => setFormData(p => ({ ...p, activityType: e.target.value }))}
                                        title="Activity type"
                                        aria-label="Activity type"
                                    >
                                        {ACTIVITY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>
                                <div className="act-form-group">
                                    <label className="act-form-label" htmlFor="act-org">Organization</label>
                                    <input
                                        id="act-org"
                                        className="act-form-input"
                                        placeholder="School, club, or org name"
                                        title="Organization"
                                        value={formData.organization}
                                        onChange={e => setFormData(p => ({ ...p, organization: e.target.value }))}
                                    />
                                </div>
                                <div className="act-form-group act-form-group--full">
                                    <label className="act-form-label" htmlFor="act-title">Position / Title ({formData.title.length}/{CHAR_LIMIT_TITLE})</label>
                                    <input
                                        id="act-title"
                                        className="act-form-input"
                                        placeholder="e.g. President, Captain, Lead Developer"
                                        title="Position / Title"
                                        value={formData.title}
                                        maxLength={CHAR_LIMIT_TITLE}
                                        onChange={e => setFormData(p => ({ ...p, title: e.target.value }))}
                                    />
                                    <div className={`act-char-count ${formData.title.length > 45 ? "act-char-count--warn" : "act-char-count--ok"}`}>
                                        {CHAR_LIMIT_TITLE - formData.title.length} chars left
                                    </div>
                                </div>
                                <div className="act-form-group act-form-group--full">
                                    <label className="act-form-label" htmlFor="act-desc">Description ({formData.description.length}/{CHAR_LIMIT_DESC})</label>
                                    <textarea
                                        id="act-desc"
                                        className="act-form-textarea"
                                        placeholder="Describe your role and accomplishments... Start with an action verb!"
                                        title="Description"
                                        value={formData.description}
                                        maxLength={CHAR_LIMIT_DESC}
                                        onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
                                    />
                                    <div className={`act-char-count ${formData.description.length > 140 ? "act-char-count--warn" : formData.description.length >= CHAR_LIMIT_DESC ? "act-char-count--over" : "act-char-count--ok"}`}>
                                        {CHAR_LIMIT_DESC - formData.description.length} chars left
                                    </div>
                                </div>
                                <div className="act-form-group act-form-group--full">
                                    <label className="act-form-label">Grade Levels</label>
                                    <div className="act-form-grades">
                                        {["9", "10", "11", "12"].map(g => (
                                            <button
                                                key={g}
                                                type="button"
                                                className={`act-grade-btn ${formData.grades.has(g) ? "act-grade-btn--active" : ""}`}
                                                aria-label={`Grade ${g}`}
                                                onClick={() => {
                                                    const newGrades = new Set(formData.grades);
                                                    if (newGrades.has(g)) newGrades.delete(g); else newGrades.add(g);
                                                    setFormData(p => ({ ...p, grades: newGrades }));
                                                }}
                                            >
                                                {g}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="act-form-group">
                                    <label className="act-form-label" htmlFor="act-hours">Hours / Week</label>
                                    <input
                                        id="act-hours"
                                        className="act-form-input"
                                        type="number"
                                        placeholder="10"
                                        title="Hours / Week"
                                        min={0}
                                        value={formData.hoursPerWeek}
                                        onChange={e => setFormData(p => ({ ...p, hoursPerWeek: e.target.value }))}
                                    />
                                </div>
                                <div className="act-form-group">
                                    <label className="act-form-label" htmlFor="act-weeks">Weeks / Year</label>
                                    <input
                                        id="act-weeks"
                                        className="act-form-input"
                                        type="number"
                                        placeholder="40"
                                        title="Weeks / Year"
                                        min={0}
                                        max={52}
                                        value={formData.weeksPerYear}
                                        onChange={e => setFormData(p => ({ ...p, weeksPerYear: e.target.value }))}
                                    />
                                </div>
                                <div className="act-form-group act-form-group--full">
                                    <label className="act-form-label" htmlFor="act-impact">Impact Metrics (optional)</label>
                                    <input
                                        id="act-impact"
                                        className="act-form-input"
                                        placeholder='e.g. "Led team of 15", "Raised $5,000", "Published 3 papers"'
                                        title="Impact Metrics"
                                        value={formData.impactMetrics}
                                        onChange={e => setFormData(p => ({ ...p, impactMetrics: e.target.value }))}
                                    />
                                </div>
                            </div>
                            <div className="act-form-actions">
                                <button className="act-btn act-btn--primary" onClick={addActivity} disabled={loading}>
                                    {loading ? "Saving..." : "Save Activity"}
                                </button>
                                <button className="act-btn" onClick={() => { setShowForm(false); resetForm(); }}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Empty State */}
                    {activities.length === 0 && !showForm && (
                        <div className="act-empty">
                            <div className="act-empty-icon">{icons.award()}</div>
                            <h3>Build Your Activity List</h3>
                            <p>Add up to 10 extracurricular activities for your Common App. Order them by importance — your #1 activity matters most!</p>
                            <button className="act-btn act-btn--primary act-empty-btn" onClick={() => setShowForm(true)}>
                                {icons.plus()} Add Your First Activity
                            </button>
                        </div>
                    )}

                    {/* Activity Cards */}
                    {activities.map((activity, idx) => {
                        const typeStyle = TYPE_COLORS[activity.activity_type] || TYPE_COLORS["Other"];
                        const gradeList = activity.grades_participated?.split(",").map(g => g.trim()).filter(Boolean) || [];

                        return (
                            <div
                                key={activity.id}
                                className={`act-card ${dragIdx === idx ? "act-card--dragging" : ""} ${dragOverIdx === idx ? "act-card--drag-over" : ""}`}
                                draggable
                                onDragStart={() => setDragIdx(idx)}
                                onDragOver={e => { e.preventDefault(); setDragOverIdx(idx); }}
                                onDragLeave={() => setDragOverIdx(null)}
                                onDrop={() => handleDrop(idx)}
                                onDragEnd={() => { setDragIdx(null); setDragOverIdx(null); }}
                                data-index={idx}
                            >
                                <div className="act-card-top">
                                    <div className="act-drag-handle" title="Drag to reorder">
                                        {icons.grip()}
                                        <span className="act-position-num">#{idx + 1}</span>
                                    </div>

                                    <div className="act-card-body">
                                        <div className="act-card-header">
                                            <span
                                                className="act-type-badge"
                                                data-type={activity.activity_type}
                                            >
                                                {activity.activity_type}
                                            </span>
                                            <span className="act-org-name">· {activity.organization}</span>
                                        </div>

                                        <div className="act-card-title">{activity.title}</div>

                                        {/* Description (click to edit) */}
                                        {editingId === activity.id ? (
                                            <div>
                                                <textarea
                                                    className="act-form-textarea act-edit-textarea"
                                                    defaultValue={activity.final_description}
                                                    maxLength={CHAR_LIMIT_DESC}
                                                    title="Edit description"
                                                    autoFocus
                                                    onChange={e => updateField(activity.id, "final_description", e.target.value)}
                                                />
                                                <div className="act-edit-footer">
                                                    <div className={`act-char-count ${(activity.final_description?.length || 0) > 140 ? "act-char-count--warn" : "act-char-count--ok"}`}>
                                                        {CHAR_LIMIT_DESC - (activity.final_description?.length || 0)} left
                                                    </div>
                                                    <button className="act-btn act-edit-done" onClick={() => setEditingId(null)}>
                                                        {icons.check()} Done
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div
                                                className={`act-card-desc ${!activity.final_description ? "act-card-desc--empty" : ""}`}
                                                onClick={() => setEditingId(activity.id)}
                                            >
                                                {activity.final_description || "Click to add description..."}
                                            </div>
                                        )}

                                        {/* Impact metrics */}
                                        {activity.impact_metrics && (
                                            <div className="act-impact-tag">
                                                {icons.zap()} {activity.impact_metrics}
                                            </div>
                                        )}

                                        {/* Metrics row */}
                                        <div className="act-card-metrics">
                                            <span className="act-metric">
                                                {icons.calendar()} <strong>Grades:</strong>
                                                <span className="act-timeline">
                                                    {["9", "10", "11", "12"].map(g => (
                                                        <span
                                                            key={g}
                                                            className={`act-timeline-yr ${gradeList.includes(g) ? "act-timeline-yr--active" : "act-timeline-yr--inactive"}`}
                                                        >
                                                            {g}
                                                        </span>
                                                    ))}
                                                </span>
                                            </span>
                                            <span className="act-metric">
                                                {icons.clock()} <strong>{activity.hours_per_week}</strong> hrs/wk
                                            </span>
                                            <span className="act-metric">
                                                {icons.calendar()} <strong>{activity.weeks_per_year}</strong> wks/yr
                                            </span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="act-card-actions">
                                        <button className="act-card-action" onClick={() => setEditingId(activity.id)} title="Edit">
                                            {icons.edit()}
                                        </button>
                                        <button className="act-card-action act-card-action--delete" onClick={() => deleteActivity(activity.id)} title="Delete">
                                            {icons.trash()}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* ─── Sidebar ─── */}
                <div className="act-sidebar">
                    {/* Action Verbs */}
                    <div className="act-sidebar-panel">
                        <div className="act-sidebar-title">
                            <span>📝 Action Verbs</span>
                            {icons.book()}
                        </div>
                        <p className="act-sidebar-hint">
                            Click to copy → paste into description
                        </p>
                        <div className="act-verb-grid">
                            {ACTION_VERBS.map(verb => (
                                <button
                                    key={verb}
                                    className="act-verb-chip"
                                    onClick={() => { navigator.clipboard.writeText(verb); showToast(`Copied "${verb}"`); }}
                                >
                                    {verb}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="act-sidebar-panel">
                        <div className="act-sidebar-title">
                            <span>💡 Strategic Activities</span>
                            {icons.lightbulb()}
                        </div>
                        <p className="act-sidebar-hint">
                            Explore ideas based on your major in the dedicated section below.
                        </p>
                    </div>

                    {/* Export */}
                    {activities.length > 0 && (
                        <div className="act-sidebar-panel">
                            <div className="act-sidebar-title">
                                <span>📋 Export</span>
                            </div>
                            <button className="act-export-btn" onClick={exportToCommonApp}>
                                {icons.download()} Copy to Clipboard
                            </button>
                            <p className="act-sidebar-caption">
                                Formatted for Common App paste
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* ─── Strategic Activity Intel (Flashcards UI) ─── */}
            <div className="act-flashcards-wrapper">
                <div className="act-flashcards-section">
                    <>
                        <div className="act-flashcards-header">
                            <div className="act-flashcards-title">
                                <h3>Activity Examples</h3>
                                <p>Discover high-impact extracurriculars aligned with your intended major.</p>
                            </div>
                            <div className="act-flashcards-controls">
                                <select
                                    className="act-form-select act-major-select"
                                    value={selectedMajor}
                                    onChange={(e) => setSelectedMajor(e.target.value)}
                                    title="Select Intended Major"
                                    aria-label="Select Intended Major"
                                >
                                    {Object.keys(ACTIVITY_SUGGESTIONS).map(m => (
                                        <option key={m} value={m}>{m}</option>
                                    ))}
                                </select>
                                <div className="act-flashcards-filters">
                                    <button className={suggFilter === "All" ? "active" : ""} onClick={() => setSuggFilter("All")}>All</button>
                                    <button className={suggFilter === "essential" ? "active" : ""} onClick={() => setSuggFilter("essential")}>★ Essential</button>
                                    <button className={suggFilter === "recommended" ? "active" : ""} onClick={() => setSuggFilter("recommended")}>Recommended</button>
                                </div>
                            </div>
                        </div>

                        <div className="act-flashcards-grid">
                            {(ACTIVITY_SUGGESTIONS[selectedMajor as keyof typeof ACTIVITY_SUGGESTIONS] || [])
                                .filter(s => suggFilter === "All" || s.tier === suggFilter)
                                .map(s => {
                                    const isExpanded = expandedCard === s.name;
                                    return (
                                        <div
                                            key={s.name}
                                            className={`act-flashcard ${s.tier === "essential" ? "act-flashcard--essential" : ""} ${isExpanded ? "expanded" : ""}`}
                                            onClick={() => setExpandedCard(isExpanded ? null : s.name)}
                                        >
                                            <div className="act-flashcard-front">
                                                <div className="act-flashcard-front-left">
                                                    <div className="act-flashcard-icon">{s.emoji}</div>
                                                    <div className="act-flashcard-title">{s.name}</div>
                                                </div>
                                                <div className="act-flashcard-badge">
                                                    {s.tier === "essential" ? "★ Essential" : "Recommended"}
                                                </div>
                                            </div>
                                            {isExpanded && (
                                                <div className="act-flashcard-back">
                                                    <div className="act-flashcard-type">{s.type}</div>
                                                    <div className="act-flashcard-desc">{s.desc}</div>
                                                    <div className="act-flashcard-importance">
                                                        <strong>Why it matters:</strong> {s.importance}
                                                    </div>
                                                    <button
                                                        className="act-flashcard-add-btn"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setFormData(p => ({ ...p, activityType: s.type, organization: "", title: s.name }));
                                                            setShowForm(true);
                                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                                        }}
                                                    >
                                                        Add to My List
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                        </div>
                    </>
                </div>
            </div>

            {/* Toast */}
            {toast && <div className="act-toast">{toast}</div>}
        </div>
    );
}
