import { Agent, Area, Developer, Property } from "../src/models/index.js";

export async function createTestAgent(overrides = {}) {
  const rand = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
  return Agent.create({
    firstName: "Sarah",
    lastName: "Thompson",
    slug: `sarah-thompson-${rand}`,
    email: `agent-${rand}@example.com`,
    phone: "+971501234567",
    whatsapp: "+971501234567",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
    specializations: ["Luxury Penthouses", "Waterfront"],
    languages: ["English", "Arabic"],
    isActive: true,
    ...overrides,
  });
}

export async function createTestArea(overrides = {}) {
  return Area.create({
    name: "Dubai Marina",
    slug: `dubai-marina-${Date.now()}-${Math.random().toString(36).substring(7)}`,
    heroImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
    overview: "Dubai Marina is a premier waterfront community.",
    city: "Dubai",
    coordinates: { lat: 25.0805, lng: 55.1403 },
    nearbyPlaces: [{ name: "Marina Mall", category: "shopping", distance: "0.5 km" }],
    ...overrides,
  });
}

export async function createTestDeveloper(overrides = {}) {
  return Developer.create({
    name: "Emaar Properties",
    slug: `emaar-properties-${Date.now()}-${Math.random().toString(36).substring(7)}`,
    logo: "https://example.com/logo.png",
    description: "Pioneering real estate developer in Dubai.",
    headquarters: "Dubai, UAE",
    ...overrides,
  });
}

export async function createTestProperty(overrides: Record<string, unknown> = {}) {
  let agentId = overrides.agentRef;
  if (!agentId) {
    const agent = await createTestAgent();
    agentId = agent._id;
  }

  const timestamp = Date.now() + Math.floor(Math.random() * 10000);

  return Property.create({
    title: `Luxury Apartment ${timestamp}`,
    slug: `luxury-apartment-${timestamp}`,
    purpose: "sale",
    propertyType: "apartment",
    status: "ready",
    publishStatus: "published",
    price: 2500000,
    currency: "AED",
    bedrooms: 2,
    bathrooms: 2,
    builtUpArea: 1400,
    location: {
      address: "Marina Tower, Dubai Marina",
      community: "Marina Promenade",
      area: "Dubai Marina",
      city: "Dubai",
      coordinates: { lat: 25.0805, lng: 55.1403 },
    },
    agentRef: agentId,
    description: "A stunning 2-bedroom luxury apartment with panoramic waterfront views.",
    features: ["Balcony", "High Floor"],
    amenities: ["Swimming Pool", "Gym"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00",
        caption: "Living room",
        isPrimary: true,
      },
    ],
    verificationStatus: "featured",
    views: 10,
    publishedAt: new Date(),
    ...overrides,
  });
}
