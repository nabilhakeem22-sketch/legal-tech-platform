"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { LogIn, LogOut } from "lucide-react";
import Image from "next/image";

export function AuthHeader() {
    const { data: session } = useSession();

    return (
        <header className="border-b border-border bg-background">
            <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="flex items-center gap-4">
                    <Link href="/" className="text-xl font-bold text-primary">LegalCompass</Link>
                    <nav className="hidden md:flex gap-4 ml-6 text-sm font-medium text-muted-foreground">
                        <Link href="/compass" className="hover:text-foreground">Wizard</Link>
                        {/* <Link href="/portal" className="hover:text-gray-900">Portal</Link> */}
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    {session ? (
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-foreground hidden sm:block">
                                {session.user?.name}
                            </span>
                            <Link href="/admin/profile">
                                <Image
                                    className="h-8 w-8 rounded-full cursor-pointer bg-muted"
                                    src={session.user?.image || "https://img.freepik.com/premium-vector/avatar-icon002_750950-52.jpg"}
                                    alt="Profile"
                                    width={32}
                                    height={32}
                                />
                            </Link>
                            <button
                                onClick={() => signOut()}
                                className="text-muted-foreground hover:text-destructive"
                                title="Sign Out"
                            >
                                <LogOut className="h-5 w-5" />
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-all"
                        >
                            <LogIn className="mr-2 h-4 w-4" /> Admin Login
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
