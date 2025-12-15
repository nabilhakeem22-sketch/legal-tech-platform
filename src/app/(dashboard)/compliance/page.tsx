"use client";

import { ComplianceChecklist } from "@/components/compliance/ComplianceChecklist";
import { RegulatoryFeed } from "@/components/compliance/RegulatoryFeed";
import { useEffect, useState } from "react";

export default function CompliancePage() {
    const [data, setData] = useState({ regulations: [], tasks: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/compliance')
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
                <h2 className="text-3xl font-bold tracking-tight">Compliance Navigator</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 h-[calc(100vh-12rem)]">
                <div className="lg:col-span-1 h-full">
                    <RegulatoryFeed data={data.regulations} />
                </div>
                <div className="lg:col-span-2 h-full">
                    <ComplianceChecklist data={data.tasks} />
                </div>
            </div>
        </div>
    );
}
