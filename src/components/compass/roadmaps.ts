export interface RoadmapStep {
    id: string;
    title: string;
    description: string;
    duration: string;
    icon: 'Doc' | 'Approval' | 'Bank' | 'Office' | 'License';
}

export interface Roadmap {
    steps: RoadmapStep[];
}

// Logic to generate roadmap based on jurisdiction type + form
// Logic to generate roadmap based on jurisdiction type + form
export function getRoadmap(jurisdictionType: string, _legalFormId: string, country: string): Roadmap {

    // --- KSA ROADMAPS ---
    if (country === 'KSA') {
        return {
            steps: [
                { id: '1', title: 'MISA License', description: 'Apply for Investment License from Ministry of Investment.', duration: '1-3 Days', icon: 'License' },
                { id: '2', title: 'Commercial Registration (CR)', description: 'Issue CR from Ministry of Commerce.', duration: '1 Day', icon: 'Doc' },
                { id: '3', title: 'Chamber of Commerce', description: 'Register membership with Riyadh Chamber.', duration: '1 Day', icon: 'Approval' },
                { id: '4', title: '700 Number & Govt. Files', description: 'Open files with ZATCA, MOL, and GOSI.', duration: '3-5 Days', icon: 'Doc' },
                { id: '5', title: 'National Address', description: 'Register official physical address (Wasel).', duration: '1 Day', icon: 'Office' },
                { id: '6', title: 'Bank Account', description: 'Physical visit required for KSA bank opening.', duration: '2-4 Weeks', icon: 'Bank' }
            ]
        };
    }

    // --- EGYPT ROADMAPS ---
    if (country === 'Egypt') {
        if (jurisdictionType === 'Free Zone') {
            return {
                steps: [
                    { id: '1', title: 'GAFI Approval', description: 'Security clearance and project approval.', duration: '2-4 Weeks', icon: 'Approval' },
                    { id: '2', title: 'Bank Certificate', description: 'Deposit 10% of capital in USD.', duration: '2-3 Days', icon: 'Bank' },
                    { id: '3', title: 'Notarization', description: 'Sign AoA at GAFI center.', duration: '1 Day', icon: 'Doc' },
                    { id: '4', title: 'Commercial Registry', description: 'Issuance of commercial registry.', duration: '1-2 Days', icon: 'License' },
                    { id: '5', title: 'Tax Card', description: 'Issue tax number and file opening.', duration: '5-7 Days', icon: 'Doc' }
                ]
            };
        }
        // Mainland
        return {
            steps: [
                { id: '1', title: 'Name Reservation', description: 'Reserve name at Commercial Registry.', duration: '1 Day', icon: 'Doc' },
                { id: '2', title: 'Bank Deposition', description: 'Certificate of non-confusion (bank deposit not always required pre-inc).', duration: '1-2 Days', icon: 'Bank' },
                { id: '3', title: 'Notary Public', description: 'Review and sign deeds at GAFI One-Stop Shop.', duration: '1 Day', icon: 'Doc' },
                { id: '4', title: 'Incorporation', description: 'Receive Commercial Registry and Tax Card.', duration: '1-2 Days', icon: 'License' },
                { id: '5', title: 'Value Added Tax', description: 'Register for VAT if applicable.', duration: 'Variable', icon: 'Doc' }
            ]
        };
    }

    // --- UAE & OTHERS DEFAULT ---

    // Generic UAE Mainland Roadmap
    if (jurisdictionType === 'Mainland') {
        return {
            steps: [
                { id: '1', title: 'Trade Name Reservation', description: 'Reserve your business name with the DED.', duration: '1-2 Days', icon: 'Doc' },
                { id: '2', title: 'Initial Approval', description: 'Get preliminary consent to start the business.', duration: '2-3 Days', icon: 'Approval' },
                { id: '3', title: 'MOA Drafting & Signing', description: 'Draft Memorandum of Association and sign at Notary/DED.', duration: '2-4 Days', icon: 'Doc' },
                { id: '4', title: 'Office Lease (Ejari)', description: 'Rent a physical office or sustainability center desk.', duration: 'Variable', icon: 'Office' },
                { id: '5', title: 'Final License Issuance', description: 'Pay government fees and receive Trade License.', duration: '1 Day', icon: 'License' },
                { id: '6', title: 'Corporate Bank Account', description: 'Apply for a bank account with your new license.', duration: '2-4 Weeks', icon: 'Bank' }
            ]
        };
    }

    // Generic UAE Free Zone
    if (jurisdictionType === 'Free Zone') {
        return {
            steps: [
                { id: '1', title: 'Application Submission', description: 'Submit KYC and Business Plan to Free Zone Authority.', duration: '1-3 Days', icon: 'Doc' },
                { id: '2', title: 'Name Approval & Invoices', description: 'Pay initial setup fees.', duration: '1-2 Days', icon: 'Approval' },
                { id: '3', title: 'Sign Legal Docs', description: 'Sign Articles of Incorporation (remote or in-person).', duration: '1-5 Days', icon: 'Doc' },
                { id: '4', title: 'License Release', description: 'Electronic issuance of License and Certificate of Incorporation.', duration: '2-5 Days', icon: 'License' },
                { id: '5', title: 'Visa & Immigration', description: 'Establishment Card and Visa processing.', duration: '1-2 Weeks', icon: 'Doc' },
                { id: '6', title: 'Bank Account', description: 'Digital banking application.', duration: '1-3 Weeks', icon: 'Bank' }
            ]
        };
    }

    // Delaware / USA
    if (jurisdictionType === 'State') {
        return {
            steps: [
                { id: '1', title: 'Registered Agent', description: 'Appoint a Registered Agent in Delaware.', duration: '1 Day', icon: 'Doc' },
                { id: '2', title: 'Certificate of Formation', description: 'File with the Division of Corporations.', duration: '1-3 Days', icon: 'Approval' },
                { id: '3', title: 'EIN Obtainment', description: 'Apply for Employer Identification Number from IRS.', duration: '1-10 Days', icon: 'Doc' },
                { id: '4', title: 'Operating Agreement', description: 'Internal document outlining ownership/ops.', duration: 'Internal', icon: 'Doc' },
                { id: '5', title: 'US Bank Account', description: 'Setup Mercury or Brex (for startups).', duration: '3-5 Days', icon: 'Bank' }
            ]
        };
    }

    // Fallback
    return {
        steps: [
            { id: '1', title: 'Consultation', description: 'Speak with a legal expert.', duration: '1 Hour', icon: 'Doc' }
        ]
    };
}
