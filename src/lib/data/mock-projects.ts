import type {
  Project,
  Developer,
} from "@/types";

/* ── Extended Project with Presentation Helpers ─────────────── */
export interface OffPlanProject extends Project {
  isFeatured?: boolean;
  completionPercentage?: number;
  goldenVisaEligible?: boolean;
  highlights?: string[];
  serviceChargeEst?: string;
  totalUnits?: number;
}

/* ── Top Developers ─────────────────────────────────────────── */
export const mockProjectDevelopers: Developer[] = [
  {
    _id: "dev-emaar",
    name: "Emaar Properties",
    slug: "emaar-properties",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=120&q=80",
    description: "The visionary master-developer behind Burj Khalifa, Downtown Dubai, and Dubai Creek Harbour.",
    established: 1997,
    projectsCount: 85,
    headquarters: "Dubai, UAE",
    website: "https://www.emaar.com",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "dev-damac",
    name: "DAMAC Properties",
    slug: "damac-properties",
    logo: "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=120&q=80",
    description: "Pioneers of ultra-luxury branded residences partnering with Cavalli, de GRISOGONO, and Paramount.",
    established: 2002,
    projectsCount: 48,
    headquarters: "Dubai, UAE",
    website: "https://www.damacproperties.com",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "dev-sobha",
    name: "Sobha Realty",
    slug: "sobha-realty",
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120&q=80",
    description: "Renowned for in-house 'backward integration' ensuring the highest European construction standards.",
    established: 1976,
    projectsCount: 32,
    headquarters: "Dubai, UAE",
    website: "https://www.sobharealty.com",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "dev-meraas",
    name: "Meraas",
    slug: "meraas",
    logo: "https://images.unsplash.com/photo-1541888946425-d0fbb186156f?w=120&q=80",
    description: "Creator of landmark lifestyle destinations including City Walk, Bluewaters Island, and Port de La Mer.",
    established: 2007,
    projectsCount: 26,
    headquarters: "Dubai, UAE",
    website: "https://www.meraas.com",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "dev-nakheel",
    name: "Nakheel",
    slug: "nakheel",
    logo: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=120&q=80",
    description: "Creator of the world-famous Palm Jumeirah and the expanding Dubai Islands master community.",
    established: 2000,
    projectsCount: 40,
    headquarters: "Dubai, UAE",
    website: "https://www.nakheel.com",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "dev-omniyat",
    name: "Omniyat",
    slug: "omniyat",
    logo: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=120&q=80",
    description: "Curator of architectural masterworks, collaborating with Zaha Hadid, Foster + Partners, and Dorchester Collection.",
    established: 2005,
    projectsCount: 15,
    headquarters: "Dubai, UAE",
    website: "https://www.omniyat.com",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "dev-ellington",
    name: "Ellington Properties",
    slug: "ellington-properties",
    logo: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=120&q=80",
    description: "Design-led boutique developer celebrated for resort-style residential communities and artisanal interiors.",
    established: 2014,
    projectsCount: 22,
    headquarters: "Dubai, UAE",
    website: "https://www.ellingtonproperties.ae",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "dev-binghatti",
    name: "Binghatti Developers",
    slug: "binghatti",
    logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=120&q=80",
    description: "Known for avant-garde architectural landmarks, Bugatti Residences, and Mercedes-Benz Places.",
    established: 2008,
    projectsCount: 35,
    headquarters: "Dubai, UAE",
    website: "https://www.binghatti.com",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
];

/* ── Mock Off-Plan Projects Catalog ─────────────────────────── */
export const mockOffPlanProjects: OffPlanProject[] = [
  {
    _id: "proj-001",
    name: "Harbour Views at Creek Waters",
    slug: "emaar-harbour-views",
    developerRef: "dev-emaar",
    developer: mockProjectDevelopers[0],
    location: {
      address: "Dubai Creek Harbour Promenade",
      community: "Creek Island",
      area: "Dubai Creek Harbour",
      city: "Dubai",
      coordinates: { lat: 25.2048, lng: 55.3461 },
    },
    status: "under-construction",
    publishStatus: "published",
    startingPrice: 1850000,
    currency: "AED",
    handoverDate: "2026-12-01",
    isFeatured: true,
    goldenVisaEligible: true,
    completionPercentage: 68,
    serviceChargeEst: "AED 18 / sqft",
    totalUnits: 340,
    paymentPlan: {
      onBooking: 10,
      duringConstruction: 60,
      onHandover: 30,
      postHandover: 0,
    },
    unitTypes: [
      { type: "1 Bedroom Luxury Apartment", bedrooms: 1, area: "780 sqft", startingPrice: 1850000 },
      { type: "2 Bedroom Waterfront Suite", bedrooms: 2, area: "1,240 sqft", startingPrice: 2650000 },
      { type: "3 Bedroom Panoramic Corner", bedrooms: 3, area: "1,820 sqft", startingPrice: 3890000 },
      { type: "4 Bedroom Sky Penthouse", bedrooms: 4, area: "3,150 sqft", startingPrice: 7200000 },
    ],
    highlights: [
      "Direct frontage onto the vibrant Creek Island marina",
      "Spectacular vistas of Downtown Dubai and the Ras Al Khor Flamingo Sanctuary",
      "Infinity-edge swimming pool with sunken cabanas",
      "High capital growth projection in Dubai's premier master-planned waterfront",
    ],
    amenities: [
      "Infinity Pool",
      "State-of-the-Art Gym",
      "Yacht Club Access",
      "Private Viewing Deck",
      "Concierge Service",
      "Kids Splash Pad",
      "Lush Landscaped Parks",
      "Electric Vehicle Chargers",
    ],
    description:
      "Harbour Views by Emaar stands prominently on the shores of Dubai Creek Harbour. Combining ultra-modern glass architecture with serene waterfront promenades, each residence is meticulously crafted to maximize light and panoramic skyline views. Residents enjoy immediate access to high-end boutiques, gourmet dining, and rapid links to Downtown Dubai.",
    images: [
      {
        url: "/images/project-creek.svg",
        caption: "Harbour Views Architectural Skyline",
        isPrimary: true,
      },
      {
        url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80",
        caption: "Waterfront Promenade at Twilight",
        isPrimary: false,
      },
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
        caption: "Open Concept Italian Living Suite",
        isPrimary: false,
      },
      {
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
        caption: "Infinity Edge Pool Deck",
        isPrimary: false,
      },
    ],
    floorPlans: [
      { url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80", title: "1 Bedroom Type A (780 sqft)" },
      { url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80", title: "2 Bedroom Type B (1,240 sqft)" },
      { url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80", title: "3 Bedroom Corner Sky Residence" },
    ],
    brochureUrl: "#brochure-emaar-harbour-views",
    faq: [
      {
        question: "Is Harbour Views eligible for the UAE 06-Year Golden Visa?",
        answer: "Yes, units purchased at AED 2,000,000 or above qualify for the 06-Year UAE Golden Visa for the investor and family dependents.",
      },
      {
        question: "What is the payment schedule structure?",
        answer: "10% down payment on booking, 60% in linked construction milestones, and the remaining 30% on handover in December 2026.",
      },
      {
        question: "Is this development freehold for international buyers?",
        answer: "Yes, Dubai Creek Harbour is a designated 100% freehold zone welcoming buyers of all nationalities.",
      },
    ],
    views: 4820,
    createdAt: "2024-02-15T00:00:00Z",
    updatedAt: "2026-10-15T00:00:00Z",
  },
  {
    _id: "proj-002",
    name: "DAMAC Hills 2 Townhouses & Villas",
    slug: "damac-hills-2-townhouses",
    developerRef: "dev-damac",
    developer: mockProjectDevelopers[1],
    location: {
      address: "Al Qudra Road, DAMAC Hills 2",
      community: "Camellia Cluster",
      area: "Dubailand",
      city: "Dubai",
      coordinates: { lat: 24.9782, lng: 55.3892 },
    },
    status: "upcoming",
    publishStatus: "published",
    startingPrice: 720000,
    currency: "AED",
    handoverDate: "2027-06-01",
    isFeatured: true,
    goldenVisaEligible: false,
    completionPercentage: 25,
    serviceChargeEst: "AED 3.5 / sqft",
    totalUnits: 480,
    paymentPlan: {
      onBooking: 10,
      duringConstruction: 50,
      onHandover: 20,
      postHandover: 20,
      postHandoverYears: 2,
    },
    unitTypes: [
      { type: "3 Bedroom Modern Townhouse", bedrooms: 3, area: "1,980 sqft", startingPrice: 720000 },
      { type: "4 Bedroom Park Villa", bedrooms: 4, area: "2,450 sqft", startingPrice: 1150000 },
      { type: "5 Bedroom Standalone Villa", bedrooms: 5, area: "3,280 sqft", startingPrice: 1850000 },
    ],
    highlights: [
      "Unmatched entry-level pricing with 2-year post-handover payment plan",
      "Master-planned water town featuring Malibu Beach wave simulator and lazy river",
      "Sports city with cricket pitch, tennis academies, and paintball arena",
      "Surrounded by lush green parks and family recreation zones",
    ],
    amenities: [
      "Water Town with Wave Pool",
      "Lazy River",
      "Sports Town Complex",
      "Paintball Park",
      "Community Mall",
      "International School",
      "Dedicated Cycle Tracks",
      "24/7 Gated Security",
    ],
    description:
      "DAMAC Hills 2 is a self-contained family sanctuary packed with vibrant recreational attractions. Offering unmatched value per square foot, these contemporary townhouses showcase private gardens, generous rooftop terraces, and floor-to-ceiling glass panels overlooking tranquil green expanses.",
    images: [
      {
        url: "/images/project-hills.svg",
        caption: "Contemporary Facade with Private Garden",
        isPrimary: true,
      },
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
        caption: "Sunlit Open Plan Family Lounge",
        isPrimary: false,
      },
      {
        url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80",
        caption: "Villas Surrounding Community Greenery",
        isPrimary: false,
      },
    ],
    floorPlans: [
      { url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80", title: "3 Bedroom Townhouse Ground & First Floor" },
      { url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80", title: "4 Bedroom Villa Layout Plan" },
    ],
    brochureUrl: "#brochure-damac-hills-2",
    faq: [
      {
        question: "What is the post-handover payment plan term?",
        answer: "The project features a 20% payment spread across 24 monthly installments after property key handover in June 2027.",
      },
      {
        question: "Are pets allowed in the community?",
        answer: "Yes, DAMAC Hills 2 is a fully pet-friendly master community with dedicated dog parks and grooming areas.",
      },
    ],
    views: 3950,
    createdAt: "2024-03-01T00:00:00Z",
    updatedAt: "2026-10-18T00:00:00Z",
  },
  {
    _id: "proj-003",
    name: "Sobha One Riverside Towers",
    slug: "sobha-one-riverside-tower",
    developerRef: "dev-sobha",
    developer: mockProjectDevelopers[2],
    location: {
      address: "Ras Al Khor Road, MBR City",
      community: "Sobha Hartland",
      area: "Mohammed Bin Rashid City",
      city: "Dubai",
      coordinates: { lat: 25.1764, lng: 55.3117 },
    },
    status: "under-construction",
    publishStatus: "published",
    startingPrice: 2100000,
    currency: "AED",
    handoverDate: "2027-03-01",
    isFeatured: true,
    goldenVisaEligible: true,
    completionPercentage: 42,
    serviceChargeEst: "AED 16 / sqft",
    totalUnits: 512,
    paymentPlan: {
      onBooking: 10,
      duringConstruction: 50,
      onHandover: 40,
      postHandover: 0,
    },
    unitTypes: [
      { type: "1 Bedroom Panoramic Suite", bedrooms: 1, area: "820 sqft", startingPrice: 2100000 },
      { type: "2 Bedroom Waterfront Residence", bedrooms: 2, area: "1,310 sqft", startingPrice: 3250000 },
      { type: "3 Bedroom Duplex Sky Villa", bedrooms: 3, area: "2,190 sqft", startingPrice: 5100000 },
      { type: "4 Bedroom Signature Penthouse", bedrooms: 4, area: "3,400 sqft", startingPrice: 9400000 },
    ],
    highlights: [
      "Five interlinked towers embracing an 18-hole pitch & putt golf course designed by Gary Player",
      "Uninterrupted views of the Burj Khalifa skyline and tranquil Ras Al Khor waters",
      "Sobha's signature German-engineered backward integrated craftsmanship",
      "Sky terraces and wellness gardens elevated 60 floors above the city",
    ],
    amenities: [
      "18-Hole Pitch & Putt Golf Course",
      "Sky Gardens & Observation Pods",
      "Infinity Lagoon Pools",
      "Clubhouse & Fine Dining",
      "Running & Cycling Boardwalks",
      "Private Cinema",
      "Kids Nature Playground",
      "Spa & Hydrotherapy Pods",
    ],
    description:
      "Sobha One merges metropolitan grandeur with tranquil natural sanctuaries. Featuring five sculptural towers scaling between 30 and 65 storeys, the project overlooks pristine waters and a world-class putting golf course. Each home is appointed with handcrafted European joinery, acoustic double glazing, and seamless home automation.",
    images: [
      {
        url: "/images/project-creek.svg",
        caption: "Sobha One Towers Overlooking Water & Golf",
        isPrimary: true,
      },
      {
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
        caption: "Sky Lounge Sunset Observatory",
        isPrimary: false,
      },
      {
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
        caption: "Luxury Living Room with Floor-to-Ceiling Glazing",
        isPrimary: false,
      },
    ],
    floorPlans: [
      { url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80", title: "1 BR Golf View Floorplan" },
      { url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80", title: "2 BR Waterfront Suite" },
    ],
    brochureUrl: "#brochure-sobha-one",
    faq: [
      {
        question: "Does Sobha provide construction warranties?",
        answer: "Yes, Sobha provides a 06-Year structural warranty and a 1-year defect liability warranty directly from the developer.",
      },
      {
        question: "How far is Sobha One from Downtown Dubai?",
        answer: "Downtown Dubai and the Burj Khalifa are located just 8 minutes away by car along Ras Al Khor Road.",
      },
    ],
    views: 6100,
    createdAt: "2024-01-20T00:00:00Z",
    updatedAt: "2026-10-22T00:00:00Z",
  },
  {
    _id: "proj-004",
    name: "The Lana Residences, Dorchester Collection",
    slug: "the-lana-residences-dorchester",
    developerRef: "dev-omniyat",
    developer: mockProjectDevelopers[5],
    location: {
      address: "Marasi Drive, Business Bay",
      community: "Dubai Water Canal",
      area: "Downtown Dubai",
      city: "Dubai",
      coordinates: { lat: 25.186, lng: 55.2785 },
    },
    status: "ready",
    publishStatus: "published",
    startingPrice: 18500000,
    currency: "AED",
    handoverDate: "2026-09-01",
    isFeatured: true,
    goldenVisaEligible: true,
    completionPercentage: 96,
    serviceChargeEst: "AED 35 / sqft",
    totalUnits: 39,
    paymentPlan: {
      onBooking: 20,
      duringConstruction: 30,
      onHandover: 50,
      postHandover: 0,
    },
    unitTypes: [
      { type: "2 Bedroom Dorchester Suite", bedrooms: 2, area: "3,800 sqft", startingPrice: 18500000 },
      { type: "3 Bedroom Canal Duplex", bedrooms: 3, area: "5,400 sqft", startingPrice: 28000000 },
      { type: "4 Bedroom Sky Residence", bedrooms: 4, area: "7,900 sqft", startingPrice: 48000000 },
      { type: "Signature Super Penthouse", bedrooms: 5, area: "12,200 sqft", startingPrice: 95000000 },
    ],
    highlights: [
      "Ultra-exclusive boutique collection of just 39 bespoke residences",
      "Direct hospitality and 5-star concierge managed by the prestigious Dorchester Collection",
      "Architecture by Foster + Partners with interiors by Parisian studio Gilles & Boissier",
      "Private 100-foot yacht berths available along Marasi Bay Marina",
    ],
    amenities: [
      "24/7 Dorchester White-Glove Concierge",
      "Private Speedboat Marina Transfers",
      "Rooftop Infinity Lagoon Pool",
      "Private Dining Rooms & Sommelier",
      "Valet Parking & Chauffeur Services",
      "Dior Spa Treatment Suites",
      "Helipad Access",
      "Screening Cinema Room",
    ],
    description:
      "The Lana Residences is an emblem of timeless European refinement in the heart of Dubai. Created by Omniyat and designed by Norman Foster, these palatial homes feature double-height ceilings, hand-picked Italian Calacatta marble, and private plunge pools perched above the Marasi Marina.",
    images: [
      {
        url: "/images/project-downtown.svg",
        caption: "The Lana Waterfront Architectural Profile",
        isPrimary: true,
      },
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
        caption: "Dorchester Custom Gilles & Boissier Salon",
        isPrimary: false,
      },
      {
        url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80",
        caption: "Private Marina Berths & Promenade",
        isPrimary: false,
      },
    ],
    floorPlans: [
      { url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80", title: "3 Bedroom Waterfront Duplex Layout" },
      { url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80", title: "Super Penthouse Triplex" },
    ],
    brochureUrl: "#brochure-lana-dorchester",
    faq: [
      {
        question: "What hotel privileges do residence owners receive?",
        answer: "Owners enjoy full VIP membership across all worldwide Dorchester Collection properties, dedicated 24-hour butlers, and priority bookings.",
      },
    ],
    views: 8900,
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2026-10-25T00:00:00Z",
  },
  {
    _id: "proj-005",
    name: "Palm Beach Towers",
    slug: "palm-beach-towers-nakheel",
    developerRef: "dev-nakheel",
    developer: mockProjectDevelopers[4],
    location: {
      address: "Entrance of Palm Jumeirah",
      community: "Palm Jumeirah Gateway",
      area: "Palm Jumeirah",
      city: "Dubai",
      coordinates: { lat: 25.1012, lng: 55.1485 },
    },
    status: "under-construction",
    publishStatus: "published",
    startingPrice: 3400000,
    currency: "AED",
    handoverDate: "2027-01-01",
    isFeatured: true,
    goldenVisaEligible: true,
    completionPercentage: 55,
    serviceChargeEst: "AED 22 / sqft",
    totalUnits: 380,
    paymentPlan: {
      onBooking: 15,
      duringConstruction: 45,
      onHandover: 40,
      postHandover: 0,
    },
    unitTypes: [
      { type: "1 Bedroom Coastal Apartment", bedrooms: 1, area: "950 sqft", startingPrice: 3400000 },
      { type: "2 Bedroom Palm Panorama", bedrooms: 2, area: "1,520 sqft", startingPrice: 4850000 },
      { type: "3 Bedroom Seaside Duplex", bedrooms: 3, area: "2,350 sqft", startingPrice: 7900000 },
    ],
    highlights: [
      "Direct bridge connection onto the world-renowned Palm Jumeirah",
      "Private sandy beach club with cabanas and watersports concierge",
      "Direct Monorail and Tram connectivity straight into the lobby",
      "360-degree views encompassing Ain Dubai, Arabian Sea, and Dubai Marina skyline",
    ],
    amenities: [
      "Private Residents Beach",
      "Panoramic Infinity Pool on 50th Floor",
      "Direct Monorail Access",
      "Hydrotherapy Wellness Center",
      "Beachfront Dining Pavilion",
      "Kids Marine Adventure Club",
      "Valet Parking",
      "Business Center & Executive Lounges",
    ],
    description:
      "Palm Beach Towers represents the apex of island coastal living. Rising gracefully where the mainland meets Palm Jumeirah, every residence is bathed in natural Mediterranean sunlight through floor-to-ceiling glass envelopes. The private podium level boasts resort-style infinity pools, private beach access, and signature restaurants.",
    images: [
      {
        url: "/images/project-palm.svg",
        caption: "Palm Beach Towers Coastal Profile",
        isPrimary: true,
      },
      {
        url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80",
        caption: "Private Beach Club and Sundeck",
        isPrimary: false,
      },
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
        caption: "Master Bedroom with Palm Views",
        isPrimary: false,
      },
    ],
    floorPlans: [
      { url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80", title: "1 BR Beachfront Floor Plan" },
      { url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80", title: "2 BR Palm View Layout" },
    ],
    brochureUrl: "#brochure-palm-beach-towers",
    faq: [
      {
        question: "Can I moor my boat at Palm Beach Towers?",
        answer: "Yes, residents can access guest moorings and discounted annual slip leases via the adjacent Nakheel Marinas network.",
      },
    ],
    views: 7420,
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2026-10-24T00:00:00Z",
  },
  {
    _id: "proj-006",
    name: "Bluewaters Bay Luxury Residences",
    slug: "bluewaters-bay-meraas",
    developerRef: "dev-meraas",
    developer: mockProjectDevelopers[3],
    location: {
      address: "Bluewaters Island Access Road",
      community: "Bluewaters Island",
      area: "Dubai Marina",
      city: "Dubai",
      coordinates: { lat: 25.0792, lng: 55.1215 },
    },
    status: "under-construction",
    publishStatus: "published",
    startingPrice: 2800000,
    currency: "AED",
    handoverDate: "2027-09-01",
    isFeatured: false,
    goldenVisaEligible: true,
    completionPercentage: 38,
    serviceChargeEst: "AED 20 / sqft",
    totalUnits: 320,
    paymentPlan: {
      onBooking: 20,
      duringConstruction: 60,
      onHandover: 20,
      postHandover: 0,
    },
    unitTypes: [
      { type: "1 Bedroom Sea View Residence", bedrooms: 1, area: "890 sqft", startingPrice: 2800000 },
      { type: "2 Bedroom Island Apartment", bedrooms: 2, area: "1,450 sqft", startingPrice: 4100000 },
      { type: "3 Bedroom Waterfront Sanctuary", bedrooms: 3, area: "2,100 sqft", startingPrice: 6600000 },
      { type: "4 Bedroom Grand Penthouse", bedrooms: 4, area: "3,800 sqft", startingPrice: 14500000 },
    ],
    highlights: [
      "Front-row location facing Ain Dubai and the glistening waters of the Arabian Gulf",
      "Seamless pedestrian footbridge connecting directly to JBR The Beach",
      "Double-height entrance grand lobby with resident concierge",
      "Lush podium garden with infinity pool overlooking the open sea",
    ],
    amenities: [
      "Sea-Facing Infinity Pool",
      "Modern Fitness Studio with Canal Views",
      "Pedestrian Bridge to JBR Beach",
      "Barbecue & Alfresco Dining Zones",
      "Kids Splash Playpark",
      "Concierge & 24/7 Security",
      "Private Resident Lounge",
    ],
    description:
      "Bluewaters Bay combines the relaxed vibe of island seaside living with the pulsating rhythm of Dubai's world-class entertainment hub. The architectural profile draws inspiration from luxury superyachts, with clean, fluid lines and expansive glass balconies that invite ocean breezes.",
    images: [
      {
        url: "/images/project-palm.svg",
        caption: "Bluewaters Bay Island Panorama",
        isPrimary: true,
      },
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
        caption: "Modern Coastal Living Area",
        isPrimary: false,
      },
    ],
    floorPlans: [
      { url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80", title: "2 Bedroom Island Suite" },
    ],
    brochureUrl: "#brochure-bluewaters-bay",
    faq: [
      {
        question: "Is there easy road access off the island?",
        answer: "Yes, Bluewaters Island connects directly to Sheikh Zayed Road via a dedicated flyover bridge.",
      },
    ],
    views: 5200,
    createdAt: "2024-03-10T00:00:00Z",
    updatedAt: "2026-10-21T00:00:00Z",
  },
  {
    _id: "proj-007",
    name: "Ellington Beach House",
    slug: "ellington-beach-house-palm",
    developerRef: "dev-ellington",
    developer: mockProjectDevelopers[6],
    location: {
      address: "East Crescent, Palm Jumeirah",
      community: "East Crescent Coast",
      area: "Palm Jumeirah",
      city: "Dubai",
      coordinates: { lat: 25.132, lng: 55.152 },
    },
    status: "under-construction",
    publishStatus: "published",
    startingPrice: 4950000,
    currency: "AED",
    handoverDate: "2026-08-01",
    isFeatured: true,
    goldenVisaEligible: true,
    completionPercentage: 82,
    serviceChargeEst: "AED 24 / sqft",
    totalUnits: 123,
    paymentPlan: {
      onBooking: 20,
      duringConstruction: 30,
      onHandover: 50,
      postHandover: 0,
    },
    unitTypes: [
      { type: "1 Bedroom Boutique Apartment", bedrooms: 1, area: "1,040 sqft", startingPrice: 4950000 },
      { type: "2 Bedroom Coastal Haven", bedrooms: 2, area: "1,680 sqft", startingPrice: 7200000 },
      { type: "3 Bedroom Beachfront Penthouse", bedrooms: 3, area: "2,850 sqft", startingPrice: 12800000 },
    ],
    highlights: [
      "Bespoke artisanal residences with private beach club on Palm Jumeirah East Crescent",
      "Handcrafted Scandinavian joinery, Miele built-in appliances, and natural stone finishes",
      "Hotel-style valet, resident sommelier lounge, and private wellness spa",
      "High short-term holiday rental yield potential (estimated 9.2% net)",
    ],
    amenities: [
      "Private Beach Club with Sunbeds",
      "Hydrotherapy Wellness Spa",
      "Yoga & Meditation Deck",
      "Private Cigar & Wine Lounge",
      "Valet Parking",
      "Padel Tennis Court",
      "Artisan Cafe Bar in Lobby",
    ],
    description:
      "Ellington Beach House is a masterpiece of quiet luxury on Palm Jumeirah's tranquil East Crescent. Designed for discerning connoisseurs of design, this boutique collection pairs organic timber and limestone elements with seamless indoor-outdoor coastal flow.",
    images: [
      {
        url: "/images/project-palm.svg",
        caption: "Boutique Beachfront Residence Profile",
        isPrimary: true,
      },
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
        caption: "Artisan Kitchen with Miele Appliances",
        isPrimary: false,
      },
    ],
    floorPlans: [
      { url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80", title: "2 BR Palm East Crescent Plan" },
    ],
    brochureUrl: "#brochure-ellington-beach-house",
    faq: [
      {
        question: "Can I enroll my unit in a holiday home / Airbnb rental program?",
        answer: "Yes, Ellington properties are certified for DTCM holiday home licensing with dedicated property management available.",
      },
    ],
    views: 4320,
    createdAt: "2024-02-12T00:00:00Z",
    updatedAt: "2026-10-23T00:00:00Z",
  },
  {
    _id: "proj-008",
    name: "Park Horizon at Dubai Hills Estate",
    slug: "park-horizon-dubai-hills",
    developerRef: "dev-emaar",
    developer: mockProjectDevelopers[0],
    location: {
      address: "Dubai Hills Boulevard, Dubai Hills Estate",
      community: "Central Park District",
      area: "Dubai Hills Estate",
      city: "Dubai",
      coordinates: { lat: 25.1345, lng: 55.2403 },
    },
    status: "under-construction",
    publishStatus: "published",
    startingPrice: 1600000,
    currency: "AED",
    handoverDate: "2026-10-01",
    isFeatured: false,
    goldenVisaEligible: false,
    completionPercentage: 72,
    serviceChargeEst: "AED 15 / sqft",
    totalUnits: 290,
    paymentPlan: {
      onBooking: 10,
      duringConstruction: 70,
      onHandover: 20,
      postHandover: 0,
    },
    unitTypes: [
      { type: "1 Bedroom Park View", bedrooms: 1, area: "720 sqft", startingPrice: 1600000 },
      { type: "2 Bedroom Family Apartment", bedrooms: 2, area: "1,180 sqft", startingPrice: 2450000 },
      { type: "3 Bedroom Corner Townhome", bedrooms: 3, area: "1,750 sqft", startingPrice: 3800000 },
    ],
    highlights: [
      "Direct frontage to the sprawling 180,000 sqm Dubai Hills Park",
      "Minutes from Dubai Hills Mall with indoor roller coaster and Cineplex",
      "Surrounded by championship 18-hole golf course and international schools",
      "Strong tenant demand yielding high capital appreciation",
    ],
    amenities: [
      "Resort Style Swimming Pool",
      "Fully Equipped Fitness Center",
      "Direct Park Access",
      "Kids Play Areas",
      "Multipurpose Room",
      "Rooftop BBQ Terraces",
      "Covered Parking",
    ],
    description:
      "Park Horizon offers balanced urban community living enveloped by nature. Overlooking the lush greenery of Dubai Hills Park, these smart-home equipped residences offer seamless connections to Dubai Hills Mall and King's College Hospital.",
    images: [
      {
        url: "/images/project-hills.svg",
        caption: "Park Horizon Architectural View",
        isPrimary: true,
      },
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
        caption: "Modern Family Living Space",
        isPrimary: false,
      },
    ],
    floorPlans: [
      { url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80", title: "1 BR Park View Layout" },
    ],
    brochureUrl: "#brochure-park-horizon",
    faq: [
      {
        question: "Are schools located nearby?",
        answer: "Yes, GEMS Wellington Academy and Dubai Heights Academy are within a 5-minute radius.",
      },
    ],
    views: 3890,
    createdAt: "2024-03-15T00:00:00Z",
    updatedAt: "2026-10-19T00:00:00Z",
  },
  {
    _id: "proj-009",
    name: "Cavalli Couture Luxury Lagoon Living",
    slug: "cavalli-couture-damac",
    developerRef: "dev-damac",
    developer: mockProjectDevelopers[1],
    location: {
      address: "Dubai Water Canal, Safa Park",
      community: "Safa Park Canal",
      area: "Downtown Dubai",
      city: "Dubai",
      coordinates: { lat: 25.188, lng: 55.253 },
    },
    status: "upcoming",
    publishStatus: "published",
    startingPrice: 12500000,
    currency: "AED",
    handoverDate: "2027-11-01",
    isFeatured: true,
    goldenVisaEligible: true,
    completionPercentage: 20,
    serviceChargeEst: "AED 30 / sqft",
    totalUnits: 75,
    paymentPlan: {
      onBooking: 20,
      duringConstruction: 50,
      onHandover: 30,
      postHandover: 0,
    },
    unitTypes: [
      { type: "3 Bedroom Lagoon Residence", bedrooms: 3, area: "4,200 sqft", startingPrice: 12500000 },
      { type: "4 Bedroom Canal Penthouse", bedrooms: 4, area: "5,800 sqft", startingPrice: 19500000 },
      { type: "5 Bedroom Triplex Sky Palace", bedrooms: 5, area: "8,900 sqft", startingPrice: 38000000 },
    ],
    highlights: [
      "Every single apartment features its own private infinity plunge pool",
      "Branded couture interiors designed by Roberto Cavalli Home",
      "Overlooking the emerald tree canopy of Safa Park and Dubai Water Canal",
      "Triple-height waterfall cascading down the 12-storey facade",
    ],
    amenities: [
      "Private Terrace Plunge Pools",
      "Cascading Water Lagoon",
      "Cavalli Executive Lounge",
      "Japanese Floating Garden",
      "Private Cavalli Boutique in Lobby",
      "Cigar Room & Tasting Cellar",
      "24/7 Butler & Chauffeur",
    ],
    description:
      "Cavalli Couture is an architectural haute-couture masterpiece on the banks of Dubai Water Canal. Featuring private plunge pools on every terrace, sweeping botanical lagoons, and bold Cavalli animalier design signatures, it sets a brand new benchmark in high-fashion residential living.",
    images: [
      {
        url: "/images/project-downtown.svg",
        caption: "Cavalli Couture Facade with Private Terrace Pools",
        isPrimary: true,
      },
      {
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
        caption: "Haute Couture Master Salon",
        isPrimary: false,
      },
    ],
    floorPlans: [
      { url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80", title: "3 Bedroom Private Pool Terrace Plan" },
    ],
    brochureUrl: "#brochure-cavalli-couture",
    faq: [
      {
        question: "Are the plunge pools heated and cooled?",
        answer: "Yes, every terrace infinity pool features automated climate control with temperature regulation year-round.",
      },
    ],
    views: 9200,
    createdAt: "2024-04-01T00:00:00Z",
    updatedAt: "2026-10-26T00:00:00Z",
  },
  {
    _id: "proj-010",
    name: "The Oasis Waterfront Mansions",
    slug: "the-oasis-by-emaar",
    developerRef: "dev-emaar",
    developer: mockProjectDevelopers[0],
    location: {
      address: "Yalayis Street, Dubailand",
      community: "The Oasis Sanctuary",
      area: "Dubailand",
      city: "Dubai",
      coordinates: { lat: 24.992, lng: 55.281 },
    },
    status: "upcoming",
    publishStatus: "published",
    startingPrice: 8100000,
    currency: "AED",
    handoverDate: "2028-06-01",
    isFeatured: true,
    goldenVisaEligible: true,
    completionPercentage: 15,
    serviceChargeEst: "AED 5 / sqft",
    totalUnits: 150,
    paymentPlan: {
      onBooking: 10,
      duringConstruction: 75,
      onHandover: 15,
      postHandover: 0,
    },
    unitTypes: [
      { type: "4 Bedroom Lagoon Villa", bedrooms: 4, area: "6,800 sqft", startingPrice: 8100000 },
      { type: "5 Bedroom Water Mansion", bedrooms: 5, area: "8,900 sqft", startingPrice: 12500000 },
      { type: "6 Bedroom Royal Island Palace", bedrooms: 6, area: "13,200 sqft", startingPrice: 24000000 },
    ],
    highlights: [
      "Emaar's newest $20 Billion ultra-luxury resort and lagoon master community",
      "Over 25% of land dedicated to swimmable crystal lagoons, lakes, and linear waterways",
      "Villas designed by international Pritzker-prize winning architects",
      "World-class 1.5 million sqft wellness hub and retail destination",
    ],
    amenities: [
      "Swimmable Crystal Lagoons",
      "Private Sandy Beaches",
      "Clubhouse & Fine Dining",
      "Equestrian Trails & Stables",
      "Wellness & Detox Center",
      "Tennis & Padel Academy",
      "Direct Waterway Kayak Access",
    ],
    description:
      "The Oasis by Emaar is an exclusive retreat situated amidst shimmering lagoons and verdant landscape. Comprising 4 to 6-bedroom grand villas and mansions, each home seamlessly integrates water features into its architectural core.",
    images: [
      {
        url: "/images/project-hills.svg",
        caption: "Lagoon Waterfront Mansion Elevation",
        isPrimary: true,
      },
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
        caption: "Private Courtyard with Swimming Pool",
        isPrimary: false,
      },
    ],
    floorPlans: [
      { url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80", title: "5 Bedroom Mansion Layout" },
    ],
    brochureUrl: "#brochure-the-oasis",
    faq: [
      {
        question: "When will the crystal lagoons be operational?",
        answer: "The phase 1 lagoon network is scheduled for filling and testing 6 months prior to initial villa handovers in 2028.",
      },
    ],
    views: 7100,
    createdAt: "2024-04-10T00:00:00Z",
    updatedAt: "2026-10-25T00:00:00Z",
  },
  {
    _id: "proj-011",
    name: "Burj Binghatti Jacob & Co Residences",
    slug: "burj-binghatti-jacob-co",
    developerRef: "dev-binghatti",
    developer: mockProjectDevelopers[7],
    location: {
      address: "Al Asayel Street, Business Bay",
      community: "Business Bay High-Rise",
      area: "Downtown Dubai",
      city: "Dubai",
      coordinates: { lat: 25.184, lng: 55.271 },
    },
    status: "under-construction",
    publishStatus: "published",
    startingPrice: 8900000,
    currency: "AED",
    handoverDate: "2027-12-01",
    isFeatured: true,
    goldenVisaEligible: true,
    completionPercentage: 35,
    serviceChargeEst: "AED 28 / sqft",
    totalUnits: 180,
    paymentPlan: {
      onBooking: 20,
      duringConstruction: 40,
      onHandover: 40,
      postHandover: 0,
    },
    unitTypes: [
      { type: "2 Bedroom Sapphire Suite", bedrooms: 2, area: "2,050 sqft", startingPrice: 8900000 },
      { type: "3 Bedroom Emerald Penthouse", bedrooms: 3, area: "3,300 sqft", startingPrice: 15500000 },
      { type: "Fleurs de Jardin Sky Mansion", bedrooms: 5, area: "6,900 sqft", startingPrice: 38000000 },
    ],
    highlights: [
      "Set to become the tallest residential tower in the world exceeding 100 storeys",
      "Co-designed with Jacob & Co, crowned with diamond-shaped spires",
      "Bespoke private watch & jewelry showcase vault for residents",
      "360-degree infinity sky pool on floor 102 looking down onto Burj Khalifa",
    ],
    amenities: [
      "World's Highest Residential Infinity Pool",
      "Jacob & Co Private Lounge & Vault",
      "Chauffeured Rolls-Royce Fleet",
      "Private Chef & Catering Service",
      "Helipad Shuttle Transfers",
      "Cryotherapy & Oxygen Spa Rooms",
    ],
    description:
      "Burj Binghatti Jacob & Co Residences is an awe-inspiring hyper-tower that redefines horological design translated into colossal architectural form. Ascending into the clouds of Business Bay, its crown of crystalline baguettes mirrors the intricacy of Jacob & Co's most legendary timepieces.",
    images: [
      {
        url: "/images/project-downtown.svg",
        caption: "Hyper-Tower Crown Rising Over Dubai",
        isPrimary: true,
      },
      {
        url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80",
        caption: "Sky Mansion Salon with High Gloss Finishes",
        isPrimary: false,
      },
    ],
    floorPlans: [
      { url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80", title: "Sapphire 2 Bedroom Plan" },
    ],
    brochureUrl: "#brochure-burj-binghatti",
    faq: [
      {
        question: "How tall will the tower be when finished?",
        answer: "Burj Binghatti will stand at over 100 floors and exceed 450 meters, claiming the title of the world's tallest residential hyper-tower.",
      },
    ],
    views: 11400,
    createdAt: "2024-03-22T00:00:00Z",
    updatedAt: "2026-10-27T00:00:00Z",
  },
  {
    _id: "proj-012",
    name: "Sobha Hartland II Waves Grande",
    slug: "sobha-hartland-waves-grande",
    developerRef: "dev-sobha",
    developer: mockProjectDevelopers[2],
    location: {
      address: "Sobha Hartland II, MBR City",
      community: "Hartland Waterfront",
      area: "Mohammed Bin Rashid City",
      city: "Dubai",
      coordinates: { lat: 25.172, lng: 55.308 },
    },
    status: "under-construction",
    publishStatus: "published",
    startingPrice: 1450000,
    currency: "AED",
    handoverDate: "2026-11-01",
    isFeatured: false,
    goldenVisaEligible: false,
    completionPercentage: 88,
    serviceChargeEst: "AED 16 / sqft",
    totalUnits: 430,
    paymentPlan: {
      onBooking: 10,
      duringConstruction: 60,
      onHandover: 30,
      postHandover: 0,
    },
    unitTypes: [
      { type: "1 Bedroom Waterfront Suite", bedrooms: 1, area: "750 sqft", startingPrice: 1450000 },
      { type: "2 Bedroom Corner Residence", bedrooms: 2, area: "1,190 sqft", startingPrice: 2350000 },
      { type: "3 Bedroom Duplex Sky Home", bedrooms: 3, area: "1,950 sqft", startingPrice: 3950000 },
    ],
    highlights: [
      "Spectacular continuous views of Downtown Dubai and the Dubai Canal",
      "Over 1 million sqft of dedicated parks and forest walkways",
      "Two premium international schools (North London Collegiate and Hartland School) inside the community",
      "Nearly completed with handover scheduled for late 2026",
    ],
    amenities: [
      "Lagoon Style Pool Deck",
      "Indoor & Outdoor Gymnasium",
      "Yoga & Zen Garden Pavilion",
      "Barbecue Deck & Lounge",
      "Children's Splash Park",
      "24/7 Security & Concierge",
      "Direct Waterway Boardwalk",
    ],
    description:
      "Waves Grande at Sobha Hartland II epitomizes the pinnacle of waterfront tower living within a tranquil forested sanctuary. Positioned right on the waterfront promenade, these modern residences enjoy uninterrupted skyline and canal views.",
    images: [
      {
        url: "/images/project-hills.svg",
        caption: "Waves Grande Facade & Boardwalk",
        isPrimary: true,
      },
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
        caption: "Luxury Interior with Downtown Skyline View",
        isPrimary: false,
      },
    ],
    floorPlans: [
      { url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80", title: "1 BR Waterfront Suite Plan" },
    ],
    brochureUrl: "#brochure-waves-grande",
    faq: [
      {
        question: "Is Sobha Hartland II connected to public transport?",
        answer: "Yes, dedicated feeder buses link to the Business Bay and Dubai Mall metro stations in under 10 minutes.",
      },
    ],
    views: 4680,
    createdAt: "2024-02-18T00:00:00Z",
    updatedAt: "2026-10-20T00:00:00Z",
  },
];

/* ── Filter Query Interface ─────────────────────────────────── */
export interface ProjectFilterCriteria {
  status?: string;
  developer?: string;
  area?: string;
  minPrice?: number;
  maxPrice?: number;
  handoverYear?: string;
  bedrooms?: string;
  hasPostHandover?: boolean;
  q?: string;
  sort?: "featured" | "price-asc" | "price-desc" | "handover-asc" | "developer-asc";
}

/* ── Query & Filter Helper Functions ────────────────────────── */
export function getMockProjects(criteria?: ProjectFilterCriteria): OffPlanProject[] {
  let list = [...mockOffPlanProjects];

  if (!criteria) return list;

  // Search keyword
  if (criteria.q && criteria.q.trim()) {
    const term = criteria.q.trim().toLowerCase();
    list = list.filter((p) => {
      const matchName = p.name.toLowerCase().includes(term);
      const matchDev = p.developer?.name.toLowerCase().includes(term);
      const matchArea = p.location.area.toLowerCase().includes(term);
      const matchCommunity = p.location.community.toLowerCase().includes(term);
      return matchName || matchDev || matchArea || matchCommunity;
    });
  }

  // Status
  if (criteria.status && criteria.status !== "all") {
    list = list.filter((p) => p.status === criteria.status);
  }

  // Developer
  if (criteria.developer && criteria.developer !== "all") {
    const devVal = criteria.developer.toLowerCase();
    list = list.filter(
      (p) =>
        p.developer?.slug.toLowerCase() === devVal ||
        p.developerRef.toLowerCase() === devVal ||
        p.developer?.name.toLowerCase() === devVal
    );
  }

  // Area
  if (criteria.area && criteria.area !== "all") {
    const areaVal = criteria.area.toLowerCase();
    list = list.filter(
      (p) =>
        p.location.area.toLowerCase() === areaVal ||
        p.location.community.toLowerCase() === areaVal
    );
  }

  // Price range
  if (criteria.minPrice !== undefined && criteria.minPrice > 0) {
    list = list.filter((p) => p.startingPrice >= (criteria.minPrice ?? 0));
  }
  if (criteria.maxPrice !== undefined && criteria.maxPrice > 0) {
    list = list.filter((p) => p.startingPrice <= (criteria.maxPrice ?? Infinity));
  }

  // Handover Year
  if (criteria.handoverYear && criteria.handoverYear !== "all") {
    list = list.filter((p) => {
      if (!p.handoverDate) return false;
      const year = new Date(p.handoverDate).getFullYear().toString();
      if (criteria.handoverYear === "2028+") {
        return parseInt(year, 10) >= 2028;
      }
      return year === criteria.handoverYear;
    });
  }

  // Bedrooms filter
  if (criteria.bedrooms && criteria.bedrooms !== "all") {
    const bedNum = parseInt(criteria.bedrooms, 10);
    list = list.filter((p) => {
      if (criteria.bedrooms === "4+") {
        return p.unitTypes.some((u) => u.bedrooms >= 4);
      }
      return p.unitTypes.some((u) => u.bedrooms === bedNum);
    });
  }

  // Post handover filter
  if (criteria.hasPostHandover) {
    list = list.filter((p) => (p.paymentPlan?.postHandover ?? 0) > 0);
  }

  // Sorting
  const sort = criteria.sort || "featured";
  list.sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.startingPrice - b.startingPrice;
      case "price-desc":
        return b.startingPrice - a.startingPrice;
      case "handover-asc":
        return (
          new Date(a.handoverDate || "2099-01-01").getTime() -
          new Date(b.handoverDate || "2099-01-01").getTime()
        );
      case "developer-asc":
        return (a.developer?.name || "").localeCompare(b.developer?.name || "");
      case "featured":
      default:
        // Featured first, then higher views
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return (b.views || 0) - (a.views || 0);
    }
  });

  return list;
}

export function getProjectBySlug(slug: string): OffPlanProject | undefined {
  return mockOffPlanProjects.find((p) => p.slug === slug);
}

export function getDistinctAreas(): string[] {
  const set = new Set<string>();
  mockOffPlanProjects.forEach((p) => {
    if (p.location.area) set.add(p.location.area);
  });
  return Array.from(set).sort();
}
