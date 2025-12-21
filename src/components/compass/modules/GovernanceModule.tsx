"use client";

import { Building2, ArrowLeft } from "lucide-react";

interface GovernanceModuleProps {
    onBack: () => void;
}

export function GovernanceModule({ onBack }: GovernanceModuleProps) {
    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-4">
                <button
                    onClick={onBack}
                    className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
                >
                    <ArrowLeft className="h-5 w-5" />
                </button>
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                        <Building2 className="h-6 w-6 text-emerald-400" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-white">License & Governance</h2>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Placeholder Content */}
                <div className="col-span-full bg-[#0f172a] border border-emerald-500/20 rounded-xl p-12 text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center">
                        <Building2 className="h-8 w-8 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Governance Management System</h3>
                    <p className="text-slate-400 max-w-md mx-auto">
                        This module will handle commercial licenses, regulatory filings, and board governance tracking.
                        <br /><br />
                        <span className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-400 text-sm rounded-full border border-emerald-500/20">
                            Coming Soon
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
