"use client";

import { useState, useMemo } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import {
    BookOpen,
    ChevronRight,
    FileText,
    GraduationCap,
    PenLine,
    ScrollText,
    Sparkles,
    Star,
    Users,
    X,
    ArrowLeft,
    Quote,
} from "lucide-react";
import { ESSAY_EXAMPLES, SUPPLEMENTAL_SUBCATEGORIES, RECOMMENDATION_SUBCATEGORIES, type EssayData } from "./data";
import "./essay-examples.css";

/* ─── Category data ─── */
type CategoryId = "personal_statement" | "supplemental" | "recommendation" | "other";

interface CategoryCard {
    id: CategoryId;
    title: string;
    subtitle: string;
    icon: typeof FileText;
    emoji: string;
    color: string;
    gradient: string;
    glowColor: string;
    description: string;
    stats: { label: string; value: string }[];
    tips: string[];
}

const CATEGORIES: CategoryCard[] = [
    {
        id: "personal_statement",
        title: "Personal Statements",
        subtitle: "The Core of Your Application",
        icon: PenLine,
        emoji: "✍️",
        color: "#c52b3d",
        gradient: "linear-gradient(135deg, #c52b3d 0%, #9d1a29 100%)",
        glowColor: "rgba(197, 43, 61, 0.35)",
        description: "Your personal statement is the centerpiece of your application — a 650-word window into who you are beyond grades and test scores. The best essays reveal authentic voice, genuine reflection, and a compelling narrative arc.",
        stats: [
            { label: "Word Limit", value: "650" },
            { label: "Prompts", value: "7" },
            { label: "Avg Drafts", value: "8-12" },
        ],
        tips: [
            "Show vulnerability — admissions officers remember authentic stories",
            "Start in the middle of the action, not with backstory",
            "End with growth, not a neat moral lesson",
        ],
    },
    {
        id: "supplemental",
        title: "Supplemental Essays",
        subtitle: "School-Specific Deep Dives",
        icon: ScrollText,
        emoji: "📝",
        color: "#2563eb",
        gradient: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
        glowColor: "rgba(37, 99, 235, 0.35)",
        description: "Supplemental essays let you demonstrate genuine interest in specific schools. \"Why Us?\" essays, community prompts, and major-specific questions each require tailored research showing you\"ve dug deeper than the brochure.",
        stats: [
            { label: "Per School", value: "1-5" },
            { label: "Types", value: "6+" },
            { label: "Word Range", value: "50-650" },
        ],
        tips: [
            "Name specific professors, courses, and clubs — not just the campus vibe",
            "Connect YOUR interests to THEIR unique offerings",
            "Each school essay should be non-transferable to another school",
        ],
    },
    {
        id: "recommendation",
        title: "Recommendation Letters",
        subtitle: "Third-Party Validation",
        icon: Users,
        emoji: "💌",
        color: "#7c3aed",
        gradient: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
        glowColor: "rgba(124, 58, 237, 0.35)",
        description: "Strong recommendation letters corroborate your application narrative. They provide a teacher or mentor\"s perspective on your intellectual curiosity, character, and classroom contributions — things only someone who knows you well can speak to.",
        stats: [
            { label: "Required", value: "2-3" },
            { label: "Best From", value: "11th" },
            { label: "Ask By", value: "Sept" },
        ],
        tips: [
            "Choose teachers who know you well, not just ones who gave you an A",
            "Give recommenders a \"brag sheet\" of your accomplishments and goals",
            "Ask at least 4-6 weeks before the deadline",
        ],
    },
    {
        id: "other",
        title: "Other Writing",
        subtitle: "Additional Information & Short Answers",
        icon: FileText,
        emoji: "📋",
        color: "#059669",
        gradient: "linear-gradient(135deg, #059669 0%, #047857 100%)",
        glowColor: "rgba(5, 150, 105, 0.35)",
        description: "Additional information sections, short-answer questions, activity descriptions, and \"anything else?\" prompts. These smaller pieces add up — they fill gaps, explain circumstances, and add texture to your overall story.",
        stats: [
            { label: "Activities", value: "150ch" },
            { label: "Additional", value: "300w" },
            { label: "Short Ans", value: "35-200w" },
        ],
        tips: [
            "Use the Additional Info section only when necessary — don\"t repeat your essay",
            "Activity descriptions should lead with impact, not just the role title",
            "Short answers reward concision: every word must earn its place",
        ],
    },
];

