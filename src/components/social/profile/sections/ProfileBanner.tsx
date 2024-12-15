import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Camera, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ProfileBannerProps {
  userId: string;
  bannerUrl?: string;
  isCurrentUser: boolean;
}

export const ProfileBanner = ({ userId, bannerUrl, isCurrentUser }: ProfileBannerProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleBannerUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${userId}/banner-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('profile-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('profile-images')
        .getPublicUrl(filePath);

      await supabase
        .from('profiles')
        .update({ banner_image: publicUrl })
        .eq('id', userId);

      toast({
        title: "Bannière mise à jour",
        description: "Votre bannière a été mise à jour avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour la bannière",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="relative w-full h-48 md:h-64 bg-gradient-to-r from-primary/10 to-primary/20 rounded-t-lg overflow-hidden">
      {bannerUrl && (
        <img
          src={bannerUrl}
          alt="Bannière de profil"
          className="w-full h-full object-cover"
        />
      )}
      {isCurrentUser && (
        <div className="absolute bottom-4 right-4">
          <label>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleBannerUpload}
              disabled={isUploading}
            />
            <Button
              variant="secondary"
              className="bg-background/80 backdrop-blur-sm"
              disabled={isUploading}
            >
              {isUploading ? (
                "Chargement..."
              ) : (
                <>
                  <Camera className="w-4 h-4 mr-2" />
                  Modifier la bannière
                </>
              )}
            </Button>
          </label>
        </div>
      )}
    </div>
  );
};