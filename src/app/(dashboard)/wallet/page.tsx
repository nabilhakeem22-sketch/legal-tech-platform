"use client";

import { BudgetOverview } from "@/components/wallet/BudgetOverview";
import { TransactionList } from "@/components/wallet/TransactionList";
import { CreditCard, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function WalletPage() {
    const [data, setData] = useState({ transactions: [], budgetData: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/wallet')
            .then(res => res.json())
            .then(d => {
                setData(d);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Company Wallet</h2>
            </div>

            {/* Wallet Summary Cards (Static for now, next phase: genericize) */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-primary text-primary-foreground border-primary">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-primary-foreground/90">Total Balance</CardTitle>
                        <Wallet className="h-4 w-4 text-primary-foreground/90" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$125,500.00</div>
                        <p className="text-xs text-primary-foreground/80 mt-1">+8% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-foreground">$45,000.00</div>
                        <p className="text-xs text-muted-foreground mt-1">4 active retainers</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-foreground">$18,200.00</div>
                        <p className="text-xs text-muted-foreground mt-1">Projected: $20k</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="lg:col-span-4">
                    <TransactionList data={data.transactions} />
                </div>
                <div className="lg:col-span-3">
                    <BudgetOverview data={data.budgetData} />
                </div>
            </div>
        </div>
    );
}
