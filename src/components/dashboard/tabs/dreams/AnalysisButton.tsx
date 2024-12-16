import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface AnalysisButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

export const AnalysisButton = ({ onClick, isLoading }: AnalysisButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 
                 hover:from-purple-600 hover:to-pink-600"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyse en cours...
        </>
      ) : (
        "Analyser mon rêve"
      )}
    </Button>
  );
};