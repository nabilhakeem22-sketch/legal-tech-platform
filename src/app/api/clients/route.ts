import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';

import { mockClients } from '../../../lib/mock-data';

export async function GET() {
    try {
        const clients = await db.client.findMany({
            orderBy: { createdAt: 'desc' }
        });

        if (!clients || clients.length === 0) {
            console.log("No clients found in DB, returning mock data.");
            return NextResponse.json(mockClients);
        }

        return NextResponse.json(clients);
    } catch (error) {
        console.error("Fetch Clients Error:", error);
        // Fallback to mock data on error for demo purposes
        return NextResponse.json(mockClients);
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
