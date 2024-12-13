import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserSkills } from '@/components/social/UserSkills';
import { useQuery } from '@tanstack/react-query';

interface Profile {
  pseudo: string;
  image_profile: string;
  description: string;
  current_job: string;
  dream_job: string;
}

const PublicProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['publicProfile', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('pseudo, image_profile, description, current_job, dream_job')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data as Profile;
    },
    staleTime: 30000,
  });

  if (isLoading) {
    return <div className="container mx-auto p-4">
      <div className="animate-pulse space-y-4">
        <div className="h-48 bg-muted rounded-lg"></div>
        <div className="h-24 bg-muted rounded-lg"></div>
      </div>
    </div>;
  }

  if (!profile) {
    return <div className="container mx-auto p-4">Profile not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        ← Retour
      </Button>

      <div className="space-y-6">
        <Card>
          <CardHeader className="text-center">
            <Avatar className="h-24 w-24 mx-auto">
              <img 
                src={profile.image_profile || '/placeholder.svg'} 
                alt={profile.pseudo}
                loading="lazy"
              />
            </Avatar>
            <h2 className="text-2xl font-semibold mt-2">{profile.pseudo}</h2>
            {profile.description && (
              <p className="text-muted-foreground">{profile.description}</p>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {profile.current_job && (
              <div>
                <h3 className="font-medium">Emploi actuel</h3>
                <p className="text-muted-foreground">{profile.current_job}</p>
              </div>
            )}
            {profile.dream_job && (
              <div>
                <h3 className="font-medium">Emploi rêvé</h3>
                <p className="text-muted-foreground">{profile.dream_job}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <UserSkills userId={userId!} />
      </div>
    </div>
  );
};

export default PublicProfile;