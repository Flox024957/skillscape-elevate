import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface UseMessageSenderReturn {
  sendMessage: (content: string, userId: string, selectedFriend: string | null) => Promise<void>;
  isError: boolean;
}

export const useMessageSender = (): UseMessageSenderReturn => {
  const { toast } = useToast();
  const [isError, setIsError] = useState(false);

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
        setIsError(true);
        toast({
          title: "Erreur",
          description: "Impossible d'envoyer le message",
          variant: "destructive",
        });
      } else {
        setIsError(false);
      }
    } catch (error) {
      setIsError(true);
      console.error('Error sending message:', error);
    }
  };

  return { sendMessage, isError };
};