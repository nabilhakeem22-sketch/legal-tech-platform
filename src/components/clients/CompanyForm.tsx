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
                <label className="block text-sm font-medium text-gray-700">Official Arabic Name</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                        required
                        type="text"
                        dir="rtl"
                        className="block w-full rounded-md border-gray-300 border py-2 px-3 text-right focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={formData.nameArabic}
                        onChange={(e) => setFormData({ ...formData, nameArabic: e.target.value })}
                        placeholder="شركة حسن للتجارة..."
                    />
                </div>
                <p className="mt-1 text-xs text-gray-500 text-right">Crucial for government filings</p>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">English Name (Internal)</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Globe className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                        required
                        type="text"
                        className="block w-full rounded-md border-gray-300 pl-9 border py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={formData.nameEnglish}
                        onChange={(e) => setFormData({ ...formData, nameEnglish: e.target.value })}
                        placeholder="Hassan Trading LLC"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Legal Form</label>
                    <select
                        className="mt-1 block w-full rounded-md border-gray-300 border py-2 px-3 text-sm focus:border-indigo-500 focus:ring-indigo-500"
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
                    <label className="block text-sm font-medium text-gray-700">Capital (EGP)</label>
                    <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 border px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={formData.capital}
                        onChange={(e) => setFormData({ ...formData, capital: e.target.value })}
                        placeholder="50,000"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Commercial Register #</label>
                    <input
                        required
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 border px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 font-mono"
                        value={formData.crNumber}
                        onChange={(e) => setFormData({ ...formData, crNumber: e.target.value })}
                        placeholder="123456"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tax ID #</label>
                    <input
                        required
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 border px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 font-mono"
                        value={formData.taxId}
                        onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                        placeholder="xxx-xxx-xxx"
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 disabled:opacity-50"
                >
                    {isLoading ? "Saving..." : "Create Company"}
                </button>
            </div>
        </form>
    );
}
