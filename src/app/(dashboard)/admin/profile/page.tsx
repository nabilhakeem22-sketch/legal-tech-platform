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
                                className="h-16 w-16 rounded-full border-2 border-white shadow-sm"
                                src={session.user?.image || "https://ui-avatars.com/api/?name=Admin"}
                                alt=""
                                width={64}
                                height={64}
                            />
                            <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-green-400 border-2 border-white"></div>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{session.user?.name}</h1>
                        <p className="text-sm font-medium text-gray-500">{session.user?.email} • {(session.user as { role?: string }).role || 'User'}</p>
                    </div>
                </div>
                <div className="mt-4 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                    >
                        <LogOut className="-ml-1 mr-2 h-4 w-4 text-gray-500" />
                        Sign Out
                    </button>
                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                    >
                        Edit Profile
                    </button>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Account Card */}
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                    <div className="border-b border-gray-200 bg-gray-50 px-4 py-4 sm:px-6 flex items-center justify-between">
                        <div className="flex items-center">
                            <Shield className="h-5 w-5 text-gray-400 mr-2" />
                            <h3 className="text-base font-semibold leading-6 text-gray-900">Account Security</h3>
                        </div>
                        <button className="text-xs font-medium text-indigo-600 hover:text-indigo-500">Manage</button>
                    </div>
                    <div className="px-4 py-5 sm:p-6 space-y-4">
                        <div className="flex items-center justify-between py-2">
                            <span className="text-sm text-gray-600">Two-Factor Authentication</span>
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">Enabled</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-t border-gray-100">
                            <span className="text-sm text-gray-600">Password</span>
                            <span className="text-sm text-gray-400">Last changed 3 days ago</span>
                        </div>
                    </div>
                </div>

                {/* Subscription Card */}
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                    <div className="border-b border-gray-200 bg-gray-50 px-4 py-4 sm:px-6 flex items-center justify-between">
                        <div className="flex items-center">
                            <CreditCard className="h-5 w-5 text-gray-400 mr-2" />
                            <h3 className="text-base font-semibold leading-6 text-gray-900">Subscription</h3>
                        </div>
                        <button className="text-xs font-medium text-indigo-600 hover:text-indigo-500">Upgrade</button>
                    </div>
                    <div className="px-4 py-5 sm:p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900">Pro Plan</span>
                            <span className="text-sm text-gray-500">$49/month</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                        <p className="text-xs text-gray-500">12 days remaining in billing cycle</p>
                    </div>
                </div>
            </div>

            {/* Activity Log */}
            <div className="mt-8 rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <div className="border-b border-gray-200 bg-gray-50 px-4 py-4 sm:px-6">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">Recent Admin Activity</h3>
                </div>
                <ul role="list" className="divide-y divide-gray-200">
                    {[
                        { action: "Updated Compliance Policy", date: "2 hours ago", user: "Admin User" },
                        { action: "Added new team member", date: "5 hours ago", user: "Admin User" },
                        { action: "Exported Q3 Financial Reports", date: "1 day ago", user: "Admin User" },
                        { action: "System Backup Completed", date: "1 day ago", user: "System" },
                    ].map((item, idx) => (
                        <li key={idx} className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-indigo-600 truncate">{item.action}</p>
                                <div className="ml-2 flex flex-shrink-0">
                                    <p className="inline-flex rounded-full bg-gray-100 px-2 text-xs font-semibold leading-5 text-gray-800">
                                        {item.date}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-2 sm:flex sm:justify-between">
                                <div className="sm:flex">
                                    <p className="flex items-center text-sm text-gray-500">
                                        <User className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
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
