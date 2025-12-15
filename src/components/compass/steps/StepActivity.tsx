"use client";

import { useWizard } from "../WizardContext";
import { ImpactBadge } from "../ImpactBadge";
import { cn } from "@/lib/utils";
import { Briefcase, Store } from "lucide-react";

export function StepActivity() {
    const { state, updateState } = useWizard();

    const activities = ["Trading", "Manufacturing", "Service", "Crypto"];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-4">
                <label className="text-base font-semibold text-gray-900 flex items-center justify-between">
                    <span>What is your primary activity?</span>
                    <ImpactBadge text="Determines License Type" />
                </label>
                <div className="grid grid-cols-2 gap-4">
                    {activities.map((act) => (
                        <div
                            key={act}
                            onClick={() => updateState({ activity: act as "Trading" | "Manufacturing" | "Service" | "Crypto" })}
                            className={cn(
                                "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm hover:border-indigo-300 transition-all",
                                state.activity === act ? "border-indigo-600 ring-2 ring-indigo-600 bg-indigo-50" : "border-gray-300"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <div className={cn("p-2 rounded-lg", state.activity === act ? "bg-white text-indigo-600" : "bg-gray-100 text-gray-500")}>
                                    <Briefcase className="h-5 w-5" />
                                </div>
                                <span className="font-medium text-gray-900">{act}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <label className="text-base font-semibold text-gray-900 flex items-center justify-between">
                    <span>Do you need a physical showroom?</span>
                    <ImpactBadge text="Impacts Office Requirements" />
                </label>
                <div className="flex gap-4">
                    <button
                        onClick={() => updateState({ hasShowroom: true })}
                        className={cn(
                            "flex-1 py-3 px-4 rounded-lg border text-sm font-medium transition-all flex items-center justify-center gap-2",
                            state.hasShowroom ? "border-indigo-600 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600" : "border-gray-300 hover:bg-gray-50"
                        )}
                    >
                        <Store className="h-4 w-4" /> Yes, required
                    </button>
                    <button
                        onClick={() => updateState({ hasShowroom: false })}
                        className={cn(
                            "flex-1 py-3 px-4 rounded-lg border text-sm font-medium transition-all",
                            state.hasShowroom === false ? "border-gray-400 bg-gray-100 text-gray-900 ring-1 ring-gray-400" : "border-gray-300 hover:bg-gray-50"
                        )}
                    >
                        No, virtual office is fine
                    </button>
                </div>
            </div>
        </div>
    );
}
