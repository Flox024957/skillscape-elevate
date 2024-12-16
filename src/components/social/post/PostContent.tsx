import { Button } from "@/components/ui/button";
import { Link2 } from "lucide-react";
import { motion } from "framer-motion";

interface PostContentProps {
  content: string;
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  shouldTruncate: boolean;
  image_url?: string | null;
}

export const PostContent = ({ 
  content, 
  isExpanded, 
  setIsExpanded, 
  shouldTruncate,
  image_url 
}: PostContentProps) => {
  const renderContent = () => {
    if (!shouldTruncate || isExpanded) {
      return content;
    }
    return (
      <>
        {content.slice(0, 280)}...
        <Button 
          variant="link" 
          className="px-1 h-auto" 
          onClick={() => setIsExpanded(true)}
        >
          Voir plus
        </Button>
      </>
    );
  };

  return (
    <div className="space-y-4">
      <p className="text-foreground whitespace-pre-wrap">
        {renderContent()}
      </p>

      {image_url && (
        <motion.div 
          className="relative w-full h-[300px] group"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <img
            src={image_url}
            alt="Post"
            className="rounded-lg w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
            <Button variant="secondary" size="sm" className="gap-2">
              <Link2 className="h-4 w-4" />
              Voir l'image
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};