import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { NavContainer } from "./navbar/NavContainer";
import { NavItem } from "./navbar/NavItem";
import { Home } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const Navbar = () => {
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
    }
  ];

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