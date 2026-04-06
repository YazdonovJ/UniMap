"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/app/actions/auth";
import { UnimapLogo } from "@/components/brand/unimap-logo";
import "@/app/dashboard/dashboard.css";

/* ─── Inline SVG icons ─── */
const LayoutDashboardIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
);
const CalendarIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 2v4M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" />
    </svg>
);
const MessageSquareIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
);
const AwardIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
);
const FolderOpenIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2" />
    </svg>
);
const BookOpenIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
);
const PenToolIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 19 7-7 3 3-7 7-3-3z" /><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="m2 2 7.586 7.586" /><circle cx="11" cy="11" r="2" />
    </svg>
);
const BarChart3Icon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" />
    </svg>
);
const SearchIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
    </svg>
);
const SettingsIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" />
    </svg>
);
const LogOutIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16,17 21,12 16,7" /><line x1="21" x2="9" y1="12" y2="12" />
    </svg>
);
const MenuIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" />
    </svg>
);
const XIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6 6 18" /><path d="m6 6 12 12" />
    </svg>
);
const ChevronRightIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9 18 6-6-6-6" />
    </svg>
);
const UsersIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);
const KeyRoundIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z" /><circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
    </svg>
);
const SchoolIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m4 6 8-4 8 4" /><path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2" /><path d="M14 22v-4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v4" /><path d="M18 5v17" /><path d="M6 5v17" />
    </svg>
);
const BookMarkedIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /><polyline points="10,2 10,10 13,7 16,10 16,2" />
    </svg>
);

const LibraryIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
);

interface SidebarProps {
    userRole?: string;
    userName?: string;
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
}

const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboardIcon },
    { label: "Timeline", href: "/dashboard/timeline", icon: CalendarIcon },
    { label: "Messages", href: "/dashboard/messages", icon: MessageSquareIcon },
    { label: "Activities", href: "/dashboard/activities", icon: AwardIcon },
    { label: "Portfolio", href: "/dashboard/portfolio", icon: FolderOpenIcon },
    { label: "Essay Examples", href: "/dashboard/prompts", icon: BookOpenIcon },
    { label: "Essays", href: "/dashboard/essays", icon: PenToolIcon },
    { label: "College Match", href: "/dashboard/college-match", icon: SearchIcon },
    { label: "My Classes", href: "/dashboard/my-classes", icon: BookMarkedIcon },
    { label: "Resources", href: "/dashboard/resources", icon: LibraryIcon },
    { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3Icon },
];

const adminItems = [
    { label: "Classes", href: "/dashboard/classes", icon: SchoolIcon },
    { label: "Oversight", href: "/dashboard/oversight", icon: UsersIcon },
    { label: "Invite Codes", href: "/dashboard/invite-codes", icon: KeyRoundIcon },
];

export function Sidebar({ userRole = "alumni", userName = "Student", collapsed, setCollapsed }: SidebarProps) {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    const items = userRole === "admin" || userRole === "counselor"
        ? [...navItems, ...adminItems]
        : navItems;

    const sidebarClass = `dash-sidebar ${collapsed ? "dash-sidebar--collapsed" : "dash-sidebar--expanded"} ${mobileOpen ? "dash-sidebar--mobile-open" : ""}`;

    return (
        <>
            {/* Mobile toggle */}
            <button
                onClick={() => setMobileOpen(!mobileOpen)}
                title="Toggle menu"
                className="dash-mobile-toggle"
            >
                {mobileOpen ? <XIcon /> : <MenuIcon />}
            </button>

            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    className="dash-mobile-overlay dash-mobile-overlay--visible"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={sidebarClass}>
                {/* Logo */}
                <div className="dash-sidebar-logo">
                    <div className="dash-sidebar-logo-icon">
                        <UnimapLogo className="h-full w-full" />
                    </div>
                    {!collapsed && <span className="dash-sidebar-logo-text">Unimap</span>}
                </div>

                {/* Nav */}
                <nav className="dash-sidebar-nav">
                    {items.map((item) => {
                        const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href + "/"));
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                prefetch={true}
                                className={`dash-nav-item ${isActive ? "dash-nav-item--active" : ""}`}
                            >
                                <Icon />
                                {!collapsed && <span>{item.label}</span>}
                                {!collapsed && isActive && (
                                    <span className="dash-nav-chevron"><ChevronRightIcon /></span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="dash-sidebar-footer">
                    <Link
                        href="/dashboard/settings"
                        className="dash-sidebar-footer-btn"
                    >
                        <SettingsIcon />
                        {!collapsed && <span>Settings</span>}
                    </Link>
                    <button
                        onClick={() => signOut()}
                        className="dash-sidebar-footer-btn dash-sidebar-footer-btn--danger"
                    >
                        <LogOutIcon />
                        {!collapsed && <span>Sign Out</span>}
                    </button>

                    {!collapsed && (
                        <div className="dash-sidebar-profile">
                            <p className="dash-sidebar-profile-name">{userName}</p>
                            <p className="dash-sidebar-profile-role">{userRole}</p>
                        </div>
                    )}
                </div>

                {/* Collapse toggle (desktop) */}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    title="Toggle sidebar"
                    className="dash-sidebar-toggle"
                    data-collapsed={collapsed}
                >
                    <ChevronRightIcon />
                </button>
            </aside>
        </>
    );
}
