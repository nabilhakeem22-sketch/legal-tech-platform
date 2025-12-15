"use client";

import { CaseStatusList } from "@/components/portal/CaseStatusList";
import { DocumentVault } from "@/components/portal/DocumentVault";
import { useEffect, useState } from "react";

export default function PortalPage() {
    const [data, setData] = useState({ activeCases: [], documents: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/portal')
            .then(res => res.json())
            .then(d => {
                setData(d);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Client Portal</h2>
                    <p className="text-gray-500 mt-1">Welcome back.</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-6">
                    <CaseStatusList data={data.activeCases} />
                </div>
                <div className="space-y-6">
                    <DocumentVault data={data.documents} />
                </div>
            </div>
        </div>
    );
}
