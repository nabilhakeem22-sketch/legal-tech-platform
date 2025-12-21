"use client";

import { CheckCircle2, Circle, Clock, Plus } from "lucide-react";

const tasks = [
    { id: 1, title: "Review Q4 Financials", due: "Today", status: "pending", priority: "high" },
    { id: 2, title: "Prepare Shareholders Agreement", due: "Tomorrow", status: "pending", priority: "medium" },
    { id: 3, title: "Renew Commercial Register", due: "Dec 25", status: "in-progress", priority: "high" },
    { id: 4, title: "Onboarding Call", due: "Done", status: "completed", priority: "low" },
];

export function ClientTasks() {
    return (
        <div className="bg-card border border-border rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-foreground">Tasks & To-Dos</h3>
                <button className="text-xs flex items-center gap-1 text-primary hover:underline">
                    <Plus className="w-3 h-3" /> Add Task
                </button>
            </div>

            <div className="space-y-3">
                {tasks.map((task) => (
                    <div key={task.id} className="flex items-start gap-3 p-2 hover:bg-muted/30 rounded-md transition-colors group">
                        <button className="mt-0.5 text-muted-foreground hover:text-primary">
                            {task.status === 'completed' ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Circle className="w-4 h-4" />}
                        </button>
                        <div className="flex-1">
                            <p className={`text-sm ${task.status === 'completed' ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                                {task.title}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={`text-[10px] px-1.5 py-0.5 rounded border ${task.priority === 'high' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                        task.priority === 'medium' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                                            'bg-gray-500/10 text-gray-500 border-gray-500/20'
                                    }`}>
                                    {task.priority}
                                </span>
                                {task.due && (
                                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> {task.due}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
