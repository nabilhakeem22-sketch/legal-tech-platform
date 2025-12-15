"use client";

import { CheckCircle2, Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Filing {
    id: string;
    client: string;
    taxType: string;
    period: string;
    status: "Pending Docs" | "Preparation" | "Under Review" | "Filed" | "Paid";
    deadline: string;
}

const filings: Filing[] = [
    { id: "1", client: "Nile Textiles SAE", taxType: "VAT", period: "Sep 2025", status: "Pending Docs", deadline: "5 Days" },
    { id: "2", client: "Gendy Trading LLC", taxType: "VAT", period: "Sep 2025", status: "Preparation", deadline: "5 Days" },
    { id: "3", client: "Alpha Tech Solutions", taxType: "Withholding", period: "Q3 2025", status: "Under Review", deadline: "10 Days" },
    { id: "4", client: "Cairo Foods", taxType: "Salary", period: "Oct 2025", status: "Filed", deadline: "Done" },
    { id: "5", client: "Delta Construction", taxType: "VAT", period: "Sep 2025", status: "Paid", deadline: "Done" },
];

const statusStyles = {
    "Pending Docs": "bg-red-50 text-red-700 ring-red-600/10",
    "Preparation": "bg-yellow-50 text-yellow-800 ring-yellow-600/20",
    "Under Review": "bg-blue-50 text-blue-700 ring-blue-700/10",
    "Filed": "bg-indigo-50 text-indigo-700 ring-indigo-700/10",
    "Paid": "bg-green-50 text-green-700 ring-green-600/20",
};

export function FilingTracker() {
    return (
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="border-b border-gray-200 px-6 py-4 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                <div>
                    <h3 className="font-semibold text-gray-900">Filing Tracker</h3>
                    <p className="text-sm text-gray-500">Track status of client tax returns</p>
                </div>
                <div className="flex gap-2">
                    <div className="relative rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search className="h-4 w-4 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                            type="text"
                            name="search"
                            id="search"
                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Search client..."
                        />
                    </div>
                    <button type="button" className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        <Filter className="-ml-0.5 h-4 w-4 text-gray-400" aria-hidden="true" />
                        Filter
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tax Type</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filings.map((filing) => (
                            <tr key={filing.id} className="hover:bg-gray-50/50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{filing.client}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{filing.taxType}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{filing.period}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={cn(
                                        "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset",
                                        statusStyles[filing.status]
                                    )}>
                                        {filing.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {filing.deadline === "Done" ? (
                                        <span className="text-green-600 flex items-center gap-1"><CheckCircle2 className="h-4 w-4" /> Done</span>
                                    ) : (
                                        <span className="text-gray-900 font-medium">{filing.deadline}</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Link href={`/tax/filing/${filing.id}`} className="text-indigo-600 hover:text-indigo-900">Manage</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
