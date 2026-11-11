// Static mock investment data for Pacific Star Realty Investment Advisory

export interface InvestmentDistrict {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: "waterfront" | "downtown" | "family" | "golf" | "emerging";
  categoryLabel: string;
  grossRentalYield: number; // e.g. 7.2%
  netRentalYield: number; // e.g. 6.1%
  capitalGrowth1Yr: number; // e.g. 14.5%
  capitalGrowth3Yr: number; // e.g. 42.8%
  avgPricePerSqft: number; // in AED
  avgStartingPrice: number; // in AED
  occupancyRate: number; // e.g. 91%
  goldenVisaEligible: boolean;
  heroImage: string;
  keyHighlights: string[];
  investmentThesis: string;
  targetInvestor: "Cashflow Maximizer" | "Capital Growth" | "High Net Worth Wealth Preservation" | "Balanced";
}

export interface GlobalCityComparison {
  city: string;
  country: string;
  flag: string;
  avgRentalYield: string;
  yieldNum: number;
  pricePerSqftUsd: number;
  stampDutyTax: string;
  capitalGainsTax: string;
  annualPropertyTax: string;
  currencyRisk: string;
  residencyOption: string;
  isHomeCity?: boolean;
}

export interface GoldenVisaStep {
  step: number;
  title: string;
  timeline: string;
  description: string;
  documents: string[];
}

export interface InvestmentStrategyCase {
  id: string;
  title: string;
  badge: string;
  targetYield: string;
  targetIrr: string;
  idealFor: string;
  horizon: string;
  minCapitalAed: string;
  description: string;
  recommendedDistricts: string[];
  sampleAllocation: { asset: string; percentage: number }[];
}

export interface InvestmentFaq {
  id: string;
  question: string;
  answer: string;
  category: "legal" | "tax" | "returns" | "process";
}

export interface InvestmentCalcInputs {
  purchasePriceAed: number;
  capitalGrowthRate: number; // annual %
  grossYieldRate: number; // annual %
  holdingYears: number;
  financingMode: "cash" | "mortgage";
  mortgageLtv?: number; // e.g. 50%
  mortgageInterestRate?: number; // e.g. 4.5%
  serviceChargeSqftAed?: number; // approx AED 18/sqft
  propertySqft?: number; // estimated approx based on price
}

export interface InvestmentCalcResults {
  purchasePriceAed: number;
  purchasePriceUsd: number;
  totalAcquisitionCostsAed: number;
  dldFeeAed: number; // 4%
  agencyFeeAed: number; // 2% + 5% VAT
  adminTrusteeFeeAed: number;
  annualGrossRentalIncomeAed: number;
  annualGrossRentalIncomeUsd: number;
  annualOperatingExpensesAed: number;
  annualNetCashFlowAed: number;
  annualNetCashFlowUsd: number;
  annualNetYieldPercent: number;
  projectedPropertyValueAtExitAed: number;
  totalCapitalAppreciationAed: number;
  cumulativeNetRentalIncomeAed: number;
  totalEstimatedReturnAed: number;
  totalRoiPercentage: number;
  goldenVisaEligible: boolean;
  goldenVisaShortfallAed: number;
}

