"use client";

import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

// Types
interface KanbanTask {
    id: string;
    title: string;
    client: string;
    dueDate: string;
    status: "Pending Docs" | "Preparation" | "Under Review" | "Filed";
}

const columns = [
    { id: "Pending Docs", title: "Pending Docs", color: "bg-red-500/10 text-red-500 border-red-500/20" },
    { id: "Preparation", title: "Processing", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" },
    { id: "Under Review", title: "Review", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
    { id: "Filed", title: "Filed / Done", color: "bg-green-500/10 text-green-500 border-green-500/20" },
];

const mockTasks: KanbanTask[] = [
    { id: "1", title: "VAT Return Sep", client: "Nile Textiles", dueDate: "Oct 15", status: "Pending Docs" },
    { id: "2", title: "Salary Tax", client: "Gendy Trading", dueDate: "Oct 30", status: "Preparation" },
    { id: "3", title: "Withholding Tax", client: "Alpha Tech", dueDate: "Oct 20", status: "Under Review" },
    { id: "4", title: "VAT Return", client: "Cairo Foods", dueDate: "Oct 15", status: "Filed" },
    { id: "5", title: "Social Insurance", client: "Delta Construction", dueDate: "Oct 31", status: "Preparation" },
    { id: "6", title: "Corporate Tax", client: "Global Imports", dueDate: "Nov 15", status: "Pending Docs" },
    { id: "7", title: "Stamp Duty", client: "Beta Systems", dueDate: "Oct 25", status: "Under Review" },
];

export function TaxKanbanBoard() {
    return (
        <div className="flex h-full gap-6 overflow-x-auto pb-6 items-start">
            {columns.map((col) => {
                const tasks = mockTasks.filter(t => t.status === col.id);
                return (
                    <div key={col.id} className="min-w-[320px] w-80 flex-shrink-0 flex flex-col max-h-full rounded-xl bg-muted/30 border border-border shadow-sm transition-all hover:bg-muted/50">
                        {/* Header */}
                        <div className="p-4 rounded-t-xl border-b bg-card border-border flex justify-between items-center sticky top-0 z-10">
                            <div className="flex items-center gap-2">
                                <div className={cn("w-2 h-2 rounded-full", col.color.replace("bg-", "bg-").split(" ")[0].replace("-50", "-500"))}></div>
                                <h3 className="font-semibold text-sm text-foreground">{col.title}</h3>
                            </div>
                            <span className="bg-muted px-2 py-0.5 rounded-full text-xs font-medium text-muted-foreground border border-border">{tasks.length}</span>
                        </div>

                        {/* Tasks Container */}
                        <div className="p-3 space-y-3 flex-1 overflow-y-auto min-h-0 container-snap">
                            {tasks.map(task => (
                                <div key={task.id} className="group bg-card p-4 rounded-lg shadow-sm border border-border cursor-grab hover:shadow-md hover:border-primary/50 transition-all transform hover:-translate-y-0.5">
                                    <div className="flex justify-between items-start mb-3">
                                        <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary ring-1 ring-inset ring-primary/20 uppercase tracking-wide">VAT</span>
                                        <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-muted rounded">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <h4 className="font-semibold text-foreground text-sm mb-1 line-clamp-1">{task.client}</h4>
                                    <p className="text-xs text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{task.title}</p>

                                    <div className="flex items-center justify-between pt-3 border-t border-border">
                                        <div className="text-xs font-medium text-orange-500 flex items-center bg-orange-500/10 px-2 py-1 rounded">
                                            Due: {task.dueDate}
                                        </div>
                                        <div className="h-7 w-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold border border-primary/20">
                                            {task.client.charAt(0)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer/Add Action */}
                        <div className="p-3 bg-muted/30 rounded-b-xl border-t border-border/50">
                            <button className="w-full py-2 text-xs font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 hover:border-primary/20 rounded-lg border border-dashed border-border transition-all flex items-center justify-center gap-2">
                                <span>+</span> Add Task
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
