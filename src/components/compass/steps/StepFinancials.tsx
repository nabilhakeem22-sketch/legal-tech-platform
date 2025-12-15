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
                <label className="text-base font-semibold text-foreground flex items-center justify-between">
                    <span>Estimated Initial Capital</span>
                    <ImpactBadge text="Determines Structure Options" />
                </label>

                <div className="grid grid-cols-1 gap-4">
                    {tiers.map((tier) => (
                        <div
                            key={tier.id}
                            onClick={() => updateState({ capital: tier.id as "Low" | "Medium" | "High" })}
                            className={cn(
                                "relative flex cursor-pointer rounded-lg border bg-card p-4 shadow-sm hover:border-primary/50 transition-all items-center",
                                state.capital === tier.id ? "border-primary ring-2 ring-primary bg-primary/5" : "border-border"
                            )}
                        >
                            <div className={cn("p-3 rounded-full mr-4 border", state.capital === tier.id ? "bg-card border-primary/20" : "bg-muted border-border")}>
                                <tier.icon className={cn("h-6 w-6", state.capital === tier.id ? "text-primary" : "text-muted-foreground")} />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-foreground">{tier.label}</h4>
                                <p className="text-sm text-muted-foreground">{tier.desc}</p>
                            </div>
                            {state.capital === tier.id && (
                                <div className="h-5 w-5 bg-primary rounded-full flex items-center justify-center">
                                    <span className="text-primary-foreground text-xs">✓</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="pt-4">
                    <label className="text-base font-semibold text-foreground flex items-center justify-between mb-3">
                        <span>Speed Priority</span>
                        <ImpactBadge text="Impacts Scoring" />
                    </label>
                    <div className="flex gap-4">
                        <button
                            onClick={() => updateState({ speed: "Standard" })}
                            className={cn(
                                "flex-1 py-3 px-4 rounded-lg border text-sm font-medium transition-all",
                                state.speed === "Standard" ? "border-primary bg-primary/10 text-primary ring-1 ring-primary" : "border-border hover:bg-muted bg-card"
                            )}
                        >
                            Standard Timeline
                        </button>
                        <button
                            onClick={() => updateState({ speed: "Fast" })}
                            className={cn(
                                "flex-1 py-3 px-4 rounded-lg border text-sm font-medium transition-all",
                                state.speed === "Fast" ? "border-primary bg-primary/10 text-primary ring-1 ring-primary" : "border-border hover:bg-muted bg-card"
                            )}
                        >
                            Need it ASAP ⚡
                        </button>
                    </div>
                </div>

                {state.country === "Egypt" && state.capital === "Low" && (
                    <p className="text-sm text-yellow-600 bg-yellow-500/10 p-2 rounded border border-yellow-500/20 mt-4">
                        Note: Joint Stock Companies (SAE) require 250k EGP minimum capital, so that option will be hidden.
                    </p>
                )}
            </div>
        </div>
    );
}