/* ── 1. Top Investment Corridors ────────────────────────────── */
export const mockInvestmentDistricts: InvestmentDistrict[] = [
  {
    id: "inv-1",
    slug: "jumeirah-village-circle",
    name: "Jumeirah Village Circle (JVC)",
    tagline: "Highest Cashflow Rental Yields & Mid-Market Urban Demand",
    category: "emerging",
    categoryLabel: "High Cashflow Corridors",
    grossRentalYield: 8.4,
    netRentalYield: 7.1,
    capitalGrowth1Yr: 16.2,
    capitalGrowth3Yr: 48.0,
    avgPricePerSqft: 1250,
    avgStartingPrice: 950000,
    occupancyRate: 94,
    goldenVisaEligible: true, // when purchasing multiple units or 2-bed+
    heroImage: "/images/project-hills.svg",
    keyHighlights: ["8.4% Average Yield", "Low Entry Barrier", "94% Tenant Occupancy"],
    investmentThesis:
      "Dubai's top volume performer for consistent high tenant yields, supported by massive young professional demographics and easy access to Al Khail & Hessa Streets.",
    targetInvestor: "Cashflow Maximizer",
  },
  {
    id: "inv-2",
    slug: "business-bay",
    name: "Business Bay",
    tagline: "Corporate Headquarters & Short-Term Holiday Let Hub",
    category: "downtown",
    categoryLabel: "Urban Core & Commercial",
    grossRentalYield: 7.4,
    netRentalYield: 6.3,
    capitalGrowth1Yr: 13.8,
    capitalGrowth3Yr: 41.5,
    avgPricePerSqft: 2100,
    avgStartingPrice: 1750000,
    occupancyRate: 89,
    goldenVisaEligible: true,
    heroImage: "/images/project-city.svg",
    keyHighlights: ["Dubai Canal Frontage", "7.4% High Yield", "Adjacent to Downtown & DIFC"],
    investmentThesis:
      "A booming epicenter for corporate business travel and Airbnb short-term rentals, yielding up to 9-11% on professionally managed holiday homes.",
    targetInvestor: "Balanced",
  },
  {
    id: "inv-3",
    slug: "dubai-marina",
    name: "Dubai Marina",
    tagline: "Global Waterfront Benchmark with Evergreen Liquidity",
    category: "waterfront",
    categoryLabel: "Prime Coastal",
    grossRentalYield: 6.8,
    netRentalYield: 5.7,
    capitalGrowth1Yr: 11.2,
    capitalGrowth3Yr: 36.4,
    avgPricePerSqft: 1800,
    avgStartingPrice: 1600000,
    occupancyRate: 92,
    goldenVisaEligible: true,
    heroImage: "/images/project-marina.svg",
    keyHighlights: ["Proven Resale Liquidity", "Metro & Tram Connected", "World-Famous Riviera Living"],
    investmentThesis:
      "Consistently ranks #1 in tenant search queries in Dubai. Excellent secondary resale liquidity and near-zero tenant vacancy throughout the year.",
    targetInvestor: "Balanced",
  },
  {
    id: "inv-4",
    slug: "dubai-hills-estate",
    name: "Dubai Hills Estate",
    tagline: "Master-Planned Emaar Community with Supreme Capital Growth",
    category: "golf",
    categoryLabel: "Master Communities",
    grossRentalYield: 6.7,
    netRentalYield: 5.8,
    capitalGrowth1Yr: 15.4,
    capitalGrowth3Yr: 52.1,
    avgPricePerSqft: 1650,
    avgStartingPrice: 1850000,
    occupancyRate: 93,
    goldenVisaEligible: true,
    heroImage: "/images/project-hills.svg",
    keyHighlights: ["18-Hole Championship Golf", "King's College Hospital", "Dubai Hills Mall"],
    investmentThesis:
      "Emaar's flagship master development commands the highest long-term family tenant retention in the emirate, driving sustained double-digit capital appreciation.",
    targetInvestor: "Capital Growth",
  },
  {
    id: "inv-5",
    slug: "dubai-creek-harbour",
    name: "Dubai Creek Harbour",
    tagline: "The Future Downtown of Dubai with 700m Waterfront Promenade",
    category: "waterfront",
    categoryLabel: "Waterfront Mega-Project",
    grossRentalYield: 6.5,
    netRentalYield: 5.6,
    capitalGrowth1Yr: 14.8,
    capitalGrowth3Yr: 45.2,
    avgPricePerSqft: 1950,
    avgStartingPrice: 1700000,
    occupancyRate: 88,
    goldenVisaEligible: true,
    heroImage: "/images/project-creek.svg",
    keyHighlights: ["Smart Eco-City Master Plan", "Ras Al Khor Wildlife Sanctuary", "Unobstructed Downtown Skyline"],
    investmentThesis:
      "Twice the size of Downtown Dubai, Creek Harbour is in prime early-maturity stage with significant off-plan delivery milestones driving future value expansion.",
    targetInvestor: "Capital Growth",
  },
  {
    id: "inv-6",
    slug: "palm-jumeirah",
    name: "Palm Jumeirah",
    tagline: "Global Trophy Asset & Billionaire Capital Preservation Haven",
    category: "waterfront",
    categoryLabel: "Ultra-Prime Island",
    grossRentalYield: 5.9,
    netRentalYield: 5.1,
    capitalGrowth1Yr: 18.4,
    capitalGrowth3Yr: 68.5,
    avgPricePerSqft: 3400,
    avgStartingPrice: 3800000,
    occupancyRate: 90,
    goldenVisaEligible: true,
    heroImage: "/images/project-palm.svg",
    keyHighlights: ["Finite Island Supply", "18.4% YoY Capital Gain", "Global Billionaire Brand Recognition"],
    investmentThesis:
      "Strict geographic land scarcity ensures continued pricing power for luxury beachfront villas and branded signature residences.",
    targetInvestor: "High Net Worth Wealth Preservation",
  },
  {
    id: "inv-7",
    slug: "downtown-dubai",
    name: "Downtown Dubai",
    tagline: "The Prestige Core of the UAE Surrounded by Global Landmarks",
    category: "downtown",
    categoryLabel: "Prestige Trophy",
    grossRentalYield: 6.2,
    netRentalYield: 5.2,
    capitalGrowth1Yr: 12.1,
    capitalGrowth3Yr: 39.8,
    avgPricePerSqft: 2650,
    avgStartingPrice: 2200000,
    occupancyRate: 91,
    goldenVisaEligible: true,
    heroImage: "/images/project-downtown.svg",
    keyHighlights: ["Burj Khalifa & Dubai Mall", "Immediate Golden Visa Eligibility", "Premier Prestige Address"],
    investmentThesis:
      "The quintessential institutional asset class. Premium rental rates, high international recognition, and unmatched tourist footfall.",
    targetInvestor: "Balanced",
  },
  {
    id: "inv-8",
    slug: "dubai-south",
    name: "Dubai South & Expo City",
    tagline: "Aerotropolis Growth Zone around Al Maktoum International Airport",
    category: "emerging",
    categoryLabel: "High Growth Corridors",
    grossRentalYield: 8.6,
    netRentalYield: 7.3,
    capitalGrowth1Yr: 19.5,
    capitalGrowth3Yr: 58.0,
    avgPricePerSqft: 1050,
    avgStartingPrice: 850000,
    occupancyRate: 87,
    goldenVisaEligible: true,
    heroImage: "/images/project-city.svg",
    keyHighlights: ["AED 128B Airport Expansion", "Expo City Tech Hub", "Lowest Entry Point per Sqft"],
    investmentThesis:
      "The epicentre of Dubai's 2040 Urban Master Plan following the AED 128B terminal expansion of Al Maktoum Airport, projected to handle 260M passengers.",
    targetInvestor: "Capital Growth",
  },
];

