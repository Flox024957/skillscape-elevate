import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SocialActivity } from "@/components/dashboard/SocialActivity";
import { FriendSuggestions } from '../friends/FriendSuggestions';
import { ProfileSection } from './ProfileSection';
import { NavigationButtons } from './NavigationButtons';
import { SkillsSection } from './SkillsSection';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

export const SocialSidebar = () => {
  const isMobile = useIsMobile();
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

  const sidebarVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  const sidebarClasses = isMobile
    ? "flex flex-col w-full h-full bg-background overflow-hidden"
    : "hidden md:flex flex-col w-80 min-h-screen bg-card/50 border-r border-border p-4 space-y-6 sticky top-16";

  return (
    <motion.aside 
      className={sidebarClasses}
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="p-4">
        <ProfileSection currentUser={currentUser} />
      </motion.div>

      <Separator className="opacity-50" />

      <motion.div variants={itemVariants} className="p-4">
        <NavigationButtons currentUser={currentUser} />
      </motion.div>

      <Separator className="opacity-50" />

      <motion.div variants={itemVariants} className="p-4">
        {currentUser && <FriendSuggestions userId={currentUser.id} />}
      </motion.div>

      <Separator className="opacity-50" />

      <motion.div variants={itemVariants} className="flex-1 p-4">
        <ScrollArea className="h-[calc(100vh-600px)] md:h-full">
          {currentUser && <SocialActivity userId={currentUser.id} />}
        </ScrollArea>
      </motion.div>

      <Separator className="opacity-50" />

      <motion.div variants={itemVariants} className="p-4">
        <SkillsSection />
      </motion.div>
    </motion.aside>
  );
};