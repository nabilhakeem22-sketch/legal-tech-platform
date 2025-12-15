import { NextResponse } from 'next/server';
import { transactions } from '@/lib/db';

const budgetData = [
    { name: 'Legal Tech', value: 30000 },
    { name: 'Outside Counsel', value: 150000 },
    { name: 'Registration Fees', value: 25000 },
    { name: 'Compliance', value: 45000 },
];

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get('companyId');

    let filteredTransactions = transactions;
    if (companyId) {
        filteredTransactions = transactions.filter(t => t.companyId === companyId);
    }

    return NextResponse.json({
        transactions: filteredTransactions,
        budgetData // Mock budget stays generic for now as it wasn't in db.ts fully
    });
}
