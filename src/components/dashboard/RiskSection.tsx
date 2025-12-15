import { AlertTriangle, Clock, FileWarning, ArrowRight } from "lucide-react";

import Link from "next/link";
import { cn } from "@/lib/utils";

// If Button doesn't exist, I'll just use a styled button here.
// Checking previous file usage, I noticed `Enter Platform` link used classes. I'll stick to standard Tailwind classes for portability.

interface RiskCardProps {
    title: string;
    count: string | number;
    description: string;
    borderColor: "red" | "yellow" | "gray";
    icon: React.ElementType;
    actionText?: string;
    actionHref?: string;
}

function RiskCard({ title, count, description, borderColor, icon: Icon, actionText, actionHref }: RiskCardProps) {
    const borderClasses = {
        red: "border-l-4 border-l-red-500",
        yellow: "border-l-4 border-l-yellow-400",
        gray: "border-l-4 border-l-orange-300", // "Stalled Tasks" requested as Gray/Orange, using Orange for visibility
    };

    const bgClasses = {
        red: "bg-red-500/10",
        yellow: "bg-yellow-500/10",
        gray: "bg-muted/50",
    };

    return (
        <div className={cn("flex flex-col justify-between rounded-lg border border-border bg-card p-5 shadow-sm", borderClasses[borderColor], bgClasses[borderColor])}>
            <div>
                <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-card-foreground">{title}</h4>
                    <Icon className={cn("h-5 w-5", borderColor === "red" ? "text-red-500" : borderColor === "yellow" ? "text-yellow-500" : "text-orange-400")} />
                </div>
                <div className="mb-1">
                    <span className="text-2xl font-bold text-foreground">{count}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{description}</p>
            </div>

            {actionText && (
                <div className="mt-auto pt-2">
                    <Link href={actionHref || "#"} className="text-xs font-semibold text-primary hover:text-primary/80 flex items-center">
                        {actionText} <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                </div>
            )}
        </div>
    );
}

export function RiskSection() {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                Risk Attention required
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Critical Expiries */}
                <RiskCard
                    title="Critical Expiries"
                    count="5 Docs"
                    description="Expiring in < 30 Days"
                    borderColor="red"
                    icon={FileWarning}
                    actionText="View List"
                    actionHref="/compliance"
                />

                {/* Tax Deadlines */}
                <RiskCard
                    title="Tax Deadlines"
                    count="3 Clients"
                    description="VAT Returns Due (7 Days)"
                    borderColor="yellow"
                    icon={Clock}
                    actionText="Check Tax Calendar"
                    actionHref="/compliance"
                />

                {/* Stalled Tasks */}
                <RiskCard
                    title="Stalled Tasks"
                    count="4 Tasks"
                    description="Stuck in 'Drafting' > 7 Days"
                    borderColor="gray"
                    icon={AlertTriangle}
                    actionText="Review Tasks"
                    actionHref="/portal"
                />
            </div>
        </div>
    );
}
