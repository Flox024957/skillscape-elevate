import { cn } from "@/lib/utils";

interface ContentDisplayProps {
  content: string;
  isMobile: boolean;
}

const ContentDisplay = ({ content, isMobile }: ContentDisplayProps) => {
  if (!content) return null;
  
  return (
    <div className={cn(
      "mt-4 p-4 bg-muted/50 rounded-lg",
      isMobile && "text-sm"
    )}>
      <p className="text-sm text-muted-foreground whitespace-pre-line">{content}</p>
    </div>
  );
};

export default ContentDisplay;