import { useForm } from "react-hook-form";
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

interface ProfileFormValues {
  pseudo: string;
  description: string;
  current_job: string;
  dream_job: string;
  image_profile: string;
}

interface EditProfileFormProps {
  defaultValues: ProfileFormValues;
  onSubmit: (values: ProfileFormValues) => Promise<void>;
  isLoading: boolean;
}

export const EditProfileForm = ({ defaultValues, onSubmit, isLoading }: EditProfileFormProps) => {
  const form = useForm<ProfileFormValues>({
    defaultValues,
  });

  return (
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
  );
};