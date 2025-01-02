import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavContainerProps {
  children: React.ReactNode;
}

export const NavContainer = ({ children }: NavContainerProps) => {
  const isMobile = useIsMobile();

  return (
    <motion.nav 
      initial={{ y: isMobile ? 100 : -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed z-50 w-full bg-background/95 backdrop-blur-md border-t md:border-b border-border bottom-0 md:top-0 md:bottom-auto"
      role="navigation"
      aria-label="Navigation principale"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center justify-between w-full md:justify-start md:space-x-4">
            {children}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};