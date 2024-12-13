import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const CategoryError = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <p className="text-xl text-red-500">Une erreur est survenue</p>
        <Button variant="outline" onClick={() => navigate('/')}>
          Retour à l'accueil
        </Button>
      </div>
    </div>
  );
};