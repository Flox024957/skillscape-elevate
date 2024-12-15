import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface SubmitPostButtonProps {
  isLoading: boolean;
  disabled: boolean;
  onClick: () => void;
}

export const SubmitPostButton = ({ isLoading, disabled, onClick }: SubmitPostButtonProps) => {
  return (
    <Button 
      onClick={onClick} 
      disabled={disabled}
      className="relative overflow-hidden"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Publication en cours...
        </>
      ) : (
        'Publier'
      )}
    </Button>
  );
};