import { AppShell } from "@/components/layout/AppShell";
import { AuthHeader } from "@/components/AuthHeader";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-full">
            {/* AuthHeader is useful globally or specific? 
             If AppShell has a sidebar, maybe AuthHeader feels redundant or needs to be inside.
             Let's put it at the top for now as requested by previous flow. */}
            <AuthHeader />
            <AppShell>
                {children}
            </AppShell>
        </div>
    );
}
