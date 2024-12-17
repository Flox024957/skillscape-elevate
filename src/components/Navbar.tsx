import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { NavContainer } from "./navbar/NavContainer";
import { NavItem } from "./navbar/NavItem";
import { Home, BookOpen, Mic2, User2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();
  }, []);

  if (location.pathname === "/auth") return null;

  const navigationItems = [
    {
      label: "Accueil",
      icon: Home,
      href: "/",
      isActive: location.pathname === "/"
    },
    {
      label: "Compétences",
      icon: BookOpen,
      href: "/skills",
      isActive: location.pathname.startsWith("/skills")
    },
    {
      label: "Audio",
      icon: Mic2,
      href: "/audio",
      isActive: location.pathname === "/audio"
    }
  ];

  if (user) {
    navigationItems.push({
      label: "Dashboard",
      icon: User2,
      href: "/dashboard",
      isActive: location.pathname === "/dashboard"
    });
  }

  return (
    <NavContainer>
      {navigationItems.map((item) => (
        <NavItem
          key={item.href}
          label={item.label}
          icon={item.icon}
          href={item.href}
          isActive={item.isActive}
        />
      ))}

      {!user && (
        <Button
          variant="default"
          className="ml-auto"
          onClick={() => navigate("/auth")}
        >
          Se connecter
        </Button>
      )}
    </NavContainer>
  );
};