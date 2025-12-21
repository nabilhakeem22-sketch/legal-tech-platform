"use client";

import { CalendarDays, Clock, ChevronRight } from "lucide-react";

interface CalendarEvent {
    id: string;
    title: string;
    date: string;
    daysLeft: number;
    type: "Tax" | "License" | "Meeting" | "Other";
}

interface RegulatoryCalendarProps {
    events: CalendarEvent[];
}

export function RegulatoryCalendar({ events }: RegulatoryCalendarProps) {
    return (
        <div className="bg-card border border-border rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Upcoming Deadlines</h3>
                <CalendarDays className="w-5 h-5 text-muted-foreground" />
            </div>

            <div className="space-y-4">
                {events.map((event) => (
                    <div key={event.id} className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:bg-muted/40 transition-colors">
                        <div className={`flex flex-col items-center justify-center w-12 h-12 rounded-lg border ${event.daysLeft <= 3 ? "bg-red-50 border-red-200 text-red-600" :
                                event.daysLeft <= 7 ? "bg-orange-50 border-orange-200 text-orange-600" :
                                    "bg-muted border-gray-200 text-foreground"
                            }`}>
                            <span className="text-xs font-bold uppercase">{event.date.split(" ")[0].substring(0, 3)}</span>
                            <span className="text-lg font-bold leading-none">{event.date.split(" ")[1]}</span>
                        </div>

                        <div className="flex-1">
                            <h4 className="text-sm font-medium text-foreground">{event.title}</h4>
                            <p className={`text-xs mt-1 font-medium ${event.daysLeft <= 3 ? "text-red-500" : "text-muted-foreground"
                                }`}>
                                {event.daysLeft === 0 ? "Due Today" : `Due in ${event.daysLeft} days`}
                            </p>
                        </div>
                    </div>
                ))}

                {events.length === 0 && (
                    <div className="text-center py-6 text-muted-foreground">
                        <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No upcoming regulatory deadlines.</p>
                    </div>
                )}
            </div>

            <button className="w-full mt-4 flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors pt-2">
                See Full Calendar <ChevronRight className="w-4 h-4" />
            </button>
        </div>
    );
}
