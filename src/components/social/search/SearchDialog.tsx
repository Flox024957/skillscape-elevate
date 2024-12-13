import { useNavigate } from 'react-router-dom';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { SearchResults } from './SearchResults';
import { SearchResult } from './types';

interface SearchDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: SearchResult[];
  isLoading: boolean;
}

export const SearchDialog = ({ 
  open, 
  setOpen, 
  searchQuery, 
  setSearchQuery,
  searchResults,
  isLoading 
}: SearchDialogProps) => {
  const navigate = useNavigate();

  const handleSelect = (userId: string) => {
    setOpen(false);
    setSearchQuery("");
    navigate(`/profile/${userId}`);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput 
        placeholder="Rechercher des profils..." 
        value={searchQuery}
        onValueChange={setSearchQuery}
        className="border-none focus:ring-0"
      />
      <CommandList>
        <CommandEmpty>
          {isLoading ? (
            <div className="flex items-center justify-center py-6 text-sm text-muted-foreground">
              Recherche en cours...
            </div>
          ) : (
            "Aucun résultat trouvé."
          )}
        </CommandEmpty>
        <CommandGroup heading="Profils">
          <SearchResults results={searchResults} onSelect={handleSelect} />
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};