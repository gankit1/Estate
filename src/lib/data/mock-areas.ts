import type { Area } from "@/types";

/* ── Enhanced Area with Investment & Lifestyle Intelligence ── */
export interface EnhancedArea extends Area {
  lifestyleCategory:
    | "all"
    | "waterfront"
    | "downtown"
    | "golf"
    | "luxury-villas"
    | "high-roi"
    | "family";
  categoryLabel: string;
  capitalGrowth1Yr: number; // e.g. 14.2%
  avgStartingPrice: number;
  avgApartmentPrice: number;
  avgVillaPrice?: number;
  freehold: boolean;
  goldenVisaEligible: boolean;
  highlights: string[];
  schoolsNearby: string[];
  lifestyleRating: number; // out of 5
  investmentScore: number; // out of 100
  images: Array<{
    url: string;
    caption?: string;
    isPrimary?: boolean;
  }>;
}

/* ── Criteria for Filtering Areas ────────────────────────────── */
export interface AreaFilterCriteria {
  q?: string;
  lifestyle?: string;
  metroOnly?: boolean;
  minYield?: number;
  maxPriceSqft?: number;
  sort?:
    | "recommended"
    | "yield-desc"
    | "price-asc"
    | "price-desc"
    | "growth-desc"
    | "name-asc";
}

