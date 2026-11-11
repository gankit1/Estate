import type { Metadata } from "next";
import { DevelopersContent } from "./DevelopersContent";

export const metadata: Metadata = {
  title: "Dubai Master Developers Directory | Pacific Star Realty",
  description:
    "Official agency partner for Dubai's premier master developers: Emaar, Nakheel, DAMAC, Sobha Realty, Meraas, Ellington, Omniyat, Select Group, and Binghatti. Direct developer allocations and 0% buyer commission.",
  openGraph: {
    title: "Dubai Master Developers Directory | Pacific Star Realty",
    description:
      "Official agency partner for Dubai's premier master developers: Emaar, Nakheel, DAMAC, Sobha Realty, Meraas, Ellington, Omniyat, Select Group, and Binghatti.",
    type: "website",
    locale: "en_AE",
  },
};

export default function DevelopersDirectoryPage() {
  return <DevelopersContent />;
}
