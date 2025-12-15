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
                <label className="block text-sm font-medium text-gray-700">Client Name / Business Name</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                        required
                        type="text"
                        className="block w-full rounded-md border-gray-300 pl-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 border"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Hassan Group"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Client Type</label>
                <div className="mt-2 flex gap-4">
                    <button
                        type="button"
                        onClick={() => setFormData({ ...formData, type: "Corporate" })}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md border ${formData.type === "Corporate" ? "bg-indigo-50 border-indigo-500 text-indigo-700" : "bg-white border-gray-300 text-gray-700"}`}
                    >
                        <Building2 className="h-4 w-4" /> Corporate
                    </button>
                    <button
                        type="button"
                        onClick={() => setFormData({ ...formData, type: "Individual" })}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md border ${formData.type === "Individual" ? "bg-indigo-50 border-indigo-500 text-indigo-700" : "bg-white border-gray-300 text-gray-700"}`}
                    >
                        <User className="h-4 w-4" /> Individual
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Main Contact</label>
                    <input
                        required
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 border px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        placeholder="Mr. Ahmed"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Phone className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            required
                            type="text"
                            className="block w-full rounded-md border-gray-300 pl-9 border py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+20..."
                        />
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Email (for invoicing)</label>
                <div className="relative mt-1 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Mail className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                        required
                        type="email"
                        className="block w-full rounded-md border-gray-300 pl-9 border py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
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
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    checked={formData.portalAccess}
                    onChange={(e) => setFormData({ ...formData, portalAccess: e.target.checked })}
                />
                <label htmlFor="portal-access" className="text-sm text-gray-900">
                    Enable Client Portal Access?
                </label>
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
                    {isLoading ? "Saving..." : "Create Client"}
                </button>
            </div>
        </form>
    );
}
