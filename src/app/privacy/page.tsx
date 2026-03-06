"use client";

import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import "@/app/landing.css";

export default function PrivacyPage() {
    return (
        <main className="landing-root">
            <section className="landing-section section-surface min-h-screen pt-20">
                <div className="landing-container landing-container-narrow">
                    <Link href="/" className="btn btn-ghost mb-8 inline-flex">
                        <ArrowLeft className="h-4 w-4" /> Back to Home
                    </Link>

                    <div className="section-heading-block">
                        <span className="section-eyebrow">Legal Docs</span>
                        <h1 className="section-title">Privacy Policy</h1>
                        <p className="section-subtitle">Last updated: March 2026</p>
                    </div>

                    <div className="prose-content mt-12 text-[#3d4a63] text-[1.05rem] leading-[1.7]">
                        <h2 className="text-[#0a1020] text-2xl mt-8 mb-4 font-bold">1. Introduction</h2>
                        <p className="mb-6">
                            Welcome to UNIMAP. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
                        </p>

                        <h2 className="text-[#0a1020] text-2xl mt-8 mb-4 font-bold">2. Data We Collect</h2>
                        <p className="mb-4">We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
                        <ul className="list-disc pl-8 mb-6 space-y-2">
                            <li><strong>Identity Data:</strong> includes first name, last name, username, and role (student, counselor, admin).</li>
                            <li><strong>Contact Data:</strong> includes email address.</li>
                            <li><strong>Application Data:</strong> includes academic milestones, essay drafts, college tracking lists, and teacher recommendations.</li>
                            <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version.</li>
                        </ul>

                        <h2 className="text-[#0a1020] text-2xl mt-8 mb-4 font-bold">3. How We Use Your Data</h2>
                        <p className="mb-6">
                            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                            - Where we need to perform the service (giving you access to the UNIMAP application tracking ecosystem).
                            - To allow authorized Counselors and Teachers in your specific Invite Cohort to review your progress and application materials.
                            - We <strong>never</strong> sell or rent your data to third-party marketers or data brokers.
                        </p>

                        <h2 className="text-[#0a1020] text-2xl mt-8 mb-4 font-bold">4. Data Security</h2>
                        <div className="p-6 bg-[#10b981]/5 rounded-xl border border-[#10b981]/10 mb-6 flex gap-4">
                            <ShieldCheck className="text-[#10b981] flex-shrink-0 mt-0.5" />
                            <p className="text-[0.95rem] m-0">
                                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. We utilize Row Level Security (RLS) to ensure that students can only ever see their own application data, enforcing strict tenant isolation.
                            </p>
                        </div>

                        <h2 className="text-[#0a1020] text-2xl mt-8 mb-4 font-bold">5. Your Legal Rights</h2>
                        <p className="mb-6">
                            Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, to object to processing, to portability of data and (where the lawful ground of processing is consent) to withdraw consent. You may email us at <code>contact@unimap.io</code> to exercise these rights.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
