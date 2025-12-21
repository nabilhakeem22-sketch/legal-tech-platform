"use client";

import { useState } from "react";
import { Compass, FileText, Users, Building2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { IncorporationWizard } from "@/components/compass/IncorporationWizard";
import { GovernanceModule } from "@/components/compass/modules/GovernanceModule";
import { MeetingsModule } from "@/components/compass/modules/MeetingsModule";
import { AgreementsModule } from "@/components/compass/modules/AgreementsModule";

type ViewState = "menu" | "incorporation" | "governance" | "meetings" | "agreements";

export default function CompassPage() {
    const [view, setView] = useState<ViewState>("menu");

    const modules = [
        {
            id: "incorporation",
            title: "Incorporation Navigator",
            description: "Start your business right. Step-by-step guidance to form your company.",
            icon: Compass,
            color: "text-indigo-400",
            bg: "bg-indigo-500/10",
            borderColor: "border-indigo-500/20",
        },
        {
            id: "governance",
            title: "License & Governance",
            description: "Manage regulatory status, renewals, and board governance.",
            icon: Building2,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            borderColor: "border-emerald-500/20",
        },
        {
            id: "meetings",
            title: "General Assembly",
            description: "Organize and document shareholder meetings and minutes.",
            icon: Users,
            color: "text-amber-400",
            bg: "bg-amber-500/10",
            borderColor: "border-amber-500/20",
        },
        {
            id: "agreements",
            title: "Agreements & Contracts",
            description: "Draft, review, and manage your legal documents securely.",
            icon: FileText,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            borderColor: "border-blue-500/20",
        }
    ];

    const renderContent = () => {
        switch (view) {
            case "incorporation":
                return <IncorporationWizard onBack={() => setView("menu")} />;
            case "governance":
                return <GovernanceModule onBack={() => setView("menu")} />;
            case "meetings":
                return <MeetingsModule onBack={() => setView("menu")} />;
            case "agreements":
                return <AgreementsModule onBack={() => setView("menu")} />;
            default:
                return (
                    <div className="max-w-6xl mx-auto space-y-12 py-10">
                        {/* Header */}
                        <div className="text-center space-y-4">
                            <motion.h1
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent"
                            >
                                Compliance Compass
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="text-slate-400 text-lg max-w-2xl mx-auto"
                            >
                                Your comprehensive operating system for corporate legal management. Select a module to begin.
                            </motion.p>
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {modules.map((module, index) => (
                                <motion.div
                                    key={module.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + (index * 0.1) }}
                                    onClick={() => setView(module.id as ViewState)}
                                    className={cn(
                                        "group relative overflow-hidden rounded-2xl border bg-[#0f172a] p-8 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] cursor-pointer",
                                        module.borderColor
                                    )}
                                >
                                    <div className={cn(
                                        "absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 rounded-full blur-3xl opacity-20",
                                        module.bg.replace('/10', '/30')
                                    )} />

                                    <div className="relative z-10 flex items-start justify-between">
                                        <div className={cn("p-3 rounded-xl", module.bg)}>
                                            <module.icon className={cn("h-8 w-8", module.color)} />
                                        </div>
                                        <ArrowRight className="h-5 w-5 text-slate-500 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                                    </div>

                                    <div className="relative z-10 mt-6 space-y-2">
                                        <h3 className="text-2xl font-semibold text-slate-100">{module.title}</h3>
                                        <p className="text-slate-400 leading-relaxed">{module.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                );
        }
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={view}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
            >
                {renderContent()}
            </motion.div>
        </AnimatePresence>
    );
}

