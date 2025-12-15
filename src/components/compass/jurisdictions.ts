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
    }
];
