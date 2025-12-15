import { Jurisdiction, jurisdictions } from "./jurisdictions";
import { LegalForm, legalForms } from "./legal_forms";

// --- TYPES ---
export type Country = "Egypt" | "UAE" | "USA" | "KSA" | "";
export type Zone = "Mainland" | "Free Zone" | "";
export type Activity = "Trading" | "Manufacturing" | "Service" | "Crypto" | "";
export type Nationality = "Local" | "Foreign" | "Mixed" | "";
export type Capital = "Low" | "Medium" | "High" | "";
export type Speed = "Standard" | "Fast" | "";

export interface WizardState {
    country: Country;
    zone: Zone;
    activity: Activity;
    hasShowroom: boolean;
    shareholders: number;
    nationality: Nationality;
    capital: Capital;
    speed: Speed;
}

// Re-using Recommendation Structure
export interface JurisdictionRecommendation {
    id: string;
    entity: Jurisdiction;
    matchScore: number;
    pros: string[];
    cons: string[];
    isBestMatch: boolean;
}

export interface LegalFormRecommendation {
    id: string;
    entity: LegalForm;
    matchScore: number;
    pros: string[];
    cons: string[];
    isBestMatch: boolean;
}

export const initialWizardState: WizardState = {
    country: "",
    zone: "",
    activity: "",
    hasShowroom: false,
    shareholders: 1,
    nationality: "",
    capital: "",
    speed: "Standard",
};

// --- LOGIC 1: JURISDICTONS ---
export function calculateRecommendations(data: WizardState): JurisdictionRecommendation[] {
    const recs: JurisdictionRecommendation[] = [];

    // Capital Helper
    const getCapitalBudgetUSD = (cap: string) => {
        if (cap === "Low") return 10000;
        if (cap === "Medium") return 60000;
        return 300000;
    };
    const userCapital = getCapitalBudgetUSD(data.capital);

    jurisdictions.forEach(entity => {
        let score = 100;
        const reasons: string[] = [];
        const cons: string[] = [];
        const attrs = entity.attributes;

        // Kill Switches
        if (entity.country !== data.country) return;
        if (data.zone === "Free Zone" && entity.type !== "Free Zone") return;
        if (data.zone === "Mainland" && entity.type === "Free Zone") return;

        if (data.activity === "Crypto" && !attrs.allowsCrypto) return;
        if (data.hasShowroom && !attrs.allowsRetail) return;
        if (userCapital < attrs.minCapital) return;

        // Weighting
        if (data.capital === "Low" && attrs.costTier === "Low") { score += 20; reasons.push("Budget friendly"); }
        if (data.capital === "Low" && attrs.costTier === "High") { score -= 30; cons.push("High setup costs"); }
        if (data.speed === "Fast" && attrs.speed === "Fast") { score += 20; reasons.push("Fast setup"); }
        if (data.speed === "Fast" && attrs.speed === "Slow") { score -= 20; cons.push("Slow process"); }

        score = Math.max(0, Math.min(100, score));

        recs.push({
            id: entity.id,
            entity: entity,
            matchScore: score,
            pros: [...reasons, ...entity.pros],
            cons: [...cons, ...entity.cons],
            isBestMatch: false
        });
    });

    recs.sort((a, b) => b.matchScore - a.matchScore);
    if (recs.length > 0) recs[0].isBestMatch = true;
    return recs;
}

// --- LOGIC 2: LEGAL FORMS ---
// Filters legal forms based on the SELECTED Jurisdiction + User Inputs
export function recommendLegalForms(data: WizardState, jurisdiction: Jurisdiction): LegalFormRecommendation[] {
    const recs: LegalFormRecommendation[] = [];

    legalForms.forEach(form => {
        let score = 100;
        const reasons: string[] = [];
        const cons: string[] = [];
        const attrs = form.attributes;

        // 1. Availability in Jurisdiction Type
        // If Jurisdiction is "Free Zone", form MUST be available in Free Zone
        if (!form.availableInTypes.includes(jurisdiction.type)) {
            return; // Kill
        }

        // 2. Shareholder Constraints
        if (data.shareholders < attrs.minShareholders) return;
        if (data.shareholders > attrs.maxShareholders) return;

        // 3. Foreign Ownership
        // (Simplified logic: if user is Foreign and form doesn't allow, kill)
        // Note: Our data says almost all allow, but 'Sole' might require sponsor
        if (data.nationality === "Foreign" && !attrs.allowsForeignOwnership) return;

        // Preference Scoring

        // Liability
        if (attrs.liability === "Unlimited") {
            score -= 10;
            cons.push("Personal assets at risk (Unlimited Liability)");
        } else {
            score += 10;
            reasons.push("Assets protected (Limited Liability)");
        }

        // Simplicity vs Scale
        if (data.shareholders === 1 && (form.id === 'sole' || form.id === 'opc')) {
            score += 15;
            reasons.push("Optimized for solo founders");
        }

        if (data.capital === "High" && form.type === "LLC") {
            score += 10;
            reasons.push("Robust structure for capital");
        }

        score = Math.max(0, Math.min(100, score));

        recs.push({
            id: form.id,
            entity: form,
            matchScore: score,
            pros: [...reasons, ...form.pros],
            cons: [...cons, ...form.cons],
            isBestMatch: false
        });
    });

    recs.sort((a, b) => b.matchScore - a.matchScore);
    if (recs.length > 0) recs[0].isBestMatch = true;
    return recs;
}
