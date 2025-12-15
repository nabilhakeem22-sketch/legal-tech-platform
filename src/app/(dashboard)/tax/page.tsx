"use client";

import { FilingTracker } from "@/components/tax/FilingTracker";
import { TaxCalendarWidget } from "@/components/tax/TaxCalendarWidget";
import { TaxKanbanBoard } from "@/components/tax/TaxKanbanBoard";
import { FullTaxCalendar } from "@/components/tax/FullTaxCalendar";
import { BadgePercent, Building2, TrendingDown, LayoutList, Kanban, Calendar as CalendarIcon } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { useState } from "react";
import { cn } from "@/lib/utils";

type ViewMode = "list" | "kanban" | "calendar";

export default function TaxPage() {
    const [viewMode, setViewMode] = useState<ViewMode>("list");

    return (
        <div className="space-y-8 pb-10 h-full flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Tax Management</h2>
                    <p className="mt-2 text-sm text-gray-500">Monitor deadlines, prepare filings, and ensure compliance for all entities.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                        <button
                            onClick={() => setViewMode("list")}
                            className={cn(
                                "flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                                viewMode === "list" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-gray-900"
                            )}
                        >
                            <LayoutList className="h-4 w-4 mr-2" /> List
                        </button>
                        <button
                            onClick={() => setViewMode("kanban")}
                            className={cn(
                                "flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                                viewMode === "kanban" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-gray-900"
                            )}
                        >
                            <Kanban className="h-4 w-4 mr-2" /> Kanban
                        </button>
                        <button
                            onClick={() => setViewMode("calendar")}
                            className={cn(
                                "flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                                viewMode === "calendar" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-gray-900"
                            )}
                        >
                            <CalendarIcon className="h-4 w-4 mr-2" /> Calendar
                        </button>
                    </div>
                    <button className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
                        + New Filing Task
                    </button>
                </div>
            </div>

            {/* KPIs - Always visible for now, or maybe hide on Calendar to save space? Keeping them provides context. */}
            <div className="grid gap-4 md:grid-cols-3">
                <StatCard
                    title="Compliance Rate"
                    value="92%"
                    icon={BadgePercent}
                    trend="+4% vs last month"
                    trendUp={true}
                    label="Clients fully compliant"
                />
                <StatCard
                    title="Pending Filings"
                    value="18"
                    icon={Building2}
                    label="Due in next 30 days"
                />
                <StatCard
                    title="Tax Liabilities"
                    value="EGP 1.2M"
                    icon={TrendingDown}
                    label="Estimated total due"
                />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 min-h-[500px]">
                {viewMode === "list" && (
                    <div className="grid gap-6 lg:grid-cols-3 h-full">
                        <div className="lg:col-span-2 space-y-6">
                            <FilingTracker />
                        </div>
                        <div className="space-y-6">
                            <TaxCalendarWidget />
                            <div className="rounded-lg bg-orange-50 p-4 border border-orange-100">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-orange-800">Urgent Attention</h3>
                                        <div className="mt-2 text-sm text-orange-700">
                                            <p>Nile Textiles has a rejected VAT filing from last month. Please review immediately.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {viewMode === "kanban" && (
                    <div className="h-full min-h-[600px]">
                        <TaxKanbanBoard />
                    </div>
                )}

                {viewMode === "calendar" && (
                    <div className="h-[700px]">
                        <FullTaxCalendar />
                    </div>
                )}
            </div>
        </div>
    );
}
