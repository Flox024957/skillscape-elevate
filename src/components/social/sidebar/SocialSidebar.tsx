import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Book, BookOpen, Users, MessageCircle, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SocialActivity } from "@/components/dashboard/SocialActivity";
import { NotificationsList } from '../notifications/NotificationsList';
import { FriendSuggestions } from '../friends/FriendSuggestions';

export const SocialSidebar = () => {
  const navigate = useNavigate();

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
      {/* Profile Section with Notifications */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar className="w-12 h-12">
            <img 
              src={currentUser?.image_profile || '/placeholder.svg'} 
              alt={currentUser?.pseudo || 'Profile'} 
              className="object-cover"
            />
          </Avatar>
          <div>
            <h3 className="font-medium">{currentUser?.pseudo}</h3>
            <p className="text-sm text-muted-foreground">{currentUser?.current_job}</p>
          </div>
        </div>
        {currentUser && <NotificationsList userId={currentUser.id} />}
      </div>

      <Separator />

      {/* Navigation Buttons */}
      <div className="space-y-2">
        <Button 
          variant="ghost" 
          className="w-full justify-start" 
          onClick={() => navigate('/friends')}
        >
          <Users className="mr-2 h-4 w-4" />
          Amis
        </Button>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start"
          onClick={() => navigate('/messages')}
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          Messages
        </Button>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start"
          onClick={() => navigate(`/profile/${currentUser?.id}`)}
        >
          <User className="mr-2 h-4 w-4" />
          Mon profil
        </Button>
      </div>

      <Separator />

      {/* Friend Suggestions Section */}
      {currentUser && <FriendSuggestions userId={currentUser.id} />}

      <Separator />

      {/* Social Activity Section */}
      <ScrollArea className="flex-1">
        {currentUser && <SocialActivity userId={currentUser.id} />}
      </ScrollArea>

      <Separator />

      {/* Skills Section */}
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
            <Book className="w-4 h-4" />
            Skills maîtrisés
          </h4>
          <div className="flex flex-wrap gap-2">
            {masteredSkills.map((skill) => (
              <Badge key={skill.skill_id} variant="default">
                {skill.skills.titre}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            En apprentissage
          </h4>
          <div className="flex flex-wrap gap-2">
            {userSkills.map((skill) => (
              <Badge 
                key={skill.skill_id} 
                variant="secondary"
                className="bg-purple-500/20 text-purple-200 hover:bg-purple-500/30"
              >
                {skill.skills.titre}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};