"use client";

import { useState } from "react";
import { ComplianceScoreGauge } from "@/components/portal/ComplianceScoreGauge";
import { FilingTracker } from "@/components/portal/FilingTracker";
import { RegulatoryCalendar } from "@/components/portal/RegulatoryCalendar";
import { DocumentVault } from "@/components/portal/DocumentVault";
import { ShieldCheck, Info } from "lucide-react";

// Types
interface Filing {
    id: string;
    title: string;
    authority: string;
    status: "Draft" | "Reviewing" | "Submitted" | "Approved" | "Overdue";
    dueDate: string;
    progress: number;
}

interface CalendarEvent {
    id: string;
    title: string;
    date: string;
    daysLeft: number;
    type: "Tax" | "License" | "Meeting" | "Other";
}

interface Document {
    id: number;
    name: string;
    date: string;
    size: string;
}

interface DashboardData {
    complianceScore: number;
    filings: Filing[];
    upcomingEvents: CalendarEvent[];
    documents: Document[];
}

export default function PortalPage() {
    // Mock Data State - In production this would come from the API
    const [data] = useState<DashboardData>({
        complianceScore: 85,
        filings: [
            { id: "1", title: "Annual Tax Return (2024)", authority: "ETA", status: "Reviewing", dueDate: "Mar 31", progress: 60 },
            { id: "2", title: "Social Insurance Form 2", authority: "NOSI", status: "Submitted", dueDate: "Jan 15", progress: 85 },
            { id: "3", title: "Commercial Register Update", authority: "GAFI", status: "Draft", dueDate: "Feb 10", progress: 20 },
        ],
        upcomingEvents: [
            { id: "e1", title: "Social Insurance Payment", date: "Jan 15", daysLeft: 3, type: "Tax" },
            { id: "e2", title: "License Renewal: Cairo Branch", date: "Jan 28", daysLeft: 16, type: "License" },
            { id: "e3", title: "Quarterly Board Meeting", date: "Feb 05", daysLeft: 24, type: "Meeting" }
        ],
        documents: [
            { id: 1, name: "Executed MSA.pdf", date: "2024-01-15", size: "2.4 MB" },
            { id: 2, name: "Privacy Addendum.pdf", date: "2025-11-20", size: "0.8 MB" },
        ]
    });

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <ShieldCheck className="h-8 w-8 text-primary" />
                        Compliance Pulse
                    </h2>
                    <p className="text-muted-foreground mt-1 text-lg">
                        Your real-time regulatory health dashboard.
                    </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-md border border-blue-200 text-sm">
                    <Info className="w-4 h-4" />
                    <span>Last updated: just now</span>
                </div>
            </div>

            {/* Top Grid: Score & Calendar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Score Card */}
                <div className="md:col-span-1">
                    <ComplianceScoreGauge score={data.complianceScore} />
                </div>

                {/* Calendar */}
                <div className="md:col-span-2">
                    <RegulatoryCalendar events={data.upcomingEvents} />
                </div>
            </div>

            {/* Main Content: Tracking & Documents */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <FilingTracker filings={data.filings} />
                </div>
                <div className="lg:col-span-1">
                    <DocumentVault data={data.documents} />
                </div>
            </div>
        </div>
    );
}
