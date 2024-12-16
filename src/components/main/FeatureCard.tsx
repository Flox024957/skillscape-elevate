import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

export const FeatureCard = ({ icon, title, description, index }: FeatureCardProps) => {
  const isMobile = useIsMobile();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 + index * 0.1 }}
      className={cn(
        "bg-white/5 backdrop-blur-sm rounded-xl border border-purple-500/20",
        "hover:border-purple-500/40 transition-all duration-300",
        "transform hover:-translate-y-1 hover:shadow-lg",
        isMobile ? "p-4" : "p-6"
      )}
    >
      <div className="bg-white/10 rounded-lg p-3 w-fit mb-4">
        {icon}
      </div>
      <h3 className={cn(
        "font-semibold text-gray-200 mb-2",
        isMobile ? "text-lg" : "text-xl"
      )}>
        {title}
      </h3>
      <p className={cn(
        "text-gray-400",
        isMobile ? "text-sm" : "text-base"
      )}>
        {description}
      </p>
    </motion.div>
  );
};
