import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

export interface Transaction {
    id: number;
    type: 'income' | 'expense';
    description: string;
    date: string;
    category: string;
    amount: string;
    currency: string;
}

interface TransactionListProps {
    data: Transaction[];
}

export function TransactionList({ data }: TransactionListProps) {
    // Defined interface above
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {data && data.map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                            <div className="flex items-center space-x-4">
                                <div className={`p-2 rounded-full ${tx.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                    {tx.type === 'income' ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{tx.description}</p>
                                    <p className="text-xs text-gray-500">{tx.date} • {tx.category}</p>
                                </div>
                            </div>
                            <div className={`text-sm font-semibold ${tx.type === 'income' ? 'text-green-600' : 'text-gray-900'}`}>
                                {tx.amount} {tx.currency}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
