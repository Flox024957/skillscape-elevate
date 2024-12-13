import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useFriendshipStatus = (userId: string, currentUserId: string | null) => {
  return useQuery({
    queryKey: ['friendshipStatus', userId, currentUserId],
    queryFn: async () => {
      if (!currentUserId || currentUserId === userId) return { status: 'not_friends' as const };

      const { data: sentRequest } = await supabase
        .from('friendships')
        .select('id, status')
        .eq('user_id', currentUserId)
        .eq('friend_id', userId)
        .single();

      if (sentRequest) {
        return {
          status: sentRequest.status as 'not_friends' | 'pending_sent' | 'pending_received' | 'accepted',
          friendshipId: sentRequest.id
        };
      }

      const { data: receivedRequest } = await supabase
        .from('friendships')
        .select('id, status')
        .eq('user_id', userId)
        .eq('friend_id', currentUserId)
        .single();

      if (receivedRequest) {
        return {
          status: receivedRequest.status as 'not_friends' | 'pending_sent' | 'pending_received' | 'accepted',
          friendshipId: receivedRequest.id
        };
      }

      return { status: 'not_friends' as const };
    },
    enabled: !!currentUserId && currentUserId !== userId,
  });
};