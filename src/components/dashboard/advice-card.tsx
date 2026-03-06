"use client";

import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react";
import { Check, ChevronLeft, ChevronRight, Copy, Quote, Shuffle, Sparkles } from "lucide-react";
import { adviceData } from "@/data/advices";
import styles from "./advice-card.module.css";

type UniTheme = {
    accent: string;
    accentSoft: string;
    accentEdge: string;
    accentGlow: string;
};

function getUniThemeSlug(university: string): string {
    const value = university.toLowerCase();
    if (value.includes("stanford")) return styles.themeStanford;
    if (value.includes("yale")) return styles.themeYale;
    if (value.includes("harvard")) return styles.themeHarvard;
    if (value.includes("penn") || value.includes("upenn")) return styles.themePenn;
    if (value.includes("columbia")) return styles.themeColumbia;
    if (value.includes("princeton")) return styles.themePrinceton;
    if (value.includes("cornell")) return styles.themeCornell;
    if (value.includes("mit")) return styles.themeMit;
    if (value.includes("dartmouth")) return styles.themeDartmouth;
    if (value.includes("northwestern")) return styles.themeNorthwestern;
    return styles.themeDefault;
}

function parseParagraphs(content: string): string[] {
    return content
        .split("\n\n")
        .map((item) => item.trim())
        .filter(Boolean)
        .map((item) => item.replace(/^["“”']+|["“”']+$/g, ""));
}

export function AdviceCard() {
    const [currentIndex, setCurrentIndex] = useState(() => Math.floor(Math.random() * adviceData.length));
    const [animating, setAnimating] = useState(false);
    const [copied, setCopied] = useState(false);

    const currentAdvice = adviceData[currentIndex];
    const themeSlug = useMemo(() => getUniThemeSlug(currentAdvice.university), [currentAdvice.university]);
    const paragraphs = useMemo(() => parseParagraphs(currentAdvice.content), [currentAdvice.content]);

    const goToIndex = useCallback((targetIndex: number) => {
        if (animating || targetIndex === currentIndex) return;

        setAnimating(true);
        window.setTimeout(() => {
            setCurrentIndex(targetIndex);
            window.setTimeout(() => setAnimating(false), 40);
        }, 280);
    }, [animating, currentIndex]);

    const handleNext = useCallback(() => {
        goToIndex((currentIndex + 1) % adviceData.length);
    }, [currentIndex, goToIndex]);

    const handlePrev = useCallback(() => {
        goToIndex((currentIndex - 1 + adviceData.length) % adviceData.length);
    }, [currentIndex, goToIndex]);

    const handleRandom = useCallback(() => {
        if (adviceData.length <= 1) return;
        let nextIndex = currentIndex;
        while (nextIndex === currentIndex) {
            nextIndex = Math.floor(Math.random() * adviceData.length);
        }
        goToIndex(nextIndex);
    }, [currentIndex, goToIndex]);

    const handleCopy = useCallback(async () => {
        try {
            const text = `${currentAdvice.title}\n\n${paragraphs.join("\n\n")}\n\n${currentAdvice.author} — ${currentAdvice.university}`;
            await navigator.clipboard.writeText(text);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1500);
        } catch {
            setCopied(false);
        }
    }, [currentAdvice.author, currentAdvice.title, currentAdvice.university, paragraphs]);

    useEffect(() => {
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "ArrowRight") handleNext();
            if (event.key === "ArrowLeft") handlePrev();
        };

        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [handleNext, handlePrev]);

    return (
        <section className={`${styles.wrap} ${themeSlug}`} aria-label="Advice card">
            <article className={styles.card}>
                <div className={styles.cardGlow} aria-hidden />
                <div className={styles.gridPattern} aria-hidden />

                <header className={styles.topbar}>
                    <span className={styles.eyebrow}>
                        <Sparkles size={13} />
                        Counselor Brief
                    </span>
                    <span className={styles.progress}>
                        {String(currentIndex + 1).padStart(2, "0")} / {String(adviceData.length).padStart(2, "0")}
                    </span>
                </header>

                <div className={`${styles.content} ${animating ? styles.contentOut : styles.contentIn}`}>
                    <div className={styles.titleRow}>
                        <h2 className={styles.title}>{currentAdvice.title}</h2>
                        <button type="button" className={styles.copyBtn} onClick={handleCopy} aria-label="Copy advice">
                            {copied ? <Check size={14} /> : <Copy size={14} />}
                            <span>{copied ? "Copied" : "Copy"}</span>
                        </button>
                    </div>

                    <div className={styles.quoteShell}>
                        <div className={styles.quoteMark} aria-hidden>
                            <Quote size={18} />
                        </div>
                        <div className={styles.paragraphs} role="list">
                            {paragraphs.map((paragraph, index) => (
                                <p
                                    key={`${currentIndex}-${index}`}
                                    className={styles.paragraph}
                                    data-delay={Math.min(index, 6)}
                                    role="listitem"
                                >
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>

                    <footer className={styles.footer}>
                        <div className={styles.author}>
                            <span className={styles.avatar}>{(currentAdvice.author || "?").trim().charAt(0).toUpperCase()}</span>
                            <div>
                                <p className={styles.authorName}>{currentAdvice.author}</p>
                                <p className={styles.university}>{currentAdvice.university}</p>
                            </div>
                        </div>

                        <div className={styles.actions}>
                            <button type="button" className={styles.controlBtn} onClick={handlePrev} aria-label="Previous advice">
                                <ChevronLeft size={16} />
                            </button>
                            <button type="button" className={styles.shuffleBtn} onClick={handleRandom}>
                                <Shuffle size={14} />
                                <span>Surprise me</span>
                            </button>
                            <button type="button" className={styles.controlBtn} onClick={handleNext} aria-label="Next advice">
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </footer>
                </div>
            </article>
        </section>
    );
}
