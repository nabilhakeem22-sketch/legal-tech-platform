"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const days = Array.from({ length: 35 }, (_, i) => i + 1); // Mock 35 days for grid
const events = [
    { day: 15, title: "VAT Deadline", type: "VAT", color: "bg-red-100 text-red-700" },
    { day: 20, title: "Withholding", type: "WHT", color: "bg-blue-100 text-blue-700" },
    { day: 31, title: "Salary Tax", type: "SAL", color: "bg-green-100 text-green-700" },
];

export function FullTaxCalendar() {
    return (
        <div className="h-full bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col">
            {/* Calendar Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 text-center flex-1">October 2025</h2>
                <div className="flex space-x-2">
                    <button className="p-1 rounded-md hover:bg-gray-100"><ChevronLeft className="h-5 w-5 text-gray-500" /></button>
                    <button className="p-1 rounded-md hover:bg-gray-100"><ChevronRight className="h-5 w-5 text-gray-500" /></button>
                </div>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="py-2 text-center text-xs font-semibold text-gray-500 uppercase">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 grid-rows-5 flex-1 divide-x divide-y divide-gray-200">
                {days.map((day) => {
                    const dayEvents = events.filter(e => e.day === day);
                    // Only show 1-31, mock empty slots at start/end
                    const isRealDay = day <= 31;

                    return (
                        <div key={day} className={cn("min-h-[100px] p-2 relative bg-white hover:bg-gray-50 transition-colors", !isRealDay && "bg-gray-50/50")}>
                            {isRealDay && (
                                <>
                                    <span className={cn(
                                        "text-sm font-medium text-gray-700",
                                        day === 15 && "text-white bg-indigo-600 w-6 h-6 rounded-full flex items-center justify-center -ml-1 -mt-1"
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
