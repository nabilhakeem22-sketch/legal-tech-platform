import { NextResponse } from 'next/server';
import { regulations, complianceTasks } from '@/lib/mock-data';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get('companyId');
    const legalForm = searchParams.get('legalForm');

    let filteredRegs = regulations;
    let filteredTasks = complianceTasks;

    if (companyId) {
        filteredTasks = complianceTasks.filter(t => t.companyId === companyId);
    }

    if (legalForm) {
        filteredRegs = regulations.filter(r => r.applicableForms.includes(legalForm));
    }

    return NextResponse.json({
        regulations: filteredRegs,
        tasks: filteredTasks
    });
}
