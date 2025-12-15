"use client";

import { useEffect, useState } from "react";
import { Plus, Building2, User } from "lucide-react";
import Link from "next/link";
import { Modal } from "@/components/ui/Modal";
import { ClientForm } from "@/components/clients/ClientForm";

interface Client {
    id: string;
    name: string;
    type: "Individual" | "Corporate";
    contactName: string;
    email: string;
    phone: string;
    totalUnpaid: string;
}

export default function ClientsPage() {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetch('/api/clients')
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch");
                return res.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    setClients(data);
                } else {
                    console.error("API returned non-array data:", data);
                    setClients([]); // Fallback to empty array to prevent crash
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Error loading clients:", err);
                setLoading(false);
            });
    }, []);

    const handleCreateClient = async (formData: Partial<Client>) => {
        const res = await fetch('/api/clients', {
            method: 'POST',
            body: JSON.stringify(formData)
        });
        const savedClient = await res.json();
        setClients([...clients, savedClient]);
        setIsModalOpen(false);
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex justify-between">
                    <div className="h-10 w-48 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-40 bg-gray-100 rounded-lg animate-pulse"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (!clients) return <div className="p-8 text-center text-red-500">Failed to load clients.</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">Clients</h2>
                    <p className="text-muted-foreground mt-1">Manage client relationships and legal entities.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    New Client
                </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {clients.map((client) => (
                    <Link key={client.id} href={`/clients/${client.id}`}>
                        <div className="group relative flex flex-col gap-4 rounded-lg border border-border bg-card p-6 shadow-sm hover:border-primary/50 hover:shadow-md transition-all cursor-pointer">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${client.type === 'Corporate' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                                        {client.type === 'Corporate' ? <Building2 className="h-5 w-5" /> : <User className="h-5 w-5" />}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">{client.name}</h3>
                                        <p className="text-xs text-muted-foreground">{client.contactName}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-border pt-4 mt-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Unpaid Invoices</span>
                                    <span className="font-medium text-card-foreground">{client.totalUnpaid}</span>
                                </div>
                                <div className="flex justify-between text-sm mt-1">
                                    <span className="text-muted-foreground">Contact</span>
                                    <span className="text-card-foreground">{client.phone}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>


            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Add New Client"
            >
                <ClientForm
                    onSubmit={handleCreateClient}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </div>
    );
}
