
interface TaxRates {
    vat: number;
    corporate: number;
    currency: string;
    threshold?: number;
}

const taxRules: Record<string, TaxRates> = {
    Egypt: { vat: 14, corporate: 22.5, currency: "EGP" },
    UAE: { vat: 5, corporate: 9, currency: "AED", threshold: 375000 },
    KSA: { vat: 15, corporate: 20, currency: "SAR" },
};

function calculate(country: string, revenue: number, expenses: number) {
    const rules = taxRules[country];
    const vatPayable = (revenue * (rules.vat / 100)) - (expenses * (rules.vat / 100));

    const profit = revenue - expenses;
    let corpTax = 0;

    if (country === "UAE" && rules.threshold) {
        if (profit > rules.threshold) {
            corpTax = (profit - rules.threshold) * (rules.corporate / 100);
        }
    } else {
        corpTax = Math.max(0, profit * (rules.corporate / 100));
    }

    return {
        country,
        revenue,
        expenses,
        vatPayable: Math.max(0, vatPayable),
        corporateTax: Math.max(0, corpTax),
        totalLiabilty: Math.max(0, vatPayable + corpTax)
    };
}

console.log("Running Tax Logic Verification...\n");

const tests = [
    { country: "Egypt", rev: 1000, exp: 0 },
    { country: "UAE", rev: 1000, exp: 0 }, // Below threshold
    { country: "UAE", rev: 500000, exp: 0 }, // Above threshold (375k)
    { country: "KSA", rev: 1000, exp: 0 }
];

tests.forEach(t => {
    const res = calculate(t.country, t.rev, t.exp);
    console.log(`[${t.country}] Rev: ${t.rev}, Exp: ${t.exp}`);
    console.log(`   -> VAT: ${res.vatPayable.toFixed(2)}`);
    console.log(`   -> Corp Tax: ${res.corporateTax.toFixed(2)}`);
    console.log(`   -> Total: ${res.totalLiabilty.toFixed(2)}`);
    console.log("-----------------------------------");
});
