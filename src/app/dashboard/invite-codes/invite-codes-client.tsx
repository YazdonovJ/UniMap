"use client";

import { useEffect, useMemo, useState } from "react";
import { generateInviteCodes } from "@/app/actions/auth";
import {
    AlertTriangle,
    BarChart3,
    CheckCircle2,
    Clock3,
    Copy,
    Download,
    Gauge,
    KeyRound,
    Plus,
    Search,
    ShieldCheck,
    Sparkles,
    Users,
} from "lucide-react";
import type { InviteCode } from "@/types";
import styles from "./invite-codes.module.css";

interface ExtendedInviteCode extends Omit<InviteCode, "cohort_id"> {
    cohort_id?: string;
    class_id?: string;
}

interface InviteCodesClientProps {
    initialCodes: ExtendedInviteCode[];
    classes: { id: string; name: string; cohort_id?: string }[];
}

const dateFormatter = new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
});

type StatusFilter = "all" | "available" | "used";
type SortMode = "newest" | "oldest" | "code";

function daysFromToday(dateInput: string | undefined) {
    if (!dateInput) return null;
    const parsed = new Date(dateInput);
    if (Number.isNaN(parsed.getTime())) return null;
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    parsed.setHours(0, 0, 0, 0);
    return Math.round((parsed.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function formatRelativeCreated(createdAt: string) {
    const parsed = new Date(createdAt);
    if (Number.isNaN(parsed.getTime())) return "Unknown";
    const now = new Date();
    const ms = now.getTime() - parsed.getTime();
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    if (days <= 0) return "Today";
    if (days === 1) return "1 day ago";
    if (days < 30) return `${days} days ago`;
    const months = Math.floor(days / 30);
    return `${months} month${months > 1 ? "s" : ""} ago`;
}

function csvEscape(value: string) {
    if (value.includes(",") || value.includes("\"") || value.includes("\n")) {
        return `"${value.replaceAll("\"", "\"\"")}"`;
    }
    return value;
}

export default function InviteCodesClient({ initialCodes, classes }: InviteCodesClientProps) {
    const [codes, setCodes] = useState<ExtendedInviteCode[]>(initialCodes);
    const [loading, setLoading] = useState(false);
    const [selectedClass, setSelectedClass] = useState(classes[0]?.id || "");
    const [count, setCount] = useState(5);
    const [copiedCode, setCopiedCode] = useState<string | null>(null);
    const [newCodes, setNewCodes] = useState<string[]>([]);
    const [query, setQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
    const [classFilter, setClassFilter] = useState<string>("all");
    const [sortMode, setSortMode] = useState<SortMode>("newest");
    const [notice, setNotice] = useState<{ tone: "success" | "error" | "info"; text: string } | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    const classNameMap = useMemo(() => {
        return new Map(classes.map((cls) => [cls.id, cls.name]));
    }, [classes]);

    const stats = useMemo(() => {
        const total = codes.length;
        const used = codes.filter((code) => code.is_used).length;
        const available = total - used;
        const usageRate = total > 0 ? Math.round((used / total) * 100) : 0;
        const expiringSoon = codes.filter((code) => {
            if (code.is_used || !code.expires_at) return false;
            const days = daysFromToday(code.expires_at);
            return days != null && days >= 0 && days <= 7;
        }).length;
        const staleAvailable = codes.filter((code) => {
            if (code.is_used) return false;
            const age = daysFromToday(code.created_at);
            return age != null && age <= -30;
        }).length;

        return {
            total,
            used,
            available,
            usageRate,
            expiringSoon,
            staleAvailable,
            classesCovered: new Set(codes.map((code: ExtendedInviteCode) => code.class_id)).size,
        };
    }, [codes]);

    const insights = useMemo(() => {
        const list: Array<{ title: string; detail: string; tone: "good" | "warn" | "risk" }> = [];

        if (stats.total === 0) {
            list.push({
                title: "No active inventory",
                detail: "Generate your first code batch and share it with a cohort to start activation.",
                tone: "warn",
            });
        }
        if (stats.total >= 10 && stats.usageRate < 35) {
            list.push({
                title: "Low activation velocity",
                detail: `Only ${stats.usageRate}% of issued codes have been redeemed. Consider shorter validity windows.`,
                tone: "warn",
            });
        }
        if (stats.staleAvailable > 0) {
            list.push({
                title: "Stale available codes",
                detail: `${stats.staleAvailable} available code(s) are older than 30 days and may be at risk of leakage.`,
                tone: "risk",
            });
        }
        if (stats.expiringSoon > 0) {
            list.push({
                title: "Expiring soon",
                detail: `${stats.expiringSoon} unredeemed code(s) expire in the next 7 days.`,
                tone: "good",
            });
        }
        if (list.length === 0) {
            list.push({
                title: "Healthy pipeline",
                detail: "Your code inventory and redemption mix are in a strong operational range.",
                tone: "good",
            });
        }

        return list.slice(0, 3);
    }, [stats]);

    const classPerformance = useMemo(() => {
        return classes
            .map((cls) => {
                const classCodes = codes.filter((code: ExtendedInviteCode) => code.class_id === cls.id);
                const used = classCodes.filter((code) => code.is_used).length;
                const total = classCodes.length;
                return {
                    id: cls.id,
                    name: cls.name,
                    used,
                    total,
                    rate: total > 0 ? Math.round((used / total) * 100) : 0,
                };
            })
            .filter((entry) => entry.total > 0)
            .sort((a, b) => b.total - a.total || b.rate - a.rate);
    }, [classes, codes]);

    const filteredCodes = useMemo(() => {
        const normalized = query.trim().toLowerCase();
        const next = codes.filter((code: ExtendedInviteCode) => {
            if (statusFilter === "available" && code.is_used) return false;
            if (statusFilter === "used" && !code.is_used) return false;
            if (classFilter !== "all" && code.class_id !== classFilter) return false;
            if (!normalized) return true;
            const className = classNameMap.get(code.class_id || "")?.toLowerCase() || "";
            return code.code.toLowerCase().includes(normalized) || className.includes(normalized);
        });

        next.sort((a, b) => {
            if (sortMode === "code") return a.code.localeCompare(b.code);
            const timeA = new Date(a.created_at).getTime() || 0;
            const timeB = new Date(b.created_at).getTime() || 0;
            if (sortMode === "oldest") return timeA - timeB;
            return timeB - timeA;
        });

        return next;
    }, [codes, classFilter, classNameMap, query, sortMode, statusFilter]);

    const statusCounts = useMemo(() => {
        const used = filteredCodes.filter((code) => code.is_used).length;
        return {
            all: filteredCodes.length,
            available: filteredCodes.length - used,
            used,
        };
    }, [filteredCodes]);

    async function handleGenerate() {
        if (!selectedClass) return;

        setLoading(true);
        setNotice(null);

        const result = await generateInviteCodes(selectedClass, count);
        if (result.error) {
            setNotice({ tone: "error", text: result.error });
        } else if (result.codes) {
            const now = new Date().toISOString();
            const createdBy = codes[0]?.created_by ?? "local";
            const appended: ExtendedInviteCode[] = result.codes.map((code, index) => ({
                id: `temp-${Date.now()}-${index}-${Math.random().toString(36).slice(2, 8)}`,
                code,
                class_id: selectedClass,
                created_by: createdBy,
                is_used: false,
                created_at: now,
            }));

            setCodes((previous) => [...appended, ...previous]);
            setNewCodes(result.codes);
            setNotice({ tone: "success", text: `${result.codes.length} code(s) generated successfully.` });
        }

        setLoading(false);
    }

    async function copyCode(value: string, copyKey: string) {
        try {
            await navigator.clipboard.writeText(value);
            setCopiedCode(copyKey);
            setNotice({ tone: "info", text: "Copied to clipboard." });
            setTimeout(() => setCopiedCode(null), 1800);
        } catch {
            setNotice({ tone: "error", text: "Clipboard permission is blocked in this browser." });
        }
    }

    async function copyVisibleAvailable() {
        const pool = filteredCodes.filter((code) => !code.is_used).map((code) => code.code);
        if (pool.length === 0) {
            setNotice({ tone: "error", text: "No available codes in the current filtered view." });
            return;
        }
        await copyCode(pool.join("\n"), "bulk-available");
    }

    function exportCsv() {
        if (filteredCodes.length === 0) {
            setNotice({ tone: "error", text: "No rows to export in the current filtered view." });
            return;
        }

        const header = ["Code", "Class", "Status", "Created At", "Expires At"];
        const lines = filteredCodes.map((code: ExtendedInviteCode) => {
            const row = [
                code.code,
                classNameMap.get(code.class_id || "") || "Unknown class",
                code.is_used ? "Used" : "Available",
                dateFormatter.format(new Date(code.created_at)),
                code.expires_at ? dateFormatter.format(new Date(code.expires_at)) : "",
            ];
            return row.map(csvEscape).join(",");
        });

        const csv = [header.join(","), ...lines].join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = `invite-codes-${new Date().toISOString().slice(0, 10)}.csv`;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        URL.revokeObjectURL(url);
        setNotice({ tone: "info", text: "CSV export completed." });
    }

    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <div className={styles.heroText}>
                    <p className={styles.kicker}>Access Orchestration</p>
                    <h1 className={styles.title}>Invite Code Studio</h1>
                    <p className={styles.subtitle}>
                        Generate, track, and optimize invite distribution with a premium control center built for class operations.
                    </p>
                </div>
                <div className={styles.heroSignals}>
                    <div className={styles.signalChip}>
                        <ShieldCheck size={14} />
                        <span>Secure issuance</span>
                    </div>
                    <div className={styles.signalChip}>
                        <BarChart3 size={14} />
                        <span>Live utilization analytics</span>
                    </div>
                    <div className={styles.signalChip}>
                        <Clock3 size={14} />
                        <span>Expiry risk visibility</span>
                    </div>
                </div>
            </section>

            <section className={styles.metricGrid}>
                <article className={styles.metricCard}>
                    <p className={styles.metricLabel}>Total Issued</p>
                    <p className={styles.metricValue}>{stats.total}</p>
                    <p className={styles.metricMeta}>All generated invite codes</p>
                </article>
                <article className={styles.metricCard}>
                    <p className={styles.metricLabel}>Available</p>
                    <p className={styles.metricValue}>{stats.available}</p>
                    <p className={styles.metricMeta}>Ready to be redeemed</p>
                </article>
                <article className={styles.metricCard}>
                    <p className={styles.metricLabel}>Usage Rate</p>
                    <p className={styles.metricValue}>{stats.usageRate}%</p>
                    <p className={styles.metricMeta}>Redeemed vs issued</p>
                </article>
                <article className={styles.metricCard}>
                    <p className={styles.metricLabel}>Class Coverage</p>
                    <p className={styles.metricValue}>{stats.classesCovered}</p>
                    <p className={styles.metricMeta}>Classes with active inventory</p>
                </article>
            </section>

            {notice && (
                <div
                    className={`${styles.notice} ${notice.tone === "error" ? styles.noticeError : notice.tone === "success" ? styles.noticeSuccess : styles.noticeInfo}`}
                >
                    {notice.tone === "error" ? <AlertTriangle size={14} /> : <CheckCircle2 size={14} />}
                    <span>{notice.text}</span>
                </div>
            )}

            <section className={styles.workspaceGrid}>
                <article className={styles.panel}>
                    <header className={styles.panelHeader}>
                        <h2>Generate New Batch</h2>
                        <Sparkles size={16} />
                    </header>

                    <div className={styles.generatorForm}>
                        <div className={styles.field}>
                            <label htmlFor="gen-class">Class</label>
                            <select
                                id="gen-class"
                                value={selectedClass}
                                onChange={(event) => setSelectedClass(event.target.value)}
                                disabled={classes.length === 0}
                            >
                                {classes.length === 0 && <option value="">No classes available</option>}
                                {classes.map((cls) => (
                                    <option key={cls.id} value={cls.id}>{cls.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="gen-batch">Batch Size</label>
                            <div className={styles.countRow}>
                                <input
                                    id="gen-batch"
                                    type="number"
                                    min={1}
                                    max={50}
                                    value={count}
                                    onChange={(event) => {
                                        const next = Number(event.target.value);
                                        if (Number.isNaN(next)) return;
                                        setCount(Math.max(1, Math.min(50, next)));
                                    }}
                                />
                                <div className={styles.presetRow}>
                                    {[5, 10, 20, 30].map((preset) => (
                                        <button
                                            key={preset}
                                            type="button"
                                            onClick={() => setCount(preset)}
                                            className={count === preset ? styles.presetActive : ""}
                                        >
                                            {preset}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <input
                                className={styles.range}
                                type="range"
                                min={1}
                                max={50}
                                value={count}
                                onChange={(event) => setCount(Number(event.target.value))}
                                aria-label="Batch size range"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={handleGenerate}
                            disabled={loading || !selectedClass}
                            className={styles.generateButton}
                        >
                            <Plus size={16} />
                            <span>{loading ? "Generating..." : "Generate Codes"}</span>
                        </button>
                    </div>

                    {newCodes.length > 0 && (
                        <div className={styles.newBatch}>
                            <div className={styles.newBatchHead}>
                                <p>Latest Generated Batch</p>
                                <button
                                    type="button"
                                    onClick={() => copyCode(newCodes.join("\n"), "new-batch")}
                                >
                                    {copiedCode === "new-batch" ? "Copied" : "Copy all"}
                                </button>
                            </div>
                            <div className={styles.codeChipGrid}>
                                {newCodes.map((code, index) => (
                                    <button
                                        key={code}
                                        type="button"
                                        className={styles.codeChip}
                                        data-index={index}
                                        onClick={() => copyCode(code, code)}
                                    >
                                        <span>{code}</span>
                                        {copiedCode === code ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </article>

                <article className={styles.panel}>
                    <header className={styles.panelHeader}>
                        <h2>Pipeline Intelligence</h2>
                        <Gauge size={16} />
                    </header>

                    <div className={styles.insightList}>
                        {insights.map((insight) => (
                            <div key={insight.title} className={styles.insightItem}>
                                <div className={`${styles.insightTone} ${insight.tone === "good" ? styles.toneGood : insight.tone === "warn" ? styles.toneWarn : styles.toneRisk}`} />
                                <div>
                                    <p className={styles.insightTitle}>{insight.title}</p>
                                    <p className={styles.insightDetail}>{insight.detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.cohortPerf}>
                        <p className={styles.sectionTitle}>Utilization by Class</p>
                        {classPerformance.length === 0 ? (
                            <div className={styles.emptyInline}>
                                <Users size={14} />
                                <span>No class activity yet</span>
                            </div>
                        ) : (
                            classPerformance.slice(0, 5).map((entry: { id: string; name: string; used: number; total: number; rate: number }) => (
                                <div key={entry.id} className={styles.perfRow}>
                                    <div className={styles.perfHead}>
                                        <span>{entry.name}</span>
                                        <span>{entry.used}/{entry.total} used</span>
                                    </div>
                                    <div className={styles.perfBar}>
                                        <span data-width={`${entry.rate}%`} />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </article>
            </section>

            <section className={styles.panel}>
                <header className={styles.tableHeader}>
                    <div>
                        <h2>Invite Inventory</h2>
                        <p>{filteredCodes.length} code(s) in current view</p>
                    </div>
                    <div className={styles.tableActions}>
                        <button type="button" onClick={copyVisibleAvailable}>
                            <Copy size={14} />
                            <span>{copiedCode === "bulk-available" ? "Copied" : "Copy available"}</span>
                        </button>
                        <button type="button" onClick={exportCsv}>
                            <Download size={14} />
                            <span>Export CSV</span>
                        </button>
                    </div>
                </header>

                <div className={styles.filters}>
                    <label className={styles.search}>
                        <Search size={14} />
                        <input
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Search by code or class..."
                        />
                    </label>

                    <select
                        value={statusFilter}
                        onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
                        aria-label="Filter by status"
                    >
                        <option value="all">All statuses ({statusCounts.all})</option>
                        <option value="available">Available ({statusCounts.available})</option>
                        <option value="used">Used ({statusCounts.used})</option>
                    </select>

                    <select
                        value={classFilter}
                        onChange={(event) => setClassFilter(event.target.value)}
                        aria-label="Filter by class"
                    >
                        <option value="all">All classes</option>
                        {classes.map((cls: { id: string; name: string }) => (
                            <option key={cls.id} value={cls.id}>{cls.name}</option>
                        ))}
                    </select>

                    <select
                        value={sortMode}
                        onChange={(event) => setSortMode(event.target.value as SortMode)}
                        aria-label="Sort invite codes"
                    >
                        <option value="newest">Newest first</option>
                        <option value="oldest">Oldest first</option>
                        <option value="code">Code A-Z</option>
                    </select>
                </div>

                {!mounted ? (
                    <div className={styles.emptyState}>
                        <p>Loading inventory...</p>
                    </div>
                ) : filteredCodes.length === 0 ? (
                    <div className={styles.emptyState}>
                        <KeyRound size={24} />
                        <h3>No invite codes found</h3>
                        <p>Adjust filters or generate a new batch to populate this inventory.</p>
                    </div>
                ) : (
                    <div className={styles.codeTable}>
                        {filteredCodes.map((code: ExtendedInviteCode) => {
                            const classNameStr = classNameMap.get(code.class_id || "") || "Unknown class";
                            const expiry = daysFromToday(code.expires_at);
                            const expiryLabel = code.expires_at
                                ? expiry == null
                                    ? "Invalid expiry"
                                    : expiry < 0
                                        ? `${Math.abs(expiry)}d expired`
                                        : `${expiry}d left`
                                : "No expiry";

                            return (
                                <article key={code.id} className={styles.codeRow}>
                                    <div className={styles.codeMain}>
                                        <p className={styles.codeValue}>{code.code}</p>
                                        <div className={styles.metaLine}>
                                            <span>{classNameStr}</span>
                                            <span>{dateFormatter.format(new Date(code.created_at))}</span>
                                            <span>{formatRelativeCreated(code.created_at)}</span>
                                        </div>
                                    </div>

                                    <div className={styles.codeMeta}>
                                        <span className={code.is_used ? styles.usedBadge : styles.availableBadge}>
                                            {code.is_used ? "Used" : "Available"}
                                        </span>
                                        <span className={styles.expiryTag}>{expiryLabel}</span>
                                        {!code.is_used && (
                                            <button
                                                type="button"
                                                onClick={() => copyCode(code.code, code.code)}
                                                className={styles.copyButton}
                                            >
                                                {copiedCode === code.code ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                                                <span>{copiedCode === code.code ? "Copied" : "Copy"}</span>
                                            </button>
                                        )}
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </section>
        </div>
    );
}
