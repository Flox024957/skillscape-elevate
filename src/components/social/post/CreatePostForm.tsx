import { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { FileAttachmentInput } from "./FileAttachmentInput";
import { SubmitPostButton } from "./SubmitPostButton";
import { usePostSubmission } from './upload/usePostSubmission';

interface CreatePostFormProps {
  userId: string;
  onSuccess?: () => void;
}

export const CreatePostForm = ({ userId, onSuccess }: CreatePostFormProps) => {
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { submitPost, isLoading, uploadProgress } = usePostSubmission(userId);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async () => {
    const success = await submitPost(content, selectedImage, selectedFile);
    if (success) {
      setContent('');
      setSelectedImage(null);
      setImagePreview(null);
      setSelectedFile(null);
      onSuccess?.();
    }
  };

  return (
    <div className="space-y-4">
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