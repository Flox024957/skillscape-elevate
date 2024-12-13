import { CommandItem } from "@/components/ui/command";
import { Avatar } from "@/components/ui/avatar";
import { SearchResult } from './types';

interface SearchResultsProps {
  results: SearchResult[];
  onSelect: (userId: string) => void;
}

export const SearchResults = ({ results, onSelect }: SearchResultsProps) => {
  return (
    <>
      {results.map((result) => (
        <CommandItem
          key={result.id}
          onSelect={() => onSelect(result.id)}
          className="flex items-center gap-3 cursor-pointer hover:bg-futuristic-gray/20"
        >
          <Avatar className="h-8 w-8">
            <img 
              src={result.image_profile || '/placeholder.svg'} 
              alt={result.pseudo}
              className="object-cover"
            />
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{result.pseudo}</span>
            {result.current_job && (
              <span className="text-sm text-muted-foreground">
                {result.current_job}
              </span>
            )}
          </div>
        </CommandItem>
      ))}
    </>
  );
};