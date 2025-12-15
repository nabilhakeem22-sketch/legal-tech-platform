"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2, Fingerprint } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("admin@legal.tech"); // Pre-fill for demo
    const [password, setPassword] = useState("admin");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.ok) {
            router.push("/admin/profile");
            router.refresh();
        } else {
            alert("Invalid credentials. Try 'admin@legal.tech' and 'admin'");
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-background flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <div className="h-12 w-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
                        <Fingerprint className="h-7 w-7" />
                    </div>
                </div>
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
                    Sign in to Portal
                </h2>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                    Or <span className="font-medium text-primary hover:text-primary/90 cursor-pointer">request an invite</span>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-card py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-border">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-foreground">
                                Email address
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-10 rounded-md border-input bg-background py-2 sm:text-sm focus:border-primary focus:ring-primary border text-foreground placeholder:text-muted-foreground"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-foreground">
                                Password
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-10 rounded-md border-input bg-background py-2 sm:text-sm focus:border-primary focus:ring-primary border text-foreground placeholder:text-muted-foreground"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={cn(
                                    "flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all",
                                    isLoading && "opacity-70 cursor-not-allowed"
                                )}
                            >
                                {isLoading ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                    "Sign in"
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-card px-2 text-muted-foreground">Demo Credentials</span>
                            </div>
                        </div>
                        <div className="mt-4 text-center text-sm text-muted-foreground bg-muted/50 p-3 rounded-md border border-border">
                            u: <strong>admin@legal.tech</strong> / p: <strong>admin</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
