import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: string;
    charLimit?: number;
    currentCount?: number;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, error, charLimit, currentCount, ...props }, ref) => {
        return (
            <div className="w-full">
                <textarea
                    className={cn(
                        "flex min-h-[120px] w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 transition-all duration-200 focus:border-[#A91D2E]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A91D2E]/15 disabled:cursor-not-allowed disabled:opacity-50 resize-none",
                        error && "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                <div className="flex items-center justify-between mt-1.5">
                    {error && <p className="text-xs text-red-400">{error}</p>}
                    {charLimit && (
                        <p
                            className={cn(
                                "text-xs ml-auto",
                                currentCount && currentCount > charLimit
                                    ? "text-red-400"
                                    : "text-gray-400"
                            )}
                        >
                            {currentCount || 0}/{charLimit}
                        </p>
                    )}
                </div>
            </div>
        );
    }
);
Textarea.displayName = "Textarea";

export { Textarea };
