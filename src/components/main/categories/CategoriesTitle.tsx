import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export const CategoriesTitle = () => {
  const isMobile = useIsMobile();

  return (
    <h2 className={cn(
      "text-center mb-8",
      "relative z-10",
      "bg-clip-text text-transparent",
      "bg-gradient-to-r from-white via-primary/90 to-white",
      "after:content-[''] after:absolute after:inset-0",
      "after:bg-gradient-to-r after:from-primary/20 after:via-primary/10 after:to-primary/20",
      "after:blur-xl after:-z-10",
      "drop-shadow-[0_0_8px_rgba(14,165,233,0.6)]",
      "tracking-wide",
      isMobile ? "text-2xl" : "text-4xl",
      "font-bold"
    )}>
      Explorez nos Catégories
    </h2>
  );
};