import { AnimatedBackground } from "@/components/main/background/AnimatedBackground";
import HeroSection from "@/components/landing/HeroSection";
import { MarketingSection } from "@/components/main/marketing/MarketingSection";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0A0118]/90 backdrop-blur-sm">
      <AnimatedBackground />
      
      <main className="relative z-10">
        <HeroSection />
        <MarketingSection />
      </main>
    </div>
  );
};

export default Index;