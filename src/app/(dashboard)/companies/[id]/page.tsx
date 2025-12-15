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

export default function CompanyDashboardPage() {
    const params = useParams<{ id: string }>();
    const [company, setCompany] = useState<Company | null>(null);
    const [kpiData, setKpiData] = useState<any[]>([]);
    const [riskData, setRiskData] = useState<any[]>([]);
    const [regulations, setRegulations] = useState<any[]>([]);
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            // 1. Fetch Company Details
            const coRes = await fetch(`/api/companies?clientId=all`); // We need a way to get specific company. existing api filters by client. 
            // Quick fix: fetch all and find or add endpoint support. 
            // Let's assume for MVP filtering client list works or I update API to get single company.
            const allCompanies = await (await fetch('/api/companies')).json();
            const found = allCompanies.find((c: any) => c.id === params.id);
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
            <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
                <Link href={`/clients/${company.clientId}`} className="p-2 hover:bg-gray-100 rounded-full">
                    <ArrowLeft className="h-5 w-5 text-gray-500" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{company.nameEnglish}</h1>
                    <span className="text-sm text-gray-500 font-mono">{company.legalForm} • {company.status}</span>
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
                    <div className="mt-6 bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold mb-4">Relevant Transactions</h3>
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
