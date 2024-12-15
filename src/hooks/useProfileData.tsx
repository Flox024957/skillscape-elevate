import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/integrations/supabase/types/profiles';

export const useProfileData = (userId: string) => {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: async (): Promise<Profile> => {
      console.log('Fetching profile data for userId:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        throw error;
      }

      if (!data) {
        console.error('No profile found for userId:', userId);
        throw new Error('Profile not found');
      }

      console.log('Profile data fetched:', data);
      return data;
    },
  });
};