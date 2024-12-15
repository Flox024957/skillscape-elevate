import { useState, useRef } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Image, Loader2, Paperclip, X } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const attachmentInputRef = useRef<HTMLInputElement>(null);
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

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        onUploadProgress: (progress) => {
          setUploadProgress((progress.loaded / progress.total) * 100);
        }
      });

    if (uploadError) {
      throw uploadError;
    }

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
      
      {uploadProgress > 0 && uploadProgress < 100 && (
        <Progress value={uploadProgress} className="w-full" />
      )}
      
      {imagePreview && (
        <div className="relative">
          <img 
            src={imagePreview} 
            alt="Preview" 
            className="max-h-[200px] rounded-lg object-cover"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={() => {
              setSelectedImage(null);
              setImagePreview(null);
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {selectedFile && (
        <div className="flex items-center justify-between bg-background/50 p-2 rounded-lg">
          <span className="text-sm truncate">{selectedFile.name}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedFile(null)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
          >
            <Image className="h-4 w-4" />
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageSelect}
          />
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => attachmentInputRef.current?.click()}
            disabled={isLoading}
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          <input
            type="file"
            ref={attachmentInputRef}
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>
        
        <Button 
          onClick={handleSubmit} 
          disabled={isLoading || (!content.trim() && !selectedImage && !selectedFile)}
          className="relative overflow-hidden"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Publication en cours...
            </>
          ) : (
            'Publier'
          )}
        </Button>
      </div>
    </div>
  );
};