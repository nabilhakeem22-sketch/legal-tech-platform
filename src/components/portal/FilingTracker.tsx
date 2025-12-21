"use client";

import { Landmark } from "lucide-react";

interface Filing {
    id: string;
    title: string;
    authority: string; // GAFI, ETA, etc.
    status: "Draft" | "Reviewing" | "Submitted" | "Approved" | "Overdue";
    dueDate: string;
    progress: number; // 0-100
}

interface FilingTrackerProps {
    filings: Filing[];
}

export function FilingTracker({ filings }: FilingTrackerProps) {
    return (
        <div className="bg-card border border-border rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-foreground">Regulatory Filings</h3>
                <span className="text-sm text-muted-foreground">{filings.length} Active</span>
            </div>

            <div className="space-y-6">
                {filings.map((filing) => (
                    <div key={filing.id} className="group">
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-muted rounded-md group-hover:bg-muted/80 transition-colors">
                                    <Landmark className="w-5 h-5 text-foreground" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-foreground text-sm">{filing.title}</h4>
                                    <p className="text-xs text-muted-foreground">{filing.authority} • Due {filing.dueDate}</p>
                                </div>
                            </div>
                            <StatusBadge status={filing.status} />
                        </div>

                        {/* Progress Bar */}
                        <div className="ml-12 mt-3">
                            <div className="flex justify-between text-[10px] text-muted-foreground mb-1 uppercase tracking-wider font-semibold">
                                <span>Preparation</span>
                                <span>Review</span>
                                <span>Submission</span>
                            </div>
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-500 ${filing.status === 'Overdue' ? 'bg-red-500' : 'bg-primary'
                                        }`}
                                    style={{ width: `${filing.progress}%` }}
                                />
                            </div>
                        </div>

                        <div className="border-b border-border mt-4 w-full" />
                    </div>
                ))}
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const styles = {
        Draft: "bg-gray-100 text-gray-700 border-gray-200",
        Reviewing: "bg-blue-50 text-blue-700 border-blue-200",
        Submitted: "bg-purple-50 text-purple-700 border-purple-200",
        Approved: "bg-green-50 text-green-700 border-green-200",
        Overdue: "bg-red-50 text-red-700 border-red-200",
    };

    const config = styles[status as keyof typeof styles] || styles.Draft;

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${config}`}>
            {status}
        </span>
    );
}
