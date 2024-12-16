import { AnimatedBackground } from "@/components/main/background/AnimatedBackground";
import HeroSection from "@/components/landing/HeroSection";
import { CategoriesSection } from "@/components/main/CategoriesSection";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0A0118]/90 backdrop-blur-sm">
      <AnimatedBackground />
      
      <main className="relative z-10">
        <HeroSection />
        <CategoriesSection />
      </main>
    </div>
  );
};

export default Index;