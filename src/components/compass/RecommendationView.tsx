"use client";

import { useWizard } from "./WizardContext";
import { Check, X, ArrowRight, ShieldCheck, Download } from "lucide-react";
import { cn } from "@/lib/utils";

export function RecommendationView() {
    const { jurisdictionRecs: recommendations, state } = useWizard();

    if (!recommendations || recommendations.length === 0) {
        return (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">No matching structure found.</h3>
                <p className="text-gray-500 mt-2">Try adjusting your capital or activity filters to find a match.</p>
            </div>
        );
    }

    // Get best match and others
    const bestMatch = recommendations.find(r => r.isBestMatch) || recommendations[0];
    const others = recommendations.filter(r => r.id !== bestMatch.id);

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="text-center space-y-3">
                <div className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                    <Check className="mr-1.5 h-4 w-4" /> Recommendation Engine Complete
                </div>
                <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                    Your Ideal Structure
                </h2>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                    Based on your requirements for <span className="font-semibold text-gray-900">{state.activity}</span> in <span className="font-semibold text-gray-900">{state.country}</span>.
                </p>
            </div>

            {/* Hero Card - Best Match */}
            <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-gray-900/5">
                <div className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 rounded-full bg-indigo-50 opacity-50 blur-3xl pointer-events-none"></div>

                <div className="flex flex-col lg:flex-row">
                    {/* Left: Content */}
                    <div className="flex-1 p-8 lg:p-12 relative z-10">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-16 w-16 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg text-white">
                                <ShieldCheck className="h-8 w-8" />
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-gray-900">{bestMatch.entity.name}</h3>
                                <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                                    <span className="flex items-center"><span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-2"></span>{bestMatch.entity.attributes.costTier} Cost</span>
                                    <span className="flex items-center"><span className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2"></span>{bestMatch.entity.attributes.speed} Setup</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-gray-600 text-lg mb-8 leading-relaxed border-l-4 border-indigo-100 pl-4">
                            {bestMatch.entity.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div>
                                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
                                    <span className="bg-green-100 text-green-700 p-1.5 rounded-lg"><Check className="h-4 w-4" /></span> Why this works
                                </h4>
                                <ul className="space-y-3">
                                    {bestMatch.pros.map((p, i) => (
                                        <li key={i} className="text-sm text-gray-600 flex items-start">
                                            <span className="text-green-500 mr-2 mt-0.5">✓</span> {p}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
                                    <span className="bg-red-100 text-red-700 p-1.5 rounded-lg"><X className="h-4 w-4" /></span> Consider This
                                </h4>
                                <ul className="space-y-3">
                                    {bestMatch.cons.map((c, i) => (
                                        <li key={i} className="text-sm text-gray-600 flex items-start">
                                            <span className="text-red-400 mr-2 mt-0.5">•</span> {c}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right: Score & Action */}
                    <div className="lg:w-80 bg-gray-50 p-8 lg:p-12 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-gray-100">
                        {/* Match Score Circle */}
                        <div className="flex flex-col items-center mb-8">
                            <div className="relative h-32 w-32">
                                <svg className="h-full w-full rotate-[-90deg]" viewBox="0 0 36 36">
                                    <path className="text-gray-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                                    <path className={cn("text-indigo-600 transition-all duration-1000", bestMatch.matchScore > 90 ? "text-green-500" : "text-indigo-600")} strokeDasharray={`${bestMatch.matchScore}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center flex-col">
                                    <span className="text-3xl font-bold text-gray-900">{bestMatch.matchScore}%</span>
                                    <span className="text-xs font-semibold text-gray-500 uppercase">Match</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <button className="w-full rounded-xl bg-indigo-600 px-4 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-500 hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                                Start Incorporation <ArrowRight className="h-4 w-4" />
                            </button>
                            <button className="w-full rounded-xl bg-white border-2 border-gray-200 px-4 py-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2">
                                <Download className="h-4 w-4" /> Download Report
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Other Options */}
            {others.length > 0 && (
                <div className="max-w-4xl mx-auto">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Alternative Structures</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {others.map(other => (
                            <div key={other.id} className="group flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer">
                                <div>
                                    <div className="flex justify-between items-start mb-3">
                                        <h4 className="font-bold text-gray-900 text-lg group-hover:text-indigo-600 transition-colors">{other.entity.name}</h4>
                                        <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2.5 py-1 rounded-full">{other.matchScore}% Match</span>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">{other.entity.description}</p>
                                </div>
                                <div className="flex items-center text-sm font-medium text-indigo-600 group-hover:translate-x-1 transition-transform">
                                    View Analysis <ArrowRight className="ml-1 h-3 w-3" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
