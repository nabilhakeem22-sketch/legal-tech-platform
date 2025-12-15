"use client";

import { useWizard } from "../WizardContext";
import { ImpactBadge } from "../ImpactBadge";
import { cn } from "@/lib/utils";
import { Building } from "lucide-react";

export function StepMarket() {
    const { state, updateState } = useWizard();

    const countries = [
        { id: "Egypt", name: "Egypt", icon: "🇪🇬", sub: "Gateway to Africa" },
        { id: "UAE", name: "UAE", icon: "🇦🇪", sub: "Global Hub" },
        { id: "USA", name: "USA", icon: "🇺🇸", sub: "Global Standard" },
    ];

    return (
        <div className="space-y-10">
            <div className="space-y-4">
                <label className="text-lg font-semibold text-foreground flex items-center justify-between">
                    <span>Where is your target market?</span>
                    <ImpactBadge text="Impacts Jurisdiction" />
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {countries.map((c) => (
                        <button
                            key={c.id}
                            onClick={() => updateState({ country: c.id as "Egypt" | "UAE" | "USA" })}
                            className={cn(
                                "group relative flex flex-col items-center justify-center rounded-2xl border-2 p-6 shadow-sm focus:outline-none transition-all duration-300 hover:shadow-md",
                                state.country === c.id
                                    ? "border-primary bg-primary/5 ring-0"
                                    : "border-border bg-card hover:border-primary/50"
                            )}
                        >
                            <span className="text-4xl mb-3 filter drop-shadow-sm transition-transform group-hover:scale-110 duration-300">{c.icon}</span>
                            <span className="text-lg font-bold text-foreground">{c.name}</span>
                            <span className="text-xs text-muted-foreground font-medium mt-1 uppercase tracking-wide">{c.sub}</span>

                            {state.country === c.id && (
                                <div className="absolute top-3 right-3 text-primary">
                                    <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-sm">
                                        <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {state.country && (
                <div className="space-y-4 pt-6 border-t border-border animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <label className="text-lg font-semibold text-foreground flex items-center justify-between">
                        <span>Preferred Location Type?</span>
                        <ImpactBadge text="Impacts Legal Form" className="bg-purple-500/10 text-purple-500 ring-purple-500/20" />
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {["Mainland", "Free Zone"].map((zone) => (
                            <button
                                key={zone}
                                onClick={() => updateState({ zone: zone as "Mainland" | "Free Zone" })}
                                className={cn(
                                    "relative flex items-center p-5 rounded-xl border-2 transition-all duration-200 text-left",
                                    state.zone === zone
                                        ? "border-primary bg-card shadow-md ring-1 ring-primary/20"
                                        : "border-border bg-muted/30 hover:bg-card hover:border-primary/50 hover:shadow-sm"
                                )}
                            >
                                <div className={cn(
                                    "p-3 rounded-lg mr-4 transition-colors duration-200",
                                    state.zone === zone ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground border border-border"
                                )}>
                                    <Building className="h-6 w-6" />
                                </div>
                                <div>
                                    <span className={cn(
                                        "block text-base font-semibold",
                                        state.zone === zone ? "text-primary" : "text-foreground"
                                    )}>{zone}</span>
                                    {state.country === "Egypt" && zone === "Free Zone" && (
                                        <span className="block text-xs text-muted-foreground mt-1">e.g. Nasr City Public Free Zone</span>
                                    )}
                                    {state.country === "UAE" && zone === "Free Zone" && (
                                        <span className="block text-xs text-muted-foreground mt-1">e.g. DMCC, ADGM, DIFC</span>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
