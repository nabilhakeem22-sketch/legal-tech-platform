"use client";

import { MessageSquare, Phone, Calendar, Mail, FileText } from "lucide-react";

const activities = [
    { id: 1, type: "email", title: "Email sent: Re: Q4 Financials", date: "2 hours ago", user: "You" },
    { id: 2, type: "call", title: "Call with Ahmed (CEO)", date: "Yesterday, 2:00 PM", user: "Sarah M." },
    { id: 3, type: "meeting", title: "Meeting: Strategy Review", date: "Dec 18, 10:00 AM", user: "Team" },
    { id: 4, type: "note", title: "Note added: Client requested expedited service", date: "Dec 15", user: "You" },
];

export function ClientActivity() {
    return (
        <div className="bg-card border border-border rounded-lg shadow-sm p-6">
            <h3 className="font-semibold text-foreground mb-4">Activity Timeline</h3>
            <div className="relative border-l border-border ml-2 space-y-6">
                {activities.map((activity) => (
                    <div key={activity.id} className="ml-6 relative">
                        <span className={`absolute -left-[30px] top-1 w-6 h-6 rounded-full flex items-center justify-center border ${activity.type === 'email' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                                activity.type === 'call' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                    activity.type === 'meeting' ? 'bg-purple-500/10 text-purple-500 border-purple-500/20' :
                                        'bg-gray-500/10 text-gray-500 border-gray-500/20'
                            }`}>
                            {activity.type === 'email' && <Mail className="w-3 h-3" />}
                            {activity.type === 'call' && <Phone className="w-3 h-3" />}
                            {activity.type === 'meeting' && <Calendar className="w-3 h-3" />}
                            {activity.type === 'note' && <FileText className="w-3 h-3" />}
                        </span>
                        <div>
                            <p className="text-sm font-medium text-foreground">{activity.title}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                                {activity.date} • by {activity.user}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <button className="w-full mt-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors border-t border-border/50">
                View all activity
            </button>
        </div>
    );
}
