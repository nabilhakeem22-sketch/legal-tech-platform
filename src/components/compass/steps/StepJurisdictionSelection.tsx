"use client";

import { useWizard } from "../WizardContext";
import { Check, ArrowRight, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function StepJurisdictionSelection() {
    const { jurisdictionRecs, selectJurisdiction } = useWizard();

    if (jurisdictionRecs.length === 0) {
        return (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">No specific jurisdictions found.</h3>
                <p className="text-gray-500 mt-2">Try adjusting your filters (e.g. Activity or Capital).</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">Recommended Jurisdictions</h2>
                <p className="text-gray-500">Based on your activity, capital, and preferences.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {jurisdictionRecs.map((rec) => (
                    <div
                        key={rec.id}
                        onClick={() => selectJurisdiction(rec.entity)}
                        className={cn(
                            "group relative overflow-hidden rounded-xl border-2 bg-white p-6 shadow-sm transition-all cursor-pointer hover:shadow-lg",
                            rec.isBestMatch ? "border-indigo-600 ring-4 ring-indigo-50" : "border-gray-200 hover:border-indigo-300"
                        )}
                    >
                        {rec.isBestMatch && (
                            <div className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                                Best Match
                            </div>
                        )}

                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-indigo-50 transition-colors">
                                    <Building2 className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">
                                        {rec.entity.name}
                                    </h3>
                                    <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                                        <span className="font-semibold">{rec.entity.type}</span>
                                        <span>•</span>
                                        <span>{rec.entity.country}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-gray-900">{rec.matchScore}%</div>
                                <div className="text-xs text-gray-400 font-medium uppercase">Match Score</div>
                            </div>
                        </div>

                        <p className="text-gray-600 mb-6 border-l-2 border-indigo-100 pl-4">{rec.entity.description}</p>

                        <div className="flex flex-wrap gap-2">
                            {rec.pros.slice(0, 3).map((p, i) => (
                                <span key={i} className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 border border-green-100">
                                    <Check className="mr-1 h-3 w-3" /> {p}
                                </span>
                            ))}
                            {rec.cons.length > 0 && (
                                <span className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700 border border-red-100">
                                    {rec.cons[0]}
                                </span>
                            )}
                        </div>

                        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                            <ArrowRight className="h-6 w-6 text-indigo-600" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
