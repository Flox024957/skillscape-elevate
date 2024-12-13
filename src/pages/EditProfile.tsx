import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

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

  const form = useForm<ProfileFormValues>({
    defaultValues: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return {
        pseudo: '',
        description: '',
        current_job: '',
        dream_job: '',
        image_profile: ''
      };

      const { data: profile } = await supabase
        .from('profiles')
        .select('pseudo, description, current_job, dream_job, image_profile')
        .eq('id', user.id)
        .single();

      return profile || {
        pseudo: '',
        description: '',
        current_job: '',
        dream_job: '',
        image_profile: ''
      };
    }
  });

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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="pseudo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pseudo</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre pseudo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image_profile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL de l'image de profil</FormLabel>
                  <FormControl>
                    <Input placeholder="URL de votre image de profil" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Parlez-nous un peu de vous" 
                      className="resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="current_job"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emploi actuel</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre emploi actuel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dream_job"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emploi rêvé</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre emploi rêvé" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Mise à jour..." : "Enregistrer les modifications"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditProfile;