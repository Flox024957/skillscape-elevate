import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Profile, Education, Experience } from "@/integrations/supabase/types/profiles";
import { useToast } from "@/hooks/use-toast";

export const useProfileData = (userId: string) => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      console.log('Starting profile fetch for userId:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger le profil: " + error.message,
          variant: "destructive",
        });
        throw error;
      }

      console.log('Raw profile data received:', data);

      // Ensure arrays are properly typed
      const education = Array.isArray(data?.education) 
        ? data.education as Education[]
        : [];
      
      const experience = Array.isArray(data?.experience)
        ? data.experience as Experience[]
        : [];

      // Format the profile data with proper typing
      const formattedProfile: Profile = {
        id: data.id,
        pseudo: data.pseudo,
        image_profile: data.image_profile,
        created_at: data.created_at,
        updated_at: data.updated_at,
        description: data.description,
        current_job: data.current_job,
        dream_job: data.dream_job,
        education: education,
        experience: experience,
        banner_image: data.banner_image,
        location: data.location,
        website: data.website,
        interests: Array.isArray(data?.interests) ? data.interests : [],
        languages: Array.isArray(data?.languages) ? data.languages : [],
        social_links: data?.social_links || {},
        personal_goals: data?.personal_goals || [],
        theme_preferences: data?.theme_preferences || {},
        achievements: data?.achievements || [],
        privacy_settings: data?.privacy_settings || {
          show_email: false,
          show_skills: true,
          show_friends: true,
          show_activity: true
        },
        certifications: data?.certifications || [],
        availability_status: data?.availability_status || 'online'
      };

      console.log('Formatted profile data:', formattedProfile);
      return formattedProfile;
    },
  });
};