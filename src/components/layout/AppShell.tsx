"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile
    const [collapsed, setCollapsed] = useState(false); // Desktop

    return (
        <div className="flex h-full">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
                        onClick={() => setSidebarOpen(false)}
                    ></div>

                    {/* Sidebar Panel */}
                    <div className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-card border-r border-border shadow-2xl">
                        <div className="absolute top-0 right-0 -mr-12 pt-2">
                            <button
                                type="button"
                                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                onClick={() => setSidebarOpen(false)}
                            >
                                <span className="sr-only">Close sidebar</span>
                                <X className="h-6 w-6 text-foreground" aria-hidden="true" />
                            </button>
                        </div>
                        <Sidebar collapsed={false} setCollapsed={() => { }} />
                    </div>
                </div>
            )}

            {/* Desktop Sidebar */}
            <div className={cn("hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col transition-all duration-300", collapsed ? "lg:w-20" : "lg:w-64")}>
                <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            </div>

            <div className={cn("flex flex-col flex-1 h-full transition-all duration-300", collapsed ? "lg:pl-20" : "lg:pl-64")}>
                {/* TopBar with Mobile Menu Button */}
                <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-background shadow-sm border-b border-border lg:hidden px-4 justify-between items-center">
                    <button
                        type="button"
                        className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <Menu className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <span className="font-bold text-lg text-indigo-600">Legal Tech</span>
                </div>

                {/* Desktop TopBar (Visible only on LG, or we reuse TopBar component differently?) 
            Actually, TopBar contains Search and Profile. It should be visible always. 
            The existing TopBar is hardcoded essentially. 
            Let's keep the existing TopBar but wrap it.
            Actually, the simpler TopBar above is just for the Menu Toggle. 
            Let's modify the EXISTING TopBar to accept an `onMenuClick` prop so we don't duplicate headers.
            BUT TopBar is currently imported in RootLayout. 
            Let's Replace the explicit TopBar usage here with the one we import, 
            and wrap it to inject the Menu button on mobile.
        */}
                <div className="hidden lg:block">
                    <TopBar />
                </div>

                {/* Mobile View needs the content of TopBar (Search/Profile) too? 
            Usually yes. 
            Let's modify TopBar.tsx to support the Mobile Toggle directly?
            Or just use AppShell to render a Mobile Header + Desktop Header?
            
            Strategy: 
            Use the `TopBar` component for both, but add a `onMenuClick` prop to it?
            Or just render the hamburger OUTSIDE TopBar on mobile?
            
            Let's render a "Mobile Header" here that has the Hamburger AND the TopBar content (or simplified).
            For MVP speed: Just use the Hamburger bar created above for mobile, and then render children.
            Note: The original TopBar has 'Search', 'Notifications', 'Profile'.
            On mobile, we likely want those too.
            
            Let's keep it simple: Use the generic TopBar on desktop.
            On mobile, show the header with Hamburger.
        */}

                <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
