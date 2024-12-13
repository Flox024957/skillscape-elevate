import { Avatar } from "@/components/ui/avatar";
import { CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";

interface SearchResult {
  id: string;
  pseudo: string;
  image_profile: string;
  current_job?: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  onSelect: (userId: string) => void;
}

export const SearchResults = ({ results, isLoading, onSelect }: SearchResultsProps) => {
  return (
    <>
      <CommandEmpty className="py-6 text-sm text-center text-muted-foreground">
        {isLoading ? "Recherche en cours..." : "Aucun résultat trouvé."}
      </CommandEmpty>
      <CommandGroup heading="Profils">
        {results.map((result) => (
          <CommandItem
            key={result.id}
            onSelect={() => onSelect(result.id)}
            className="flex items-center gap-3 p-2 cursor-pointer hover:bg-futuristic-gray/30 transition-colors duration-200"
          >
            <Avatar className="h-8 w-8 ring-1 ring-neon-purple/30">
              <img 
                src={result.image_profile || '/placeholder.svg'} 
                alt={result.pseudo}
                className="object-cover"
              />
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium text-foreground">{result.pseudo}</span>
              {result.current_job && (
                <span className="text-sm text-muted-foreground">
                  {result.current_job}
                </span>
              )}
            </div>
          </CommandItem>
        ))}
      </CommandGroup>
    </>
  );
};