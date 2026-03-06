"use client";

import Link from "next/link";
import { ArrowLeft, Lock, Server, Shield } from "lucide-react";
import "@/app/landing.css";

export default function SecurityPage() {
    return (
        <main className="landing-root">
            <section className="landing-section section-surface min-h-screen pt-20">
                <div className="landing-container landing-container-narrow">
                    <Link href="/" className="btn btn-ghost mb-8 inline-flex">
                        <ArrowLeft className="h-4 w-4" /> Back to Home
                    </Link>

                    <div className="section-heading-block">
                        <span className="section-eyebrow">Platform Security</span>
                        <h1 className="section-title">Security Posture</h1>
                        <p className="section-subtitle">How we protect your application data and ensure operational integrity.</p>
                    </div>

                    <div className="prose-content mt-12 text-[#3d4a63] text-[1.05rem] leading-[1.7]">

                        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 mb-12">
                            <div className="bg-white p-6 rounded-2xl border border-[var(--line-subtle)] shadow-[var(--shadow-sm)]">
                                <Lock className="text-[#3f78ff] mb-4" />
                                <h3 className="text-[var(--text-strong)] text-[1.1rem] mb-2 font-semibold">Secure Authentication</h3>
                                <p className="text-[0.9rem] text-[var(--text-muted)]">
                                    We utilize Supabase Auth providing secure, industry-standard JSON Web Token (JWT) session management. Passwords are never stored in plain text and are fully encrypted globally.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-[var(--line-subtle)] shadow-[var(--shadow-sm)]">
                                <Shield className="text-[#10b981] mb-4" />
                                <h3 className="text-[var(--text-strong)] text-[1.1rem] mb-2 font-semibold">Row Level Security</h3>
                                <p className="text-[0.9rem] text-[var(--text-muted)]">
                                    Our databases enforce strict Row Level Security (RLS) policies at the Postgres engine level. This guarantees that API responses mathematically cannot leak data between users or cohorts.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-[var(--line-subtle)] shadow-[var(--shadow-sm)]">
                                <Server className="text-[#f59e0b] mb-4" />
                                <h3 className="text-[var(--text-strong)] text-[1.1rem] mb-2 font-semibold">Edge Infrastructure</h3>
                                <p className="text-[0.9rem] text-[var(--text-muted)]">
                                    Hosted entirely on Vercel&apos;s global edge network, we benefit from enterprise-grade DDoS protection, Web Application Firewalls (WAF), and automatically provisioned SSL/TLS for all traffic.
                                </p>
                            </div>
                        </div>

                        <h2 className="text-[#0a1020] text-2xl mt-8 mb-4 font-bold">Data Encryption</h2>
                        <p className="mb-6">
                            <strong>In Transit:</strong> All data sent between your browser and our servers is encrypted using modern TLS 1.2 or higher protocols. We enforce HTTP Strict Transport Security (HSTS) ensuring browsers only interact with us over secure connections.<br /><br />
                            <strong>At Rest:</strong> All application content, including essay drafts, milestones, and personal profiles, residing in our Supabase databases are encrypted at rest using AES-256 encryption.
                        </p>

                        <h2 className="text-[#0a1020] text-2xl mt-8 mb-4 font-bold">Vulnerability Reporting</h2>
                        <p className="mb-6">
                            If you believe you have discovered a security vulnerability within UNIMAP, please help us keep our users safe by disclosing the issue responsibly. We ask that you report issues immediately to <code>security@unimap.io</code> rather than making details public. We will acknowledge your report within 48 hours and work with you to remediate the issue promptly.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
