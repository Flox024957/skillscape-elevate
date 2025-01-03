import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { EditProfileForm } from '@/components/profile/edit/EditProfileForm';

interface ProfileFormValues {
  pseudo: string;
  description: string;
  current_job: string;
  dream_job: string;
  image_profile: string;
}

const EditProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [defaultValues, setDefaultValues] = useState<ProfileFormValues>({
    pseudo: '',
    description: '',
    current_job: '',
    dream_job: '',
    image_profile: ''
  });

  useEffect(() => {
    const loadDefaultValues = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setDefaultValues({
          pseudo: '',
          description: '',
          current_job: '',
          dream_job: '',
          image_profile: ''
        });
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('pseudo, description, current_job, dream_job, image_profile')
        .eq('id', user.id)
        .single();

      if (profile) {
        setDefaultValues(profile);
      }
    };

    loadDefaultValues();
  }, []);

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Erreur",
          description: "Vous devez être connecté pour modifier votre profil",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          pseudo: values.pseudo,
          description: values.description,
          current_job: values.current_job,
          dream_job: values.dream_job,
          image_profile: values.image_profile,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Votre profil a été mis à jour",
      });

      navigate('/social');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du profil",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)}
        className="mb-6"
      >
        ← Retour
      </Button>

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Modifier mon profil</h1>
          <p className="text-muted-foreground">
            Mettez à jour vos informations personnelles
          </p>
        </div>

        <EditProfileForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default EditProfile;