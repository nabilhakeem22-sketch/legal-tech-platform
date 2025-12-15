"use client";

import { useWizard } from "../WizardContext";
import { getRoadmap } from "../roadmaps";
import { Clock, CheckCircle2, Download, Building } from "lucide-react";

export function StepRoadmap() {
    const { selectedJurisdiction, selectedLegalForm } = useWizard();

    if (!selectedJurisdiction || !selectedLegalForm) return null;

    const roadmap = getRoadmap(selectedJurisdiction.type, selectedLegalForm.id);

    return (
        <div className="space-y-10 animate-in fade-in zoom-in-95 duration-700">
            {/* Header */}
            <div className="bg-primary/95 rounded-3xl p-8 text-primary-foreground relative overflow-hidden shadow-xl border border-primary/20">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-white/10 opacity-5 blur-3xl pointer-events-none"></div>
                <div className="relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-black/20 px-4 py-1.5 rounded-full text-sm font-medium border border-white/10 mb-4">
                        <CheckCircle2 className="h-4 w-4 text-green-400" /> Structure Finalized
                    </div>
                    <h2 className="text-3xl font-bold mb-2">Your Company Roadmap</h2>
                    <p className="text-primary-foreground/80 text-lg">
                        {selectedLegalForm.name} in {selectedJurisdiction.name}
                    </p>
                </div>
            </div>

            {/* Timeline */}
            <div className="max-w-3xl mx-auto px-4">
                <div className="relative border-l-2 border-primary/20 pl-8 space-y-10 py-4">
                    {roadmap.steps.map((step, idx) => (
                        <div key={step.id} className="relative group">
                            {/* Dot */}
                            <div className="absolute -left-[41px] top-1 h-6 w-6 rounded-full border-4 border-background bg-primary shadow-md flex items-center justify-center group-hover:scale-110 transition-transform">
                                <span className="text-[10px] text-primary-foreground font-bold">{idx + 1}</span>
                            </div>

                            {/* Card */}
                            <div className="bg-card rounded-xl border border-border p-5 shadow-sm hover:shadow-md hover:border-primary/50 transition-all">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="text-lg font-bold text-foreground">{step.title}</h4>
                                    <span className="flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md">
                                        <Clock className="h-3 w-3" /> {step.duration}
                                    </span>
                                </div>
                                <p className="text-muted-foreground text-sm">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-center gap-4 pt-6 border-t border-border">
                <button className="rounded-xl bg-primary px-8 py-3 text-sm font-bold text-primary-foreground shadow-lg hover:bg-primary/90 hover:-translate-y-0.5 transition-all flex items-center gap-2">
                    <Building className="h-4 w-4" /> Begin Incorporation
                </button>
                <button className="rounded-xl bg-card border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-all flex items-center gap-2">
                    <Download className="h-4 w-4" /> Download PDF Guide
                </button>
            </div>
        </div>
    );
}
