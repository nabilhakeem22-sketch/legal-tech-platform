"use client";

import { Bell, Search, Building2, User, Menu, LogOut, Settings, ShieldCheck } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

// Types for Search Results
interface SearchResult {
    id: string;
    name: string;
    type: "Client" | "Company";
    subtext: string;
    url: string;
}

interface TopBarProps {
    onMenuClick?: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
    const { data: session } = useSession();
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const router = useRouter();
    const wrapperRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);

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
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setProfileOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef, profileRef]);

    const handleSelect = (url: string) => {
        setIsOpen(false);
        setQuery("");
        router.push(url);
    };

    return (
        <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-background/80 backdrop-blur-md px-4 sm:px-6 transition-all duration-200">
            <div className="flex items-center gap-4 flex-1">
                {/* Mobile Menu Button */}
                <button
                    type="button"
                    className="lg:hidden -ml-2 inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                    onClick={onMenuClick}
                >
                    <span className="sr-only">Open sidebar</span>
                    <Menu className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Branding */}
                <div className="flex items-center gap-2 mr-4 md:mr-8 min-w-fit">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <ShieldCheck className="h-5 w-5" />
                    </div>
                    <span className="hidden md:block text-xl font-bold tracking-tight text-foreground">Comply360</span>
                </div>

                {/* Search */}
                <div className="relative w-full max-w-sm md:max-w-md hidden sm:block" ref={wrapperRef}>
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <input
                        type="text"
                        className="block w-full rounded-full border-0 py-2 pl-10 pr-4 text-foreground bg-muted/40 ring-1 ring-inset ring-transparent placeholder:text-muted-foreground focus:bg-background focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 transition-all shadow-sm"
                        placeholder="Search..."
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
                </div>
            </div>

            <div className="flex items-center gap-x-4">
                <button className="p-2 text-muted-foreground hover:text-primary transition-colors relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background"></span>
                </button>

                <div className="h-6 w-px bg-border hidden sm:block" aria-hidden="true" />

                {/* Profile Dropdown */}
                <div className="relative" ref={profileRef}>
                    <button
                        onClick={() => setProfileOpen(!profileOpen)}
                        className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none"
                    >
                        <Image
                            className="h-8 w-8 rounded-full bg-muted border border-border"
                            src={session?.user?.image || "https://ui-avatars.com/api/?name=Admin+User&background=6366f1&color=fff"}
                            alt="Profile"
                            width={32}
                            height={32}
                            unoptimized
                        />
                        <span className="hidden md:block text-sm font-medium text-foreground">
                            {session?.user?.name || "Admin"}
                        </span>
                    </button>

                    {profileOpen && (
                        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-card border border-border shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                            <div className="p-3 border-b border-border">
                                <p className="text-sm font-medium text-foreground truncate">{session?.user?.name || "Admin User"}</p>
                                <p className="text-xs text-muted-foreground truncate">{session?.user?.email || "admin@comply360.com"}</p>
                            </div>
                            <div className="py-1">
                                <Link href="/admin/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted/50 transition-colors">
                                    <User className="h-4 w-4 text-muted-foreground" /> Profile
                                </Link>
                                <Link href="/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted/50 transition-colors">
                                    <Settings className="h-4 w-4 text-muted-foreground" /> Settings
                                </Link>
                            </div>
                            <div className="border-t border-border py-1">
                                <button
                                    onClick={() => signOut()}
                                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors"
                                >
                                    <LogOut className="h-4 w-4" /> Sign out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
