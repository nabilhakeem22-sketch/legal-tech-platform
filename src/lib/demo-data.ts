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

export const mockCompanies = [
    {
        id: "comp_1",
        nameEnglish: "Nile Textiles S.A.E",
        nameArabic: "النيل للمنسوجات ش.م.م",
        legalForm: "S.A.E",
        status: "Compliant" as const,
        crNumber: "123456",
        taxId: "999-999-999",
        clientId: "cli_1"
    },
    {
        id: "comp_2",
        nameEnglish: "Cairo Tech Solutions LLC",
        nameArabic: "كايرو تك للحلول ذ.م.م",
        legalForm: "LLC",
        status: "Warning" as const,
        crNumber: "654321",
        taxId: "888-888-888",
        clientId: "cli_2"
    },
    {
        id: "comp_3",
        nameEnglish: "Alexandria Imports",
        nameArabic: "الإسكندرية للاستيراد",
        legalForm: "Sole Proprietorship",
        status: "Non-Compliant" as const,
        crNumber: "111222",
        taxId: "777-777-777",
        clientId: "cli_1"
    }
];
