"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { LogIn, LogOut } from "lucide-react";
import Image from "next/image";

export function AuthHeader() {
    const { data: session } = useSession();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /></svg>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-foreground">Comply360</span>
                    </Link>
                    <nav className="hidden md:flex gap-6 ml-8 text-sm font-medium text-muted-foreground">
                        <Link href="/compass" className="hover:text-primary transition-colors">Compliance Wizard</Link>
                        {/* <Link href="/portal" className="hover:text-foreground">Portal</Link> */}
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
                                    className="h-9 w-9 rounded-full cursor-pointer bg-muted border border-border hover:ring-2 hover:ring-primary/20 transition-all"
                                    src={session.user?.image || "https://img.freepik.com/premium-vector/avatar-icon002_750950-52.jpg"}
                                    alt="Profile"
                                    width={36}
                                    height={36}
                                />
                            </Link>
                            <button
                                onClick={() => signOut()}
                                className="text-muted-foreground hover:text-destructive transition-colors p-2 hover:bg-muted rounded-md"
                                title="Sign Out"
                            >
                                <LogOut className="h-5 w-5" />
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md transition-all duration-200"
                        >
                            <LogIn className="mr-2 h-4 w-4" /> Admin Login
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
