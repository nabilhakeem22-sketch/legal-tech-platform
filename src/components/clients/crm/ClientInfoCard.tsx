"use client";

import { Mail, Phone, MapPin, Globe, Building } from "lucide-react";

interface Client {
    contactName: string;
}

export function ClientInfoCard({ client }: { client: Client }) {
    return (
        <div className="bg-card border border-border rounded-lg shadow-sm p-6 space-y-6">
            <div className="flex justify-between items-start">
                <h3 className="font-semibold text-foreground">Client Details</h3>
                <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs rounded-full border border-green-500/20">Active Customer</span>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                    <Building className="w-4 h-4 text-muted-foreground" />
                    <div>
                        <p className="text-muted-foreground text-xs">Industry</p>
                        <p className="text-foreground font-medium">Technology & SaaS</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <div>
                        <p className="text-muted-foreground text-xs">Website</p>
                        <a href="#" className="text-primary hover:underline">www.techcorp.com</a>
                    </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <div>
                        <p className="text-muted-foreground text-xs">Headquarters</p>
                        <p className="text-foreground">Cairo, Egypt</p>
                    </div>
                </div>
            </div>

            <div className="border-t border-border pt-4">
                <h4 className="text-sm font-medium text-foreground mb-3">Primary Contact</h4>
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                        {client.contactName.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-foreground">{client.contactName}</p>
                        <p className="text-xs text-muted-foreground">CEO / Founder</p>
                        <div className="flex gap-2 mt-2">
                            <button className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-primary"><Mail className="w-3 h-3" /></button>
                            <button className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-primary"><Phone className="w-3 h-3" /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