/* ── 12 Curated Master Dubai Districts ───────────────────────── */
export const mockDubaiAreas: EnhancedArea[] = [
  {
    _id: "area-marina",
    name: "Dubai Marina",
    slug: "dubai-marina",
    heroImage: "/images/hero-dubai.jpg",
    lifestyleCategory: "waterfront",
    categoryLabel: "Waterfront Living",
    overview:
      "A world-renowned Riviera-style canal metropolis spanning 3 kilometers along the Arabian Gulf coastline. Home to over 200 luxury residential high-rises, superyacht berths, and the vibrant Marina Walk promenade.",
    lifestyle:
      "Cosmopolitan marina lifestyle with waterside jogging tracks, Michelin-starred alfresco dining, luxury beach clubs, and vibrant weekend social scenes.",
    propertyTypes: ["apartment", "penthouse", "duplex"],
    avgSalePricePerSqft: 1800,
    avgRentApartment: 95000,
    avgRentalYield: 6.8,
    capitalGrowth1Yr: 12.4,
    avgStartingPrice: 1450000,
    avgApartmentPrice: 2200000,
    freehold: true,
    goldenVisaEligible: true,
    coordinates: { lat: 25.0805, lng: 55.1403 },
    transportation: {
      metro: true,
      bus: true,
      tram: true,
      notes: "Direct connection to DMCC & Sobha Realty Metro Stations, plus Dubai Tram loop.",
    },
    nearbyPlaces: [
      { category: "Beach", name: "JBR The Beach", distance: "5 min walk" },
      { category: "Mall", name: "Dubai Marina Mall", distance: "Walking distance" },
      { category: "Transit", name: "DMCC Metro Station", distance: "3 min walk" },
      { category: "Marina", name: "Dubai Marina Yacht Club", distance: "On-site" },
    ],
    schoolsNearby: [
      "Emirates International School Meadows",
      "Dubai British School Jumeirah Park",
      "Regent International School",
    ],
    highlights: [
      "7km continuous paved pedestrian promenade with 300+ retail outlets",
      "World-class superyacht berthing facilities and yacht charter clubs",
      "Direct walking access to JBR beachfront and Bluewaters pedestrian footbridge",
      "Consistent high rental liquidity from multinational corporate executives",
    ],
    lifestyleRating: 4.9,
    investmentScore: 92,
    faq: [
      {
        question: "Is Dubai Marina fully freehold for foreign nationals?",
        answer:
          "Yes, Dubai Marina is a designated 100% freehold master zone where international investors can acquire unconditional real estate title deeds.",
      },
      {
        question: "What is the typical rental yield in Dubai Marina?",
        answer:
          "Dubai Marina averages between 6.5% and 7.2% gross rental yields, driven by strong short-term holiday home demand and long-term expatriate leasing.",
      },
      {
        question: "Are metro and tram connections easily accessible?",
        answer:
          "Yes, Dubai Marina is one of Dubai's best-connected districts with two Red Line Metro stations (Sobha Realty and DMCC) and an integrated 11-station Tram loop.",
      },
    ],
    images: [
      { url: "/images/project-marina.svg", caption: "Dubai Marina Skyline & Water Promenade", isPrimary: true },
      { url: "/images/hero-dubai.jpg", caption: "Panoramic Marina Towers at Golden Hour" },
      { url: "/images/project-palm.svg", caption: "Waterfront Canal Perspective" },
    ],
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2026-11-01T00:00:00Z",
  },
  {
    _id: "area-downtown",
    name: "Downtown Dubai",
    slug: "downtown-dubai",
    heroImage: "/images/hero-dubai-downtown.jpg",
    lifestyleCategory: "downtown",
    categoryLabel: "Downtown & Iconic",
    overview:
      "The prestigious crown jewel of Dubai real estate. Anchored by the world's tallest tower (Burj Khalifa), the world's largest shopping destination (The Dubai Mall), and the choreographed Dubai Fountain.",
    lifestyle:
      "Ultra-prime metropolitan living surrounded by haute couture flagships, Dubai Opera performances, world-class five-star hospitality, and iconic architectural vistas.",
    propertyTypes: ["apartment", "penthouse", "duplex"],
    avgSalePricePerSqft: 2450,
    avgRentApartment: 125000,
    avgRentalYield: 5.9,
    capitalGrowth1Yr: 15.8,
    avgStartingPrice: 2100000,
    avgApartmentPrice: 3400000,
    freehold: true,
    goldenVisaEligible: true,
    coordinates: { lat: 25.1972, lng: 55.2744 },
    transportation: {
      metro: true,
      bus: true,
      tram: false,
      notes: "Burj Khalifa / Dubai Mall Red Line Metro with climate-controlled travellator link.",
    },
    nearbyPlaces: [
      { category: "Landmark", name: "Burj Khalifa", distance: "Walking distance" },
      { category: "Mall", name: "The Dubai Mall & Fashion Avenue", distance: "Walking distance" },
      { category: "Culture", name: "Dubai Opera", distance: "3 min walk" },
      { category: "Park", name: "Burj Park Island", distance: "5 min walk" },
    ],
    schoolsNearby: [
      "JSS Private School",
      "Horizon English School Dubai",
      "Hartland International School",
    ],
    highlights: [
      "Unrivaled global prestige address with immediate access to Burj Khalifa and Dubai Mall",
      "Home to the Opera District with world-class performing arts theatre",
      "Strongest international capital preservation and high capital appreciation track record",
      "High concentration of branded residences (Armani, Address, St. Regis, Dorchester)",
    ],
    lifestyleRating: 5.0,
    investmentScore: 96,
    faq: [
      {
        question: "Why does Downtown Dubai command a premium price per square foot?",
        answer:
          "Downtown Dubai is the geographic and economic focal point of the emirate with strictly limited land plots, ensuring enduring scarcity value and unmatched global demand.",
      },
      {
        question: "Can units in Downtown Dubai be operated as short-term holiday rentals?",
        answer:
          "Yes, Downtown Dubai is the number one tourist destination in the Middle East, making holiday home and DTCM-licensed short-term yields exceptionally lucrative year-round.",
      },
    ],
    images: [
      { url: "/images/project-downtown.svg", caption: "Burj Khalifa & Downtown Skyline", isPrimary: true },
      { url: "/images/hero-dubai.jpg", caption: "Downtown Dubai Boulevard Lights" },
      { url: "/images/project-city.svg", caption: "Business District Architecture" },
    ],
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2026-11-01T00:00:00Z",
  },
  {
    _id: "area-palm",
    name: "Palm Jumeirah",
    slug: "palm-jumeirah",
    heroImage: "/images/hero-dubai-palm.jpg",
    lifestyleCategory: "waterfront",
    categoryLabel: "Waterfront Living",
    overview:
      "The eighth wonder of the modern world. An engineering masterpiece shaped like a date palm stretching into the Arabian Gulf, revered worldwide as the pinnacle of beachfront villa and penthouse opulence.",
    lifestyle:
      "Exclusive private island lifestyle with direct beach access, superyacht anchorage, Michelin-starred dining at Atlantis The Royal, and private beachfront cabanas.",
    propertyTypes: ["villa", "penthouse", "apartment"],
    avgSalePricePerSqft: 3200,
    avgRentApartment: 185000,
    avgRentalYield: 5.4,
    capitalGrowth1Yr: 18.2,
    avgStartingPrice: 3200000,
    avgApartmentPrice: 4800000,
    avgVillaPrice: 28000000,
    freehold: true,
    goldenVisaEligible: true,
    coordinates: { lat: 25.1124, lng: 55.1390 },
    transportation: {
      metro: false,
      bus: true,
      tram: true,
      notes: "The Palm Monorail connects Atlantis, Nakheel Mall, and the Gateway Tram station.",
    },
    nearbyPlaces: [
      { category: "Resort", name: "Atlantis The Royal", distance: "On the Crescent" },
      { category: "Mall", name: "Nakheel Mall & The View Palm", distance: "Center of Trunk" },
      { category: "Beach", name: "Club Vista Mare Beach Club", distance: "Trunk East" },
      { category: "Dining", name: "The Pointe Waterfront", distance: "5 min drive" },
    ],
    schoolsNearby: [
      "iCademy Middle East",
      "The International School of Choueifat",
      "American School of Dubai",
    ],
    highlights: [
      "Signature beachfront frond villas with 100% private water access",
      "Billionaires' Row on Frond G, home to Dubai's most expensive record-setting mansions",
      "World-acclaimed resorts: Atlantis The Royal, One&Only The Palm, and Jumeirah Zabeel Saray",
      "Consistent 15%+ annual equity expansion for prime waterfront plots",
    ],
    lifestyleRating: 5.0,
    investmentScore: 98,
    faq: [
      {
        question: "What differentiates the Trunk from the Fronds and Crescent?",
        answer:
          "The Trunk accommodates high-density luxury apartments, shopping malls, and beach clubs; the Fronds consist solely of private gated beachfront villas; and the Crescent is reserved for world-class 5-star resorts and branded super-penthouses.",
      },
      {
        question: "Do Palm Jumeirah properties qualify for the UAE Golden Visa?",
        answer:
          "Yes, virtually all residential acquisitions on Palm Jumeirah surpass the AED 2 Million threshold, granting immediate 06-Year UAE Golden Visa eligibility.",
      },
    ],
    images: [
      { url: "/images/hero-dubai-palm.jpg", caption: "Palm Jumeirah Island Crescent & Private Villas", isPrimary: true },
      { url: "/images/hero-dubai.jpg", caption: "Aerial View of Palm Island Coastline" },
      { url: "/images/hero-dubai-villa.jpg", caption: "Waterfront Terraces & Marina" },
    ],
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2026-11-01T00:00:00Z",
  },
  {
    _id: "area-dubai-hills",
    name: "Dubai Hills Estate",
    slug: "dubai-hills-estate",
    heroImage: "/images/hero-dubai-villa.jpg",
    lifestyleCategory: "golf",
    categoryLabel: "Golf & Greenery",
    overview:
      "Dubbed the 'Green Heart of Dubai', this 2,700-acre master community by Emaar surrounds an 18-hole championship golf course with rolling fairways, pristine nature reserves, and the mega Dubai Hills Mall.",
    lifestyle:
      "Wholesome, serene family living featuring endless cycling loops, international private academies, dog parks, championship golf clubhouses, and shaded walking trails.",
    propertyTypes: ["villa", "townhouse", "apartment"],
    avgSalePricePerSqft: 1650,
    avgRentApartment: 82000,
    avgRentalYield: 6.7,
    capitalGrowth1Yr: 14.6,
    avgStartingPrice: 1600000,
    avgApartmentPrice: 2100000,
    avgVillaPrice: 8500000,
    freehold: true,
    goldenVisaEligible: true,
    coordinates: { lat: 25.1345, lng: 55.2403 },
    transportation: {
      metro: false,
      bus: true,
      tram: false,
      notes: "Central strategic junction off Al Khail Road (E44) and Umm Suqeim Street (D63).",
    },
    nearbyPlaces: [
      { category: "Mall", name: "Dubai Hills Mall & The Storm Coaster", distance: "On-site" },
      { category: "Golf", name: "Dubai Hills 18-Hole Championship Golf Club", distance: "On-site" },
      { category: "Park", name: "Dubai Hills Central Park (180,000 sqm)", distance: "Walking distance" },
      { category: "Healthcare", name: "King's College Hospital London", distance: "Within community" },
    ],
    schoolsNearby: [
      "GEMS Wellington Academy Al Khail",
      "GEMS New Millennium School",
      "GEMS International School",
    ],
    highlights: [
      "Massive 180,000 sqm central park with splash pads, skate parks, and amphitheater",
      "Championship par-72 golf course designed by European Golf Design with Burj Khalifa vistas",
      "Ranked #1 most searched family villa community in Dubai by high-net-worth relocators",
      "Full self-contained infrastructure including King's College Hospital London on-site",
    ],
    lifestyleRating: 4.8,
    investmentScore: 94,
    faq: [
      {
        question: "How long does it take to reach Downtown Dubai or Dubai Marina?",
        answer:
          "Thanks to direct uninterrupted access to Al Khail Road, Downtown Dubai is a 12-minute drive, and Dubai Marina / Palm Jumeirah is approximately 15 minutes away.",
      },
    ],
    images: [
      { url: "/images/project-hills.svg", caption: "Dubai Hills Golf Greens & Contemporary Villas", isPrimary: true },
      { url: "/images/hero-dubai.jpg", caption: "Lush Parklands and Townhouses" },
    ],
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2026-11-01T00:00:00Z",
  },
  {
    _id: "area-business-bay",
    name: "Business Bay",
    slug: "business-bay",
    heroImage: "/images/hero-dubai-downtown.jpg",
    lifestyleCategory: "downtown",
    categoryLabel: "Downtown & Iconic",
    overview:
      "A fast-paced, high-density metropolis flanking the sparkling Dubai Water Canal. Directly bordering Downtown Dubai, it offers ultra-modern skyscraper residences, global headquarters, and canal boardwalks.",
    lifestyle:
      "Energetic corporate and social blend with rooftop lounges, waterfront promenade cycling, luxury hotels (The Lana, JW Marriott Marquis), and direct canal ferry connections.",
    propertyTypes: ["apartment", "penthouse", "office"],
    avgSalePricePerSqft: 1750,
    avgRentApartment: 85000,
    avgRentalYield: 7.1,
    capitalGrowth1Yr: 13.5,
    avgStartingPrice: 1250000,
    avgApartmentPrice: 1950000,
    freehold: true,
    goldenVisaEligible: true,
    coordinates: { lat: 25.1860, lng: 55.2623 },
    transportation: {
      metro: true,
      bus: true,
      tram: false,
      notes: "Business Bay Red Line Metro Station, RERA Marine water taxis along the Canal.",
    },
    nearbyPlaces: [
      { category: "Waterfront", name: "Dubai Water Canal Boardwalk", distance: "Doorstep" },
      { category: "Transit", name: "Business Bay Metro Station", distance: "3 min walk" },
      { category: "Hotel", name: "The Lana, Dorchester Collection", distance: "Canal Front" },
      { category: "Mall", name: "Bay Avenue Shopping & Parks", distance: "Central Bay" },
    ],
    schoolsNearby: [
      "Horizon International School",
      "Jumeirah English Speaking School (JESS)",
      "Dubai International School",
    ],
    highlights: [
      "Direct boardwalks along the 12km Dubai Water Canal linking to Arabian Gulf",
      "Consistently high gross rental yield (6.9% – 7.5%) with premier tenant demand",
      "Home to architectural icons like The Opus by Zaha Hadid and Burj Binghatti",
      "Minutes from DIFC and Downtown Dubai at a 30% price-per-sqft discount",
    ],
    lifestyleRating: 4.7,
    investmentScore: 91,
    faq: [
      {
        question: "Why do investors favor Business Bay over Downtown for rental yields?",
        answer:
          "Business Bay commands lower entry acquisition prices per square foot than Downtown while retaining similar rental yields, resulting in higher net cash-on-cash ROI.",
      },
    ],
    images: [
      { url: "/images/hero-dubai-downtown.jpg", caption: "Business Bay High-Rises & Canal Waterfront", isPrimary: true },
      { url: "/images/hero-dubai.jpg", caption: "Downtown Canal Skyline" },
    ],
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2026-11-01T00:00:00Z",
  },
  {
    _id: "area-creek-harbour",
    name: "Dubai Creek Harbour",
    slug: "dubai-creek-harbour",
    heroImage: "/images/hero-dubai-downtown.jpg",
    lifestyleCategory: "waterfront",
    categoryLabel: "Waterfront Living",
    overview:
      "Twice the size of Downtown Dubai, this visionary master development by Emaar redefines modern waterfront living on the banks of historic Dubai Creek, overlooking the Ras Al Khor Wildlife Sanctuary.",
    lifestyle:
      "Serene pedestrian-focused island living with 700-meter Creek Beach, marina yacht berths, sunset flamingo viewing points, and panoramic views of the Downtown skyline.",
    propertyTypes: ["apartment", "penthouse", "townhouse"],
    avgSalePricePerSqft: 1850,
    avgRentApartment: 88000,
    avgRentalYield: 6.4,
    capitalGrowth1Yr: 16.8,
    avgStartingPrice: 1550000,
    avgApartmentPrice: 2350000,
    freehold: true,
    goldenVisaEligible: true,
    coordinates: { lat: 25.2048, lng: 55.3461 },
    transportation: {
      metro: false,
      bus: true,
      tram: false,
      notes: "Dedicated marine water bus stations linking to Festival City and Downtown; future Blue Metro line planned.",
    },
    nearbyPlaces: [
      { category: "Nature", name: "Ras Al Khor Wildlife Sanctuary", distance: "Adjacent" },
      { category: "Beach", name: "Creek Beach Urban Sands", distance: "Walking distance" },
      { category: "Marina", name: "Creek Marina Yacht Club", distance: "Creek Island" },
      { category: "Park", name: "Central Park at Island District", distance: "5 min walk" },
    ],
    schoolsNearby: [
      "Swiss International Scientific School Dubai",
      "Universal American School",
      "Deira International School",
    ],
    highlights: [
      "Unobstructed skyline vistas of Downtown Dubai and the Burj Khalifa across water",
      "Home to the urban 700m man-made Creek Beach with infinity lagoons",
      "Green, eco-conscious planning bordering protected pink flamingo wetlands",
      "Top capital growth performer in Dubai off-plan with 16.8% 1-year equity surge",
    ],
    lifestyleRating: 4.8,
    investmentScore: 95,
    faq: [
      {
        question: "When will the Dubai Creek Harbour master plan reach full maturity?",
        answer:
          "Creek Island is fully operational with thousands of residents; expansion across the Central Park, Creek Beach, and Waterfront districts is ongoing through 2028 with immense capital upside.",
      },
    ],
    images: [
      { url: "/images/hero-dubai-downtown.jpg", caption: "Dubai Creek Harbour Waterfront & Towers", isPrimary: true },
      { url: "/images/hero-dubai.jpg", caption: "Creek Island Marina Twilight" },
    ],
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2026-11-01T00:00:00Z",
  },
  {
    _id: "area-jvc",
    name: "Jumeirah Village Circle (JVC)",
    slug: "jvc",
    heroImage: "/images/hero-dubai-villa.jpg",
    lifestyleCategory: "high-roi",
    categoryLabel: "High ROI / Yield",
    overview:
      "Dubai's undisputed champion of rental yields and high-liquidity volume. A self-sustained circular community boasting 30+ landscaped community parks, Circle Mall, and outstanding road connectivity.",
    lifestyle:
      "Vibrant, affordable, community-driven living featuring community sports courts, neighborhood dog parks, cafes, supermarkets, and fitness studios on every block.",
    propertyTypes: ["apartment", "townhouse", "villa"],
    avgSalePricePerSqft: 1100,
    avgRentApartment: 52000,
    avgRentalYield: 8.4,
    capitalGrowth1Yr: 11.2,
    avgStartingPrice: 720000,
    avgApartmentPrice: 950000,
    avgVillaPrice: 2800000,
    freehold: true,
    goldenVisaEligible: true,
    coordinates: { lat: 25.0657, lng: 55.2093 },
    transportation: {
      metro: false,
      bus: true,
      tram: false,
      notes: "Convenient exits onto Al Khail Road (E44), Hessa Street (D61), and Sheikh Mohammed Bin Zayed Road (E311).",
    },
    nearbyPlaces: [
      { category: "Mall", name: "Circle Mall JVC", distance: "Central JVC" },
      { category: "Park", name: "JVC Community Parks (30+ parks)", distance: "Throughout" },
      { category: "Sports", name: "JSS Sports Complex", distance: "District 10" },
      { category: "Hotel", name: "FIVE Jumeirah Village Dubai", distance: "Central" },
    ],
    schoolsNearby: [
      "JSS International School JVC",
      "Sunmarke School JVT",
      "Nord Anglia International School Dubai",
    ],
    highlights: [
      "Market-leading gross rental yields averaging 8.0% to 9.2% for studios and 1-bedrooms",
      "Consistently ranked #1 in Dubai for total real estate transaction volume",
      "Affordable entry prices starting under AED 750,000 with flexible developer terms",
      "Active young expatriate tenant base keeping vacancy rates near zero",
    ],
    lifestyleRating: 4.4,
    investmentScore: 89,
    faq: [
      {
        question: "Why is JVC considered the best area for first-time Dubai property investors?",
        answer:
          "Its low barrier to entry (from AED 700K), combined with exceptional gross rental yields above 8%, provides healthy positive cash flow and rapid payback periods.",
      },
    ],
    images: [
      { url: "/images/project-hills.svg", caption: "JVC Community Townhouses & Parklands", isPrimary: true },
      { url: "/images/project-creek.svg", caption: "Modern Residential Architecture" },
    ],
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2026-11-01T00:00:00Z",
  },
  {
    _id: "area-jumeirah",
    name: "Jumeirah",
    slug: "jumeirah",
    heroImage: "/images/hero-dubai-palm.jpg",
    lifestyleCategory: "luxury-villas",
    categoryLabel: "Ultra-Luxury Villas",
    overview:
      "Dubai's most historic and cherished coastal enclave. Renowned for low-rise whitewashed coastal mansions, private beach access, tree-lined boulevards, and the iconic Burj Al Arab sail silhouette.",
    lifestyle:
      "Prestigious old-money coastal charm where residents cycle to local artisan cafes, paddleboard in turquoise waters, and enjoy secluded beachfront residences.",
    propertyTypes: ["villa", "townhouse", "mansion"],
    avgSalePricePerSqft: 2800,
    avgRentApartment: 240000,
    avgRentalYield: 4.8,
    capitalGrowth1Yr: 14.1,
    avgStartingPrice: 5500000,
    avgApartmentPrice: 6200000,
    avgVillaPrice: 22000000,
    freehold: true,
    goldenVisaEligible: true,
    coordinates: { lat: 25.2149, lng: 55.2574 },
    transportation: {
      metro: false,
      bus: true,
      tram: false,
      notes: "Flanked by Jumeirah Beach Road (D94) and Al Wasl Road (D92).",
    },
    nearbyPlaces: [
      { category: "Landmark", name: "Burj Al Arab Jumeirah", distance: "Jumeirah 3" },
      { category: "Beach", name: "Kite Beach & Sunset Beach", distance: "Walking distance" },
      { category: "Mall", name: "Mercato Shopping Mall", distance: "Jumeirah 1" },
      { category: "Dining", name: "Madinat Jumeirah Souk", distance: "5 min drive" },
    ],
    schoolsNearby: [
      "Jumeirah Baccalaureate School",
      "Kings' School Dubai",
      "Collegiate International School",
    ],
    highlights: [
      "Walking access to Kite Beach, Jumeirah Open Beach, and coastal boardwalks",
      "Home to Port de La Mer and Madinat Jumeirah Living freehold developments",
      "Unmatched exclusivity with low building height restrictions preserving privacy",
      "Prime residence choice for royal dignitaries and multi-generational business families",
    ],
    lifestyleRating: 4.9,
    investmentScore: 93,
    faq: [
      {
        question: "Can foreign non-GCC citizens buy freehold property in Jumeirah?",
        answer:
          "While traditional Jumeirah is leasehold, prime master communities within Jumeirah—such as Port de La Mer, Madinat Jumeirah Living (MJL), and Jumeirah Bay Island—are 100% freehold for all nationalities.",
      },
    ],
    images: [
      { url: "/images/project-palm.svg", caption: "Jumeirah Beachfront Coastal Villas", isPrimary: true },
      { url: "/images/hero-dubai.jpg", caption: "Kite Beach & Coastal Promenade" },
    ],
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2026-11-01T00:00:00Z",
  },
  {
    _id: "area-mbr-city",
    name: "Mohammed Bin Rashid City (MBR City)",
    slug: "mbr-city",
    heroImage: "/images/hero-dubai-villa.jpg",
    lifestyleCategory: "luxury-villas",
    categoryLabel: "Ultra-Luxury Villas",
    overview:
      "A monumental mega-city conceived by Dubai's leadership, centered around crystal lagoons and green parks. Encompassing District One and Sobha Hartland, it provides mansion and penthouse living just 5 minutes from Downtown.",
    lifestyle:
      "Resort-style lagoon living with private white sand beaches, cycling paths around the grand canal, international baccalaureate schools, and horse racing at Meydan.",
    propertyTypes: ["villa", "mansion", "apartment"],
    avgSalePricePerSqft: 1700,
    avgRentApartment: 92000,
    avgRentalYield: 6.9,
    capitalGrowth1Yr: 15.2,
    avgStartingPrice: 1750000,
    avgApartmentPrice: 2400000,
    avgVillaPrice: 14500000,
    freehold: true,
    goldenVisaEligible: true,
    coordinates: { lat: 25.1722, lng: 55.3081 },
    transportation: {
      metro: false,
      bus: true,
      tram: false,
      notes: "Direct connectivity to Al Khail Road and Ras Al Khor Road, minutes to Business Bay.",
    },
    nearbyPlaces: [
      { category: "Landmark", name: "Meydan Racecourse & Grandstand", distance: "On-site" },
      { category: "Waterfront", name: "Crystal Lagoon Private Beach", distance: "Center of District" },
      { category: "Mall", name: "Meydan One Mall (Under Development)", distance: "5 min drive" },
      { category: "Golf", name: "The Track, Meydan Golf Club", distance: "On-site" },
    ],
    schoolsNearby: [
      "North London Collegiate School Dubai",
      "Hartland International School",
      "Kent College Dubai",
    ],
    highlights: [
      "World's largest man-made crystal lagoon with 7km of swimmable turquoise waters",
      "Exceptional proximity to Downtown Dubai and DIFC within a 7-minute commute",
      "High concentration of elite British curriculum international schools on-site",
      "Sought-after by ultra-high-net-worth families looking for gated privacy near city center",
    ],
    lifestyleRating: 4.9,
    investmentScore: 95,
    faq: [
      {
        question: "What makes District One and Sobha Hartland unique in MBR City?",
        answer:
          "Both master communities feature proprietary swimmable crystal lagoons and are surrounded by millions of square feet of lush green forest canopy, right next to the Downtown skyline.",
      },
    ],
    images: [
      { url: "/images/project-creek.svg", caption: "Sobha Hartland & Crystal Lagoons", isPrimary: true },
      { url: "/images/project-hills.svg", caption: "MBR City Contemporary Mansions" },
    ],
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2026-11-01T00:00:00Z",
  },
  {
    _id: "area-bluewaters",
    name: "Bluewaters Island",
    slug: "bluewaters-island",
    heroImage: "/images/hero-dubai.jpg",
    lifestyleCategory: "waterfront",
    categoryLabel: "Waterfront Living",
    overview:
      "A vibrant lifestyle island destination by Meraas, positioned off the coast of JBR. Home to Ain Dubai (the world's largest observation wheel) and Caesars Palace hospitality, it offers unmatched sea-facing exclusivity.",
    lifestyle:
      "Chic pedestrian island living with oceanfront dining, beach club exclusivity, sea views over the Arabian Gulf, and private residential pools.",
    propertyTypes: ["apartment", "penthouse", "townhouse"],
    avgSalePricePerSqft: 3100,
    avgRentApartment: 210000,
    avgRentalYield: 5.8,
    capitalGrowth1Yr: 17.5,
    avgStartingPrice: 3500000,
    avgApartmentPrice: 4900000,
    freehold: true,
    goldenVisaEligible: true,
    coordinates: { lat: 25.0792, lng: 55.1215 },
    transportation: {
      metro: false,
      bus: true,
      tram: true,
      notes: "Direct 265m pedestrian bridge to JBR Beach, dedicated road link to Sheikh Zayed Road.",
    },
    nearbyPlaces: [
      { category: "Landmark", name: "Ain Dubai Observation Wheel", distance: "Island Center" },
      { category: "Beach", name: "Cove Beach Dubai", distance: "On island" },
      { category: "Bridge", name: "Bluewaters Pedestrian Bridge", distance: "Direct to JBR" },
      { category: "Dining", name: "The Wharf Retail & Dining", distance: "Promenade" },
    ],
    schoolsNearby: [
      "Emirates International School Meadows",
      "Dubai British School Jumeirah Park",
      "Regent International School",
    ],
    highlights: [
      "Strictly limited supply with only 10 residential mid-rise buildings on the entire island",
      "Panoramic open-sea vistas of the Arabian Gulf and Dubai Marina skyline",
      "Direct pedestrian connection to JBR Beach and The Walk within 5 minutes on foot",
      "Strong holiday-home rental demand commanding premium daily and weekly rates",
    ],
    lifestyleRating: 4.9,
    investmentScore: 94,
    faq: [
      {
        question: "Is Bluewaters Island accessible without a car?",
        answer:
          "Yes, residents can stroll directly across the picturesque 265m pedestrian bridge straight onto JBR beach and the Dubai Tram network.",
      },
    ],
    images: [
      { url: "/images/hero-dubai.jpg", caption: "Bluewaters Island & Ain Dubai Waterfront", isPrimary: true },
      { url: "/images/hero-dubai-palm.jpg", caption: "Arabian Sea Coastal Architecture" },
    ],
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2026-11-01T00:00:00Z",
  },
  {
    _id: "area-difc",
    name: "DIFC (Dubai Financial Centre)",
    slug: "difc",
    heroImage: "/images/hero-dubai-downtown.jpg",
    lifestyleCategory: "downtown",
    categoryLabel: "Downtown & Iconic",
    overview:
      "The undisputed financial powerhouse of the Middle East, Africa, and South Asia. DIFC features an independent legal jurisdiction, international arbitration center, world-class art galleries, and Michelin-starred culinary institutions.",
    lifestyle:
      "Refined cosmopolitan sophistication where hedge fund leaders, private equity partners, and international attorneys live steps from their offices, art galleries, and fine dining (Zuma, LPM, Gaia).",
    propertyTypes: ["apartment", "penthouse"],
    avgSalePricePerSqft: 2650,
    avgRentApartment: 135000,
    avgRentalYield: 6.2,
    capitalGrowth1Yr: 13.8,
    avgStartingPrice: 2300000,
    avgApartmentPrice: 3800000,
    freehold: true,
    goldenVisaEligible: true,
    coordinates: { lat: 25.2107, lng: 55.2818 },
    transportation: {
      metro: true,
      bus: true,
      tram: false,
      notes: "Two dedicated Red Line Metro Stations: Financial Centre and Emirates Towers.",
    },
    nearbyPlaces: [
      { category: "Landmark", name: "The Gate Building DIFC", distance: "Central" },
      { category: "Dining", name: "Gate Village Culinary & Art District", distance: "Walking distance" },
      { category: "Mall", name: "Gate Avenue Shopping Promenade", distance: "Central" },
      { category: "Transit", name: "Financial Centre Metro Station", distance: "3 min walk" },
    ],
    schoolsNearby: [
      "Horizon English School Dubai",
      "JSS Private School",
      "Dubai English Speaking School",
    ],
    highlights: [
      "Home to the highest concentration of Michelin-starred and fine dining venues in the UAE",
      "Independent English common-law legal system with DIFC Courts",
      "Year-round indoor air-conditioned promenade (Gate Avenue) connecting all districts",
      "Zero vacancy for top-tier executive residences and corporate leasing agreements",
    ],
    lifestyleRating: 4.8,
    investmentScore: 93,
    faq: [
      {
        question: "Can individuals purchase residential property directly inside DIFC?",
        answer:
          "Yes, DIFC offers prime freehold residential ownership in towers such as DIFC Living, Index Tower, and Central Park Towers with full foreign freehold ownership.",
      },
    ],
    images: [
      { url: "/images/hero-dubai-downtown.jpg", caption: "DIFC Gate Building & Financial District", isPrimary: true },
      { url: "/images/hero-dubai.jpg", caption: "Skyline Architecture" },
    ],
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2026-11-01T00:00:00Z",
  },
  {
    _id: "area-dubailand",
    name: "Dubailand & The Oasis",
    slug: "dubailand",
    heroImage: "/images/hero-dubai-villa.jpg",
    lifestyleCategory: "family",
    categoryLabel: "Family Communities",
    overview:
      "A sprawling suburban master district home to premier family villa and resort developments including Emaar The Oasis, DAMAC Hills 2, and Villanova. Characterized by lagoons, theme parks, and expansive land plots.",
    lifestyle:
      "Spacious, tranquil family living surrounded by private gardens, equestrian clubs, polo grounds, cycling tracks, and resort-style community clubhouses.",
    propertyTypes: ["villa", "townhouse", "mansion"],
    avgSalePricePerSqft: 1250,
    avgRentApartment: 78000,
    avgRentalYield: 7.4,
    capitalGrowth1Yr: 12.9,
    avgStartingPrice: 1100000,
    avgApartmentPrice: 1300000,
    avgVillaPrice: 4500000,
    freehold: true,
    goldenVisaEligible: true,
    coordinates: { lat: 25.0450, lng: 55.2850 },
    transportation: {
      metro: false,
      bus: true,
      tram: false,
      notes: "Direct access to Emirates Road (E611) and Al Qudra Road (D63).",
    },
    nearbyPlaces: [
      { category: "Sports", name: "Al Habtoor Polo Resort & Club", distance: "On-site" },
      { category: "Cycling", name: "Al Qudra 86km Desert Cycling Track", distance: "10 min drive" },
      { category: "Theme Park", name: "IMG Worlds of Adventure", distance: "Central Dubailand" },
      { category: "Shopping", name: "Dubai Outlet Mall", distance: "5 min drive" },
    ],
    schoolsNearby: [
      "GEMS FirstPoint School The Villa",
      "Aquila School Dubailand",
      "Fairgreen International School",
    ],
    highlights: [
      "Exceptional value per square foot for modern 3 to 6-bedroom luxury standalone villas",
      "Expansive private plots with personal swimming pools and rooftop entertaining terraces",
      "High capital growth as mega infrastructure and blue metro extensions expand into Dubailand",
      "Strong tenant demand from growing families seeking space and international school access",
    ],
    lifestyleRating: 4.6,
    investmentScore: 90,
    faq: [
      {
        question: "Is Dubailand good for long-term capital appreciation?",
        answer:
          "Yes, as Dubai's population continues toward its 2040 master plan target of 5.8 million, prime villa communities in Dubailand are experiencing rapid equity expansion.",
      },
    ],
    images: [
      { url: "/images/project-hills.svg", caption: "Dubailand Master Townhouses & Green Parks", isPrimary: true },
      { url: "/images/project-creek.svg", caption: "Waterfront Lagoons & Resort Architecture" },
    ],
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2026-11-01T00:00:00Z",
  },
];

