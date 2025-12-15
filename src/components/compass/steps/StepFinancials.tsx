"use client";

import { useWizard } from "../WizardContext";
import { ImpactBadge } from "../ImpactBadge";
import { cn } from "@/lib/utils";
import { Coins, Banknote, Building2 } from "lucide-react";

export function StepFinancials() {
    const { state, updateState } = useWizard();

    const tiers = [
        { id: "Low", label: "< 50k USD", desc: "Micro/Small Business", icon: Coins },
        { id: "Medium", label: "50k - 250k USD", desc: "SME Standard", icon: Banknote },
        { id: "High", label: "> 250k USD", desc: "Large Enterprise", icon: Building2 },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-4">
                <label className="text-base font-semibold text-gray-900 flex items-center justify-between">
                    <span>Estimated Initial Capital</span>
                    <ImpactBadge text="Determines Structure Options" />
                </label>

                <div className="grid grid-cols-1 gap-4">
                    {tiers.map((tier) => (
                        <div
                            key={tier.id}
                            onClick={() => updateState({ capital: tier.id as "Low" | "Medium" | "High" })}
                            className={cn(
                                "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm hover:border-indigo-300 transition-all items-center",
                                state.capital === tier.id ? "border-indigo-600 ring-2 ring-indigo-600 bg-indigo-50" : "border-gray-300"
                            )}
                        >
                            <div className={cn("p-3 rounded-full mr-4 bg-white border border-gray-100")}>
                                <tier.icon className="h-6 w-6 text-gray-600" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-900">{tier.label}</h4>
                                <p className="text-sm text-gray-500">{tier.desc}</p>
                            </div>
                            {state.capital === tier.id && (
                                <div className="h-5 w-5 bg-indigo-600 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs">✓</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="pt-4">
                    <label className="text-base font-semibold text-gray-900 flex items-center justify-between mb-3">
                        <span>Speed Priority</span>
                        <ImpactBadge text="Impacts Scoring" />
                    </label>
                    <div className="flex gap-4">
                        <button
                            onClick={() => updateState({ speed: "Standard" })}
                            className={cn(
                                "flex-1 py-3 px-4 rounded-lg border text-sm font-medium transition-all",
                                state.speed === "Standard" ? "border-indigo-600 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600" : "border-gray-300 hover:bg-gray-50 bg-white"
                            )}
                        >
                            Standard Timeline
                        </button>
                        <button
                            onClick={() => updateState({ speed: "Fast" })}
                            className={cn(
                                "flex-1 py-3 px-4 rounded-lg border text-sm font-medium transition-all",
                                state.speed === "Fast" ? "border-indigo-600 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600" : "border-gray-300 hover:bg-gray-50 bg-white"
                            )}
                        >
                            Need it ASAP ⚡
                        </button>
                    </div>
                </div>

                {state.country === "Egypt" && state.capital === "Low" && (
                    <p className="text-sm text-gray-500 bg-gray-50 p-2 rounded border border-gray-200 mt-4">
                        Note: Joint Stock Companies (SAE) require 250k EGP minimum capital, so that option will be hidden.
                    </p>
                )}
            </div>
        </div>
    );
}
