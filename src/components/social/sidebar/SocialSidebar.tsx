import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SocialActivity } from "@/components/dashboard/SocialActivity";
import { FriendSuggestions } from '../friends/FriendSuggestions';
import { ProfileSection } from './ProfileSection';
import { NavigationButtons } from './NavigationButtons';
import { SkillsSection } from './SkillsSection';
import { Separator } from '@/components/ui/separator';

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
      <SkillsSection />
    </aside>
  );
};