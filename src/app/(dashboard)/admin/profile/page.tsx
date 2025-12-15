"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import { User, Shield, LogOut, CreditCard } from "lucide-react";

export default function AdminProfile() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    if (status === "loading") {
        return <div className="flex h-screen items-center justify-center">Loading...</div>;
    }

    if (!session) {
        return null; // Will redirect
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between md:space-x-4">
                <div className="flex items-center space-x-5">
                    <div className="flex-shrink-0">
                        <div className="relative">
                            <Image
                                className="h-16 w-16 rounded-full border-2 border-background shadow-sm"
                                src={session.user?.image || "https://ui-avatars.com/api/?name=Admin"}
                                alt=""
                                width={64}
                                height={64}
                            />
                            <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-green-500 border-2 border-background"></div>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">{session.user?.name}</h1>
                        <p className="text-sm font-medium text-muted-foreground">{session.user?.email} • {(session.user as { role?: string }).role || 'User'}</p>
                    </div>
                </div>
                <div className="mt-4 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="inline-flex items-center justify-center rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                    >
                        <LogOut className="-ml-1 mr-2 h-4 w-4 text-muted-foreground" />
                        Sign Out
                    </button>
                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                    >
                        Edit Profile
                    </button>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Account Card */}
                <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                    <div className="border-b border-border bg-muted/30 px-4 py-4 sm:px-6 flex items-center justify-between">
                        <div className="flex items-center">
                            <Shield className="h-5 w-5 text-muted-foreground mr-2" />
                            <h3 className="text-base font-semibold leading-6 text-foreground">Account Security</h3>
                        </div>
                        <button className="text-xs font-medium text-primary hover:text-primary/90">Manage</button>
                    </div>
                    <div className="px-4 py-5 sm:p-6 space-y-4">
                        <div className="flex items-center justify-between py-2">
                            <span className="text-sm text-foreground">Two-Factor Authentication</span>
                            <span className="inline-flex items-center rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-500">Enabled</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-t border-border">
                            <span className="text-sm text-foreground">Password</span>
                            <span className="text-sm text-muted-foreground">Last changed 3 days ago</span>
                        </div>
                    </div>
                </div>

                {/* Subscription Card */}
                <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                    <div className="border-b border-border bg-muted/30 px-4 py-4 sm:px-6 flex items-center justify-between">
                        <div className="flex items-center">
                            <CreditCard className="h-5 w-5 text-muted-foreground mr-2" />
                            <h3 className="text-base font-semibold leading-6 text-foreground">Subscription</h3>
                        </div>
                        <button className="text-xs font-medium text-primary hover:text-primary/90">Upgrade</button>
                    </div>
                    <div className="px-4 py-5 sm:p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-foreground">Pro Plan</span>
                            <span className="text-sm text-muted-foreground">$49/month</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                            <div className="bg-primary h-2.5 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                        <p className="text-xs text-muted-foreground">12 days remaining in billing cycle</p>
                    </div>
                </div>
            </div>

            {/* Activity Log */}
            <div className="mt-8 rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                <div className="border-b border-border bg-muted/30 px-4 py-4 sm:px-6">
                    <h3 className="text-base font-semibold leading-6 text-foreground">Recent Admin Activity</h3>
                </div>
                <ul role="list" className="divide-y divide-border">
                    {[
                        { action: "Updated Compliance Policy", date: "2 hours ago", user: "Admin User" },
                        { action: "Added new team member", date: "5 hours ago", user: "Admin User" },
                        { action: "Exported Q3 Financial Reports", date: "1 day ago", user: "Admin User" },
                        { action: "System Backup Completed", date: "1 day ago", user: "System" },
                    ].map((item, idx) => (
                        <li key={idx} className="px-4 py-4 sm:px-6 hover:bg-muted/50 transition-colors">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-primary truncate">{item.action}</p>
                                <div className="ml-2 flex flex-shrink-0">
                                    <p className="inline-flex rounded-full bg-muted px-2 text-xs font-semibold leading-5 text-foreground">
                                        {item.date}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-2 sm:flex sm:justify-between">
                                <div className="sm:flex">
                                    <p className="flex items-center text-sm text-muted-foreground">
                                        <User className="mr-1.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
                                        {item.user}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
