import Link from "next/link";
import { ArrowRight, ShieldCheck, TrendingUp, Users } from "lucide-react";
import { AuthHeader } from "@/components/AuthHeader";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <AuthHeader />
      <div className="text-center space-y-8 p-10 max-w-2xl">
        <div className="space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl">
            Comply360
          </h1>
          <p className="text-lg leading-8 text-muted-foreground">
            The all-in-one operating system for modern law firms in Egypt.
            Manage compliance, finances, and client relationships in one place.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dashboard"
            data-testid="enter-platform-btn"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Enter Platform <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-border">
          <div className="flex flex-col items-center">
            <div className="p-3 bg-red-500/10 rounded-full text-red-500 mb-2">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-foreground">Risk Mitigation</h3>
          </div>
          <div className="flex flex-col items-center">
            <div className="p-3 bg-green-500/10 rounded-full text-green-500 mb-2">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-foreground">Financial Insights</h3>
          </div>
          <div className="flex flex-col items-center">
            <div className="p-3 bg-blue-500/10 rounded-full text-blue-500 mb-2">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-foreground">Client Portal</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