/* ─── 3D tilt hook ─── */
function useCardTilt(multiplier = 14) {
    const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
        if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const tiltX = (0.5 - y) * multiplier;
        const tiltY = (x - 0.5) * multiplier;
        card.style.setProperty("--card-tilt-x", `${tiltX.toFixed(2)}deg`);
        card.style.setProperty("--card-tilt-y", `${tiltY.toFixed(2)}deg`);
        card.style.setProperty("--card-glow-x", `${(x * 100).toFixed(0)}%`);
        card.style.setProperty("--card-glow-y", `${(y * 100).toFixed(0)}%`);
    };

    const handleMouseLeave = (e: ReactMouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        card.style.setProperty("--card-tilt-x", "0deg");
        card.style.setProperty("--card-tilt-y", "0deg");
    };

    return { handleMouseMove, handleMouseLeave };
}

/* ─── Component ─── */
export default function EssayExamplesClient() {
    const [expandedCategory, setExpandedCategory] = useState<CategoryId | null>(null);
    const [expandedSubcategory, setExpandedSubcategory] = useState<string | null>(null);
    const [readingEssay, setReadingEssay] = useState<EssayData | null>(null);

    const mainTilt = useCardTilt(14);
    const itemTilt = useCardTilt(8); // less tilt for inner cards

    const expandedData = expandedCategory ? CATEGORIES.find(c => c.id === expandedCategory) : null;

    const currentSubcategories = useMemo(() => {
        if (expandedCategory === "supplemental") return SUPPLEMENTAL_SUBCATEGORIES;
        if (expandedCategory === "recommendation") return RECOMMENDATION_SUBCATEGORIES;
        return [];
    }, [expandedCategory]);

    const currentCategoryEssays = useMemo(() => {
        if (!expandedCategory) return [];
        let essays = ESSAY_EXAMPLES.filter(e => e.categoryId === expandedCategory);
        if (expandedSubcategory) {
            essays = essays.filter(e => e.subcategoryId === expandedSubcategory);
        }
        return essays;
    }, [expandedCategory, expandedSubcategory]);

    return (
        <div className="ee-page animate-fade-in">
            {/* Ambient */}
            <div className="ee-ambient" aria-hidden>
                <span className="ee-ambient-gradient" />
                <span className="ee-ambient-orb ee-ambient-orb-one" />
                <span className="ee-ambient-orb ee-ambient-orb-two" />
            </div>

            {/* Hero */}
            <section className="ee-hero ee-reveal ee-reveal-1">
                <div className="ee-hero-left">
                    <span className="ee-eyebrow"><BookOpen className="h-3.5 w-3.5" /> Essay Examples</span>
                    <h1 className="ee-title">Master every essay type with real examples and expert guidance.</h1>
                    <p className="ee-subtitle">
                        Explore curated examples of personal statements, supplemental essays, recommendation letters, and more — each with expert breakdowns showing exactly what works and why.
                    </p>
                </div>
                <div className="ee-hero-stats">
                    <div className="ee-hero-stat">
                        <Sparkles className="h-5 w-5" data-color="#c52b3d" />
                        <div>
                            <strong>4 Categories</strong>
                            <span>Covering every essay type</span>
                        </div>
                    </div>
                    <div className="ee-hero-stat">
                        <Star className="h-5 w-5" data-color="#efb859" />
                        <div>
                            <strong>Expert Breakdowns</strong>
                            <span>Learn what makes essays work</span>
                        </div>
                    </div>
                    <div className="ee-hero-stat">
                        <GraduationCap className="h-5 w-5" data-color="#2563eb" />
                        <div>
                            <strong>Top School Focused</strong>
                            <span>Ivy League & Top 25 examples</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Category Cards */}
            <section className="ee-cards-grid ee-reveal ee-reveal-2">
                {CATEGORIES.map((cat, idx) => {
                    return (
                        <div
                            key={cat.id}
                            className="ee-card"
                            onMouseMove={mainTilt.handleMouseMove}
                            onMouseLeave={mainTilt.handleMouseLeave}
                            data-cat-idx={idx}
                            data-index={idx}
                        >
                            {/* Animated border */}
                            <div className="ee-card-border" />

                            {/* Glow effect */}
                            <div className="ee-card-glow" />

                            {/* Content */}
                            <div className="ee-card-inner">
                                {/* 3D floating icon */}
                                <div className="ee-card-3d-icon-wrap">
                                    <div className="ee-card-3d-icon">
                                        <span className="ee-card-emoji">{cat.emoji}</span>
                                    </div>
                                    <span className="ee-card-orbit" />
                                    <span className="ee-card-orbit ee-card-orbit-2" />
                                </div>

                                <h2 className="ee-card-title">{cat.title}</h2>
                                <p className="ee-card-subtitle">{cat.subtitle}</p>

                                {/* Stats row */}
                                <div className="ee-card-stats">
                                    {cat.stats.map(stat => (
                                        <div key={stat.label} className="ee-card-stat">
                                            <strong data-cat-idx={idx}>{stat.value}</strong>
                                            <span>{stat.label}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Open button */}
                                <button
                                    type="button"
                                    className="ee-card-btn"
                                    onClick={() => {
                                        setExpandedCategory(cat.id);
                                        setExpandedSubcategory(null);
                                        setReadingEssay(null);
                                    }}
                                >
                                    Explore Examples <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </section>

            {/* Expanded Modal */}
            {expandedData && (
                <div className="ee-modal-overlay" onClick={() => {
                    setExpandedCategory(null);
                    setExpandedSubcategory(null);
                }}>
                    <div
                        className={`ee-modal ${readingEssay ? "ee-modal-reading" : ""}`}
                        onClick={(e) => e.stopPropagation()}
                        data-cat-idx={CATEGORIES.findIndex(c => c.id === expandedCategory)}
                    >
                        {readingEssay ? (
                            /* Reading View */
                            <div className="ee-reader animate-fade-in">
                                <div className="ee-reader-header">
                                    <button type="button" className="ee-reader-back" onClick={() => setReadingEssay(null)}>
                                        <ArrowLeft className="h-4 w-4" /> Back to {expandedData.title}
                                    </button>
                                    <button type="button" className="ee-modal-close" onClick={() => setExpandedCategory(null)} aria-label="Close">
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>

                                <div className="ee-reader-content-wrap">
                                    {/* Left: Essay Content */}
                                    <div className="ee-reader-essay">
                                        <div className="ee-reader-essay-header">
                                            <span className="ee-reader-badge" data-cat-idx={CATEGORIES.findIndex(c => c.id === expandedCategory)}>
                                                {readingEssay.university}
                                            </span>
                                            <span className="ee-reader-badge" data-faint="true">
                                                {readingEssay.theme}
                                            </span>
                                            <h2>&ldquo;{readingEssay.title}&rdquo;</h2>
                                            <p className="ee-reader-author">By {readingEssay.author}</p>
                                        </div>
                                        <div className="ee-reader-body">
                                            {readingEssay.content.split("\n\n").map((paragraph, i) => (
                                                <p key={i}>{paragraph}</p>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Right: Expert Analysis */}
                                    <div className="ee-reader-analysis">
                                        <div className="ee-analysis-card">
                                            <div className="ee-analysis-header">
                                                <Sparkles className="h-5 w-5 ee-sparkle" data-cat-idx={CATEGORIES.findIndex(c => c.id === expandedCategory)} />
                                                <h3>Expert Analysis</h3>
                                            </div>
                                            <div className="ee-analysis-body">
                                                {readingEssay.analysis.split("\n\n").map((paragraph, i) => (
                                                    <p key={i}>{paragraph}</p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (expandedData.id === "supplemental" || expandedData.id === "recommendation") && !expandedSubcategory ? (
                            /* Subcategory Grid View for Supplemental & Recommendation */
                            <div className="animate-fade-in">
                                <button type="button" className="ee-modal-close" onClick={() => {
                                    setExpandedCategory(null);
                                    setExpandedSubcategory(null);
                                }} aria-label="Close">
                                    <X className="h-5 w-5" />
                                </button>

                                <div className="ee-modal-header">
                                    <div className="ee-modal-icon">
                                        <span className="ee-modal-emoji">{expandedData.emoji}</span>
                                    </div>
                                    <div>
                                        <h2 className="ee-modal-title">{expandedData.title}</h2>
                                        <p className="ee-modal-subtitle">Select an essay type below</p>
                                    </div>
                                </div>

                                <p className="ee-modal-desc" data-margin="24">{expandedData.description}</p>

                                <div className="ee-subcategory-grid">
                                    {currentSubcategories.map((subcat, idx) => (
                                        <div
                                            key={subcat.id}
                                            className="ee-subcard"
                                            onMouseMove={itemTilt.handleMouseMove}
                                            onMouseLeave={itemTilt.handleMouseLeave}
                                            onClick={() => setExpandedSubcategory(subcat.id)}
                                            data-cat-idx={CATEGORIES.findIndex(c => c.id === expandedCategory)}
                                            data-index={idx}
                                        >
                                            <div className="ee-subcard-border" />
                                            <div className="ee-subcard-glow" />
                                            <div className="ee-subcard-inner">
                                                <span className="ee-subcard-emoji">{subcat.emoji}</span>
                                                <h3 className="ee-subcard-title">{subcat.title}</h3>
                                                <p className="ee-subcard-subtitle">{subcat.subtitle}</p>
                                                <p className="ee-subcard-desc">{subcat.description}</p>
                                                <button type="button" className="ee-subcard-btn">
                                                    View Examples <ChevronRight className="h-3 w-3" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            /* Category Overview View / Subcategory Essay List */
                            <div className="animate-fade-in">
                                <div className="ee-modal-top-actions">
                                    {expandedSubcategory && (
                                        <button
                                            type="button"
                                            className="ee-reader-back"
                                            onClick={() => setExpandedSubcategory(null)}
                                            data-margin="16"
                                        >
                                            <ArrowLeft className="h-4 w-4" /> Back to Categories
                                        </button>
                                    )}
                                    <button type="button" className="ee-modal-close" onClick={() => {
                                        setExpandedCategory(null);
                                        setExpandedSubcategory(null);
                                    }} aria-label="Close">
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>

                                <div className="ee-modal-header">
                                    <div className="ee-modal-icon">
                                        {expandedSubcategory ? (
                                            <span className="ee-modal-emoji">
                                                {currentSubcategories.find(s => s.id === expandedSubcategory)?.emoji}
                                            </span>
                                        ) : (
                                            <span className="ee-modal-emoji">{expandedData.emoji}</span>
                                        )}
                                    </div>
                                    <div>
                                        {expandedSubcategory ? (
                                            <>
                                                <h2 className="ee-modal-title">
                                                    {currentSubcategories.find(s => s.id === expandedSubcategory)?.title}
                                                </h2>
                                                <p className="ee-modal-subtitle">
                                                    {currentSubcategories.find(s => s.id === expandedSubcategory)?.subtitle}
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <h2 className="ee-modal-title">{expandedData.title}</h2>
                                                <p className="ee-modal-subtitle">{expandedData.subtitle}</p>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {expandedSubcategory ? (
                                    <p className="ee-modal-desc">
                                        {currentSubcategories.find(s => s.id === expandedSubcategory)?.description}
                                    </p>
                                ) : (
                                    <p className="ee-modal-desc">{expandedData.description}</p>
                                )}

                                {/* Tips (hide for subcategories) */}
                                {!expandedSubcategory && (
                                    <div className="ee-modal-tips">
                                        <h3><Sparkles className="h-4 w-4" /> Expert Tips</h3>
                                        <ul>
                                            {expandedData.tips.map(tip => (
                                                <li key={tip} data-cat-idx={CATEGORIES.findIndex(c => c.id === expandedCategory)}>{tip}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {!expandedSubcategory && <div className="ee-modal-divider" />}

                                {/* 3D Essay Grid */}
                                <h3 className="ee-section-title">Actual Examples</h3>

                                {currentCategoryEssays.length > 0 ? (
                                    <div className="ee-essay-grid">
                                        {currentCategoryEssays.map(essay => (
                                            <div
                                                key={essay.id}
                                                className="ee-essay-card"
                                                onMouseMove={itemTilt.handleMouseMove}
                                                onMouseLeave={itemTilt.handleMouseLeave}
                                                onClick={() => setReadingEssay(essay)}
                                                data-cat-idx={CATEGORIES.findIndex(c => c.id === expandedCategory)}
                                            >
                                                <div className="ee-essay-card-glow" />
                                                <div className="ee-essay-inner">
                                                    <div className="ee-essay-meta">
                                                        <span className="ee-essay-uni" data-cat-idx={CATEGORIES.findIndex(c => c.id === expandedCategory)}>
                                                            <GraduationCap className="h-3 w-3" /> {essay.university}
                                                        </span>
                                                    </div>
                                                    <h4 className="ee-essay-title">&ldquo;{essay.title}&rdquo;</h4>
                                                    <p className="ee-essay-author">By {essay.author}</p>
                                                    <div className="ee-essay-excerpt">
                                                        <Quote className="h-3 w-3 ee-excerpt-quote" />
                                                        {essay.excerpt}
                                                    </div>
                                                    <div className="ee-essay-footer">
                                                        <span className="ee-essay-theme">{essay.theme}</span>
                                                        <span className="ee-essay-read">Read essay <ArrowLeft className="h-3 w-3 rotate-180" /></span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="ee-modal-examples-placeholder">
                                        <BookOpen className="h-10 w-10" />
                                        <h3>Examples Coming Soon</h3>
                                        <p>Curated 10/10 {expandedSubcategory ? currentSubcategories.find(s => s.id === expandedSubcategory)?.title.toLowerCase() : expandedData.title.toLowerCase()} examples will be uploaded here shortly. I am waiting for you to provide the samples!</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
