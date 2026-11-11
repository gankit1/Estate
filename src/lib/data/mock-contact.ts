// Static mock data for Pacific Star Realty Contact & Concierge page

export interface ContactDepartment {
  id: string;
  name: string;
  email: string;
  phone: string;
  leadName: string;
  leadRole: string;
  description: string;
  iconName: string;
  badge: string;
}

export interface DetailedOffice {
  id: string;
  name: string;
  district: string;
  address: string;
  landmark: string;
  phone: string;
  email: string;
  hours: string;
  parking: string;
  metroTransit: string;
  features: string[];
  image: string;
}

export interface ContactFaq {
  id: string;
  question: string;
  answer: string;
  category: "general" | "international" | "meetings";
}

/* ── 1. Departments Directory ───────────────────────────────── */
export const mockDepartments: ContactDepartment[] = [
  {
    id: "dept-private-clients",
    name: "Private Client Advisory (UHNW)",
    email: "privateclients@pacificstar-realty.ae",
    phone: "+971 4 500 1201",
    leadName: "Elena Rostova",
    leadRole: "Head of Private Clients",
    description: "Confidential acquisition of beachfront villas, trophy penthouses, and private estates.",
    iconName: "ShieldCheck",
    badge: "Palm & Waterfront Penthouses",
  },
  {
    id: "dept-off-plan",
    name: "Off-Plan & Developer Allocations",
    email: "offplan@pacificstar-realty.ae",
    phone: "+971 4 500 1202",
    leadName: "Marcus Sterling",
    leadRole: "Director of Off-Plan Analytics",
    description: "Direct pre-launch allocations, payment plans, and bulk floorplates from Emaar, Sobha, and Nakheel.",
    iconName: "Building2",
    badge: "Tier-1 Master Developer Desk",
  },
  {
    id: "dept-golden-visa",
    name: "UAE 06-Year Golden Visa Concierge",
    email: "goldenvisa@pacificstar-realty.ae",
    phone: "+971 4 500 1203",
    leadName: "Farah El-Sayed",
    leadRole: "Head of Government Relations",
    description: "End-to-end residency processing, DLD Cube nominations, medical biometrics, and family sponsorship.",
    iconName: "Award",
    badge: "Official DLD Cube Partner",
  },
  {
    id: "dept-property-management",
    name: "Property & Asset Management",
    email: "management@pacificstar-realty.ae",
    phone: "+971 4 500 1204",
    leadName: "Vikram Mehta",
    leadRole: "Head of Asset Management",
    description: "Turnkey tenant sourcing, Ejari leasing contracts, rent remittance, and routine maintenance.",
    iconName: "KeyRound",
    badge: "Turnkey Portfolio Care",
  },
];

/* ── 2. Detailed Physical Office Locations ──────────────────── */
export const mockDetailedOffices: DetailedOffice[] = [
  {
    id: "office-downtown",
    name: "Downtown Dubai Headquarters",
    district: "Downtown Dubai",
    address: "Suite 2401, Boulevard Plaza Tower 1, Sheikh Mohammed bin Rashid Blvd, Downtown Dubai, UAE",
    landmark: "Directly opposite Burj Khalifa & Dubai Opera",
    phone: "+971 4 500 1234",
    email: "downtown@pacificstar-realty.ae",
    hours: "Monday – Saturday: 9:00 AM – 7:00 PM (GST)",
    parking: "Complimentary VIP Valet Parking at Boulevard Plaza Tower 1 main entrance.",
    metroTransit: "Burj Khalifa / Dubai Mall Metro Station (Red Line) via air-conditioned metro link.",
    features: [
      "Executive Boardroom Suites",
      "Private Soundproof Advisory Rooms",
      "Panoramic Burj Khalifa Views",
      "Barista Lounge & VIP Hospitality",
    ],
    image: "/images/project-downtown.svg",
  },
  {
    id: "office-marina",
    name: "Dubai Marina Waterfront Lounge",
    district: "Dubai Marina",
    address: "Level 18, Marina Plaza, Al Marsa Street, Dubai Marina, UAE",
    landmark: "Connected to Dubai Marina Mall & Marina Promenade",
    phone: "+971 4 500 5678",
    email: "marina@pacificstar-realty.ae",
    hours: "Monday – Saturday: 9:30 AM – 7:30 PM (GST)",
    parking: "Dedicated VIP Parking on Level P2, Marina Plaza (Valet available at Marina Mall entrance).",
    metroTransit: "DMCC Metro Station & Dubai Marina Tram Station (Direct footbridge access).",
    features: [
      "Waterfront Client Terrace",
      "Private Luxury Closing Rooms",
      "Yacht Tour Departure Dock",
      "Dedicated Escrow & Legal Support Desk",
    ],
    image: "/images/project-marina.svg",
  },
];

/* ── 3. Contact FAQs ────────────────────────────────────────── */
export const mockContactFaqs: ContactFaq[] = [
  {
    id: "cfaq-1",
    question: "What happens immediately after I submit an inquiry?",
    answer:
      "Your inquiry is reviewed by our Client Services Director and routed to the specialized Senior Partner best matched to your requirement (e.g. Waterfront Penthouses, Off-Plan Allocations, or Golden Visa). You will receive an email and WhatsApp confirmation within 15 minutes during business hours, followed by customized portfolio options within 2 hours.",
    category: "general",
  },
  {
    id: "cfaq-2",
    question: "How do overseas investors view properties and complete transactions remotely?",
    answer:
      "Over 65% of our international clientele complete acquisitions without needing to be physically present in Dubai. We conduct 4K live video walk-throughs, drone aerial perimeter inspections, and provide DLD verified documentation. Contracts (Form F and Sale & Purchase Agreements) are signed digitally via DocuSign, and funds are remitted directly to Dubai Land Department regulated escrow accounts.",
    category: "international",
  },
  {
    id: "cfaq-3",
    question: "Do you offer airport reception and chauffeured property tours for visiting buyers?",
    answer:
      "Yes. For qualified private clients and high-net-worth investors visiting Dubai, Pacific Star Realty provides a complimentary VIP chauffeur service from Dubai International Airport (DXB) or Al Maktoum Airport (DWC) to your hotel, followed by curated private vehicular and yacht property tours across prime communities.",
    category: "meetings",
  },
  {
    id: "cfaq-4",
    question: "Can I meet with a Senior Director outside standard business hours?",
    answer:
      "Absolutely. We understand that international investors operate across global time zones (London, New York, Singapore, Zurich). Our Senior Partners and Private Client Directors are available for evening appointments, weekend briefings, and private video conferences by prior reservation.",
    category: "meetings",
  },
  {
    id: "cfaq-5",
    question: "Where should I park when visiting your Boulevard Plaza or Marina Plaza offices?",
    answer:
      "Both flagship locations feature complimentary VIP valet parking for our guests. Simply drive up to the main Boulevard Plaza Tower 1 entrance in Downtown or the Marina Plaza entrance in Dubai Marina and mention Pacific Star Realty to the valet attendants.",
    category: "general",
  },
];

