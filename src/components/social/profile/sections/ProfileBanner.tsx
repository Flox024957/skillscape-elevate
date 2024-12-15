import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ProfileBannerProps {
  userId: string;
  bannerUrl?: string | null;
  isCurrentUser: boolean;
}

export const ProfileBanner = ({ userId, bannerUrl, isCurrentUser }: ProfileBannerProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleBannerUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      
      const fileExt = file.name.split('.').pop();
      const filePath = `${userId}/banner.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('profiles')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('profiles')
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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full h-[200px] md:h-[300px] rounded-lg overflow-hidden"
    >
      {bannerUrl ? (
        <img
          src={bannerUrl}
          alt="Profile banner"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-r from-primary/10 to-primary/20" />
      )}

      {isCurrentUser && (
        <div className="absolute bottom-4 right-4">
          <Button
            variant="secondary"
            size="sm"
            className="gap-2"
            disabled={isUploading}
          >
            <Camera className="h-4 w-4" />
            <label className="cursor-pointer">
              {isUploading ? "Chargement..." : "Modifier la bannière"}
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleBannerUpload}
                disabled={isUploading}
              />
            </label>
          </Button>
        </div>
      )}
    </motion.div>
  );
};