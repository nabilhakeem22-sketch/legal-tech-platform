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

interface SidebarProps {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
}

export function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
    const pathname = usePathname();

    return (
        <div className={cn("flex h-full flex-col border-r bg-card text-card-foreground border-border shadow-sm transition-all duration-300", collapsed ? "w-20" : "w-64")}>
            <div className={cn("flex h-16 items-center border-b border-border transition-all duration-300", collapsed ? "justify-center px-0" : "px-6 justify-between")}>
                {!collapsed && (
                    <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <ShieldCheck className="h-5 w-5" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-foreground">Comply360</span>
                    </div>
                )}
                {collapsed && (
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 cursor-pointer" onClick={() => setCollapsed(false)}>
                        <ShieldCheck className="h-5 w-5" />
                    </div>
                )}

                {!collapsed && (
                    <button onClick={() => setCollapsed(true)} className="text-muted-foreground hover:text-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-panel-left-close"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><path d="M9 3v18" /><path d="m16 15-3-3 3-3" /></svg>
                    </button>
                )}
            </div>
            <div className="flex-1 overflow-y-auto py-4 overflow-x-hidden">
                <nav className="space-y-1 px-3">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                data-testid={`nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                                title={collapsed ? item.name : undefined}
                                className={cn(
                                    "group flex items-center rounded-md py-2 text-sm font-medium transition-all duration-200",
                                    collapsed ? "justify-center px-2" : "px-3",
                                    isActive
                                        ? "bg-primary/5 text-primary border-primary rounded-l-none" + (collapsed ? " border-l-0 rounded-md bg-primary/10" : " border-l-2")
                                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground hover:translate-x-1"
                                )}
                            >
                                <item.icon
                                    className={cn(
                                        "h-5 w-5 flex-shrink-0 transition-colors",
                                        !collapsed && "mr-3",
                                        isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                                    )}
                                />
                                {!collapsed && <span className="truncate">{item.name}</span>}
                            </Link>
                        );
                    })}
                </nav>
            </div>
            <div className="border-t border-border p-4">
                {collapsed ? (
                    <div className="flex justify-center p-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors" title="John Doe">
                        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                            JD
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors">
                        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                            JD
                        </div>
                        <div className="flex flex-col overflow-hidden">
                            <span className="text-sm font-medium text-foreground truncate">John Doe</span>
                            <span className="text-xs text-muted-foreground truncate">Admin</span>
                        </div>
                        <Settings className="ml-auto h-4 w-4 text-muted-foreground hover:text-foreground shrink-0" />
                    </div>
                )}
            </div>
        </div>
    );
}
