import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useMessageSender = () => {
  const { toast } = useToast();

  const sendMessage = async (content: string, userId: string, selectedFriend: string | null) => {
    if (!content.trim() || !selectedFriend) return;

    try {
      const { error } = await supabase
        .from('messages')
        .insert([
          {
            content,
            sender_id: userId,
            receiver_id: selectedFriend,
          },
        ]);

      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible d'envoyer le message",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return sendMessage;
};