import { AlertTriangle, CheckCircle, FileText, Gavel } from "lucide-react";

export const riskData = [
    { name: "Jan", risk: 2400 },
    { name: "Feb", risk: 1398 },
    { name: "Mar", risk: 9800 },
    { name: "Apr", risk: 3908 },
    { name: "May", risk: 4800 },
    { name: "Jun", risk: 3800 },
    { name: "Jul", risk: 4300 },
];

export const kpiData = [
    {
        title: "High Risk Cases",
        value: "12",
        icon: AlertTriangle,
        trend: "+2",
        trendUp: false,
        description: "from last month",
    },
    {
        title: "Pending Audits",
        value: "4",
        icon: FileText,
        trend: "-1",
        trendUp: true,
        description: "active reviews",
    },
    {
        title: "Compliance Score",
        value: "87%",
        icon: CheckCircle,
        trend: "+5%",
        trendUp: true,
        description: "points increase",
    },
    {
        title: "Active Litigations",
        value: "23",
        icon: Gavel,
        trend: "+3",
        trendUp: false,
        description: "new cases",
    },
];

export const regulations = [
    {
        id: 1,
        title: "FRA Decision No. 123/2025",
        body: "New capital requirements for fintech companies operating in Egypt.",
        date: "2025-12-08",
        authority: "FRA",
        impact: "High",
        applicableForms: ["FinTech", "JSC"],
    },
    {
        id: 2,
        title: "GAFI Update on Foreign Ownership",
        body: "Revised documentation requirements for foreign shareholders in LLCs.",
        date: "2025-12-05",
        authority: "GAFI",
        impact: "Medium",
        applicableForms: ["LLC"],
    },
    {
        id: 3,
        title: "Data Protection Law Executive Regulations",
        body: "Deadline for DPO appointment extended by 30 days.",
        date: "2025-12-01",
        authority: "CIT",
        impact: "High",
        applicableForms: ["LLC", "JSC"],
    },
];

export const complianceTasks = [
    { id: 1, title: "Submit Annual Tax Return", due: "2025-12-31", completed: false, companyId: "comp_123" },
    { id: 2, title: "Renew Commercial Register", due: "2026-01-15", completed: true },
    { id: 3, title: "Social Insurance Filing (Form 2)", due: "2025-12-20", completed: false },
    { id: 4, title: "Board Meeting Minutes Ratification", due: "2025-12-25", completed: false },
];

export const transactions = [
    {
        id: 1,
        description: "Retainer Fee - Client A",
        amount: "+50,000",
        currency: "EGP",
        date: "2025-12-09",
        type: "income",
        category: "Retainer",
    },
    {
        id: 2,
        description: "Filing Fees - Cairo Court",
        amount: "-2,500",
        currency: "EGP",
        date: "2025-12-08",
        type: "expense",
        category: "Government Fees",
    },
    {
        id: 3,
        description: "Office Rent - December",
        amount: "-15,000",
        currency: "EGP",
        date: "2025-12-01",
        type: "expense",
        category: "Operations",
    },
    {
        id: 4,
        description: "Consultation - Client B",
        amount: "+12,000",
        currency: "EGP",
        date: "2025-11-28",
        type: "income",
        category: "Consultation",
    },
];

export const budgetData = [
    { label: "Government Fees", used: 75, amount: "15,000", total: "20,000", color: "bg-indigo-500" },
    { label: "Office Operations", used: 40, amount: "40,000", total: "100,000", color: "bg-emerald-500" },
    { label: "Marketing & BD", used: 90, amount: "45,000", total: "50,000", color: "bg-amber-500" },
];

export const activeCases = [
    {
        id: "CASE-2025-001",
        title: "Contract Dispute vs. Vendor Inc.",
        status: "In Progress",
        nextStep: "Mediation Session",
        date: "2025-12-15",
        lawyer: "Ahmed El-Sayed",
    },
    {
        id: "CASE-2025-042",
        title: "IP Registration - New Trademark",
        status: "Pending Review",
        nextStep: "Trademark Office Approval",
        date: "2026-01-10",
        lawyer: "Sarah M.",
    },
];

export const documents = [
    { id: 1, name: "Articles of Incorporation.pdf", date: "2024-01-15", size: "2.4 MB" },
    { id: 2, name: "Commercial Register (Recent).pdf", date: "2025-11-20", size: "1.1 MB" },
    { id: 3, name: "Board Resolution #45.pdf", date: "2025-10-05", size: "0.5 MB" },
    { id: 4, name: "NDA Template.docx", date: "2023-05-10", size: "0.1 MB" },
];
