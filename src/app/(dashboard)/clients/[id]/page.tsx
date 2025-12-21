"use client";

import { useEffect, useState } from "react";
import { Building2, Plus, Phone, Mail, User as ClientUserIcon } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Modal } from "@/components/ui/Modal";
import { CompanyForm } from "@/components/clients/CompanyForm";
import { ClientInfoCard } from "@/components/clients/crm/ClientInfoCard";
import { ClientTasks } from "@/components/clients/crm/ClientTasks";
import { ClientActivity } from "@/components/clients/crm/ClientActivity";
import { ClientRequirements } from "@/components/clients/crm/ClientRequirements";

interface Client {
    id: string;
    name: string;
    contactName: string;
    email: string;
    phone: string;
    totalUnpaid: string;
}

interface Company {
    id: string;
    nameEnglish: string;
    nameArabic: string;
    legalForm: string;
    status: "Compliant" | "Warning" | "Non-Compliant";
    crNumber: string;
    taxId: string;
}

export default function ClientDetailPage() {
    const params = useParams<{ id: string }>();
    const [client, setClient] = useState<Client | null>(null);
    const [companies, setCompanies] = useState<Company[]>([]);
    const [activeTab, setActiveTab] = useState("overview"); // Default to Overview (CRM View)
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Fetch Client Details (Mock: finding from list. In real app, /api/clients/:id)
        fetch('/api/clients')
            .then(res => res.json())
            .then((data: Client[]) => {
                const found = data.find(c => c.id === params.id);
                if (found) setClient(found);
            });

        // Fetch Companies linked to this client
        fetch(`/api/companies?clientId=${params.id}`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setCompanies(data);
                } else {
                    console.error("Expected array of companies, got:", data);
                    setCompanies([]); // Fallback to empty array to prevent map errors
                }
            })
            .catch(err => {
                console.error("Failed to fetch companies:", err);
                setCompanies([]);
            });
    }, [params.id]);

    const handleCreateCompany = async (formData: Partial<Company>) => {
        const newCompany = {
            clientId: params.id,
            ...formData
        };

        const res = await fetch('/api/companies', {
            method: 'POST',
            body: JSON.stringify(newCompany)
        });
        const saved = await res.json();
        setCompanies([...companies, saved]);
        setIsModalOpen(false);
    };

    if (!client) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">{client.name}</h1>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center"><UserAvatarIcon className="w-4 h-4 mr-1" /> {client.contactName}</span>
                        <span className="flex items-center"><Phone className="w-4 h-4 mr-1" /> {client.phone}</span>
                        <span className="flex items-center"><Mail className="w-4 h-4 mr-1" /> {client.email}</span>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 text-sm font-medium text-foreground bg-card border border-border rounded-md hover:bg-muted/50">
                        Edit Profile
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Company
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-border">
                <nav className="-mb-px flex space-x-8">
                    {['Overview', 'Companies', 'Financials', 'Portal Settings'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab.toLowerCase().split(' ')[0])}
                            className={`
                                whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium
                                ${activeTab === tab.toLowerCase().split(' ')[0]
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-muted-foreground hover:border-border hover:text-foreground'}
                            `}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Content */}
            {/* Content */}
            {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Activity & Requirements */}
                    <div className="lg:col-span-2 space-y-6">
                        <ClientActivity />
                        <ClientRequirements />
                    </div>

                    {/* Right Column: Info & Tasks */}
                    <div className="space-y-6">
                        <ClientInfoCard client={client} />
                        <ClientTasks />
                    </div>
                </div>
            )}

            {activeTab === 'companies' && (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {companies.map((company) => (
                        <Link href={`/companies/${company.id}`} key={company.id}>
                            <Card className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-primary h-full">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-lg font-semibold">{company.nameEnglish}</CardTitle>
                                        <StatusBadge status={company.status} />
                                    </div>
                                    <p className="text-xs text-muted-foreground font-arabic">{company.nameArabic}</p>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2 text-sm text-muted-foreground mt-2">
                                        <div className="flex justify-between">
                                            <span>Legal Form:</span>
                                            <span className="font-medium text-card-foreground">{company.legalForm}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>CR #:</span>
                                            <span className="font-mono text-card-foreground">{company.crNumber}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Tax ID:</span>
                                            <span className="font-mono text-card-foreground">{company.taxId}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}

                    {companies.length === 0 && (
                        <div className="col-span-full py-12 text-center border-2 border-dashed border-border rounded-lg">
                            <Building2 className="movie-icon mx-auto h-12 w-12 text-muted-foreground" />
                            <h3 className="mt-2 text-sm font-semibold text-foreground">No companies</h3>
                            <p className="mt-1 text-sm text-muted-foreground">Get started by creating a new legal entity.</p>
                            <div className="mt-6">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                >
                                    <Plus className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                                    New Company
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'financials' && (
                <div className="p-12 text-center border-2 border-dashed border-border rounded-lg">
                    <p className="text-muted-foreground">Financial Widgets & Billing History will appear here.</p>
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Add New Legal Entity"
            >
                <CompanyForm
                    onSubmit={handleCreateCompany}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </div>
    );
}

// Subcomponents
function StatusBadge({ status }: { status: string }) {
    if (status === 'Compliant') {
        return <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">✅ Compliant</span>;
    }
    if (status === 'Warning') {
        return <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">⚠️ Warning</span>;
    }
    return <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">❌ Non-Compliant</span>;
}

function UserAvatarIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
            <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
        </svg>
    )
}
