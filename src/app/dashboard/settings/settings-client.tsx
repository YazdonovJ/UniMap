"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import {
    User, Globe, Bell, Palette, LogOut, Shield,
    Check, Save, Calendar
} from "lucide-react";
import "./settings.css";

/* ── Types ── */
interface SettingsClientProps {
    profile: {
        id: string;
        full_name: string;
        email: string;
        preferred_language: string;
        role: string;
    };
}

type SectionKey = "profile" | "language" | "notifications" | "appearance" | "account";

/* ── Helpers ── */
const AVATAR_COLORS = ["#4f46e5", "#7c3aed", "#2563eb", "#0891b2", "#059669", "#d97706", "#dc2626", "#db2777"];

function getAvatarColorIndex(name: string): number {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return Math.abs(hash) % AVATAR_COLORS.length;
}

function getInitials(name: string): string {
    if (!name) return "?";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0][0]?.toUpperCase() || "?";
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/* ── Notification defaults ── */
function loadNotifPrefs(): Record<string, boolean> {
    if (typeof window === "undefined") return { email: true, reminders: true, announcements: true };
    try {
        const stored = localStorage.getItem("unimap_notif_prefs");
        if (stored) return JSON.parse(stored);
    } catch { /* noop */ }
    return { email: true, reminders: true, announcements: true };
}

function loadThemePref(): string {
    if (typeof window === "undefined") return "system";
    try {
        return localStorage.getItem("unimap_theme") || "system";
    } catch { return "system"; }
}

/* ── Nav items ── */
const NAV_ITEMS: Array<{ key: SectionKey; label: string; icon: typeof User }> = [
    { key: "profile", label: "Profile", icon: User },
    { key: "language", label: "Language", icon: Globe },
    { key: "notifications", label: "Notifications", icon: Bell },
    { key: "appearance", label: "Appearance", icon: Palette },
    { key: "account", label: "Account", icon: Shield },
];

const LANGUAGES = [
    { value: "en", label: "English", flag: "🇺🇸" },
    { value: "uz", label: "O'zbekcha", flag: "🇺🇿" },
    { value: "ru", label: "Русский", flag: "🇷🇺" },
];

const NOTIFICATION_OPTIONS = [
    { key: "email", label: "Email Notifications", desc: "Receive important updates via email" },
    { key: "reminders", label: "Assignment Reminders", desc: "Get notified before assignment deadlines" },
    { key: "announcements", label: "Announcement Alerts", desc: "Be alerted when teachers post announcements" },
];

/* ══════════════════════════════════════
   Main Component
   ══════════════════════════════════════ */