/* ── Distinct Lifestyle Categories with Live Counts ──────────── */
export function getDistinctLifestyleCategories(): Array<{
  id: string;
  label: string;
  count: number;
}> {
  const categories = [
    { id: "all", label: "All Districts", count: mockDubaiAreas.length },
    {
      id: "waterfront",
      label: "Waterfront Living",
      count: mockDubaiAreas.filter((a) => a.lifestyleCategory === "waterfront").length,
    },
    {
      id: "downtown",
      label: "Downtown & Iconic",
      count: mockDubaiAreas.filter((a) => a.lifestyleCategory === "downtown").length,
    },
    {
      id: "golf",
      label: "Golf & Greenery",
      count: mockDubaiAreas.filter((a) => a.lifestyleCategory === "golf").length,
    },
    {
      id: "luxury-villas",
      label: "Ultra-Luxury Villas",
      count: mockDubaiAreas.filter((a) => a.lifestyleCategory === "luxury-villas").length,
    },
    {
      id: "high-roi",
      label: "High ROI / Yield",
      count: mockDubaiAreas.filter((a) => a.lifestyleCategory === "high-roi").length,
    },
    {
      id: "family",
      label: "Family Communities",
      count: mockDubaiAreas.filter((a) => a.lifestyleCategory === "family").length,
    },
  ];

  return categories;
}

