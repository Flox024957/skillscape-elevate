import { Button } from "@/components/ui/button";
import { Image, Paperclip, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface FileAttachmentInputProps {
  onImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedImage: File | null;
  selectedFile: File | null;
  imagePreview: string | null;
  uploadProgress: number;
  onRemoveImage: () => void;
  onRemoveFile: () => void;
  isLoading: boolean;
}

export const FileAttachmentInput = ({
  onImageSelect,
  onFileSelect,
  selectedImage,
  selectedFile,
  imagePreview,
  uploadProgress,
  onRemoveImage,
  onRemoveFile,
  isLoading,
}: FileAttachmentInputProps) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const attachmentInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-4">
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
            onClick={onRemoveImage}
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
            onClick={onRemoveFile}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

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
          onChange={onImageSelect}
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
          onChange={onFileSelect}
        />
      </div>
    </div>
  );
};