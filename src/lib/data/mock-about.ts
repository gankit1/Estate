// Static mock data for Pacific Star Realty About page

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: "executive" | "private-client" | "investment" | "legal";
  departmentLabel: string;
  experienceYears: number;
  specialization: string;
  reraNumber: string;
  bio: string;
  languages: string[];
  image: string;
  linkedIn?: string;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
  highlightMetric: string;
  badge: string;
}

export interface CompanyPillar {
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  metrics: string;
}

export interface AwardAccreditation {
  id: string;
  title: string;
  issuer: string;
  year: string;
  badgeText: string;
  description: string;
}

export interface OfficeLocation {
  id: string;
  name: string;
  district: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  features: string[];
  coordinates: { lat: number; lng: number };
}

/* ── 1. Leadership Team ─────────────────────────────────────── */
export const mockTeamMembers: TeamMember[] = [
  {
    id: "team-1",
    name: "Tariq Al-Mansoor",
    role: "Founder & Managing Partner",
    department: "executive",
    departmentLabel: "Executive Leadership",
    experienceYears: 18,
    specialization: "Master Community Strategic Advisory & UHNW Acquisitions",
    reraNumber: "BRN 18420",
    bio: "With nearly two decades orchestrating major transactions across Dubai, Tariq previously advised institutional master developers before establishing Pacific Star Realty to deliver conflict-free advisory to international family offices.",
    languages: ["English", "Arabic", "French"],
    image: "/images/project-downtown.svg",
    linkedIn: "https://linkedin.com",
  },
  {
    id: "team-2",
    name: "Elena Rostova",
    role: "Head of Private Client Advisory",
    department: "private-client",
    departmentLabel: "Private Clients & Penthouses",
    experienceYears: 14,
    specialization: "Palm Jumeirah Beachfront Villas & Branded Sky Penthouses",
    reraNumber: "BRN 29311",
    bio: "Specializing exclusively in ultra-prime waterfront trophy assets, Elena oversees bespoke acquisitions on Palm Jumeirah, Jumeirah Bay Island, and Bluewaters Island for royal families and European entrepreneurs.",
    languages: ["English", "Russian", "German"],
    image: "/images/project-palm.svg",
    linkedIn: "https://linkedin.com",
  },
  {
    id: "team-3",
    name: "Marcus Sterling",
    role: "Director of Investment Analytics & Off-Plan",
    department: "investment",
    departmentLabel: "Investment & Capital Markets",
    experienceYears: 12,
    specialization: "Gross Rental Yield Underwriting & Phased Bulk Acquisitions",
    reraNumber: "BRN 34912",
    bio: "Former London investment banking M&A analyst, Marcus leads Pacific Star's proprietary yield modeling team, vetting master developer feasibility, escrow solvency, and capital appreciation projections.",
    languages: ["English", "Spanish"],
    image: "/images/project-city.svg",
    linkedIn: "https://linkedin.com",
  },
  {
    id: "team-4",
    name: "Farah El-Sayed",
    role: "Head of Government Relations & Golden Visa",
    department: "legal",
    departmentLabel: "Legal & Residency Concierge",
    experienceYears: 10,
    specialization: "DLD Cube VIP Nominations & 06-Year Golden Visa Processing",
    reraNumber: "DLD Concierge #410",
    bio: "Farah coordinates directly with the Dubai Land Department Cube Center and the Federal Authority (ICP), ensuring a seamless, white-glove residency journey for property investors and their families.",
    languages: ["Arabic", "English"],
    image: "/images/project-creek.svg",
    linkedIn: "https://linkedin.com",
  },
  {
    id: "team-5",
    name: "Vikram Mehta",
    role: "Head of Asset Management & Secondary Sales",
    department: "investment",
    departmentLabel: "Asset Management",
    experienceYears: 13,
    specialization: "Turnkey Tenant Leasing, Ejari Compliance & Resale Liquidity",
    reraNumber: "BRN 25018",
    bio: "Managing over AED 1.2 Billion in client residential real estate, Vikram leads the property management division providing overseas owners with completely passive rental yield collection and routine maintenance.",
    languages: ["English", "Hindi", "Gujarati"],
    image: "/images/project-hills.svg",
    linkedIn: "https://linkedin.com",
  },
  {
    id: "team-6",
    name: "Sophie Laurent",
    role: "Senior Consultant – European Family Desks",
    department: "private-client",
    departmentLabel: "Private Clients",
    experienceYears: 9,
    specialization: "Downtown Dubai & DIFC Executive Apartments",
    reraNumber: "BRN 41829",
    bio: "Sophie provides customized market entry for high-net-worth French and Swiss families establishing residency in the UAE, focusing on walkability, international schooling, and prestige addresses.",
    languages: ["French", "English", "Italian"],
    image: "/images/project-marina.svg",
    linkedIn: "https://linkedin.com",
  },
];

