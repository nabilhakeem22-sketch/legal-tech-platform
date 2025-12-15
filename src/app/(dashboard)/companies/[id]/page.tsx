"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { RiskOverviewChart } from "@/components/dashboard/RiskChart";
import { AlertTriangle, CheckCircle, FileText, Gavel, LucideIcon, ShieldCheck, XCircle, Wallet, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { RegulatoryFeed } from "@/components/compliance/RegulatoryFeed";
import { TransactionList } from "@/components/wallet/TransactionList";

// Icon Map
const iconMap: Record<string, LucideIcon> = {
    AlertTriangle, CheckCircle, FileText, Gavel, ShieldCheck, XCircle, Wallet
};

interface Company {
    id: string;
    clientId: string;
    nameEnglish: string;
    legalForm: string;
    status: string;
}

import { ChartData } from "@/components/dashboard/RiskChart";
import { Transaction } from "@/components/wallet/TransactionList";
import { Regulation } from "@/components/compliance/RegulatoryFeed";

interface KpiItem {
    title: string;
    value: string;
    icon: string;
    trend: string;
    change: string;
}

// Transaction interface imported

export default function CompanyDashboardPage() {
    const params = useParams<{ id: string }>();
    const [company, setCompany] = useState<Company | null>(null);
    const [kpiData, setKpiData] = useState<KpiItem[]>([]);
    const [riskData, setRiskData] = useState<ChartData[]>([]);
    const [regulations, setRegulations] = useState<Regulation[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            // 1. Fetch Company Details
            let allCompanies: Company[] = [];
            try {
                const res = await fetch('/api/companies');
                const data = await res.json();
                if (Array.isArray(data)) {
                    allCompanies = data;
                }
            } catch (err) {
                console.error("Failed to fetch companies:", err);
                // Fallback to empty or mock if needed
            }
            const found = allCompanies.find((c: Company) => c.id === params.id) || null;
            setCompany(found);

            if (found) {
                // 2. Fetch Dashboard Data
                const dashRes = await fetch(`/api/dashboard?companyId=${params.id}`);
                const dashData = await dashRes.json();
                setKpiData(dashData.kpiData);
                setRiskData(dashData.riskData);

                // 3. Fetch Compliance (filtered by form)
                const compRes = await fetch(`/api/compliance?companyId=${params.id}&legalForm=${found.legalForm}`);
                const compData = await compRes.json();
                setRegulations(compData.regulations);

                // 4. Fetch Wallet
                const walletRes = await fetch(`/api/wallet?companyId=${params.id}`);
                const walletData = await walletRes.json();
                setTransactions(walletData.transactions);
            }
            setLoading(false);
        };
        loadData();
    }, [params.id]);

    if (loading) return <div className="p-8">Loading Company Context...</div>;
    if (!company) return <div className="p-8">Company not found.</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4 border-b border-border pb-4">
                <Link href={`/clients/${company.clientId}`} className="p-2 hover:bg-muted rounded-full">
                    <ArrowLeft className="h-5 w-5 text-muted-foreground" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-foreground">{company.nameEnglish}</h1>
                    <span className="text-sm text-muted-foreground font-mono">{company.legalForm} • {company.status}</span>
                </div>
            </div>

            {/* KPI Section */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {kpiData.map((kpi, index) => (
                    <KpiCard
                        key={index}
                        title={kpi.title}
                        value={kpi.value}
                        icon={iconMap[kpi.icon] || FileText}
                        trend={kpi.trend}
                        description={`${kpi.change} from last month`}
                    />
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Left: Risk Chart */}
                <div className="lg:col-span-2">
                    <RiskOverviewChart data={riskData} />
                    <div className="mt-6 bg-card rounded-lg shadow p-6 border border-border">
                        <h3 className="text-lg font-semibold mb-4 text-card-foreground">Relevant Transactions</h3>
                        <TransactionList data={transactions} />
                    </div>
                </div>

                {/* Right: Compliance Feed */}
                <div className="space-y-6">
                    <RegulatoryFeed data={regulations} />
                </div>
            </div>
        </div>
    );
}
