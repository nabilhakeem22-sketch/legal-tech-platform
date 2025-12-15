export type CostTier = 'Low' | 'Medium' | 'High';
export type SetupSpeed = 'Fast' | 'Medium' | 'Slow';

export interface JurisdictionAttributes {
    allowsRetail: boolean;
    allowsCrypto: boolean;
    minCapital: number; // in USD approx
    costTier: CostTier;
    speed: SetupSpeed;
    taxBenefit: boolean;
    requiresLocalPartner: boolean;
}

export interface Jurisdiction {
    id: string;
    name: string;
    country: string; // Added for filtering
    type: 'Mainland' | 'Free Zone' | 'Offshore' | 'State';
    attributes: JurisdictionAttributes;
    pros: string[];
    cons: string[];
    description: string;
}

export const jurisdictions: Jurisdiction[] = [
    {
        id: 'uae_dmcc',
        name: 'Dubai Multi Commodities Centre (DMCC)',
        country: 'UAE',
        type: 'Free Zone',
        attributes: {
            allowsRetail: false,
            allowsCrypto: true,
            minCapital: 13600, // ~50k AED
            costTier: 'High',
            speed: 'Medium',
            taxBenefit: true,
            requiresLocalPartner: false
        },
        pros: ['0% Corporate Tax (Qualifying Income)', '100% Foreign Ownership', 'Crypto Ecosystem'],
        cons: ['Higher setup costs', 'Annual audit required']
        , description: "The global hub for commodities and crypto. Ideal for trading and tech."
    },
    {
        id: 'uae_mainland',
        name: 'Dubai Mainland Department of Economy (DED)',
        country: 'UAE',
        type: 'Mainland',
        attributes: {
            allowsRetail: true,
            allowsCrypto: false, // Generally restricted without specific strict regulation
            minCapital: 0,
            costTier: 'Medium',
            speed: 'Medium',
            taxBenefit: false, // Subject to 9% CT usually
            requiresLocalPartner: false // Changed recently for most activities
        },
        pros: ['Direct access to UAE local market', 'No currency restrictions', 'Unlimited visas'],
        cons: ['9% Corporate Tax applies', 'Office space required']
        , description: "Best for retail, restaurants, and contracting businesses targeting the local market."
    },
    {
        id: 'uae_difc',
        name: 'Dubai International Financial Centre (DIFC)',
        country: 'UAE',
        type: 'Free Zone',
        attributes: {
            allowsRetail: true, // Limited to within DIFC
            allowsCrypto: false, // Strictly regulated
            minCapital: 50000,
            costTier: 'High',
            speed: 'Slow', // Due diligence heavy
            taxBenefit: true,
            requiresLocalPartner: false
        },
        pros: ['Common Law Framework', 'Global Reputation', 'FinTech Hive Access'],
        cons: ['Very high costs', 'Strict regulatory reporting']
        , description: "Top-tier financial hub with English Common Law. Ideal for Funds, VCs, and FinTech."
    },
    {
        id: 'uae_shams',
        name: 'Sharjah Media City (Shams)',
        country: 'UAE',
        type: 'Free Zone',
        attributes: {
            allowsRetail: false,
            allowsCrypto: false,
            minCapital: 0,
            costTier: 'Low',
            speed: 'Fast',
            taxBenefit: true,
            requiresLocalPartner: false
        },
        pros: ['Cheapest Free Zone option', 'No physical presence required', 'Wide activity list'],
        cons: ['Bank account opening can be harder', 'Not prestigious for high-finance']
        , description: "Cost-effective solution for freelancers, media, and e-commerce startups."
    },
    {
        id: 'usa_delaware',
        name: 'Delaware LLC',
        country: 'USA',
        type: 'State',
        attributes: {
            allowsRetail: true,
            allowsCrypto: true,
            minCapital: 0,
            costTier: 'Low',
            speed: 'Fast',
            taxBenefit: true, // Pass-through
            requiresLocalPartner: false
        },
        pros: ['Global Venture Capital standard', 'Strong legal protections', 'Tax flexibility'],
        cons: ['US Tax reporting obligations', 'Annual Franchise Tax']
        , description: "The gold standard for startups raising Venture Capital globally."
    },
    {
        id: 'ksa_mainland',
        name: 'KSA Ministry of Investment (MISA)',
        country: 'KSA',
        type: 'Mainland',
        attributes: {
            allowsRetail: true,
            allowsCrypto: false,
            minCapital: 0, // Varies, but often waived for services
            costTier: 'High',
            speed: 'Medium',
            taxBenefit: false, // 20% Corporate Tax
            requiresLocalPartner: false // 100% foreign ownership allowed now
        },
        pros: ['Access to largest market in MENA', '100% Foreign Ownership (MISA)', 'Government Tender eligibility'],
        cons: ['Higher tax (20%)', 'Strict Saudization quotas']
        , description: "The primary gateway to the Saudi market. Required for retail, contracting, and government work."
    },
    {
        id: 'egypt_gafi',
        name: 'General Authority for Investment (GAFI)',
        country: 'Egypt',
        type: 'Mainland',
        attributes: {
            allowsRetail: true,
            allowsCrypto: false,
            minCapital: 50000, // EGP, very low in USD
            costTier: 'Low',
            speed: 'Slow',
            taxBenefit: false, // 22.5% CT
            requiresLocalPartner: false
        },
        pros: ['Very low setup cost', 'Access to severe talent shortage', 'Large consumer base'],
        cons: ['Currency fluctuation risk', 'Bureaucracy']
        , description: "Mainland company registration for accessing the local Egyptian market and hiring local talent."
    },
    {
        id: 'egypt_freezone',
        name: 'Public Free Zone (Nasr City/Alex)',
        country: 'Egypt',
        type: 'Free Zone',
        attributes: {
            allowsRetail: false,
            allowsCrypto: false,
            minCapital: 100000, // USD usually required
            costTier: 'Medium',
            speed: 'Medium',
            taxBenefit: true, // Export focused
            requiresLocalPartner: false
        },
        pros: ['Duty free imports', 'Dollar based operations', 'Exemption from many local regulations'],
        cons: ['Strict export requirements', 'Capital must be paid in USD']
        , description: "Export-oriented zones perfect for manufacturing or global service hubs."
    }
];
