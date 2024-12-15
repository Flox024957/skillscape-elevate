import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SocialActivity } from "@/components/dashboard/SocialActivity";
import { FriendSuggestions } from '../friends/FriendSuggestions';
import { ProfileSection } from './ProfileSection';
import { NavigationButtons } from './NavigationButtons';
import { SkillsSection } from './SkillsSection';

export const SocialSidebar = () => {
  const { data: currentUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      return profile;
    },
  });

  const { data: userSkills = [] } = useQuery({
    queryKey: ['userSkills'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];
      
      const { data: skills } = await supabase
        .from('user_skills')
        .select(`
          skill_id,
          sections_selectionnees,
          skills (
            id,
            titre
          )
        `)
        .eq('user_id', user.id);
      
      return skills || [];
    },
  });

  const { data: masteredSkills = [] } = useQuery({
    queryKey: ['masteredSkills'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data } = await supabase
        .from('user_mastered_skills')
        .select(`
          skill_id,
          skills (
            id,
            titre
          )
        `)
        .eq('user_id', user.id);
      
      return data || [];
    },
  });

  return (
    <aside className="hidden md:flex flex-col w-80 min-h-screen bg-card/50 border-r border-border p-4 space-y-6 sticky top-16">
      <ProfileSection currentUser={currentUser} />
      <Separator />
      <NavigationButtons currentUser={currentUser} />
      <Separator />
      {currentUser && <FriendSuggestions userId={currentUser.id} />}
      <Separator />
      <ScrollArea className="flex-1">
        {currentUser && <SocialActivity userId={currentUser.id} />}
      </ScrollArea>
      <Separator />
      <SkillsSection 
        masteredSkills={masteredSkills}
        userSkills={userSkills}
      />
    </aside>
  );
};