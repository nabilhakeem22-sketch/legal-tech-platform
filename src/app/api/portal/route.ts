import { NextResponse } from 'next/server';

const activeCases = [
    {
        id: "MAT-2025-882",
        title: "Acme Corp vs. Roadrunner Inc.",
        status: "Discovery",
        nextStep: "Deposition Review",
        date: "2025-12-18",
        lawyer: "J. Smith",
    },
    {
        id: "MAT-2025-991",
        title: "Merger Acquisition - Beta Co",
        status: "Due Diligence",
        nextStep: "Closing",
        date: "2026-01-20",
        lawyer: "A. Doe",
    },
];

const documents = [
    { id: 1, name: "Executed MSA.pdf", date: "2024-01-15", size: "2.4 MB" },
    { id: 2, name: "Privacy Addendum.pdf", date: "2025-11-20", size: "0.8 MB" },
    { id: 3, name: "Q4 Financials.xlsx", date: "2025-10-05", size: "1.2 MB" },
];

export async function GET() {
    return NextResponse.json({ activeCases, documents });
}
