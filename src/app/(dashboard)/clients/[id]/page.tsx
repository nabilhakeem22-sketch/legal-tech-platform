"use client";

import { useEffect, useState } from "react";
import { Building2, Plus, Phone, Mail, Globe, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Modal } from "@/components/ui/Modal";
import { CompanyForm } from "@/components/clients/CompanyForm";

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
    const [activeTab, setActiveTab] = useState("companies"); // Default to Companies as requested by "Portfolio" view importance
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
            .then(setCompanies);
    }, [params.id]);

    const handleCreateCompany = async (formData: any) => {
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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{client.name}</h1>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center"><UserIcon className="w-4 h-4 mr-1" /> {client.contactName}</span>
                        <span className="flex items-center"><Phone className="w-4 h-4 mr-1" /> {client.phone}</span>
                        <span className="flex items-center"><Mail className="w-4 h-4 mr-1" /> {client.email}</span>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                        Edit Profile
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Company
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                    {['Overview', 'Companies', 'Portal Settings'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab.toLowerCase().split(' ')[0])}
                            className={`
                                whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium
                                ${activeTab === tab.toLowerCase().split(' ')[0]
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}
                            `}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Content */}
            {activeTab === 'companies' && (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {companies.map((company) => (
                        <Link href={`/companies/${company.id}`} key={company.id}>
                            <Card className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-indigo-500 h-full">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-lg font-semibold">{company.nameEnglish}</CardTitle>
                                        <StatusBadge status={company.status} />
                                    </div>
                                    <p className="text-xs text-gray-400 font-arabic">{company.nameArabic}</p>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2 text-sm text-gray-600 mt-2">
                                        <div className="flex justify-between">
                                            <span>Legal Form:</span>
                                            <span className="font-medium">{company.legalForm}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>CR #:</span>
                                            <span className="font-mono">{company.crNumber}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Tax ID:</span>
                                            <span className="font-mono">{company.taxId}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}

                    {companies.length === 0 && (
                        <div className="col-span-full py-12 text-center border-2 border-dashed border-gray-300 rounded-lg">
                            <Building2 className="movie-icon mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-semibold text-gray-900">No companies</h3>
                            <p className="mt-1 text-sm text-gray-500">Get started by creating a new legal entity.</p>
                            <div className="mt-6">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    <Plus className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                                    New Company
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'overview' && (
                <div className="p-4 bg-gray-50 rounded text-gray-500 text-center">
                    Financial Overview & Contact Details Placeholder
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

function UserIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
            <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
        </svg>
    )
}
