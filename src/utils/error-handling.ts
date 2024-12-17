import { toast } from "@/hooks/use-toast";

export const handleConnectionError = () => {
  toast({
    title: "Problème de connexion",
    description: "Le serveur est temporairement indisponible. Veuillez réessayer plus tard.",
    variant: "destructive",
  });
};

export const handleMessageUpdateError = (error: any) => {
  console.error('Error updating message status:', error);
};