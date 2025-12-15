"use client";

import { useWizard } from "../WizardContext";
import { ImpactBadge } from "../ImpactBadge";
import { cn } from "@/lib/utils";
import { Users, User, ShieldAlert } from "lucide-react";

export function StepOwnership() {
    const { state, updateState } = useWizard();

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">

            {/* Shareholders Count */}
            <div className="space-y-4">
                <label className="text-base font-semibold text-foreground flex items-center justify-between">
                    <span>How many shareholders?</span>
                    <ImpactBadge text="Legal Structure" />
                </label>
                <div className="flex items-center gap-4">
                    <input
                        type="range"
                        min="1"
                        max="10"
                        value={state.shareholders}
                        onChange={(e) => updateState({ shareholders: parseInt(e.target.value) })}
                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="min-w-[50px] text-center font-bold text-lg text-primary border border-primary/20 bg-primary/10 rounded px-2 py-1">
                        {state.shareholders}
                    </div>
                </div>
                <p className="text-xs text-muted-foreground">
                    {state.shareholders === 1 && "Note: Only Sole Proprietorship and certain LLC types allow single ownership."}
                    {state.shareholders >= 3 && "Note: Sufficient for SAE formation."}
                </p>
            </div>

            {/* Nationality */}
            <div className="space-y-4">
                <label className="text-base font-semibold text-foreground flex items-center justify-between">
                    <span>Nationality of Shareholders?</span>
                    <ImpactBadge text="Security Clearance" />
                </label>
                <div className="grid grid-cols-3 gap-3">
                    {["Local", "Foreign", "Mixed"].map((nat) => (
                        <button
                            key={nat}
                            onClick={() => updateState({ nationality: nat as "Local" | "Foreign" | "Mixed" })}
                            className={cn(
                                "py-3 px-2 rounded-lg border text-sm font-medium transition-all flex flex-col items-center gap-2",
                                state.nationality === nat
                                    ? "border-primary bg-primary/10 text-primary ring-1 ring-primary"
                                    : "border-border hover:bg-muted text-foreground"
                            )}
                        >
                            {nat === "Local" && <User className="h-5 w-5" />}
                            {nat === "Foreign" && <GlobeIcon className="h-5 w-5" />}
                            {nat === "Mixed" && <Users className="h-5 w-5" />}
                            {nat}
                        </button>
                    ))}
                </div>

                {state.country === "Egypt" && (state.nationality === "Foreign" || state.nationality === "Mixed") && (
                    <div className="rounded-md bg-yellow-500/10 p-4 border border-yellow-500/20 animate-in fade-in">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <ShieldAlert className="h-5 w-5 text-yellow-500" />
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-yellow-600">Security Clearance Required</h3>
                                <div className="mt-2 text-sm text-yellow-600/90">
                                    <p>Foreign ownership in Egypt typically triggers a security clearance process (approx. 4-8 weeks).</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function GlobeIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
    )
}
