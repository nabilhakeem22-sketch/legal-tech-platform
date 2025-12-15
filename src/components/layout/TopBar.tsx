"use client";

import { Bell, Search, Building2, User } from "lucide-react";
import { useState, useEffect, useRef } from "react";

import { useRouter } from "next/navigation";

// Types for Search Results
interface SearchResult {
    id: string;
    name: string;
    type: "Client" | "Company";
    subtext: string;
    url: string;
}

export function TopBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Mock Search Logic (In real app, call /api/search)
    useEffect(() => {
        if (query.length < 2) {

            if (results.length > 0) setResults([]);
            return;
        }

        const timer = setTimeout(async () => {
            // Fetch Clients
            const clientsRes = await fetch('/api/clients');
            const clients = await clientsRes.json();

            // Fetch Companies
            const companiesRes = await fetch('/api/companies');
            const companies = await companiesRes.json();

            const filteredClients = clients
                .filter((c: { name: string }) => c.name.toLowerCase().includes(query.toLowerCase()))
                .map((c: { id: string; name: string; contactName: string }) => ({
                    id: c.id,
                    name: c.name,
                    type: "Client",
                    subtext: c.contactName,
                    url: `/clients/${c.id}`
                }));

            const filteredCompanies = companies
                .filter((c: { nameEnglish: string }) => c.nameEnglish.toLowerCase().includes(query.toLowerCase()))
                .map((c: { id: string; nameEnglish: string; crNumber: string; clientId: string }) => ({
                    id: c.id,
                    name: c.nameEnglish,
                    type: "Company",
                    subtext: c.crNumber,
                    url: `/clients/${c.clientId}` // Navigates to Parent Client for now
                }));

            setResults([...filteredClients, ...filteredCompanies]);
            setIsOpen(true);
        }, 300);

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    const handleSelect = (url: string) => {
        setIsOpen(false);
        setQuery("");
        router.push(url);
    };

    return (
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
            <div className="flex items-center flex-1">
                <div className="relative w-full max-w-md" ref={wrapperRef}>
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Search Client or Company..."
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            if (e.target.value.length >= 2) setIsOpen(true);
                        }}
                        onFocus={() => { if (results.length > 0) setIsOpen(true); }}
                    />

                    {/* Search Dropdown */}
                    {isOpen && results.length > 0 && (
                        <div className="absolute top-full mt-1 w-full bg-white rounded-md shadow-lg border border-gray-100 py-2 z-50">
                            {results.map((result) => (
                                <button
                                    key={result.id + result.type}
                                    onClick={() => handleSelect(result.url)}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                                >
                                    <div className={`p-1.5 rounded ${result.type === 'Client' ? 'bg-indigo-50 text-indigo-600' : 'bg-orange-50 text-orange-600'}`}>
                                        {result.type === 'Client' ? <User className="h-4 w-4" /> : <Building2 className="h-4 w-4" />}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{result.name}</p>
                                        <p className="text-xs text-gray-500">{result.type} • {result.subtext}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                    {isOpen && query.length >= 2 && results.length === 0 && (
                        <div className="absolute top-full mt-1 w-full bg-white rounded-md shadow-lg border border-gray-100 py-4 text-center text-sm text-gray-500 z-50">
                            No results found.
                        </div>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
                <button className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">View notifications</span>
                    <Bell className="h-6 w-6" />
                </button>
                <div className="h-6 w-px bg-gray-200" aria-hidden="true" />
                <div className="flex items-center gap-x-4">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold text-xs">
                        JD
                    </div>
                </div>
            </div>
        </header>
    );
}
