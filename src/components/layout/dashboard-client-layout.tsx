"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";

interface DashboardClientLayoutProps {
    children: React.ReactNode;
    userRole: string;
    userName: string;
}

export function DashboardClientLayout({ children, userRole, userName }: DashboardClientLayoutProps) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="min-h-screen">
            <Sidebar
                userRole={userRole}
                userName={userName}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />
            <main className={`dash-main ${collapsed ? "dash-main--collapsed" : "dash-main--expanded"}`}>
                <div className="dash-content">
                    {children}
                </div>
            </main>
        </div>
    );
}
