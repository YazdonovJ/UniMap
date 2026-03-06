"use client";

import { useMemo, useState, type CSSProperties } from "react";
import {
    AlertTriangle,
    ArrowUpRight,
    CheckCircle2,
    Compass,
    Flame,
    Lightbulb,
    Radar,
    Sparkles,
    Target,
    TrendingUp,
} from "lucide-react";
import styles from "./analytics.module.css";

export interface AnalyticsPayload {
    overallReadiness: number;
    readinessFactors: Array<{
        id: "profile" | "activities" | "essays" | "colleges" | "milestones";
        label: string;
        score: number;
        weight: number;
        current: string;
        goal: string;
        helper: string;
    }>;
    essayTotal: number;
    essayFinal: number;
    activityTotal: number;
    collegeTotal: number;
    milestoneTotal: number;
    milestoneCompleted: number;
    milestoneOverdue: number;
    reachCount: number;
    targetCount: number;
    safetyCount: number;
    satScore: number | null;
    ieltsScore: number | null;
    gpaConverted: number | null;
    intendedMajors: string[];
    milestones: Array<{
        id: string;
        title: string;
        status: string;
        dueDate: string | null;
    }>;
}

interface AnalyticsClientProps {
    data: AnalyticsPayload;
}

function getReadinessTier(score: number) {
    if (score >= 80) return { label: "Execution Ready", tone: "good" as const };
    if (score >= 60) return { label: "Momentum Building", tone: "warn" as const };
    return { label: "Foundation Stage", tone: "risk" as const };
}

