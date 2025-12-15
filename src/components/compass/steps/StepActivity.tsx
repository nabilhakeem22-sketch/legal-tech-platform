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
                <label className="text-base font-semibold text-foreground flex items-center justify-between">
                    <span>What is your primary activity?</span>
                    <ImpactBadge text="Determines License Type" />
                </label>
                <div className="grid grid-cols-2 gap-4">
                    {activities.map((act) => (
                        <div
                            key={act}
                            onClick={() => updateState({ activity: act as "Trading" | "Manufacturing" | "Service" | "Crypto" })}
                            className={cn(
                                "relative flex cursor-pointer rounded-lg border bg-card p-4 shadow-sm hover:border-primary/50 transition-all",
                                state.activity === act ? "border-primary ring-2 ring-primary bg-primary/5" : "border-border"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <div className={cn("p-2 rounded-lg", state.activity === act ? "bg-card text-primary" : "bg-muted text-muted-foreground")}>
                                    <Briefcase className="h-5 w-5" />
                                </div>
                                <span className="font-medium text-foreground">{act}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <label className="text-base font-semibold text-foreground flex items-center justify-between">
                    <span>Do you need a physical showroom?</span>
                    <ImpactBadge text="Impacts Office Requirements" />
                </label>
                <div className="flex gap-4">
                    <button
                        onClick={() => updateState({ hasShowroom: true })}
                        className={cn(
                            "flex-1 py-3 px-4 rounded-lg border text-sm font-medium transition-all flex items-center justify-center gap-2",
                            state.hasShowroom ? "border-primary bg-primary/10 text-primary ring-1 ring-primary" : "border-border hover:bg-muted"
                        )}
                    >
                        <Store className="h-4 w-4" /> Yes, required
                    </button>
                    <button
                        onClick={() => updateState({ hasShowroom: false })}
                        className={cn(
                            "flex-1 py-3 px-4 rounded-lg border text-sm font-medium transition-all",
                            state.hasShowroom === false ? "border-muted-foreground bg-muted text-foreground ring-1 ring-muted-foreground" : "border-border hover:bg-muted"
                        )}
                    >
                        No, virtual office is fine
                    </button>
                </div>
            </div>
        </div>
    );
}
