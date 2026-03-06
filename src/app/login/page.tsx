"use client";

import { useState, useRef, useCallback, type CSSProperties } from "react";
import { signIn } from "@/app/actions/auth";
import Link from "next/link";
import { UnimapLogo } from "@/components/brand/unimap-logo";
import "@/app/auth.css";

/* ─── Inline SVG icons (no dependency bloat) ─── */
const MailIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
);

const LockIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);

const AlertCircleIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" x2="12" y1="8" y2="12" />
        <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
);

const ArrowRightIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
    </svg>
);

export default function LoginPage() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError("");
        try {
            const result = await signIn(formData);
            if (result?.error) {
                const msg = typeof result.error === "string" ? result.error : "Invalid email or password.";
                setError(msg);
                setLoading(false);
            }
        } catch {
            setError("Something went wrong. Please try again.");
            setLoading(false);
        }
    }

    /* 3D tilt effect on card */
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rotateX = (y - 0.5) * -8;
        const rotateY = (x - 0.5) * 8;
        card.style.setProperty("--rtX", `${rotateX}deg`);
        card.style.setProperty("--rtY", `${rotateY}deg`);
        card.setAttribute("data-tilt", "true");

        // Spotlight
        const spotlight = card.querySelector(".auth-card-spotlight") as HTMLElement;
        if (spotlight) {
            spotlight.style.setProperty("--slX", `${x * 100}%`);
            spotlight.style.setProperty("--slY", `${y * 100}%`);
            spotlight.style.setProperty("--slO", "1");
            spotlight.setAttribute("data-spotlight", "true");
        }
    }, []);

    const handleMouseLeave = useCallback(() => {
        const card = cardRef.current;
        if (!card) return;
        card.removeAttribute("data-tilt");
        const spotlight = card.querySelector(".auth-card-spotlight") as HTMLElement;
        if (spotlight) {
            spotlight.style.setProperty("--slO", "0");
        }
    }, []);

    return (
        <div className="auth-page">
            {/* ─── Left: Immersive 3D Scene ─── */}
            <div className="auth-scene">
                {/* 3D Orbs */}
                <div className="auth-orb auth-orb--primary" data-top="15" data-left="10" />
                <div className="auth-orb auth-orb--secondary" data-bottom="20" data-right="15" />
                <div className="auth-orb auth-orb--accent" data-top="55" data-left="55" />

                {/* Floating particles */}
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="auth-particle" />
                ))}

                {/* Branding content */}
                <div className="auth-scene-content">
                    <div className="auth-scene-logo">
                        <UnimapLogo className="h-full w-full" />
                    </div>
                    <h1 className="auth-scene-title">
                        Welcome to
                        <span>Unimap</span>
                    </h1>
                    <p className="auth-scene-description">
                        Your strategic gateway to the world&apos;s most selective universities.
                    </p>
                </div>
            </div>

            {/* ─── Right: Sign-In Form ─── */}
            <div className="auth-form-panel">
                <div
                    className="auth-card"
                    ref={cardRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="auth-card-spotlight" />

                    <div className="auth-header">
                        <div className="auth-header-icon">
                            <LockIcon />
                        </div>
                        <h2 className="auth-title">Welcome back</h2>
                        <p className="auth-subtitle">
                            Sign in to continue your application journey
                        </p>
                    </div>

                    <form action={handleSubmit} className="auth-form">
                        {error && (
                            <div className="auth-error">
                                <AlertCircleIcon />
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="auth-field">
                            <label className="auth-field-label" htmlFor="login-email">Email</label>
                            <div className="auth-field-input-wrap">
                                <div className="auth-field-icon"><MailIcon /></div>
                                <input
                                    id="login-email"
                                    className="auth-field-input"
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    required
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        <div className="auth-field">
                            <label className="auth-field-label" htmlFor="login-password">Password</label>
                            <div className="auth-field-input-wrap">
                                <div className="auth-field-icon"><LockIcon /></div>
                                <input
                                    id="login-password"
                                    className="auth-field-input"
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    required
                                    autoComplete="current-password"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="auth-submit"
                            disabled={loading}
                        >
                            <span className="auth-submit-content">
                                {loading ? (
                                    <div className="auth-spinner" />
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRightIcon />
                                    </>
                                )}
                            </span>
                        </button>
                    </form>

                    <p className="auth-footer">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup">Sign up with invite code</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
