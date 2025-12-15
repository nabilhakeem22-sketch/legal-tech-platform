"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BudgetOverviewProps {
    data: Array<{
        label: string;
        used: number;
        color?: string;
        amount: string;
        total: string;
    }>;
}

export function BudgetOverview({ data }: BudgetOverviewProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Budget Overview</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {data && data.map((item) => (
                        <div key={item.label} className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="font-medium">{item.label}</span>
                                <span className="text-gray-500">{item.used}% used</span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 rounded-full">
                                <div className={`h-2 rounded-full ${item.color || "bg-indigo-500"}`} style={{ width: `${item.used}%` }}></div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-400">
                                <span>{item.amount} / {item.total}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
