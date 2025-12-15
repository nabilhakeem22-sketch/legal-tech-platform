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
        <div className="flex h-full w-64 flex-col border-r bg-white text-gray-900 border-gray-200">
            <div className="flex h-16 items-center px-6 border-b border-gray-100">
                <span className="text-xl font-bold tracking-tight text-indigo-600">Corporate OS</span>
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
                                        ? "bg-indigo-50 text-indigo-600"
                                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                                )}
                            >
                                <item.icon
                                    className={cn(
                                        "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                                        isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-gray-500"
                                    )}
                                />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>
            <div className="border-t border-gray-100 p-4">
                <button className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                    <Settings className="mr-3 h-5 w-5 text-gray-400" />
                    Settings
                </button>
            </div>
        </div>
    );
}
