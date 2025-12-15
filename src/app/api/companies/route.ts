import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get('clientId');

    try {
        const whereClause = clientId ? { clientId } : {};
        const companies = await db.company.findMany({
            where: whereClause,
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(companies);
    } catch {
        return NextResponse.json({ error: 'Failed to fetch companies' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const newCompany = await db.company.create({
            data: {
                name: body.name,
                jurisdiction: body.jurisdiction || "Unknown",
                clientId: body.clientId || null,
                status: body.status || "Compliant",
            }
        });
        return NextResponse.json(newCompany);
    } catch (error) {
        console.error("Create Company Error:", error);
        return NextResponse.json({ error: 'Failed to create company' }, { status: 500 });
    }
}