/* ── 2. Global Benchmarking Comparison ──────────────────────── */
export const mockGlobalCityComparisons: GlobalCityComparison[] = [
  {
    city: "Dubai",
    country: "United Arab Emirates",
    flag: "🇦🇪",
    avgRentalYield: "6.8% – 8.6%",
    yieldNum: 7.4,
    pricePerSqftUsd: 550,
    stampDutyTax: "4% (One-off DLD)",
    capitalGainsTax: "0%",
    annualPropertyTax: "0%",
    currencyRisk: "0% (Pegged to USD at 3.6725)",
    residencyOption: "06-Year Golden Visa (AED 2M+)",
    isHomeCity: true,
  },
  {
    city: "London",
    country: "United Kingdom",
    flag: "🇬🇧",
    avgRentalYield: "3.2% – 4.1%",
    yieldNum: 3.6,
    pricePerSqftUsd: 1850,
    stampDutyTax: "Up to 15% (SDLT + Surcharges)",
    capitalGainsTax: "18% – 28%",
    annualPropertyTax: "Council Tax (£1,500 – £4,000/yr)",
    currencyRisk: "GBP Fluctuations",
    residencyOption: "Restricted / High Tier Visa",
    isHomeCity: false,
  },
  {
    city: "New York",
    country: "United States",
    flag: "🇺🇸",
    avgRentalYield: "3.8% – 4.5%",
    yieldNum: 4.1,
    pricePerSqftUsd: 1650,
    stampDutyTax: "Mansion Tax & Transfer (Up to 4%)",
    capitalGainsTax: "15% – 20% + State Tax",
    annualPropertyTax: "1.2% – 2.0% of Assessed Value",
    currencyRisk: "USD Native",
    residencyOption: "EB-5 ($800k - $1M+)",
    isHomeCity: false,
  },
  {
    city: "Singapore",
    country: "Singapore",
    flag: "🇸🇬",
    avgRentalYield: "2.6% – 3.3%",
    yieldNum: 2.9,
    pricePerSqftUsd: 2200,
    stampDutyTax: "60% ABSD for Foreign Buyers",
    capitalGainsTax: "0% (Unless trader)",
    annualPropertyTax: "Progressive up to 36%",
    currencyRisk: "SGD Fluctuations",
    residencyOption: "GIP (S$25M+ investment)",
    isHomeCity: false,
  },
  {
    city: "Hong Kong",
    country: "Hong Kong SAR",
    flag: "🇭🇰",
    avgRentalYield: "2.4% – 3.1%",
    yieldNum: 2.7,
    pricePerSqftUsd: 2450,
    stampDutyTax: "15% (Foreigner NRSD)",
    capitalGainsTax: "0%",
    annualPropertyTax: "5% Govt Rates + 15% Property Tax",
    currencyRisk: "HKD Pegged to USD",
    residencyOption: "CIES (HK$30M+)",
    isHomeCity: false,
  },
  {
    city: "Monaco",
    country: "Monaco",
    flag: "🇲🇨",
    avgRentalYield: "1.5% – 2.2%",
    yieldNum: 1.8,
    pricePerSqftUsd: 5800,
    stampDutyTax: "4.5% – 7.5%",
    capitalGainsTax: "0%",
    annualPropertyTax: "0%",
    currencyRisk: "EUR Fluctuations",
    residencyOption: "Bank Deposit (€500k+) & Lease",
    isHomeCity: false,
  },
];

