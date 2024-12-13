import { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface UserProfileProps {
  userId: string;
}

interface Profile {
  pseudo: string;
  image_profile: string;
  description: string;
  current_job: string;
  dream_job: string;
}

export const UserProfile = ({ userId }: UserProfileProps) => {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('pseudo, image_profile, description, current_job, dream_job')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      setProfile(data);
    };

    fetchProfile();
  }, [userId]);

  if (!profile) {
    return <div>Chargement du profil...</div>;
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <Avatar className="h-24 w-24 mx-auto">
          <img src={profile.image_profile || '/placeholder.svg'} alt={profile.pseudo} />
        </Avatar>
        <h2 className="text-xl font-semibold mt-2">{profile.pseudo}</h2>
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
        <Button className="w-full" variant="outline">
          Modifier le profil
        </Button>
      </CardContent>
    </Card>
  );
};