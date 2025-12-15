export const mockClients = [
    {
        id: "cli_1",
        name: "Acme Corp",
        type: "Corporate" as const,
        contactName: "John Doe",
        email: "john@acme.com",
        phone: "+20 100 123 4567",
        totalUnpaid: "$5,000",
        createdAt: new Date().toISOString()
    },
    {
        id: "cli_2",
        name: "Wayne Enterprises",
        type: "Corporate" as const,
        contactName: "Bruce Wayne",
        email: "bruce@wayne.com",
        phone: "+20 100 987 6543",
        totalUnpaid: "$0",
        createdAt: new Date().toISOString()
    },
    {
        id: "cli_3",
        name: "Sarah Connors",
        type: "Individual" as const,
        contactName: "Sarah Connors",
        email: "sarah@skynet.net",
        phone: "+20 111 222 3333",
        totalUnpaid: "$1,200",
        createdAt: new Date().toISOString()
    }
];
