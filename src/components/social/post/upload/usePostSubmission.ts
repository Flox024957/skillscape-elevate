import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useFileUpload } from './useFileUpload';

export const usePostSubmission = (userId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const { uploadFile, uploadProgress, setUploadProgress } = useFileUpload(userId);
  const { toast } = useToast();

  const submitPost = async (
    content: string,
    selectedImage: File | null,
    selectedFile: File | null
  ) => {
    if (!content.trim() && !selectedImage && !selectedFile) return;

    setIsLoading(true);
    setUploadProgress(0);
    
    try {
      let imageUrl = null;
      let attachmentUrl = null;
      let attachmentType = null;

      if (selectedImage) {
        imageUrl = await uploadFile(selectedImage, 'post-images');
      }

      if (selectedFile) {
        attachmentUrl = await uploadFile(selectedFile, 'post-attachments');
        attachmentType = selectedFile.type;
      }

      const { error } = await supabase
        .from('posts')
        .insert([{ 
          user_id: userId, 
          content,
          image_url: imageUrl,
          attachment_url: attachmentUrl,
          attachment_type: attachmentType
        }]);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Publication créée avec succès",
      });

      return true;
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer la publication",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submitPost,
    isLoading,
    uploadProgress
  };
};