export default function SettingsClient({ profile }: SettingsClientProps) {
    const router = useRouter();
    const supabase = createClient();

    /* ── State ── */
    const [fullName, setFullName] = useState(profile.full_name);
    const [language, setLanguage] = useState(profile.preferred_language);
    const [saving, setSaving] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [activeSection, setActiveSection] = useState<SectionKey>("profile");
    const [notifPrefs, setNotifPrefs] = useState<Record<string, boolean>>(loadNotifPrefs);
    const [theme, setTheme] = useState(loadThemePref);

    const sectionRefs = useRef<Record<SectionKey, HTMLElement | null>>({
        profile: null, language: null, notifications: null, appearance: null, account: null,
    });

    /* ── Scroll spy ── */
    useEffect(() => {
        const handleScroll = () => {
            const offsets = NAV_ITEMS.map(item => {
                const el = sectionRefs.current[item.key];
                return { key: item.key, top: el ? el.getBoundingClientRect().top : Infinity };
            });
            const closest = offsets.reduce((prev, curr) =>
                Math.abs(curr.top - 100) < Math.abs(prev.top - 100) ? curr : prev
            );
            setActiveSection(closest.key);
        };
        const parent = document.querySelector("[data-settings-scroll]");
        const target = parent || window;
        target.addEventListener("scroll", handleScroll, { passive: true });
        return () => target.removeEventListener("scroll", handleScroll);
    }, []);

    /* ── Persist notification prefs ── */
    function toggleNotif(key: string) {
        setNotifPrefs(prev => {
            const next = { ...prev, [key]: !prev[key] };
            localStorage.setItem("unimap_notif_prefs", JSON.stringify(next));
            return next;
        });
    }

    /* ── Persist theme ── */
    function setThemePref(value: string) {
        setTheme(value);
        localStorage.setItem("unimap_theme", value);
    }

    /* ── Save profile ── */
    async function saveSettings() {
        setSaving(true);
        await supabase
            .from("profiles")
            .update({ full_name: fullName, preferred_language: language })
            .eq("id", profile.id);

        setSaving(false);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2500);
    }

    /* ── Sign out ── */
    async function handleSignOut() {
        await supabase.auth.signOut();
        router.push("/login");
    }

    /* ── Scroll to section ── */
    function scrollToSection(key: SectionKey) {
        sectionRefs.current[key]?.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveSection(key);
    }

    const hasChanges = fullName !== profile.full_name || language !== profile.preferred_language;

    return (
        <div className="stg-page">
            {/* ── Sidebar ── */}
            <nav className="stg-sidebar stg-reveal">
                <span className="stg-sidebar-title">Settings</span>
                {NAV_ITEMS.map(item => (
                    <button
                        key={item.key}
                        type="button"
                        className={`stg-nav-item ${activeSection === item.key ? "is-active" : ""}`}
                        onClick={() => scrollToSection(item.key)}
                    >
                        <item.icon size={16} className="stg-nav-icon" />
                        {item.label}
                    </button>
                ))}
            </nav>

            {/* ── Content ── */}
            <div className="stg-content" data-settings-scroll>

                {/* ═══ PROFILE ═══ */}
                <section
                    ref={el => { sectionRefs.current.profile = el; }}
                    className="stg-section stg-reveal"
                    data-delay-idx={1}
                >
                    <div className="stg-section-header">
                        <div className="stg-section-icon is-profile"><User size={18} /></div>
                        <div>
                            <h2 className="stg-section-title">Profile</h2>
                            <p className="stg-section-desc">Your public profile information</p>
                        </div>
                    </div>
                    <div className="stg-section-body">
                        {/* Avatar Header */}
                        <div className="stg-avatar-header">
                            <div
                                className="stg-avatar"
                                data-color-idx={getAvatarColorIndex(profile.full_name || profile.email)}
                            >
                                {getInitials(profile.full_name || profile.email)}
                            </div>
                            <div>
                                <p className="stg-avatar-name">{profile.full_name || "Unnamed"}</p>
                                <p className="stg-avatar-email">{profile.email}</p>
                                <div className="stg-avatar-meta">
                                    <span className="stg-role-badge">{profile.role}</span>
                                    <span className="stg-member-since">
                                        <Calendar size={11} className="stg-calendar-icon" />
                                        Member
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="stg-form-grid">
                            <div className="stg-field">
                                <label className="stg-label" htmlFor="stg-name">Full Name</label>
                                <input
                                    id="stg-name"
                                    className="stg-input"
                                    type="text"
                                    value={fullName}
                                    onChange={e => setFullName(e.target.value)}
                                />
                            </div>
                            <div className="stg-field">
                                <label className="stg-label" htmlFor="stg-email">Email</label>
                                <input id="stg-email" className="stg-input" type="email" value={profile.email} disabled />
                            </div>
                            <div className="stg-field">
                                <label className="stg-label" htmlFor="stg-role">Role</label>
                                <input id="stg-role" className="stg-input stg-input-capitalize" type="text" value={profile.role} disabled />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══ LANGUAGE ═══ */}
                <section
                    ref={el => { sectionRefs.current.language = el; }}
                    className="stg-section stg-reveal"
                    data-delay-idx={2}
                >
                    <div className="stg-section-header">
                        <div className="stg-section-icon is-language"><Globe size={18} /></div>
                        <div>
                            <h2 className="stg-section-title">Language Preference</h2>
                            <p className="stg-section-desc">Choose your preferred platform language</p>
                        </div>
                    </div>
                    <div className="stg-section-body">
                        <div className="stg-lang-grid">
                            {LANGUAGES.map(lang => (
                                <button
                                    key={lang.value}
                                    type="button"
                                    className={`stg-lang-card ${language === lang.value ? "is-active" : ""}`}
                                    onClick={() => setLanguage(lang.value)}
                                >
                                    <span className="stg-lang-flag">{lang.flag}</span>
                                    <span className="stg-lang-name">{lang.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══ NOTIFICATIONS ═══ */}
                <section
                    ref={el => { sectionRefs.current.notifications = el; }}
                    className="stg-section stg-reveal"
                    data-delay-idx={3}
                >
                    <div className="stg-section-header">
                        <div className="stg-section-icon is-notifications"><Bell size={18} /></div>
                        <div>
                            <h2 className="stg-section-title">Notifications</h2>
                            <p className="stg-section-desc">Manage how you receive updates</p>
                        </div>
                    </div>
                    <div className="stg-section-body">
                        <div className="stg-toggle-list">
                            {NOTIFICATION_OPTIONS.map(opt => (
                                <div key={opt.key} className="stg-toggle-row">
                                    <div className="stg-toggle-info">
                                        <p className="stg-toggle-label">{opt.label}</p>
                                        <p className="stg-toggle-desc">{opt.desc}</p>
                                    </div>
                                    <button
                                        type="button"
                                        className={`stg-toggle ${notifPrefs[opt.key] ? "is-on" : ""}`}
                                        onClick={() => toggleNotif(opt.key)}
                                        aria-label={`Toggle ${opt.label}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══ APPEARANCE ═══ */}
                <section
                    ref={el => { sectionRefs.current.appearance = el; }}
                    className="stg-section stg-reveal"
                    data-delay-idx={4}
                >
                    <div className="stg-section-header">
                        <div className="stg-section-icon is-appearance"><Palette size={18} /></div>
                        <div>
                            <h2 className="stg-section-title">Appearance</h2>
                            <p className="stg-section-desc">Customize how the platform looks</p>
                        </div>
                    </div>
                    <div className="stg-section-body">
                        <div className="stg-toggle-list">
                            <div className="stg-toggle-row">
                                <div className="stg-toggle-info">
                                    <p className="stg-toggle-label">Theme</p>
                                    <p className="stg-toggle-desc">
                                        {theme === "system" ? "Following your system preference" : "Using light theme"}
                                    </p>
                                </div>
                                <div className="stg-theme-options">
                                    {[
                                        { value: "system", label: "System" },
                                        { value: "light", label: "Light" },
                                    ].map(t => (
                                        <button
                                            key={t.value}
                                            type="button"
                                            className={`stg-lang-card stg-theme-card ${theme === t.value ? "is-active" : ""}`}
                                            onClick={() => setThemePref(t.value)}
                                        >
                                            <span className="stg-lang-name stg-lang-name-small">{t.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══ ACCOUNT (DANGER ZONE) ═══ */}
                <section
                    ref={el => { sectionRefs.current.account = el; }}
                    className="stg-section is-danger stg-reveal"
                    data-delay-idx={5}
                >
                    <div className="stg-section-header">
                        <div className="stg-section-icon is-danger"><Shield size={18} /></div>
                        <div>
                            <h2 className="stg-section-title">Account</h2>
                            <p className="stg-section-desc">Sign out or manage your account</p>
                        </div>
                    </div>
                    <div className="stg-section-body">
                        <div className="stg-danger-content">
                            <p className="stg-danger-text">
                                Sign out of your account. You can always sign back in with your credentials.
                            </p>
                            <button type="button" className="stg-danger-btn" onClick={handleSignOut}>
                                <LogOut size={14} className="stg-logout-icon" />
                                Sign Out
                            </button>
                        </div>
                    </div>
                </section>

                {/* ═══ SAVE BAR ═══ */}
                <div className="stg-save-bar">
                    <button
                        type="button"
                        className={`stg-save-btn ${showToast ? "is-saved" : ""}`}
                        onClick={saveSettings}
                        disabled={saving || !hasChanges}
                    >
                        {saving ? (
                            <>Saving...</>
                        ) : showToast ? (
                            <><Check size={16} /> Saved!</>
                        ) : (
                            <><Save size={16} /> Save Changes</>
                        )}
                    </button>
                    {!hasChanges && <span className="stg-save-hint">No unsaved changes</span>}
                    {hasChanges && <span className="stg-save-hint">You have unsaved changes</span>}
                </div>
            </div >

            {/* ── Toast ── */}
            {
                showToast && (
                    <div className="stg-toast">
                        <Check size={16} />
                        Settings saved successfully!
                    </div>
                )
            }
        </div >
    );
}
