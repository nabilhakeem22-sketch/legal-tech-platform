import Link from "next/link";
import { Scale } from "lucide-react";

export function AuthHeader() {
    return (
        <header className="absolute top-0 w-full p-6 flex justify-between items-center">
            <div className="flex items-center gap-2 font-bold text-xl text-primary">
                <Scale className="h-6 w-6" />
                <span>Comply360</span>
            </div>
            <nav>
                <Link
                    href="/auth/login"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                    Sign In
                </Link>
            </nav>
        </header>
    );
}