/* ── 3. UAE Golden Visa Overview ────────────────────────────── */
export const mockGoldenVisaRoadmap: GoldenVisaStep[] = [
  {
    step: 1,
    title: "Property Acquisition (Min. AED 2,000,000)",
    timeline: "Days 1–7",
    description:
      "Purchase a ready or off-plan property valued at AED 2,000,000 (~$545,000 USD) or more. Can be a single luxury residence or multiple consolidated freehold units.",
    documents: ["Valid Passport Copy", "Sale & Purchase Agreement (SPA)", "Proof of Down Payment"],
  },
  {
    step: 2,
    title: "Title Deed or Oqood Issuance",
    timeline: "Days 7–14",
    description:
      "Obtain your official Title Deed (for ready units) or Pre-Title Registration Oqood certificate from the Dubai Land Department (DLD).",
    documents: ["Title Deed Certificate", "Developer NOC", "Bank Valuation Certificate (if mortgaged)"],
  },
  {
    step: 3,
    title: "DLD Cube & ICP Golden Residency Nomination",
    timeline: "Days 14–21",
    description:
      "Pacific Star Realty's concierge submits your investment portfolio directly through the Dubai Land Department VIP Cube Center to the Federal Authority (ICP).",
    documents: ["DLD Title Deed", "Good Conduct Police Clearance (if requested)", "Passport Photos"],
  },
  {
    step: 4,
    title: "Medical Fitness Screening & VIP Biometrics",
    timeline: "Days 21–24",
    description:
      "VIP express medical health screening (blood test & chest X-ray) and biometric fingerprints at government smart centers in Dubai.",
    documents: ["Original Passport", "Entry Permit / Current Tourist Visa", "Medical Center Appointment"],
  },
  {
    step: 5,
    title: "06-Year Golden Visa & Emirates ID Issuance",
    timeline: "Days 25–28",
    description:
      "Your 06-Year Renewable Residency Visa is activated on your digital passport and physical Emirates ID cards are dispatched to your residence.",
    documents: ["Golden Visa Stamping", "Digital & Physical Emirates ID", "Family Sponsorship Activation"],
  },
];

