import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export const SearchBar = () => {
  const isMobile = useIsMobile();

  return (
    <div className="relative">
      <Search className={cn(
        "absolute text-muted-foreground",
        isMobile ? "left-2 top-2 h-4 w-4" : "left-3 top-3 h-5 w-5"
      )} />
      <Input
        placeholder="Rechercher..."
        className={cn(
          "pl-9 bg-background/50",
          isMobile ? "h-8 text-sm" : "h-10"
        )}
      />
    </div>
  );
};