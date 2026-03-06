"use client";

import { useState, useRef, useCallback, type CSSProperties } from "react";
import Link from "next/link";
import { signUp } from "@/app/actions/auth";
import { UnimapLogo } from "@/components/brand/unimap-logo";
import "@/app/auth.css";

/* ─── Inline SVG icons ─── */
const KeyRoundIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z" />
        <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
    </svg>
);

const UserIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

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

const SparklesIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        <path d="M5 3v4" />
        <path d="M19 17v4" />
        <path d="M3 5h4" />
        <path d="M17 19h4" />
    </svg>
);

export default function SignupPage() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError("");
        const result = await signUp(formData);
        if (result?.error) {
            setError(result.error);
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
                <div className="auth-orb auth-orb--primary" data-top="20" data-left="8" />
                <div className="auth-orb auth-orb--secondary" data-bottom="15" data-right="12" />
                <div className="auth-orb auth-orb--accent" data-top="60" data-left="60" />

                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="auth-particle" />
                ))}

                <div className="auth-scene-content">
                    <div className="auth-scene-logo">
                        <UnimapLogo className="h-full w-full" />
                    </div>
                    <h1 className="auth-scene-title">
                        Begin Your
                        <span>Journey</span>
                    </h1>
                    <p className="auth-scene-description">
                        Join thousands of ambitious students mapping their path to top universities worldwide.
                    </p>
                </div>
            </div>

            {/* ─── Right: Sign-Up Form ─── */}
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
                            <SparklesIcon />
                        </div>
                        <h2 className="auth-title">Create Account</h2>
                        <p className="auth-subtitle">
                            Enter your invite code to get started
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
                            <label className="auth-field-label" htmlFor="signup-invite">Invite Code</label>
                            <div className="auth-field-input-wrap">
                                <div className="auth-field-icon"><KeyRoundIcon /></div>
                                <input
                                    id="signup-invite"
                                    className="auth-field-input"
                                    name="inviteCode"
                                    type="text"
                                    placeholder="e.g., UNI-ABC123"
                                    required
                                />
                            </div>
                        </div>

                        <div className="auth-field">
                            <label className="auth-field-label" htmlFor="signup-name">Full Name</label>
                            <div className="auth-field-input-wrap">
                                <div className="auth-field-icon"><UserIcon /></div>
                                <input
                                    id="signup-name"
                                    className="auth-field-input"
                                    name="fullName"
                                    type="text"
                                    placeholder="Your full name"
                                    required
                                    autoComplete="name"
                                />
                            </div>
                        </div>

                        <div className="auth-field">
                            <label className="auth-field-label" htmlFor="signup-email">Email</label>
                            <div className="auth-field-input-wrap">
                                <div className="auth-field-icon"><MailIcon /></div>
                                <input
                                    id="signup-email"
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
                            <label className="auth-field-label" htmlFor="signup-password">Password</label>
                            <div className="auth-field-input-wrap">
                                <div className="auth-field-icon"><LockIcon /></div>
                                <input
                                    id="signup-password"
                                    className="auth-field-input"
                                    name="password"
                                    type="password"
                                    placeholder="Min. 8 characters"
                                    minLength={8}
                                    required
                                    autoComplete="new-password"
                                />
                            </div>
                        </div>

                        <div
                            className="ob-progress-fill"
                            data-progress={0}
                        />
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
                                        Create Account
                                        <ArrowRightIcon />
                                    </>
                                )}
                            </span>
                        </button>
                    </form>

                    <p className="auth-footer">
                        Already have an account?{" "}
                        <Link href="/login">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
