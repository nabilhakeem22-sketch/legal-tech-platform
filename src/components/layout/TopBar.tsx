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
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background/80 backdrop-blur-md px-6 transition-all duration-200">
            <div className="flex items-center flex-1">
                <div className="relative w-full max-w-lg" ref={wrapperRef}>
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <input
                        type="text"
                        className="block w-full rounded-full border-0 py-2 pl-10 pr-4 text-foreground bg-muted/40 ring-1 ring-inset ring-transparent placeholder:text-muted-foreground focus:bg-background focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 transition-all shadow-sm"
                        placeholder="Search Client, Company, or Document..."
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            if (e.target.value.length >= 2) setIsOpen(true);
                        }}
                        onFocus={() => { if (results.length > 0) setIsOpen(true); }}
                    />

                    {/* Search Dropdown */}
                    {isOpen && results.length > 0 && (
                        <div className="absolute top-full mt-2 w-full bg-card/95 backdrop-blur rounded-lg shadow-xl border border-border py-2 z-50 overflow-hidden">
                            {results.map((result) => (
                                <button
                                    key={result.id + result.type}
                                    onClick={() => handleSelect(result.url)}
                                    className="w-full text-left px-4 py-3 hover:bg-primary/5 flex items-center gap-3 transition-colors border-b border-border/50 last:border-0"
                                >
                                    <div className={`p-2 rounded-md ${result.type === 'Client' ? 'bg-primary/10 text-primary' : 'bg-orange-500/10 text-orange-500'}`}>
                                        {result.type === 'Client' ? <User className="h-4 w-4" /> : <Building2 className="h-4 w-4" />}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-foreground">{result.name}</p>
                                        <p className="text-xs text-muted-foreground">{result.type} • {result.subtext}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                    {isOpen && query.length >= 2 && results.length === 0 && (
                        <div className="absolute top-full mt-2 w-full bg-card rounded-lg shadow-xl border border-border py-8 text-center text-sm text-muted-foreground z-50">
                            No results found.
                        </div>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
                <button className="-m-2.5 p-2.5 text-muted-foreground hover:text-primary transition-colors relative">
                    <span className="sr-only">View notifications</span>
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background"></span>
                </button>
                <div className="h-6 w-px bg-border" aria-hidden="true" />
                <div className="flex items-center gap-x-3 cursor-pointer hover:opacity-80 transition-opacity">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-semibold text-xs shadow-md">
                        JD
                    </div>
                </div>
            </div>
        </header>
    );
}
