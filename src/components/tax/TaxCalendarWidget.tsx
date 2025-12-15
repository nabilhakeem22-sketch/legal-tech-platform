"use client";

import { Calendar, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaxEvent {
    id: string;
    date: string; // ISO date or "15 Oct"
    title: string;
    type: "VAT" | "Salary" | "Corporate" | "Withholding";
    status: "Upcoming" | "Due Soon" | "Overdue";
}

const mockEvents: TaxEvent[] = [
    { id: "1", date: "15 Oct", title: "Monthly VAT Filing", type: "VAT", status: "Overdue" },
    { id: "2", date: "20 Oct", title: "Quarterly Withholding Tax", type: "Withholding", status: "Due Soon" },
    { id: "3", date: "30 Oct", title: "Salary Tax", type: "Salary", status: "Upcoming" },
    { id: "4", date: "31 Oct", title: "Social Insurance", type: "Salary", status: "Upcoming" },
];

export function TaxCalendarWidget() {
    return (
        <div className="rounded-lg border border-border bg-card shadow-sm p-6 h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    Tax Calendar
                </h3>
                <span className="text-sm font-medium text-primary hover:text-primary/80 cursor-pointer">
                    View Full Calendar
                </span>
            </div>

            <div className="space-y-4">
                {mockEvents.map((event) => (
                    <div key={event.id} className="flex items-center gap-4 group">
                        <div className={cn(
                            "flex-none w-14 h-14 rounded-lg flex flex-col items-center justify-center border",
                            event.status === "Overdue" ? "bg-red-500/10 border-red-500/20 text-red-500" :
                                event.status === "Due Soon" ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-500" :
                                    "bg-muted border-border text-muted-foreground"
                        )}>
                            <span className="text-xs font-semibold uppercase">{event.date.split(' ')[1]}</span>
                            <span className="text-xl font-bold">{event.date.split(' ')[0]}</span>
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{event.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="inline-flex items-center rounded-md bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground ring-1 ring-inset ring-border">
                                    {event.type}
                                </span>
                                {event.status === "Overdue" && (
                                    <span className="text-xs font-semibold text-red-500">Overdue!</span>
                                )}
                            </div>
                        </div>

                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground cursor-pointer" />
                    </div>
                ))}
            </div>
        </div>
    );
}
