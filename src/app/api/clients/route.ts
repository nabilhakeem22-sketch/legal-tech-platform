import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';

export async function GET() {
    try {
        const clients = await db.client.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(clients);
    } catch (error) {
        console.error("Fetch Clients Error:", error);
        return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Define interface for body if strict type checking is needed, 
        // for now leveraging Prisma's type inference.

        const newClient = await db.client.create({
            data: {
                name: body.name,
                email: body.email || null,
                phone: body.phone || null,
                companyName: body.companyName || body.company || null, // Handle both existing fields
                status: body.status || "Active",
            }
        });

        return NextResponse.json(newClient);
    } catch (error) {
        console.error("Create Client Error:", error);
        return NextResponse.json({ error: 'Failed to create client' }, { status: 500 });
    }
}
