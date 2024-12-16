import { Home, LayoutGrid, Headphones, Trophy, Users } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { NavItem } from "./navbar/NavItem";
import { NavTooltip } from "./navbar/NavTooltip";
import { NavContainer } from "./navbar/NavContainer";

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
  }
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <NavContainer>
      {navItems.map((item) => (
        <NavTooltip key={item.path} description={item.description}>
          <NavItem
            {...item}
            isActive={location.pathname === item.path}
            onClick={() => handleNavigation(item.path)}
          />
        </NavTooltip>
      ))}
    </NavContainer>
  );
};

export default Navbar;