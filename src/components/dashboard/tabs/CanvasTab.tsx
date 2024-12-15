import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface CanvasTabProps {
  userId: string;
}

const CanvasTab = ({ userId }: CanvasTabProps) => {
  const { toast } = useToast();

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const { data: { user } } = await supabase.auth.getUser();
    if (!file || !user) return;

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('canvas-images')
      .upload(filePath, file);

    if (uploadError) {
      toast({
        title: "Error",
        description: "Could not upload image",
        variant: "destructive",
      });
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('canvas-images')
      .getPublicUrl(filePath);

    const { error: dbError } = await supabase
      .from('user_canvas_images')
      .insert([{
        user_id: user.id,
        image_url: publicUrl,
      }]);

    if (dbError) {
      toast({
        title: "Error",
        description: "Could not save image reference",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    }
  };

  return (
    <div className="bg-card p-4 rounded-lg border border-border">
      <div className="flex items-center justify-center border-2 border-dashed border-muted rounded-lg p-8">
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          <div className="flex flex-col items-center">
            <Upload className="w-12 h-12 text-muted-foreground mb-2" />
            <span className="text-sm text-muted-foreground">
              Click to upload an image
            </span>
          </div>
        </label>
      </div>
    </div>
  );
};

export default CanvasTab;
