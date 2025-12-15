import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';

import { mockCompanies } from '../../../lib/demo-data';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get('clientId');

    try {
        const whereClause = clientId ? { clientId } : {};
        const companies = await db.company.findMany({
            where: whereClause,
            orderBy: { createdAt: 'desc' }
        });

        // Use mock data if DB returns empty (for demo purposes) or fails
        if (!companies || companies.length === 0) {
            console.log("No companies found in DB, using mock data");
            const filteredMock = clientId
                ? mockCompanies.filter(c => c.clientId === clientId)
                : mockCompanies;
            return NextResponse.json(filteredMock);
        }

        return NextResponse.json(companies);
    } catch (error) {
        console.error("Database error, falling back to mock data:", error);
        // Fallback to mock data on DB error
        const filteredMock = clientId
            ? mockCompanies.filter(c => c.clientId === clientId)
            : mockCompanies;
        return NextResponse.json(filteredMock);
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