/* ── 4. Strategic Investment Playbooks ───────────────────────── */
export const mockInvestmentPlaybooks: InvestmentStrategyCase[] = [
  {
    id: "playbook-cashflow",
    title: "High-Yield Cashflow Engine",
    badge: "Maximum Income",
    targetYield: "8.2% – 9.5% Gross",
    targetIrr: "14.5% Net Annualized",
    idealFor: "Investors seeking consistent passive income in USD-pegged currency.",
    horizon: "3 – 5 Years",
    minCapitalAed: "AED 950,000 (~$259,000 USD)",
    description:
      "Focused on studio and 1-bedroom apartments in high-density employment corridors like JVC, Business Bay, and Dubai South. High occupancy with short turnaround vacancy.",
    recommendedDistricts: ["Jumeirah Village Circle", "Business Bay", "Dubai South"],
    sampleAllocation: [
      { asset: "High-yield 1-Bed in JVC", percentage: 50 },
      { asset: "Holiday Home Studio in Business Bay", percentage: 50 },
    ],
  },
  {
    id: "playbook-growth",
    title: "Capital Expansion & Golden Visa",
    badge: "Balanced Growth",
    targetYield: "6.5% – 7.2% Gross",
    targetIrr: "18.0% Net Annualized",
    idealFor: "HNW families securing UAE 06-Year residency while compounding capital in premier master developments.",
    horizon: "5 – 7 Years",
    minCapitalAed: "AED 2,000,000 (~$545,000 USD)",
    description:
      "Targeting 2-bedroom luxury apartments in Emaar master communities like Dubai Hills Estate and Dubai Creek Harbour with strong family tenant profiles and infrastructure expansion.",
    recommendedDistricts: ["Dubai Hills Estate", "Dubai Creek Harbour", "Downtown Dubai"],
    sampleAllocation: [
      { asset: "2-Bedroom Parkview in Dubai Hills", percentage: 60 },
      { asset: "Waterfront 1-Bed in Creek Harbour", percentage: 40 },
    ],
  },
  {
    id: "playbook-trophy",
    title: "Ultra-Prime Wealth Preservation",
    badge: "Capital Preservation",
    targetYield: "5.5% – 6.2% Gross",
    targetIrr: "22.5% Net Annualized",
    idealFor: "Family offices and UHNW individuals looking for trophy asset protection against global currency depreciation.",
    horizon: "7 – 10+ Years",
    minCapitalAed: "AED 10,000,000 (~$2,720,000 USD)",
    description:
      "Signature coastal villas, branded penthouses, and private beachfront residences on Palm Jumeirah and Jumeirah Bay Island with strictly limited physical supply.",
    recommendedDistricts: ["Palm Jumeirah", "Jumeirah Bay Island", "Emirates Hills"],
    sampleAllocation: [
      { asset: "Direct Beachfront Villa on Palm Jumeirah", percentage: 70 },
      { asset: "Branded Sky Penthouse in Downtown", percentage: 30 },
    ],
  },
];

