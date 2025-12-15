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
    { id: "Pending Docs", title: "Pending Docs", color: "bg-red-50 text-red-700 border-red-200" },
    { id: "Preparation", title: "Processing", color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
    { id: "Under Review", title: "Review", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { id: "Filed", title: "Filed / Done", color: "bg-green-50 text-green-700 border-green-200" },
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
                    <div key={col.id} className="min-w-[320px] w-80 flex-shrink-0 flex flex-col max-h-full rounded-xl bg-gray-50/50 border border-gray-200 shadow-sm transition-all hover:bg-gray-100/50">
                        {/* Header */}
                        <div className="p-4 rounded-t-xl border-b bg-white border-gray-100 flex justify-between items-center sticky top-0 z-10">
                            <div className="flex items-center gap-2">
                                <div className={cn("w-2 h-2 rounded-full", col.color.replace("bg-", "bg-").split(" ")[0].replace("-50", "-500"))}></div>
                                <h3 className="font-semibold text-sm text-gray-900">{col.title}</h3>
                            </div>
                            <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs font-medium text-gray-600 border border-gray-200">{tasks.length}</span>
                        </div>

                        {/* Tasks Container */}
                        <div className="p-3 space-y-3 flex-1 overflow-y-auto min-h-0 container-snap">
                            {tasks.map(task => (
                                <div key={task.id} className="group bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-grab hover:shadow-md hover:border-indigo-300 transition-all transform hover:-translate-y-0.5">
                                    <div className="flex justify-between items-start mb-3">
                                        <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-[10px] font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 uppercase tracking-wide">VAT</span>
                                        <button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <h4 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1">{task.client}</h4>
                                    <p className="text-xs text-gray-500 mb-4 line-clamp-2 leading-relaxed">{task.title}</p>

                                    <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                                        <div className="text-xs font-medium text-orange-600 flex items-center bg-orange-50 px-2 py-1 rounded">
                                            Due: {task.dueDate}
                                        </div>
                                        <div className="h-7 w-7 rounded-full bg-gradient-to-br from-indigo-50 to-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold border border-indigo-200/50">
                                            {task.client.charAt(0)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer/Add Action */}
                        <div className="p-3 bg-gray-50/50 rounded-b-xl border-t border-gray-200/50">
                            <button className="w-full py-2 text-xs font-medium text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 rounded-lg border border-dashed border-gray-300 transition-all flex items-center justify-center gap-2">
                                <span>+</span> Add Task
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