/* ── Query Engine for Areas ──────────────────────────────────── */
export function getMockAreas(criteria?: AreaFilterCriteria): EnhancedArea[] {
  let list = [...mockDubaiAreas];

  if (!criteria) return list;

  // Search keyword (matches name, overview, nearby landmarks)
  if (criteria.q && criteria.q.trim() !== "") {
    const qLower = criteria.q.trim().toLowerCase();
    list = list.filter((area) => {
      const matchName = area.name.toLowerCase().includes(qLower);
      const matchOverview = area.overview.toLowerCase().includes(qLower);
      const matchLifestyle = area.lifestyle?.toLowerCase().includes(qLower);
      const matchPlaces = area.nearbyPlaces?.some((p) =>
        p.name.toLowerCase().includes(qLower)
      );
      const matchHighlights = area.highlights?.some((h) =>
        h.toLowerCase().includes(qLower)
      );
      return (
        matchName ||
        matchOverview ||
        matchLifestyle ||
        matchPlaces ||
        matchHighlights
      );
    });
  }

  // Lifestyle category
  if (criteria.lifestyle && criteria.lifestyle !== "all") {
    list = list.filter((area) => area.lifestyleCategory === criteria.lifestyle);
  }

  // Metro only filter
  if (criteria.metroOnly) {
    list = list.filter((area) => area.transportation?.metro === true);
  }

  // Min rental yield
  if (criteria.minYield !== undefined && criteria.minYield > 0) {
    list = list.filter((area) => (area.avgRentalYield ?? 0) >= criteria.minYield!);
  }

  // Max price per sqft
  if (criteria.maxPriceSqft !== undefined && criteria.maxPriceSqft > 0) {
    list = list.filter(
      (area) => (area.avgSalePricePerSqft ?? 0) <= criteria.maxPriceSqft!
    );
  }

  // Sorting
  switch (criteria.sort) {
    case "yield-desc":
      list.sort((a, b) => (b.avgRentalYield ?? 0) - (a.avgRentalYield ?? 0));
      break;
    case "price-asc":
      list.sort(
        (a, b) => (a.avgSalePricePerSqft ?? 0) - (b.avgSalePricePerSqft ?? 0)
      );
      break;
    case "price-desc":
      list.sort(
        (a, b) => (b.avgSalePricePerSqft ?? 0) - (a.avgSalePricePerSqft ?? 0)
      );
      break;
    case "growth-desc":
      list.sort((a, b) => b.capitalGrowth1Yr - a.capitalGrowth1Yr);
      break;
    case "name-asc":
      list.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "recommended":
    default:
      // Sort by investment score descending
      list.sort((a, b) => b.investmentScore - a.investmentScore);
      break;
  }

  return list;
}

/* ── Lookup Area by Slug ─────────────────────────────────────── */
export function getAreaBySlug(slug: string): EnhancedArea | undefined {
  return mockDubaiAreas.find(
    (area) => area.slug.toLowerCase() === slug.toLowerCase()
  );
}

/* ── Compare Areas by Slugs ─────────────────────────────────── */
export function compareAreas(slugs: string[]): EnhancedArea[] {
  const set = new Set(slugs.map((s) => s.toLowerCase()));
  return mockDubaiAreas.filter((a) => set.has(a.slug.toLowerCase()));
}
