import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useFileUpload = (userId: string) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();

  const uploadFile = async (file: File, bucket: string): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${userId}/${fileName}`;

    let uploadProgress = 0;
    const fileSize = file.size;
    const chunkSize = 1024 * 1024; // 1MB chunks
    const chunks = Math.ceil(fileSize / chunkSize);

    for (let i = 0; i < chunks; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, fileSize);
      const chunk = file.slice(start, end);

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(`${filePath}_${i}`, chunk);

      if (uploadError) throw uploadError;

      uploadProgress = ((i + 1) / chunks) * 100;
      setUploadProgress(uploadProgress);
    }

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  return {
    uploadFile,
    uploadProgress,
    setUploadProgress
  };
};