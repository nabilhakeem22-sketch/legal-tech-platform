"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShieldCheck, Wallet, Users, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
    { name: "Risk Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Clients", href: "/clients", icon: Users },
    { name: "Tax Management", href: "/tax", icon: ShieldCheck },
    { name: "Compliance Compass", href: "/compass", icon: ShieldCheck }, // Wizard
    { name: "Compliance Navigator", href: "/compliance", icon: ShieldCheck },
    { name: "Company Wallet", href: "/wallet", icon: Wallet },
    { name: "Client Portal", href: "/portal", icon: Users },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-full w-64 flex-col border-r bg-card text-card-foreground border-border">
            <div className="flex h-16 items-center px-6 border-b border-border">
                <span className="text-xl font-bold tracking-tight text-primary">Corporate OS</span>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
                <nav className="space-y-1 px-3">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                data-testid={`nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                                className={cn(
                                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                )}
                            >
                                <item.icon
                                    className={cn(
                                        "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                                        isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                                    )}
                                />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>
            <div className="border-t border-border p-4">
                <button className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground">
                    <Settings className="mr-3 h-5 w-5 text-muted-foreground" />
                    Settings
                </button>
            </div>
        </div>
    );
}
