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

const navItems = [
  { 
    icon: Home, 
    label: "Accueil", 
    path: "/main", 
    description: "Retour à l'accueil",
    ariaLabel: "Naviguer vers la page d'accueil"
  },
  { 
    icon: LayoutGrid, 
    label: "Dashboard", 
    path: "/dashboard", 
    description: "Accéder à votre tableau de bord",
    ariaLabel: "Naviguer vers le tableau de bord"
  },
  { 
    icon: Headphones, 
    label: "Audio", 
    path: "/audio", 
    description: "Gérer vos contenus audio",
    ariaLabel: "Naviguer vers la section audio"
  },
  { 
    icon: Trophy, 
    label: "Défis", 
    path: "/challenges", 
    description: "Voir vos défis",
    ariaLabel: "Naviguer vers vos défis"
  },
  { 
    icon: Users, 
    label: "Social", 
    path: "/social", 
    description: "Espace social",
    ariaLabel: "Naviguer vers l'espace social"
  },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <nav 
      className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border z-50"
      role="navigation"
      aria-label="Navigation principale"
    >
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
                        "relative flex flex-col md:flex-row items-center gap-1 md:gap-2 transition-all duration-300",
                        location.pathname === item.path 
                          ? "bg-primary text-primary-foreground shadow-lg" 
                          : "hover:text-primary hover:bg-primary/10",
                        "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                        "disabled:pointer-events-none disabled:opacity-50"
                      )}
                      onClick={() => handleNavigation(item.path)}
                      aria-label={item.ariaLabel}
                      aria-current={location.pathname === item.path ? "page" : undefined}
                    >
                      <item.icon className={cn(
                        "w-5 h-5", 
                        isMobile && "w-4 h-4",
                        location.pathname === item.path && "animate-pulse"
                      )} />
                      <span className={cn(
                        "text-xs md:text-sm font-medium", 
                        isMobile && "text-[10px]",
                        "truncate max-w-[80px] md:max-w-none"
                      )}>
                        {item.label}
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="bottom" 
                    className="bg-popover/95 backdrop-blur-sm border border-border shadow-lg"
                  >
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