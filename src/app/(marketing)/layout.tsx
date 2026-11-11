import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-text selection:bg-secondary/20 selection:text-primary">
      <Header />
      <main className="flex-1 w-full flex flex-col">{children}</main>
      <Footer />
    </div>
  );
}
