"use client";

import Link from "next/link";
import { ArrowLeft, UserX } from "lucide-react";
import "@/app/landing.css";

export default function TermsPage() {
    return (
        <main className="landing-root">
            <section className="landing-section section-surface min-h-screen pt-20">
                <div className="landing-container landing-container-narrow">
                    <Link href="/" className="btn btn-ghost mb-8 inline-flex">
                        <ArrowLeft className="h-4 w-4" /> Back to Home
                    </Link>

                    <div className="section-heading-block">
                        <span className="section-eyebrow">Legal Docs</span>
                        <h1 className="section-title">Terms of Service</h1>
                        <p className="section-subtitle">Last updated: March 2026</p>
                    </div>

                    <div className="prose-content mt-12 text-[#3d4a63] text-[1.05rem] leading-[1.7]">
                        <h2 className="text-[#0a1020] text-2xl mt-8 mb-4 font-bold">1. Acceptance of Terms</h2>
                        <p className="mb-6">
                            By accessing and using UNIMAP (&quot;the Platform&quot;), you are agreeing to be bound by these Terms of Service. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                        </p>

                        <h2 className="text-[#0a1020] text-2xl mt-8 mb-4 font-bold">2. Invite-Only Access</h2>
                        <p className="mb-6">
                            UNIMAP operates on an invite-only basis. Access is granted exclusively through valid invite codes distributed by partnering counselors, teachers, and administrators.
                            You agree not to share, sell, or unlawfully distribute your invite code or account credentials.
                        </p>

                        <h2 className="text-[#0a1020] text-2xl mt-8 mb-4 font-bold">3. Academic Integrity</h2>
                        <p className="mb-6">
                            All application materials, essays, and milestones stored and managed within UNIMAP must be your own original work. UNIMAP provides tools to organize and review documents but bears no responsibility for the academic integrity of the content supplied by its users.
                        </p>

                        <h2 className="text-[#0a1020] text-2xl mt-8 mb-4 font-bold">4. Role-Based Governance & Termination</h2>
                        <div className="p-6 bg-[#d63a43]/5 rounded-xl border border-[#d63a43]/10 mb-6 flex gap-4">
                            <UserX className="text-[#d63a43] flex-shrink-0 mt-0.5" />
                            <p className="text-[0.95rem] m-0">
                                Platform Administrators and assigned Counselors reserve the right to revoke or suspend your account at any time without notice if they determine you have violated these terms, breached security protocols, or are no longer associated with the cohort you were invited through.
                            </p>
                        </div>

                        <h2 className="text-[#0a1020] text-2xl mt-8 mb-4 font-bold">5. Limitations of Liability</h2>
                        <p className="mb-6">
                            UNIMAP acts as a facilitator for managing university applications. We do not guarantee admission into any university, college, or program. In no event shall UNIMAP or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the platform.
                        </p>

                        <h2 className="text-[#0a1020] text-2xl mt-8 mb-4 font-bold">6. Governing Law</h2>
                        <p className="mb-6">
                            These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which UNIMAP is establishing, and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
