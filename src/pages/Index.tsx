import { AnimatedBackground } from "@/components/main/background/AnimatedBackground";
import { MarketingHero } from "@/components/marketing/MarketingHero";
import { MarketingFeatures } from "@/components/marketing/MarketingFeatures";
import CallToAction from "@/components/landing/CallToAction";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0A0118]/90 backdrop-blur-sm">
      <AnimatedBackground />
      
      <main className="relative z-10 container mx-auto px-4 py-12 space-y-24">
        <MarketingHero />
        <MarketingFeatures />
        <CallToAction />
      </main>
    </div>
  );
};

export default Index;