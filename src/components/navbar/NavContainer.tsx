import { motion } from "framer-motion";

interface NavContainerProps {
  children: React.ReactNode;
}

export const NavContainer = ({ children }: NavContainerProps) => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border z-50"
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