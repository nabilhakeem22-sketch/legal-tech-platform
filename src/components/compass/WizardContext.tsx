"use client";

import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import {
    calculateRecommendations,
    recommendLegalForms,
    initialWizardState,
    WizardState,
    JurisdictionRecommendation,
    LegalFormRecommendation
} from "./ScoringEngine";
import { Jurisdiction } from "./jurisdictions";
import { LegalForm } from "./legal_forms";

interface WizardContextType {
    step: number;
    nextStep: () => void;
    prevStep: () => void;
    state: WizardState;
    updateState: (updates: Partial<WizardState>) => void;

    // Recommendations
    jurisdictionRecs: JurisdictionRecommendation[];
    legalFormRecs: LegalFormRecommendation[];

    // Selections
    selectedJurisdiction: Jurisdiction | null;
    selectJurisdiction: (j: Jurisdiction) => void;

    selectedLegalForm: LegalForm | null;
    selectLegalForm: (f: LegalForm) => void;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export function WizardProvider({ children }: { children: ReactNode }) {
    const [step, setStep] = useState(1);
    const [state, setState] = useState<WizardState>(initialWizardState);

    // Selections
    const [selectedJurisdiction, setSelectedJurisdiction] = useState<Jurisdiction | null>(null);
    const [selectedLegalForm, setSelectedLegalForm] = useState<LegalForm | null>(null);

    const updateState = (updates: Partial<WizardState>) => {
        setState(prev => ({ ...prev, ...updates }));
    };

    const nextStep = () => {
        if (step === 1) {
            // Reset downstream if country changes
            setSelectedJurisdiction(null);
            setSelectedLegalForm(null);
        }
        setStep(prev => prev + 1);
    };

    const prevStep = () => setStep(prev => prev - 1);

    // 1. Jurisdictions
    const jurisdictionRecs = useMemo(() => calculateRecommendations(state), [state]);

    // 2. Legal Forms
    const legalFormRecs = useMemo(() => {
        if (!selectedJurisdiction) return [];
        return recommendLegalForms(state, selectedJurisdiction);
    }, [state, selectedJurisdiction]);

    const selectJurisdiction = (j: Jurisdiction) => {
        setSelectedJurisdiction(j);
        setSelectedLegalForm(null); // Reset form
        nextStep();
    };

    const selectLegalForm = (f: LegalForm) => {
        setSelectedLegalForm(f);
        nextStep();
    };

    return (
        <WizardContext.Provider value={{
            step, nextStep, prevStep, state, updateState,
            jurisdictionRecs, legalFormRecs,
            selectedJurisdiction, selectJurisdiction,
            selectedLegalForm, selectLegalForm
        }}>
            {children}
        </WizardContext.Provider>
    );
}

export function useWizard() {
    const context = useContext(WizardContext);
    if (!context) {
        throw new Error("useWizard must be used within a WizardProvider");
    }
    return context;
}
