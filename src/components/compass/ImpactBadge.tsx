import { cn } from "@/lib/utils";

interface ImpactBadgeProps {
    text: string;
    className?: string;
}

export function ImpactBadge({ text, className }: ImpactBadgeProps) {
    return (
        <span className={cn(
            "inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10",
            className
        )}>
            {text}
        </span>
    );
}
