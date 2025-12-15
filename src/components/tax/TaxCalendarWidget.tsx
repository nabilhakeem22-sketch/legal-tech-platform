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
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm p-6 h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    Tax Calendar
                </h3>
                <span className="text-sm font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
                    View Full Calendar
                </span>
            </div>

            <div className="space-y-4">
                {mockEvents.map((event) => (
                    <div key={event.id} className="flex items-center gap-4 group">
                        <div className={cn(
                            "flex-none w-14 h-14 rounded-lg flex flex-col items-center justify-center border",
                            event.status === "Overdue" ? "bg-red-50 border-red-100 text-red-700" :
                                event.status === "Due Soon" ? "bg-yellow-50 border-yellow-100 text-yellow-700" :
                                    "bg-gray-50 border-gray-100 text-gray-600"
                        )}>
                            <span className="text-xs font-semibold uppercase">{event.date.split(' ')[1]}</span>
                            <span className="text-xl font-bold">{event.date.split(' ')[0]}</span>
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{event.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="inline-flex items-center rounded-md bg-gray-50 px-1.5 py-0.5 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                                    {event.type}
                                </span>
                                {event.status === "Overdue" && (
                                    <span className="text-xs font-semibold text-red-600">Overdue!</span>
                                )}
                            </div>
                        </div>

                        <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-gray-500 cursor-pointer" />
                    </div>
                ))}
            </div>
        </div>
    );
}
