import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Profile, Education, Experience } from '@/integrations/supabase/types/profiles';

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

      // Transform JSON fields to ensure proper typing
      const formattedProfile: Profile = {
        ...data,
        education: Array.isArray(data.education) ? data.education as Education[] : [],
        experience: Array.isArray(data.experience) ? data.experience as Experience[] : [],
        interests: Array.isArray(data.interests) ? data.interests : [],
        languages: Array.isArray(data.languages) ? data.languages : [],
        social_links: data.social_links || {},
        personal_goals: data.personal_goals || [],
        theme_preferences: data.theme_preferences || {},
        achievements: data.achievements || [],
        privacy_settings: data.privacy_settings || {
          show_email: false,
          show_skills: true,
          show_friends: true,
          show_activity: true
        },
        certifications: data.certifications || [],
        availability_status: data.availability_status || 'online'
      };

      console.log('Profile data formatted:', formattedProfile);
      return formattedProfile;
    },
  });
};