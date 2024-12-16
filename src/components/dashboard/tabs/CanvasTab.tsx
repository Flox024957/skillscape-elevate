import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface CanvasTabProps {
  userId: string;
}

const CanvasTab = ({ userId }: CanvasTabProps) => {
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { data: images, refetch } = useQuery({
    queryKey: ['canvas-images', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_canvas_images')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

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
      refetch();
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload Section */}
      <motion.div 
        className="bg-card/50 backdrop-blur-sm p-8 rounded-lg border border-border neon-frame"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <label className="cursor-pointer block">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          <div className="flex flex-col items-center gap-4">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <Upload className="w-16 h-16 text-primary" />
            </motion.div>
            <span className="text-lg text-muted-foreground futuristic-text">
              Click to upload your dreams
            </span>
          </div>
        </label>
      </motion.div>

      {/* Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {images?.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="group relative aspect-square overflow-hidden rounded-lg glass-panel"
              onClick={() => setSelectedImage(image.image_url)}
            >
              <img
                src={image.image_url}
                alt="Dream visualization"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-shadow-neon text-sm">
                    {new Date(image.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Full Screen Preview */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              src={selectedImage}
              alt="Full screen preview"
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CanvasTab;