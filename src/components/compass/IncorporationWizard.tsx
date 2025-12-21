"use client";

import { useWizard, WizardProvider } from "@/components/compass/WizardContext";
import { StepMarket } from "@/components/compass/steps/StepMarket";
import { StepActivity } from "@/components/compass/steps/StepActivity";
import { StepOwnership } from "@/components/compass/steps/StepOwnership";
import { StepFinancials } from "@/components/compass/steps/StepFinancials";
import { StepJurisdictionSelection } from "@/components/compass/steps/StepJurisdictionSelection";
import { StepLegalFormSelection } from "@/components/compass/steps/StepLegalFormSelection";
import { StepRoadmap } from "@/components/compass/steps/StepRoadmap";
import { ChevronRight, ChevronLeft, ArrowLeft, Compass } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface IncorporationWizardProps {
    onBack: () => void;
}

function WizardContent({ onBack }: IncorporationWizardProps) {
    const { step, nextStep, prevStep } = useWizard();

    const renderStep = () => {
        switch (step) {
            case 1: return <StepMarket />;
            case 2: return <StepActivity />;
            case 3: return <StepOwnership />;
            case 4: return <StepFinancials />;
            case 5: return <StepJurisdictionSelection />;
            case 6: return <StepLegalFormSelection />;
            case 7: return <StepRoadmap />;
            default: return <StepMarket />;
        }
    };

    const titles = [
        "Market", "Business", "Ownership", "Financials", "Jurisdiction", "Structure", "Roadmap"
    ];

    // Hide progress on final roadmap step
    const showProgress = step < 7;
    const progress = (step / 6) * 100;

    return (
        <div className="space-y-6">
            {/* Header with Back Button */}
            <div className="flex items-center space-x-4 mb-6">
                <button
                    onClick={onBack}
                    className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
                >
                    <ArrowLeft className="h-5 w-5" />
                </button>
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-indigo-500/10 rounded-lg">
                        <Compass className="h-6 w-6 text-indigo-400" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-white">Incorporation Navigator</h2>
                        <p className="text-sm text-slate-400">Step {step} of 6: {titles[step - 1]}</p>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            {showProgress && (
                <div className="mb-8">
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-indigo-500 transition-all duration-500 ease-in-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Card */}
            <div className={cn(
                "bg-[#0f172a] rounded-2xl shadow-sm border border-slate-800 transition-all duration-500",
                step === 7 ? "p-0 border-none shadow-none bg-transparent" : "p-8 md:p-12 min-h-[400px] flex flex-col"
            )}>
                <div className="flex-1 overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            {renderStep()}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation Buttons */}
                {step < 7 && (
                    <div className="mt-12 flex justify-between pt-6 border-t border-slate-800">
                        <button
                            onClick={prevStep}
                            disabled={step === 1}
                            className="flex items-center text-sm font-medium text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                        >
                            <ChevronLeft className="mr-1 h-4 w-4" /> Back
                        </button>

                        {/* Only show Next on input steps (1-4). Selection steps (5-6) have their own click handlers */}
                        {step < 5 && (
                            <button
                                onClick={nextStep}
                                className="rounded-lg bg-indigo-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 flex items-center transition-all active:scale-95"
                            >
                                Next Step <ChevronRight className="ml-1 h-4 w-4" />
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export function IncorporationWizard(props: IncorporationWizardProps) {
    return (
        <WizardProvider>
            <WizardContent {...props} />
        </WizardProvider>
    );
}
