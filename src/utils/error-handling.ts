import { toast } from "@/hooks/use-toast";

export const handleConnectionError = () => {
  toast({
    title: "Problème de connexion",
    description: "Le serveur est temporairement indisponible. Veuillez réessayer plus tard.",
    variant: "destructive",
    duration: 5000,
  });
};

export const handleMessageUpdateError = (error: any) => {
  console.error('Error updating message status:', error);
  toast({
    title: "Erreur",
    description: "Impossible de mettre à jour le statut du message. Veuillez réessayer.",
    variant: "destructive",
    duration: 5000,
  });
};