"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const days = Array.from({ length: 35 }, (_, i) => i + 1); // Mock 35 days for grid
const events = [
    { day: 15, title: "VAT Deadline", type: "VAT", color: "bg-red-500/10 text-red-500" },
    { day: 20, title: "Withholding", type: "WHT", color: "bg-blue-500/10 text-blue-500" },
    { day: 31, title: "Salary Tax", type: "SAL", color: "bg-green-500/10 text-green-500" },
];

export function FullTaxCalendar() {
    return (
        <div className="h-full bg-card rounded-lg border border-border shadow-sm flex flex-col">
            {/* Calendar Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground text-center flex-1">October 2025</h2>
                <div className="flex space-x-2">
                    <button className="p-1 rounded-md hover:bg-muted"><ChevronLeft className="h-5 w-5 text-muted-foreground" /></button>
                    <button className="p-1 rounded-md hover:bg-muted"><ChevronRight className="h-5 w-5 text-muted-foreground" /></button>
                </div>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 border-b border-border bg-muted">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="py-2 text-center text-xs font-semibold text-muted-foreground uppercase">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 grid-rows-5 flex-1 divide-x divide-y divide-border">
                {days.map((day) => {
                    const dayEvents = events.filter(e => e.day === day);
                    // Only show 1-31, mock empty slots at start/end
                    const isRealDay = day <= 31;

                    return (
                        <div key={day} className={cn("min-h-[100px] p-2 relative bg-card hover:bg-muted transition-colors", !isRealDay && "bg-muted/30")}>
                            {isRealDay && (
                                <>
                                    <span className={cn(
                                        "text-sm font-medium text-muted-foreground",
                                        day === 15 && "text-primary-foreground bg-primary w-6 h-6 rounded-full flex items-center justify-center -ml-1 -mt-1"
                                    )}>
                                        {day}
                                    </span>
                                    <div className="mt-2 space-y-1">
                                        {dayEvents.map(event => (
                                            <div key={event.title} className={cn("px-1.5 py-0.5 rounded text-xs truncate font-medium", event.color)}>
                                                {event.title}
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
