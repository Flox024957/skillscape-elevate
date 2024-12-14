import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  path: string;
  description: string;
  ariaLabel: string;
  isActive: boolean;
  onClick: () => void;
}

export const NavItem = ({
  icon: Icon,
  label,
  path,
  description,
  ariaLabel,
  isActive,
  onClick,
}: NavItemProps) => {
  const isMobile = useIsMobile();

  return (
    <Button
      variant={isActive ? "default" : "ghost"}
      className={cn(
        "relative flex flex-col md:flex-row items-center gap-1 md:gap-2 transition-all duration-300",
        isActive 
          ? "bg-[#8B5CF6]/20 text-[#8B5CF6] shadow-[0_0_20px_rgba(139,92,246,0.3)] border border-[#8B5CF6]/30" 
          : "hover:text-[#8B5CF6] hover:bg-[#8B5CF6]/10 hover:shadow-[0_0_15px_rgba(139,92,246,0.2)]",
        "focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50"
      )}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-current={isActive ? "page" : undefined}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Icon className={cn(
          "w-5 h-5", 
          isMobile && "w-4 h-4",
          isActive && "animate-pulse"
        )} />
      </motion.div>
      <span className={cn(
        "text-xs md:text-sm font-medium", 
        isMobile && "text-[10px]",
        "truncate max-w-[80px] md:max-w-none"
      )}>
        {label}
      </span>
    </Button>
  );
};