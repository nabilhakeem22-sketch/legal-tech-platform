import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    trendUp?: boolean;
    label?: string;
    className?: string;
}

export function StatCard({
    title,
    value,
    icon: Icon,
    trend,
    trendUp,
    label,
    className,
}: StatCardProps) {
    return (
        <div className={cn("rounded-lg border border-gray-200 bg-white p-6 shadow-sm", className)}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <div className="mt-2 flex items-baseline">
                        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
                    </div>
                </div>
                <div className="rounded-full bg-gray-50 p-2 text-gray-600">
                    <Icon className="h-5 w-5" />
                </div>
            </div>
            <div className="mt-4">
                {trend && (
                    <span
                        className={cn(
                            "text-xs font-medium",
                            trendUp ? "text-green-600" : "text-red-600"
                        )}
                    >
                        {trend}
                    </span>
                )}
                {label && <span className="text-xs text-gray-500">{label}</span>}
            </div>
        </div>
    );
}
