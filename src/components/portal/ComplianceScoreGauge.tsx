"use client";

import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

interface ComplianceScoreGaugeProps {
    score: number;
}

export function ComplianceScoreGauge({ score }: ComplianceScoreGaugeProps) {
    let color = "text-green-500";
    let bgColor = "bg-green-500/10";
    let Icon = CheckCircle;
    let text = "Excellent";

    if (score < 50) {
        color = "text-red-500";
        bgColor = "bg-red-500/10";
        Icon = XCircle;
        text = "Critical";
    } else if (score < 80) {
        color = "text-yellow-500";
        bgColor = "bg-yellow-500/10";
        Icon = AlertTriangle;
        text = "Needs Attention";
    }

    // Calculate circumference for the SVG circle
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="bg-card border border-border rounded-lg shadow-sm p-6 flex flex-col items-center justify-center">
            <h3 className="font-semibold text-foreground mb-4">Compliance Health</h3>

            <div className="relative w-40 h-40">
                {/* Background Circle */}
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="80"
                        cy="80"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="transparent"
                        className="text-muted/20"
                    />
                    {/* Progress Circle */}
                    <circle
                        cx="80"
                        cy="80"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        className={`${color} transition-all duration-1000 ease-out`}
                    />
                </svg>

                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-3xl font-bold ${color}`}>{score}%</span>
                </div>
            </div>

            <div className={`mt-4 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${bgColor} ${color}`}>
                <Icon className="w-4 h-4" />
                {text}
            </div>

            <p className="text-muted-foreground text-xs mt-4 text-center">
                Based on active filings and risk assessments.
            </p>
        </div>
    );
}