function formatDate(date: string | null) {
    if (!date) return "No date";
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return "Invalid date";
    return parsed.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function daysUntil(date: string | null) {
    if (!date) return null;
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return null;
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    parsed.setHours(0, 0, 0, 0);
    return Math.round((parsed.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function ReadinessRing({ value, label, variant = "primary" }: { value: number; label: string; variant?: "primary" | "projection" }) {
    const radius = 56;
    const circumference = 2 * Math.PI * radius;
    const clamped = Math.max(0, Math.min(100, value));
    const dash = (clamped / 100) * circumference;

    return (
        <div className={styles.ringWrap}>
            <svg viewBox="0 0 140 140" className={styles.ringSvg} aria-hidden>
                <defs>
                    <linearGradient id="analyticsReadinessGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#0f5b8f" />
                        <stop offset="100%" stopColor="#4aa2d6" />
                    </linearGradient>
                    <linearGradient id="analyticsProjectionGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ad6b2e" />
                        <stop offset="100%" stopColor="#d8975b" />
                    </linearGradient>
                </defs>
                <circle cx="70" cy="70" r={radius} className={styles.ringTrack} />
                <circle
                    cx="70"
                    cy="70"
                    r={radius}
                    className={variant === "projection" ? styles.ringProgressProjection : styles.ringProgress}
                    strokeDasharray={`${dash} ${circumference}`}
                />
            </svg>
            <div className={styles.ringLabel}>
                <span className={styles.ringValue}>{clamped}%</span>
                <span className={styles.ringText}>{label}</span>
            </div>
        </div>
    );
}

export default function AnalyticsClient({ data }: AnalyticsClientProps) {
    const readinessTier = getReadinessTier(data.overallReadiness);

    const [simActivities, setSimActivities] = useState(data.activityTotal);
    const [simFinalEssays, setSimFinalEssays] = useState(data.essayFinal);
    const [simMilestonesCompleted, setSimMilestonesCompleted] = useState(data.milestoneCompleted);

    const projectedReadiness = useMemo(() => {
        const nextFactors = data.readinessFactors.map((factor) => {
            if (factor.id === "activities") {
                return { ...factor, score: Math.min(100, (simActivities / 10) * 100) };
            }
            if (factor.id === "essays") {
                const score = data.essayTotal > 0 ? Math.min(100, (simFinalEssays / data.essayTotal) * 100) : 0;
                return { ...factor, score };
            }
            if (factor.id === "milestones") {
                const score = data.milestoneTotal > 0 ? Math.min(100, (simMilestonesCompleted / data.milestoneTotal) * 100) : 0;
                return { ...factor, score };
            }
            return factor;
        });
        return Math.round(nextFactors.reduce((sum, factor) => sum + (factor.score * factor.weight) / 100, 0));
    }, [data, simActivities, simFinalEssays, simMilestonesCompleted]);

    const projectedDelta = projectedReadiness - data.overallReadiness;

    const strategicInsights = useMemo(() => {
        const insights: Array<{ title: string; detail: string; impact: "High" | "Medium" | "Low"; icon: "risk" | "idea" | "spark" | "up" }> = [];

        const essayCompletion = data.essayTotal > 0 ? data.essayFinal / data.essayTotal : 0;
        if (data.essayTotal === 0) {
            insights.push({
                title: "Start essay pipeline",
                detail: "Create your first essay draft. Essay completion carries 30% of readiness.",
                impact: "High",
                icon: "idea",
            });
        } else if (essayCompletion < 0.7) {
            const remaining = data.essayTotal - data.essayFinal;
            insights.push({
                title: "Finalize core essays",
                detail: `${remaining} essay(s) are still not final. This is your biggest readiness multiplier.`,
                impact: "High",
                icon: "up",
            });
        }

        if (data.activityTotal < 8) {
            insights.push({
                title: "Improve activity depth",
                detail: `You have ${data.activityTotal}/10 activities. Add impact-oriented entries with metrics.`,
                impact: "Medium",
                icon: "spark",
            });
        }

        if (data.collegeTotal < 8) {
            insights.push({
                title: "Expand school strategy",
                detail: "Target a list of 8-12 schools to increase strategic flexibility.",
                impact: "Medium",
                icon: "idea",
            });
        }

        if (data.milestoneOverdue > 0) {
            insights.push({
                title: "Resolve overdue deadlines",
                detail: `${data.milestoneOverdue} milestone(s) are overdue. Clear these to reduce application risk.`,
                impact: "High",
                icon: "risk",
            });
        }

        const totalSchools = Math.max(1, data.collegeTotal);
        const reachShare = data.reachCount / totalSchools;
        if (data.collegeTotal > 0 && reachShare > 0.6) {
            insights.push({
                title: "Rebalance school mix",
                detail: "Your list skews heavily toward reach schools. Add more target/safety options.",
                impact: "Medium",
                icon: "spark",
            });
        }

        if (!data.satScore && !data.gpaConverted) {
            insights.push({
                title: "Complete score profile",
                detail: "Adding SAT/GPA data improves recommendation quality and readiness accuracy.",
                impact: "Low",
                icon: "idea",
            });
        }

        return insights.slice(0, 5);
    }, [data]);

    const urgencyGroups = useMemo(() => {
        const upcoming = data.milestones
            .filter((item) => item.status !== "completed")
            .map((item) => {
                const days = daysUntil(item.dueDate);
                return { ...item, days };
            })
            .sort((a, b) => (a.days ?? 9999) - (b.days ?? 9999));

        const next7 = upcoming.filter((item) => item.days != null && item.days >= 0 && item.days <= 7).length;
        const next30 = upcoming.filter((item) => item.days != null && item.days >= 0 && item.days <= 30).length;
        const overdue = upcoming.filter((item) => item.days != null && item.days < 0).length;

        return { upcoming: upcoming.slice(0, 6), next7, next30, overdue };
    }, [data.milestones]);

    const totalMix = Math.max(1, data.reachCount + data.targetCount + data.safetyCount);

    const profileTags = useMemo(() => {
        const tags: string[] = [];
        if (data.satScore) tags.push(`SAT ${data.satScore}`);
        if (data.ieltsScore) tags.push(`IELTS ${data.ieltsScore}`);
        if (data.gpaConverted) tags.push(`GPA ${data.gpaConverted.toFixed(2)}`);
        return tags;
    }, [data.satScore, data.ieltsScore, data.gpaConverted]);

    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <div className={styles.heroTop}>
                    <div>
                        <p className={styles.kicker}>Analytics Intelligence</p>
                        <h1 className={styles.title}>Admissions Command Center</h1>
                        <p className={styles.subtitle}>
                            A strategic view of your application readiness, risk areas, and next highest-impact actions.
                        </p>
                    </div>
                    <span className={`${styles.tierBadge} ${styles[`tier-${readinessTier.tone}`]}`}>{readinessTier.label}</span>
                </div>

                <div className={styles.heroBody}>
                    <ReadinessRing value={data.overallReadiness} label="Current readiness" />
                    <div className={styles.factorList}>
                        {data.readinessFactors.map((factor) => (
                            <div key={factor.id} className={styles.factorItem}>
                                <div className={styles.factorHead}>
                                    <div>
                                        <p className={styles.factorTitle}>{factor.label}</p>
                                        <p className={styles.factorHelper}>{factor.helper}</p>
                                    </div>
                                    <span className={styles.factorScore}>{Math.round(factor.score)}%</span>
                                </div>
                                <div className={styles.factorBar}>
                                    <span data-width={Math.round(factor.score)} />
                                </div>
                                <div className={styles.factorMeta}>
                                    <span>{factor.current}</span>
                                    <span>{factor.goal}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.kpiGrid}>
                <article className={styles.kpiCard}>
                    <div className={styles.kpiIcon}><Sparkles size={16} /></div>
                    <p className={styles.kpiValue}>{data.essayFinal}/{data.essayTotal}</p>
                    <p className={styles.kpiLabel}>Final Essays</p>
                    <p className={styles.kpiMeta}>Writing completion velocity</p>
                </article>

                <article className={styles.kpiCard}>
                    <div className={styles.kpiIcon}><Compass size={16} /></div>
                    <p className={styles.kpiValue}>{data.activityTotal}/10</p>
                    <p className={styles.kpiLabel}>Activity Depth</p>
                    <p className={styles.kpiMeta}>Targeting holistic profile</p>
                </article>

                <article className={styles.kpiCard}>
                    <div className={styles.kpiIcon}><Target size={16} /></div>
                    <p className={styles.kpiValue}>{data.collegeTotal}</p>
                    <p className={styles.kpiLabel}>Schools in Strategy</p>
                    <p className={styles.kpiMeta}>Balanced portfolio focus</p>
                </article>

                <article className={styles.kpiCard}>
                    <div className={styles.kpiIcon}><AlertTriangle size={16} /></div>
                    <p className={styles.kpiValue}>{data.milestoneOverdue}</p>
                    <p className={styles.kpiLabel}>Overdue Milestones</p>
                    <p className={styles.kpiMeta}>Execution risk monitor</p>
                </article>
            </section>

            <section className={styles.grid}>
                <article className={styles.panel}>
                    <div className={styles.panelHead}>
                        <h2>Strategic Recommendations</h2>
                        <Lightbulb size={16} />
                    </div>
                    <div className={styles.recommendationList}>
                        {strategicInsights.length === 0 ? (
                            <div className={styles.emptyState}>No blockers detected. Keep your current momentum.</div>
                        ) : (
                            strategicInsights.map((insight) => (
                                <div key={insight.title} className={styles.recommendationItem}>
                                    <div className={styles.recoIcon}>
                                        {insight.icon === "risk" && <AlertTriangle size={14} />}
                                        {insight.icon === "idea" && <Lightbulb size={14} />}
                                        {insight.icon === "spark" && <Sparkles size={14} />}
                                        {insight.icon === "up" && <TrendingUp size={14} />}
                                    </div>
                                    <div>
                                        <div className={styles.recoTitleRow}>
                                            <p className={styles.recoTitle}>{insight.title}</p>
                                            <span className={`${styles.impact} ${styles[`impact-${insight.impact.toLowerCase()}`]}`}>{insight.impact}</span>
                                        </div>
                                        <p className={styles.recoDetail}>{insight.detail}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </article>

                <article className={styles.panel}>
                    <div className={styles.panelHead}>
                        <h2>College Mix Intelligence</h2>
                        <Radar size={16} />
                    </div>
                    <div className={styles.mixBar}>
                        <span className={styles.mixReach} data-width={Math.round((data.reachCount / totalMix) * 100)} />
                        <span className={styles.mixTarget} data-width={Math.round((data.targetCount / totalMix) * 100)} />
                        <span className={styles.mixSafety} data-width={Math.round((data.safetyCount / totalMix) * 100)} />
                    </div>
                    <div className={styles.mixLegend}>
                        <p><i className={styles.mixReachDot} />Reach {data.reachCount}</p>
                        <p><i className={styles.mixTargetDot} />Target {data.targetCount}</p>
                        <p><i className={styles.mixSafetyDot} />Safety {data.safetyCount}</p>
                    </div>

                    <div className={styles.profileSection}>
                        <p className={styles.sectionLabel}>Academic Snapshot</p>
                        <div className={styles.tagRow}>
                            {profileTags.length === 0 && <span className={styles.tagMuted}>Add SAT/GPA/IELTS for richer insights</span>}
                            {profileTags.map((tag) => (
                                <span key={tag} className={styles.tag}>{tag}</span>
                            ))}
                        </div>
                        {data.intendedMajors.length > 0 && (
                            <>
                                <p className={styles.sectionLabel}>Intended Majors</p>
                                <div className={styles.tagRow}>
                                    {data.intendedMajors.map((major) => (
                                        <span key={major} className={styles.tagAlt}>{major}</span>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </article>

                <article className={`${styles.panel} ${styles.panelWide}`}>
                    <div className={styles.panelHead}>
                        <h2>Milestone Urgency Map</h2>
                        <Flame size={16} />
                    </div>
                    <div className={styles.urgencyStats}>
                        <div>
                            <span>{urgencyGroups.overdue}</span>
                            <p>Overdue</p>
                        </div>
                        <div>
                            <span>{urgencyGroups.next7}</span>
                            <p>Due in 7 days</p>
                        </div>
                        <div>
                            <span>{urgencyGroups.next30}</span>
                            <p>Due in 30 days</p>
                        </div>
                    </div>

                    <div className={styles.timelineList}>
                        {urgencyGroups.upcoming.length === 0 ? (
                            <div className={styles.emptyState}>No active milestones yet. Add deadlines in Timeline to activate this map.</div>
                        ) : (
                            urgencyGroups.upcoming.map((item) => {
                                const dueIn = daysUntil(item.dueDate);
                                const tone = dueIn != null && dueIn < 0 ? styles.timelineRisk : dueIn != null && dueIn <= 7 ? styles.timelineWarn : styles.timelineCalm;
                                return (
                                    <div key={item.id} className={`${styles.timelineItem} ${tone}`}>
                                        <div>
                                            <p className={styles.timelineTitle}>{item.title}</p>
                                            <p className={styles.timelineMeta}>{item.status.replace("_", " ")}</p>
                                        </div>
                                        <div className={styles.timelineRight}>
                                            <p>{formatDate(item.dueDate)}</p>
                                            <p>{dueIn == null ? "No due date" : dueIn < 0 ? `${Math.abs(dueIn)}d late` : `${dueIn}d left`}</p>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </article>

                <article className={styles.panel}>
                    <div className={styles.panelHead}>
                        <h2>What-If Simulator</h2>
                        <ArrowUpRight size={16} />
                    </div>

                    <div className={styles.simulator}>
                        <label>
                            Activities
                            <span>{simActivities}</span>
                            <input
                                type="range"
                                min={0}
                                max={14}
                                value={simActivities}
                                onChange={(event) => setSimActivities(Number(event.target.value))}
                            />
                        </label>

                        <label>
                            Final Essays
                            <span>{simFinalEssays}</span>
                            <input
                                type="range"
                                min={0}
                                max={Math.max(data.essayTotal, 12)}
                                value={simFinalEssays}
                                onChange={(event) => setSimFinalEssays(Number(event.target.value))}
                            />
                        </label>

                        <label>
                            Completed Milestones
                            <span>{simMilestonesCompleted}</span>
                            <input
                                type="range"
                                min={0}
                                max={Math.max(data.milestoneTotal, 12)}
                                value={simMilestonesCompleted}
                                onChange={(event) => setSimMilestonesCompleted(Number(event.target.value))}
                            />
                        </label>
                    </div>

                    <div className={styles.projectionRow}>
                        <ReadinessRing value={projectedReadiness} label="Projected" variant="projection" />
                        <div className={styles.deltaCard}>
                            <p>Readiness Delta</p>
                            <h3 className={projectedDelta >= 0 ? styles.deltaPositive : styles.deltaNegative}>
                                {projectedDelta >= 0 ? "+" : ""}
                                {projectedDelta}%
                            </h3>
                            <p className={styles.deltaHint}>
                                {projectedDelta >= 0
                                    ? "If executed, this plan increases your admissions readiness."
                                    : "This scenario reduces readiness. Adjust goals for better impact."}
                            </p>
                            <div className={styles.deltaStatus}>
                                <CheckCircle2 size={14} />
                                <span>Live scenario engine</span>
                            </div>
                        </div>
                    </div>
                </article>
            </section>
        </div>
    );
}
