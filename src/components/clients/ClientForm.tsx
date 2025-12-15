"use client";

import { useState } from "react";
import { User, Building2, Mail, Phone } from "lucide-react";

export interface ClientData {
    name: string;
    type: "Individual" | "Corporate";
    contactName: string;
    email: string;
    phone: string;
    portalAccess: boolean;
}

interface ClientFormProps {
    onSubmit: (data: ClientData) => Promise<void>;
    onCancel: () => void;
}

export function ClientForm({ onSubmit, onCancel }: ClientFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<ClientData>({
        name: "",
        type: "Corporate",
        contactName: "",
        email: "",
        phone: "",
        portalAccess: false
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await onSubmit(formData);
        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-foreground">Client Name / Business Name</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                        required
                        type="text"
                        className="block w-full rounded-md border-input bg-background pl-3 focus:border-primary focus:ring-primary sm:text-sm py-2 border text-foreground placeholder:text-muted-foreground"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Hassan Group"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-foreground">Client Type</label>
                <div className="mt-2 flex gap-4">
                    <button
                        type="button"
                        onClick={() => setFormData({ ...formData, type: "Corporate" })}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md border transition-all ${formData.type === "Corporate" ? "bg-primary/10 border-primary text-primary" : "bg-background border-border text-muted-foreground hover:bg-muted"}`}
                    >
                        <Building2 className="h-4 w-4" /> Corporate
                    </button>
                    <button
                        type="button"
                        onClick={() => setFormData({ ...formData, type: "Individual" })}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md border transition-all ${formData.type === "Individual" ? "bg-primary/10 border-primary text-primary" : "bg-background border-border text-muted-foreground hover:bg-muted"}`}
                    >
                        <User className="h-4 w-4" /> Individual
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-foreground">Main Contact</label>
                    <input
                        required
                        type="text"
                        className="mt-1 block w-full rounded-md border-input bg-background border px-3 py-2 text-sm focus:border-primary focus:ring-primary text-foreground placeholder:text-muted-foreground"
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        placeholder="Mr. Ahmed"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-foreground">Phone</label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <input
                            required
                            type="text"
                            className="block w-full rounded-md border-input bg-background pl-9 border py-2 text-sm focus:border-primary focus:ring-primary text-foreground placeholder:text-muted-foreground"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+20..."
                        />
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-foreground">Email (for invoicing)</label>
                <div className="relative mt-1 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <input
                        required
                        type="email"
                        className="block w-full rounded-md border-input bg-background pl-9 border py-2 text-sm focus:border-primary focus:ring-primary text-foreground placeholder:text-muted-foreground"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="admin@example.com"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2 mt-2">
                <input
                    id="portal-access"
                    type="checkbox"
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary bg-background"
                    checked={formData.portalAccess}
                    onChange={(e) => setFormData({ ...formData, portalAccess: e.target.checked })}
                />
                <label htmlFor="portal-access" className="text-sm text-foreground">
                    Enable Client Portal Access?
                </label>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-md hover:bg-muted"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90 disabled:opacity-50"
                >
                    {isLoading ? "Saving..." : "Create Client"}
                </button>
            </div>
        </form>
    );
}
