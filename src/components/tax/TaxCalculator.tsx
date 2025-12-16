"use client";

import { useState, useEffect } from "react";
import { DollarSign, TrendingUp, Calculator, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Country = "Egypt" | "UAE" | "KSA";

interface TaxRates {
    vat: number;
    corporate: number;
    currency: string;
    threshold?: number; // Corporate tax threshold
}

const taxRules: Record<Country, TaxRates> = {
    Egypt: { vat: 14, corporate: 22.5, currency: "EGP" },
    UAE: { vat: 5, corporate: 9, currency: "AED", threshold: 375000 },
    KSA: { vat: 15, corporate: 20, currency: "SAR" },
};

export function TaxCalculator() {
    const [country, setCountry] = useState<Country>("Egypt");
    const [revenue, setRevenue] = useState<number>(0);
    const [expenses, setExpenses] = useState<number>(0);
    const [results, setResults] = useState({ vat: 0, corporate: 0, total: 0, net: 0 });

    useEffect(() => {
        const rules = taxRules[country];

        // VAT Calculation (Simplified: Output VAT on Revenue)
        // In reality: VAT Payable = Output VAT - Input VAT (on valid expenses)
        // We'll assume expenses are vatable for this projection
        const vatPayable = (revenue * (rules.vat / 100)) - (expenses * (rules.vat / 100));

        // Corporate Tax Calculation
        const profit = revenue - expenses;
        let corpTax = 0;

        if (country === "UAE" && rules.threshold) {
            if (profit > rules.threshold) {
                corpTax = (profit - rules.threshold) * (rules.corporate / 100);
            }
        } else {
            corpTax = Math.max(0, profit * (rules.corporate / 100));
        }

        setResults({
            vat: Math.max(0, vatPayable),
            corporate: Math.max(0, corpTax),
            total: Math.max(0, vatPayable + corpTax),
            net: profit - Math.max(0, corpTax)
        });

    }, [revenue, expenses, country]);

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:h-[600px]">
            {/* Input Section */}
            <div className="space-y-6">
                <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Calculator className="h-5 w-5 text-primary" />
                        calculator parameters
                    </h3>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Jurisdiction</label>
                            <div className="grid grid-cols-3 gap-2">
                                {(Object.keys(taxRules) as Country[]).map((c) => (
                                    <button
                                        key={c}
                                        onClick={() => setCountry(c)}
                                        className={cn(
                                            "px-4 py-2 rounded-md text-sm font-medium transition-all border",
                                            country === c
                                                ? "bg-primary/10 border-primary text-primary"
                                                : "bg-background border-border text-muted-foreground hover:bg-muted"
                                        )}
                                    >
                                        {c}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Est. Monthly Revenue ({taxRules[country].currency})</label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="number"
                                    min="0"
                                    value={revenue || ""}
                                    onChange={(e) => setRevenue(Number(e.target.value))}
                                    className="block w-full pl-9 rounded-md border-border bg-muted/30 py-2 text-foreground focus:ring-primary focus:border-primary sm:text-sm"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Est. Monthly Expenses ({taxRules[country].currency})</label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="number"
                                    min="0"
                                    value={expenses || ""}
                                    onChange={(e) => setExpenses(Number(e.target.value))}
                                    className="block w-full pl-9 rounded-md border-border bg-muted/30 py-2 text-foreground focus:ring-primary focus:border-primary sm:text-sm"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4 flex gap-3">
                    <AlertCircle className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-700 dark:text-blue-400">
                        <p className="font-medium mb-1">Tax Logic Used:</p>
                        <ul className="list-disc pl-4 space-y-1 opacity-90">
                            {country === "Egypt" && <li>VAT 14% flat rate. 22.5% Corporate Tax on net profit.</li>}
                            {country === "UAE" && <li>VAT 5%. 9% Corporate Tax applies only to profit above 375,000 AED.</li>}
                            {country === "KSA" && <li>VAT 15%. 20% standard Corporate Income Tax rate.</li>}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-card dark:to-card/50 border border-border rounded-xl p-8 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-primary/20 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none"></div>

                    <h3 className="text-gray-400 font-medium text-sm mb-6 uppercase tracking-wider relative z-10">Projected Liability</h3>

                    <div className="space-y-6 relative z-10">
                        <div>
                            <div className="flex justify-between items-end mb-1">
                                <span className="text-3xl font-bold">{taxRules[country].currency} {results.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                                <span className="text-sm text-gray-400 mb-1">Total Due</span>
                            </div>
                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden flex">
                                <div style={{ width: `${(results.vat / (results.total || 1)) * 100}%` }} className="bg-blue-500 h-full"></div>
                                <div style={{ width: `${(results.corporate / (results.total || 1)) * 100}%` }} className="bg-emerald-500 h-full"></div>
                            </div>
                            <div className="flex justify-between text-xs mt-2 text-gray-400">
                                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> VAT</span>
                                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Corporate</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                            <div>
                                <p className="text-xs text-gray-400">VAT Payable</p>
                                <p className="text-lg font-semibold text-blue-400">{taxRules[country].currency} {results.vat.toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Corp. Tax</p>
                                <p className="text-lg font-semibold text-emerald-400">{taxRules[country].currency} {results.corporate.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="bg-white/5 rounded-lg p-4 mt-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-300">Net Profit (Post-Tax)</span>
                                <span className="font-bold text-lg text-white">{taxRules[country].currency} {results.net.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
