import { Home, LayoutGrid, Headphones, Trophy, Users } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  const navItems = [
    { icon: Home, label: "Accueil", path: "/main", description: "Retour à l'accueil" },
    { icon: LayoutGrid, label: "Dashboard", path: "/dashboard", description: "Accéder à votre tableau de bord" },
    { icon: Headphones, label: "Audio", path: "/audio", description: "Gérer vos contenus audio" },
    { icon: Trophy, label: "Défis", path: "/challenges", description: "Voir vos défis" },
    { icon: Users, label: "Social", path: "/social", description: "Espace social" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-md border-b border-primary/20 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center justify-between w-full md:justify-start md:space-x-4">
            <TooltipProvider>
              {navItems.map((item) => (
                <Tooltip key={item.path}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={location.pathname === item.path ? "default" : "ghost"}
                      className={cn(
                        "flex flex-col md:flex-row items-center gap-1 md:gap-2 transition-all duration-300",
                        location.pathname === item.path 
                          ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(139,92,246,0.3)]" 
                          : "hover:text-primary hover:bg-primary/10"
                      )}
                      onClick={() => navigate(item.path)}
                      aria-label={item.description}
                    >
                      <item.icon className={cn("w-5 h-5", isMobile && "w-4 h-4")} />
                      <span className={cn(
                        "text-xs md:text-sm", 
                        isMobile && "text-[10px]",
                        "truncate max-w-[80px] md:max-w-none"
                      )}>
                        {item.label}
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.description}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;