export interface LegalFormAttributes {
    minShareholders: number;
    maxShareholders: number;
    allowsForeignOwnership: boolean; // 100%
    liability: 'Limited' | 'Unlimited';
    requiresLocalSponsor: boolean;
}

export interface LegalForm {
    id: string;
    name: string;
    type: 'LLC' | 'Sole' | 'Branch' | 'FZ-LLC';
    availableInTypes: ('Mainland' | 'Free Zone' | 'State' | 'Offshore')[];
    attributes: LegalFormAttributes;
    pros: string[];
    cons: string[];
    description: string;
}

export const legalForms: LegalForm[] = [
    {
        id: 'llc',
        name: 'Limited Liability Company (LLC)',
        type: 'LLC',
        availableInTypes: ['Mainland', 'State'], // e.g. Dubai LLC, Delaware LLC
        attributes: {
            minShareholders: 2, // General rule, though some allow 1 now (OPC handled separately or merged)
            maxShareholders: 50,
            allowsForeignOwnership: true,
            liability: 'Limited',
            requiresLocalSponsor: false
        },
        pros: ['Assets protection', 'Credibility with banks/clients', 'Scalable ownership'],
        cons: ['More complex compliance', 'Audit requirements']
        , description: "The standard structure for businesses with multiple shareholders."
    },
    {
        id: 'fz_llc',
        name: 'Free Zone Company (FZ-LLC)',
        type: 'FZ-LLC',
        availableInTypes: ['Free Zone'],
        attributes: {
            minShareholders: 1,
            maxShareholders: 50,
            allowsForeignOwnership: true,
            liability: 'Limited',
            requiresLocalSponsor: false
        },
        pros: ['100% Foreign Ownership', 'Customs benefits', 'Easier visa processing'],
        cons: ['Restricted to Free Zone activities', 'Geofenced retail']
        , description: "A limited liability entity incorporated within a designated Free Zone."
    },
    {
        id: 'sole',
        name: 'Sole Establishment',
        type: 'Sole',
        availableInTypes: ['Mainland'],
        attributes: {
            minShareholders: 1,
            maxShareholders: 1,
            allowsForeignOwnership: true, // Only for certain activities/nationalities usually! Keeping simple.
            liability: 'Unlimited',
            requiresLocalSponsor: true // Often yes for services if Foreign
        },
        pros: ['Low setup cost', 'Full control', 'Simple structure'],
        cons: ['Unlimited liability (Risk)', 'Harder to raise investment']
        , description: "An entity owned by one individual with unlimited personal liability."
    },
    {
        id: 'branch',
        name: 'Foreign Branch',
        type: 'Branch',
        availableInTypes: ['Mainland', 'Free Zone'],
        attributes: {
            minShareholders: 1, // Parent company
            maxShareholders: 1,
            allowsForeignOwnership: true,
            liability: 'Unlimited', // Liability on parent
            requiresLocalSponsor: true // Often purely as Agent
        },
        pros: ['Extension of parent brand', 'Eases huge project contracting'],
        cons: ['Parent company liable', 'Complex documentation (Attestation)']
        , description: "A legally dependent office of an existing foreign or local parent company."
    },
    {
        id: 'opc',
        name: 'One Person Company (OPC)',
        type: 'LLC', // It's a form of LLC usually
        availableInTypes: ['Mainland'],
        attributes: {
            minShareholders: 1,
            maxShareholders: 1,
            allowsForeignOwnership: true,
            liability: 'Limited',
            requiresLocalSponsor: false
        },
        pros: ['Limited Liability for solo founders', 'Full control'],
        cons: ['Capital requirements often higher', 'Strict single-owner rule']
        , description: "Limited liability structure customized for a single owner."
    }
];
