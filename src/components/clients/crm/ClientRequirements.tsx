"use client";

import { FileQuestion, MessageCircle } from "lucide-react";

export function ClientRequirements() {
    return (
        <div className="bg-card border border-border rounded-lg shadow-sm p-6">
            <h3 className="font-semibold text-foreground mb-4">Open Requirements</h3>
            <div className="space-y-3">
                <div className="p-3 bg-muted/40 rounded-lg border border-border">
                    <div className="flex items-start gap-3">
                        <FileQuestion className="w-5 h-5 text-orange-500 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-foreground">Missing Tax ID Document</p>
                            <p className="text-xs text-muted-foreground mt-1">Requested 3 days ago for &apos;TechCorp LLC&apos;</p>
                        </div>
                    </div>
                </div>
                <div className="p-3 bg-muted/40 rounded-lg border border-border">
                    <div className="flex items-start gap-3">
                        <MessageCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-foreground">Inquiry: Expansion to KSA</p>
                            <p className="text-xs text-muted-foreground mt-1">Received yesterday via Email</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
