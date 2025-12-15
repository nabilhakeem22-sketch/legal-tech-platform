"use client";

import { useWizard } from "../WizardContext";
import { Check, ArrowRight, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function StepJurisdictionSelection() {
    const { jurisdictionRecs, selectJurisdiction } = useWizard();

    if (jurisdictionRecs.length === 0) {
        return (
            <div className="text-center py-20 bg-muted/30 rounded-2xl border-2 border-dashed border-border">
                <h3 className="text-xl font-bold text-foreground">No specific jurisdictions found.</h3>
                <p className="text-muted-foreground mt-2">Try adjusting your filters (e.g. Activity or Capital).</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-foreground">Recommended Jurisdictions</h2>
                <p className="text-muted-foreground">Based on your activity, capital, and preferences.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {jurisdictionRecs.map((rec) => (
                    <div
                        key={rec.id}
                        onClick={() => selectJurisdiction(rec.entity)}
                        className={cn(
                            "group relative overflow-hidden rounded-xl border-2 bg-card p-6 shadow-sm transition-all cursor-pointer hover:shadow-lg",
                            rec.isBestMatch ? "border-primary ring-4 ring-primary/10" : "border-border hover:border-primary/50"
                        )}
                    >
                        {rec.isBestMatch && (
                            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-bold rounded-bl-lg">
                                Best Match
                            </div>
                        )}

                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-muted rounded-lg group-hover:bg-primary/10 transition-colors">
                                    <Building2 className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                                        {rec.entity.name}
                                    </h3>
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                                        <span className="font-semibold">{rec.entity.type}</span>
                                        <span>•</span>
                                        <span>{rec.entity.country}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-foreground">{rec.matchScore}%</div>
                                <div className="text-xs text-muted-foreground font-medium uppercase">Match Score</div>
                            </div>
                        </div>

                        <p className="text-muted-foreground mb-6 border-l-2 border-primary/20 pl-4">{rec.entity.description}</p>

                        <div className="flex flex-wrap gap-2">
                            {rec.pros.slice(0, 3).map((p, i) => (
                                <span key={i} className="inline-flex items-center rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-500 border border-green-500/20">
                                    <Check className="mr-1 h-3 w-3" /> {p}
                                </span>
                            ))}
                            {rec.cons.length > 0 && (
                                <span className="inline-flex items-center rounded-full bg-red-500/10 px-2.5 py-0.5 text-xs font-medium text-red-500 border border-red-500/20">
                                    {rec.cons[0]}
                                </span>
                            )}
                        </div>

                        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                            <ArrowRight className="h-6 w-6 text-primary" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
