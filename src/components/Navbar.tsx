import { Home, LayoutGrid, Headphones, Trophy } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Accueil", path: "/main" },
    { icon: LayoutGrid, label: "Dashboard", path: "/dashboard" },
    { icon: Headphones, label: "Audio", path: "/audio" },
    { icon: Trophy, label: "Défis", path: "/challenges" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md border-b z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={location.pathname === item.path ? "default" : "ghost"}
                className={cn(
                  "flex items-center gap-2",
                  location.pathname === item.path && "bg-primary text-primary-foreground"
                )}
                onClick={() => navigate(item.path)}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;