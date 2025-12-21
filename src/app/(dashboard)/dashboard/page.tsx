"use client";

import { Users, Building2, FileText, Smartphone } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { RiskSection } from "@/components/dashboard/RiskSection";
import { RevenueWidget } from "@/components/dashboard/RevenueWidget";
import { ComplianceChecklist } from "@/components/compliance/ComplianceChecklist";
import { complianceTasks } from "@/lib/mock-data";

// Mock Data
const dashboardData = {
    metrics: {
        clients: 45,
        companies: 120,
        requests: 28,
        adoption: 35
    },
    risk: {
        expiries: 5,
        taxDue: 3,
        stalled: 4
    },
    unbilled: [
        { id: 1, client: "Nile Textiles", service: "Board Resolution", date: "2 days ago" },
        { id: 2, client: "Gendy Trading", service: "New Branch", date: "1 day ago" },
        { id: 3, client: "Alpha Tech", service: "Contract Review", date: "4 hours ago" }
    ]
};

export default function DashboardPage() {
    return (
        <div className="space-y-8 pb-10">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">Management Dashboard</h2>
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Last updated: Just now</span>
                </div>
            </div>

            {/* Row 1: The "North Star" Metrics (Volume) */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Active Clients"
                    value={dashboardData.metrics.clients}
                    icon={Users}
                    trend="+2 this month"
                    trendUp={true}
                />
                <StatCard
                    title="Managed Companies"
                    value={dashboardData.metrics.companies}
                    icon={Building2}
                    label="Legal Entities"
                />
                <StatCard
                    title="Active Requests"
                    value={dashboardData.metrics.requests}
                    icon={FileText}
                    label="Work in Progress"
                />
                <StatCard
                    title="Portal Adoption"
                    value={`${dashboardData.metrics.adoption}%`}
                    icon={Smartphone}
                    label="Clients using App"
                />
            </div>

            {/* Row 2: The "Risk Bar" (Immediate Action) */}
            <div>
                <RiskSection />
            </div>

            {/* Row 3: The "Performance" Overview (Revenue & Tasks) */}
            <div className="grid gap-6 md:grid-cols-3 h-[400px]">
                {/* Panel A: Revenue Opportunity Widget (2/3 width) */}
                <div className="md:col-span-2 h-full">
                    <RevenueWidget unbilledTasks={dashboardData.unbilled} />
                </div>

                {/* Panel B: Task Management & Status (1/3 width) */}
                <div className="h-full">
                    <ComplianceChecklist data={complianceTasks} compact={true} />
                </div>
            </div>
        </div>
    );
}
