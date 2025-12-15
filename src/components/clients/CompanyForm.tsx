"use client";

import { useState } from "react";
import { Globe } from "lucide-react";

interface CompanyData {
    nameEnglish: string;
    nameArabic: string;
    legalForm: string;
    crNumber: string;
    taxId: string;
    capital: string;
}

interface CompanyFormProps {
    onSubmit: (data: CompanyData) => Promise<void>;
    onCancel: () => void;
}

export function CompanyForm({ onSubmit, onCancel }: CompanyFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        nameEnglish: "",
        nameArabic: "",
        legalForm: "LLC",
        crNumber: "",
        taxId: "",
        capital: ""
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
                <label className="block text-sm font-medium text-foreground">Official Arabic Name</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                        required
                        type="text"
                        dir="rtl"
                        className="block w-full rounded-md border-input bg-background border py-2 px-3 text-right focus:border-primary focus:ring-primary sm:text-sm text-foreground placeholder:text-muted-foreground"
                        value={formData.nameArabic}
                        onChange={(e) => setFormData({ ...formData, nameArabic: e.target.value })}
                        placeholder="شركة حسن للتجارة..."
                    />
                </div>
                <p className="mt-1 text-xs text-muted-foreground text-right">Crucial for government filings</p>
            </div>

            <div>
                <label className="block text-sm font-medium text-foreground">English Name (Internal)</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <input
                        required
                        type="text"
                        className="block w-full rounded-md border-input bg-background pl-9 border py-2 text-sm focus:border-primary focus:ring-primary text-foreground placeholder:text-muted-foreground"
                        value={formData.nameEnglish}
                        onChange={(e) => setFormData({ ...formData, nameEnglish: e.target.value })}
                        placeholder="Hassan Trading LLC"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-foreground">Legal Form</label>
                    <select
                        className="mt-1 block w-full rounded-md border-input bg-background border py-2 px-3 text-sm focus:border-primary focus:ring-primary text-foreground"
                        value={formData.legalForm}
                        onChange={(e) => setFormData({ ...formData, legalForm: e.target.value })}
                    >
                        <option value="LLC">LLC (Limited Liability)</option>
                        <option value="Sole">Sole Proprietorship</option>
                        <option value="SAE">SAE (Joint Stock Corp)</option>
                        <option value="OPC">One-Person Company</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-foreground">Capital (EGP)</label>
                    <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-input bg-background border px-3 py-2 text-sm focus:border-primary focus:ring-primary text-foreground placeholder:text-muted-foreground"
                        value={formData.capital}
                        onChange={(e) => setFormData({ ...formData, capital: e.target.value })}
                        placeholder="50,000"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-foreground">Commercial Register #</label>
                    <input
                        required
                        type="text"
                        className="mt-1 block w-full rounded-md border-input bg-background border px-3 py-2 text-sm focus:border-primary focus:ring-primary font-mono text-foreground placeholder:text-muted-foreground"
                        value={formData.crNumber}
                        onChange={(e) => setFormData({ ...formData, crNumber: e.target.value })}
                        placeholder="123456"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-foreground">Tax ID #</label>
                    <input
                        required
                        type="text"
                        className="mt-1 block w-full rounded-md border-input bg-background border px-3 py-2 text-sm focus:border-primary focus:ring-primary font-mono text-foreground placeholder:text-muted-foreground"
                        value={formData.taxId}
                        onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                        placeholder="xxx-xxx-xxx"
                    />
                </div>
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
                    {isLoading ? "Saving..." : "Create Company"}
                </button>
            </div>
        </form>
    );
}
