import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface MarketingCardProps {
  title: string;
  description: string;
  gradient: string;
  delay: number;
}

export const MarketingCard = ({ title, description, gradient, delay }: MarketingCardProps) => {
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "group relative overflow-hidden rounded-xl",
        "bg-black/20 backdrop-blur-sm",
        "border border-white/10",
        "hover:border-primary/50 transition-all duration-500",
        "cursor-default shadow-lg hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]",
        isMobile ? "p-4" : "p-6"
      )}
    >
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
        "bg-gradient-to-br",
        gradient,
        "opacity-10"
      )} />

      <h3 className={cn(
        "font-semibold mb-3 text-white relative z-10",
        isMobile ? "text-lg" : "text-xl"
      )}>
        {title}
      </h3>
      
      <p className={cn(
        "text-gray-300 leading-relaxed relative z-10",
        isMobile ? "text-xs" : "text-sm"
      )}>
        {description}
      </p>
    </motion.div>
  );
};