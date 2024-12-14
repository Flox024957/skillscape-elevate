import { cn } from "@/lib/utils";
import { AnimatedBackground } from "./AnimatedBackground";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const PageContainer = ({ children, className }: PageContainerProps) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background to-background/95">
      <AnimatedBackground />
      
      {/* Enhanced neon border effect */}
      <div className="absolute inset-0 border border-[#8B5CF6]/30 
                    shadow-[inset_0_0_150px_rgba(139,92,246,0.6),0_0_70px_rgba(139,92,246,0.4)] 
                    pointer-events-none"></div>

      <div className={cn(
        "container relative z-10 px-4 py-12 mx-auto",
        className
      )}>
        {children}
      </div>
    </div>
  );
};