import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface KpiCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    trendUp?: boolean;
    description?: string;
}

export function KpiCard({ title, value, icon: Icon, trend, trendUp, description }: KpiCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {(trend || description) && (
                    <p className="text-xs text-gray-500 mt-1">
                        {trend && (
                            <span className={trendUp ? "text-green-500" : "text-red-500"}>
                                {trend}
                            </span>
                        )}
                        {description && <span className="ml-1">{description}</span>}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