/* ── 5. Real Estate Investment FAQs ─────────────────────────── */
export const mockInvestmentFaqs: InvestmentFaq[] = [
  {
    id: "faq-1",
    question: "Can foreigners and non-UAE residents buy property in Dubai?",
    answer:
      "Yes, 100%. Under Law No. 7 of 2006, foreign nationals of any citizenship (resident or non-resident) can acquire 100% freehold ownership of real estate in designated investment zones including Downtown Dubai, Dubai Marina, Palm Jumeirah, Dubai Hills Estate, Business Bay, and Creek Harbour. Freehold ownership grants absolute title deed rights with no local partner required.",
    category: "legal",
  },
  {
    id: "faq-2",
    question: "What are the exact acquisition and closing costs in Dubai?",
    answer:
      "Acquisition costs in Dubai are transparent and among the lowest in international gateway cities: 1) Dubai Land Department (DLD) transfer fee: 4% of property purchase price; 2) DLD administrative fee: AED 4,200 for ready properties (AED 40 for off-plan Oqood); 3) Real estate agency commission: 2% + 5% VAT; 4) Registration Trustee Fee: AED 4,000 + 5% VAT. There are no ongoing municipal property taxes or annual council taxes.",
    category: "process",
  },
  {
    id: "faq-3",
    question: "How do I qualify for the 06-Year UAE Golden Visa through real estate?",
    answer:
      "To qualify for the 06-Year Real Estate Golden Visa, you must invest a minimum of AED 2,000,000 (~$545,000 USD) in Dubai property. This can be achieved through a single property or multiple consolidated properties. Both ready and approved off-plan properties are eligible. Mortgaged properties qualify as long as an NOC from the bank is provided confirming AED 2M+ equity. The Golden Visa grants renewable 06-Year residency for yourself, spouse, children of any age, and domestic staff.",
    category: "legal",
  },
  {
    id: "faq-4",
    question: "What taxes apply to rental income and property capital gains?",
    answer:
      "Dubai levies 0% personal income tax, 0% capital gains tax, 0% wealth tax, and 0% inheritance tax on real estate investments. All rental income collected and capital appreciation realized upon sale are 100% tax-free at the UAE municipal level. (Overseas investors should consult their domestic tax advisors regarding international tax residency treaties).",
    category: "tax",
  },
  {
    id: "faq-5",
    question: "Can I purchase property in Dubai using cryptocurrency or international wire transfer?",
    answer:
      "Yes. International buyers can remit funds directly via SWIFT wire transfer in major currencies (USD, EUR, GBP, CHF) to developer escrow accounts or licensed brokerage accounts. Cryptocurrency payments (Bitcoin, Ethereum, USDT) are fully supported through central bank-regulated digital asset payment gateways that convert crypto into AED manager's cheques accepted by the Land Department.",
    category: "process",
  },
  {
    id: "faq-6",
    question: "How do overseas investors manage properties and collect rental income remotely?",
    answer:
      "Pacific Star Realty offers comprehensive end-to-end turnkey property management. Our team handles tenant sourcing, Ejari government registration, DLD inspection compliance, rent collection directly into your international bank account, routine maintenance, and legal lease renewals, providing a 100% hands-off passive experience for global owners.",
    category: "returns",
  },
  {
    id: "faq-7",
    question: "What is the difference between Off-Plan and Ready property investment?",
    answer:
      "Off-plan properties are purchased directly from master developers under construction with flexible payment plans (such as 60% during construction and 40% on handover), often with zero agency commission and lower initial capital outlay. Ready properties allow immediate tenancy from day one, delivering immediate rental yields, immediate physical inspection, and instant Golden Visa eligibility.",
    category: "returns",
  },
  {
    id: "faq-8",
    question: "Why is the AED currency peg beneficial for international property investors?",
    answer:
      "The UAE Dirham (AED) has been officially pegged to the US Dollar at a fixed rate of 1 USD = 3.6725 AED since 1997. This eliminates foreign exchange conversion risk for USD-denominated investors, providing monetary stability backed by UAE central bank foreign exchange reserves.",
    category: "tax",
  },
];

