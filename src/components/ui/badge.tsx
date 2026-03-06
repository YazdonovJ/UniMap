import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "success" | "warning" | "danger" | "info";
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
    ({ className, variant = "default", ...props }, ref) => {
        const variantClasses = {
            default: "bg-gray-100 text-gray-700 border-gray-200",
            success: "bg-emerald-50 text-emerald-700 border-emerald-200",
            warning: "bg-amber-50 text-amber-700 border-amber-200",
            danger: "bg-red-50 text-red-700 border-red-200",
            info: "bg-red-50 text-red-600 border-red-200",
        };

        return (
            <div
                ref={ref}
                className={cn(
                    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
                    variantClasses[variant],
                    className
                )}
                {...props}
            />
        );
    }
);
Badge.displayName = "Badge";

export { Badge };
