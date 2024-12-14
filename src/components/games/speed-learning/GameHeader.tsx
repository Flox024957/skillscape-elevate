import { Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const GameHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Brain className="w-8 h-8 text-primary" />
        <h1 className="text-4xl font-bold">Speed Learning Battle</h1>
      </div>
      <Button
        variant="outline"
        onClick={() => navigate("/challenges")}
        className="gap-2"
      >
        Retour
      </Button>
    </div>
  );
};