/* ── 6. Calculations Engine ─────────────────────────────────── */
export function calculateInvestmentReturns(inputs: InvestmentCalcInputs): InvestmentCalcResults {
  const {
    purchasePriceAed,
    capitalGrowthRate,
    grossYieldRate,
    holdingYears,
    financingMode,
    mortgageLtv = 50,
    mortgageInterestRate = 4.5,
  } = inputs;

  const USD_RATE = 3.6725;
  const GOLDEN_VISA_THRESHOLD_AED = 2000000;

  // Acquisition costs
  const dldFeeAed = purchasePriceAed * 0.04;
  const agencyFeeAed = purchasePriceAed * 0.02 * 1.05; // 2% + 5% VAT
  const adminTrusteeFeeAed = 5800;
  const totalAcquisitionCostsAed = dldFeeAed + agencyFeeAed + adminTrusteeFeeAed;

  // Annual gross rental income
  const annualGrossRentalIncomeAed = purchasePriceAed * (grossYieldRate / 100);

  // Operating costs: approx 15% of gross rent for service charges, insurance, and routine upkeep
  let annualOperatingExpensesAed = annualGrossRentalIncomeAed * 0.15;

  // Financing cost
  let annualMortgagePaymentAed = 0;
  if (financingMode === "mortgage") {
    const loanAmount = purchasePriceAed * (mortgageLtv / 100);
    // Simple annual interest estimate for financial illustration
    annualMortgagePaymentAed = loanAmount * (mortgageInterestRate / 100);
    annualOperatingExpensesAed += annualMortgagePaymentAed;
  }

  const annualNetCashFlowAed = Math.max(0, annualGrossRentalIncomeAed - annualOperatingExpensesAed);
  const annualNetYieldPercent = (annualNetCashFlowAed / purchasePriceAed) * 100;

  // Compounded Capital Growth at exit
  const projectedPropertyValueAtExitAed =
    purchasePriceAed * Math.pow(1 + capitalGrowthRate / 100, holdingYears);
  const totalCapitalAppreciationAed = projectedPropertyValueAtExitAed - purchasePriceAed;

  // Cumulative rental income over holding period
  const cumulativeNetRentalIncomeAed = annualNetCashFlowAed * holdingYears;

  // Total Return = Capital Growth + Total Net Rent - Acquisition Costs
  const totalEstimatedReturnAed =
    totalCapitalAppreciationAed + cumulativeNetRentalIncomeAed - totalAcquisitionCostsAed;

  const totalRoiPercentage = (totalEstimatedReturnAed / purchasePriceAed) * 100;

  // Golden Visa Check
  const goldenVisaEligible = purchasePriceAed >= GOLDEN_VISA_THRESHOLD_AED;
  const goldenVisaShortfallAed = Math.max(0, GOLDEN_VISA_THRESHOLD_AED - purchasePriceAed);

  return {
    purchasePriceAed,
    purchasePriceUsd: Math.round(purchasePriceAed / USD_RATE),
    totalAcquisitionCostsAed: Math.round(totalAcquisitionCostsAed),
    dldFeeAed: Math.round(dldFeeAed),
    agencyFeeAed: Math.round(agencyFeeAed),
    adminTrusteeFeeAed: Math.round(adminTrusteeFeeAed),
    annualGrossRentalIncomeAed: Math.round(annualGrossRentalIncomeAed),
    annualGrossRentalIncomeUsd: Math.round(annualGrossRentalIncomeAed / USD_RATE),
    annualOperatingExpensesAed: Math.round(annualOperatingExpensesAed),
    annualNetCashFlowAed: Math.round(annualNetCashFlowAed),
    annualNetCashFlowUsd: Math.round(annualNetCashFlowAed / USD_RATE),
    annualNetYieldPercent: Number(annualNetYieldPercent.toFixed(2)),
    projectedPropertyValueAtExitAed: Math.round(projectedPropertyValueAtExitAed),
    totalCapitalAppreciationAed: Math.round(totalCapitalAppreciationAed),
    cumulativeNetRentalIncomeAed: Math.round(cumulativeNetRentalIncomeAed),
    totalEstimatedReturnAed: Math.round(totalEstimatedReturnAed),
    totalRoiPercentage: Number(totalRoiPercentage.toFixed(1)),
    goldenVisaEligible,
    goldenVisaShortfallAed: Math.round(goldenVisaShortfallAed),
  };
}

/* ── 7. Filter Helper ────────────────────────────────────────── */
export function getFilteredInvestmentDistricts(options?: {
  category?: string;
  minYield?: number;
  goldenVisaOnly?: boolean;
  sort?: "yield-desc" | "growth-desc" | "price-asc" | "price-desc";
}): InvestmentDistrict[] {
  let list = [...mockInvestmentDistricts];

  if (options?.category && options.category !== "all") {
    list = list.filter((d) => d.category === options.category);
  }

  if (options?.minYield) {
    list = list.filter((d) => d.grossRentalYield >= (options.minYield ?? 0));
  }

  if (options?.goldenVisaOnly) {
    list = list.filter((d) => d.goldenVisaEligible);
  }

  if (options?.sort === "yield-desc") {
    list.sort((a, b) => b.grossRentalYield - a.grossRentalYield);
  } else if (options?.sort === "growth-desc") {
    list.sort((a, b) => b.capitalGrowth1Yr - a.capitalGrowth1Yr);
  } else if (options?.sort === "price-asc") {
    list.sort((a, b) => a.avgStartingPrice - b.avgStartingPrice);
  } else if (options?.sort === "price-desc") {
    list.sort((a, b) => b.avgStartingPrice - a.avgStartingPrice);
  }

  return list;
}

