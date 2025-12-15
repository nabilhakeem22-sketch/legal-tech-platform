import { cn } from "@/lib/utils";

interface ImpactBadgeProps {
    text: string;
    className?: string;
}

export function ImpactBadge({ text, className }: ImpactBadgeProps) {
    return (
        <span className={cn(
            "inline-flex items-center rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-500 ring-1 ring-inset ring-blue-500/20",
            className
        )}>
            {text}
        </span>
    );
}