/* ── 2. Historical Milestones ───────────────────────────────── */
export const mockMilestones: Milestone[] = [
  {
    year: "2012",
    title: "Inception in Downtown Dubai",
    description:
      "Pacific Star Realty was established with a singular focus: providing transparent, institutional-grade representation in Dubai's burgeoning freehold market.",
    highlightMetric: "AED 120M in Year 1 Volume",
    badge: "Founding",
  },
  {
    year: "2015",
    title: "Expansion to Coastal Master Communities",
    description:
      "Inaugurated our dedicated Dubai Marina and Palm Jumeirah waterfront desk, advising European and GCC family offices on beachfront assets.",
    highlightMetric: "250+ Waterfront Units Closed",
    badge: "Waterfront Desk",
  },
  {
    year: "2018",
    title: "Institutional Off-Plan Division",
    description:
      "Formed direct preferred agency partnerships with Emaar Properties, Sobha Realty, and Meraas, securing early-phase developer allocations for private clients.",
    highlightMetric: "Tier-1 Developer Status",
    badge: "Developer Partnerships",
  },
  {
    year: "2021",
    title: "Launch of Golden Visa VIP Concierge",
    description:
      "Pioneered end-to-end real estate residency processing in direct partnership with the Dubai Land Department VIP Cube Center.",
    highlightMetric: "100% Visa Approval Rate",
    badge: "Government Services",
  },
  {
    year: "2024",
    title: "Surpassed AED 7.5 Billion Volume",
    description:
      "Expanded our advisory scope to oversee ultra-prime branded residences, corporate real estate portfolios, and international client wealth structuring.",
    highlightMetric: "AED 7.5B+ Cumulative Volume",
    badge: "Milestone Volume",
  },
  {
    year: "2026",
    title: "Next-Gen Market Intelligence Platform",
    description:
      "Launched proprietary DLD real-time yield heatmaps, AI-driven community matchers, and transparent cash flow simulations for global investors.",
    highlightMetric: "65+ Nationalities Served",
    badge: "Digital Intelligence",
  },
];

/* ── 3. Core Pillars ────────────────────────────────────────── */
export const mockCompanyPillars: CompanyPillar[] = [
  {
    title: "Uncompromising Fiduciary Duty",
    subtitle: "Client-Centric Representation",
    description:
      "We operate with strict independence. We represent you—your capital, your returns, and your privacy—never developer sales quotas or institutional pressure.",
    iconName: "ShieldCheck",
    metrics: "100% Conflict-Free",
  },
  {
    title: "Data-Driven Market Intelligence",
    subtitle: "Rigor Over Hype",
    description:
      "Every investment recommendation is grounded in real Dubai Land Department transaction records, historical capital growth modeling, and empirical vacancy analytics.",
    iconName: "TrendingUp",
    metrics: "15+ Years DLD Indexed",
  },
  {
    title: "Direct Master Developer Access",
    subtitle: "Pre-Launch Privilege",
    description:
      "Official Tier-1 partner status with Emaar, Nakheel, Sobha, and Omniyat grants our private clients priority selection of premium floorplans before public release.",
    iconName: "Building2",
    metrics: "Tier-1 Developer Access",
  },
  {
    title: "End-to-End Wealth Stewardship",
    subtitle: "Turnkey Lifecycle",
    description:
      "From initial unit selection and Golden Visa certification to tenant sourcing, Ejari contracts, and resale exit execution, your experience is entirely hands-free.",
    iconName: "Award",
    metrics: "Turnkey Property Care",
  },
];

/* ── 4. Awards & Accreditations ─────────────────────────────── */
export const mockAwards: AwardAccreditation[] = [
  {
    id: "award-1",
    title: "Top Performing Brokerage Award",
    issuer: "Emaar Properties",
    year: "2024 / 2025",
    badgeText: "Emaar Platinum Alliance",
    description: "Awarded for exceptional sales volume, professional ethics, and client advisory in Downtown Dubai and Dubai Hills Estate.",
  },
  {
    id: "award-2",
    title: "Excellence in Regulatory Compliance",
    issuer: "Dubai Land Department (RERA)",
    year: "2024",
    badgeText: "DLD 5-Star Rating",
    description: "Recognized for 100% compliance with RERA transaction guidelines, verified escrow verifications, and advertising transparency.",
  },
  {
    id: "award-3",
    title: "Premier Partner of the Year",
    issuer: "Sobha Realty",
    year: "2023 / 2024",
    badgeText: "Sobha Signature Club",
    description: "Honored for outstanding achievement in Sobha Hartland luxury villa and waterfront apartment portfolio placements.",
  },
  {
    id: "award-4",
    title: "Top Waterfront Sales Agency",
    issuer: "Nakheel Master Developments",
    year: "2023",
    badgeText: "Palm Jumeirah Specialist",
    description: "Acknowledged for landmark transaction volumes in Palm Jumeirah luxury residences and beachfront villa acquisitions.",
  },
];

/* ── 5. Office Locations ────────────────────────────────────── */
export const mockOffices: OfficeLocation[] = [
  {
    id: "office-downtown",
    name: "Downtown Dubai Headquarters",
    district: "Downtown Dubai",
    address: "Suite 2401, Boulevard Plaza Tower 1, Sheikh Mohammed bin Rashid Blvd, Downtown Dubai, UAE",
    phone: "+971 4 500 1234",
    email: "downtown@pacificstar-realty.ae",
    hours: "Monday – Saturday: 9:00 AM – 7:00 PM (GST)",
    features: ["Private Boardroom Suites", "VIP Valet Parking", "Burj Khalifa Views", "Concierge Desk"],
    coordinates: { lat: 25.1972, lng: 55.2744 },
  },
  {
    id: "office-marina",
    name: "Dubai Marina Private Client Lounge",
    district: "Dubai Marina",
    address: "Level 18, Marina Plaza, Al Marsa Street, Dubai Marina, UAE",
    phone: "+971 4 500 5678",
    email: "marina@pacificstar-realty.ae",
    hours: "Monday – Saturday: 9:30 AM – 7:30 PM (GST)",
    features: ["Waterfront Client Lounge", "Direct Metro Access", "Private Closing Rooms", "Yacht Tour Docking"],
    coordinates: { lat: 25.0772, lng: 55.1403 },
  },
];

