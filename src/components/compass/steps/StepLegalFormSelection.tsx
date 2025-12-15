"use client";

import { useWizard } from "../WizardContext";
import { Check, Shield, User, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function StepLegalFormSelection() {
    const { legalFormRecs, selectLegalForm, selectedJurisdiction } = useWizard();

    if (legalFormRecs.length === 0) {
        return (
            <div className="text-center py-20">
                <h3 className="text-xl font-bold text-gray-900">No applicable legal forms found.</h3>
                <p className="text-gray-500 mt-2">The selected jurisdiction might not support your shareholder structure.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
            <div className="border-b border-gray-200 pb-6 mb-6">
                <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wide">Selected Jurisdiction</span>
                <h2 className="text-2xl font-bold text-gray-900 mt-1">{selectedJurisdiction?.name}</h2>
            </div>

            <div className="text-center space-y-2">
                <h2 className="text-xl font-bold text-gray-900">Choose Legal Structure</h2>
                <p className="text-gray-500">Select the entity type for your business in {selectedJurisdiction?.country}.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {legalFormRecs.map((rec) => (
                    <div
                        key={rec.id}
                        onClick={() => selectLegalForm(rec.entity)}
                        className={cn(
                            "group relative flex flex-col rounded-xl border-2 bg-white p-6 shadow-sm transition-all cursor-pointer hover:shadow-lg",
                            rec.isBestMatch ? "border-indigo-600 bg-indigo-50/10" : "border-gray-200 hover:border-indigo-300"
                        )}
                    >
                        {rec.isBestMatch && (
                            <div className="absolute top-4 right-4 text-indigo-600">
                                <Shield className="h-5 w-5 fill-indigo-100" />
                            </div>
                        )}

                        <div className="mb-4">
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">
                                {rec.entity.name}
                            </h3>
                            <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                                <User className="h-3 w-3" />
                                <span>{rec.entity.attributes.minShareholders}-{rec.entity.attributes.maxShareholders} Shareholders</span>
                            </div>
                        </div>

                        <div className="flex-1 space-y-3 mb-6">
                            {rec.pros.slice(0, 2).map((p, i) => (
                                <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                    <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                                    <span>{p}</span>
                                </div>
                            ))}
                        </div>

                        <button className="w-full py-2 rounded-lg bg-gray-50 text-indigo-600 font-semibold text-sm group-hover:bg-indigo-600 group-hover:text-white transition-all flex items-center justify-center gap-2">
                            Select Structure <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
