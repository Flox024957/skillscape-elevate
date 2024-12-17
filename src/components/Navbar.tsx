import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { NavContainer } from "./navbar/NavContainer";
import { NavItem } from "./navbar/NavItem";
import { Home, BookOpen, Mic2, User2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const location = useLocation();
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
      path: "/",
      isActive: location.pathname === "/"
    },
    {
      label: "Compétences",
      icon: BookOpen,
      path: "/skills",
      isActive: location.pathname.startsWith("/skills")
    },
    {
      label: "Audio",
      icon: Mic2,
      path: "/audio",
      isActive: location.pathname === "/audio"
    }
  ];

  if (user) {
    navigationItems.push({
      label: "Dashboard",
      icon: User2,
      path: "/dashboard",
      isActive: location.pathname === "/dashboard"
    });
  }

  return (
    <NavContainer>
      {navigationItems.map((item) => (
        <NavItem
          key={item.path}
          {...item}
        />
      ))}
    </NavContainer>
  );
};

export default Navbar;