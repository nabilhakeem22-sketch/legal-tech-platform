import { NextResponse } from 'next/server';
import { kpiData as kpis, riskData as risks } from '../../../lib/mock-data';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get('companyId');

    let filteredKPIs = kpis;
    let filteredRisks = risks;

    if (companyId) {
        filteredKPIs = kpis.filter(k => k.companyId === companyId);
        filteredRisks = risks.filter(r => r.companyId === companyId);
    } else {
        // If global, show a generic subset or aggregate
        filteredKPIs = kpis.slice(0, 4);
        filteredRisks = risks.slice(0, 5);
    }

    return NextResponse.json({
        kpiData: filteredKPIs,
        riskData: filteredRisks.map(r => ({
            name: r.name,
            risk: r.risk,
            category: "General"
        }))
    });
}
