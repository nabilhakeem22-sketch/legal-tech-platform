"use client";

import { FileUpload } from "@/components/tax/FileUpload";
import { NotesSection } from "@/components/tax/NotesSection";
import { ArrowLeft, CheckCircle2, Building2, Calendar } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock data fetch based on ID
const getFilingDetails = (id: string) => {
    return {
        id,
        client: "Nile Textiles SAE",
        taxType: "VAT Return",
        period: "September 2025",
        status: "Preparation",
        deadline: "Oct 31, 2025 (5 Days left)",
        registrationNumber: "392-192-441",
    };
};

export default function FilingDetailsPage() {
    // Correct way to unwrap params in Next.js 15+ (if strictly enforced), 
    // but standard useParams works in client components.
    const params = useParams();
    const id = params?.id as string || "1";
    const filing = getFilingDetails(id);

    return (
        <div className="space-y-6 pb-10">
            {/* Header */}
            <div>
                <Link href="/tax" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-4">
                    <ArrowLeft className="mr-1 h-4 w-4" /> Back to Tracker
                </Link>
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">{filing.client}</h2>
                        <p className="text-gray-500 mt-1 flex items-center gap-4">
                            <span className="flex items-center gap-1"><Building2 className="h-4 w-4" /> Reg: {filing.registrationNumber}</span>
                            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> Period: {filing.period}</span>
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="inline-flex items-center rounded-md bg-yellow-50 px-3 py-1 text-sm font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                            Status: {filing.status}
                        </span>
                        <button className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Mark as Reviewed
                        </button>
                    </div>
                </div>
            </div>

            {/* Workflow Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Docs */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <h3 className="font-semibold text-gray-900 mb-4">Filing Details</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-500">Tax Type</p>
                                <p className="font-medium">{filing.taxType}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Deadline</p>
                                <p className="font-medium text-orange-600">{filing.deadline}</p>
                            </div>
                        </div>
                    </div>

                    <FileUpload />
                </div>

                {/* Right Column: Actions & Notes */}
                <div className="space-y-6 h-full">
                    <NotesSection />
                </div>
            </div>
        </div>
    );
}
