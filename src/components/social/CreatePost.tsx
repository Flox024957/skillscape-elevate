import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { FileAttachmentInput } from "./post/FileAttachmentInput";
import { SubmitPostButton } from "./post/SubmitPostButton";

interface CreatePostProps {
  userId: string;
}

export const CreatePost = ({ userId }: CreatePostProps) => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        toast({
          title: "Erreur",
          description: "Le fichier sélectionné doit être une image",
          variant: "destructive",
        });
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

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

    // Combine chunks (this would typically be done server-side)
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async () => {
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

      setContent('');
      setSelectedImage(null);
      setImagePreview(null);
      setSelectedFile(null);
      setUploadProgress(0);
      
      toast({
        title: "Succès",
        description: "Publication créée avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer la publication",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-card/50 backdrop-blur-sm p-4 rounded-lg border border-border/50 space-y-4">
      <Textarea
        placeholder="Quoi de neuf ?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[100px] bg-background/50"
        disabled={isLoading}
      />
      
      <FileAttachmentInput
        onImageSelect={handleImageSelect}
        onFileSelect={handleFileSelect}
        selectedImage={selectedImage}
        selectedFile={selectedFile}
        imagePreview={imagePreview}
        uploadProgress={uploadProgress}
        onRemoveImage={() => {
          setSelectedImage(null);
          setImagePreview(null);
        }}
        onRemoveFile={() => setSelectedFile(null)}
        isLoading={isLoading}
      />

      <div className="flex justify-end">
        <SubmitPostButton
          isLoading={isLoading}
          disabled={isLoading || (!content.trim() && !selectedImage && !selectedFile)}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};