import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Avatar } from "@/components/ui/avatar";
import { useQuery } from '@tanstack/react-query';

interface SearchResult {
  id: string;
  pseudo: string;
  image_profile: string;
  current_job?: string;
}

export const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const { data: searchResults = [], isLoading } = useQuery({
    queryKey: ['profileSearch', searchQuery],
    queryFn: async () => {
      if (!searchQuery.trim()) return [];
      
      const { data, error } = await supabase
        .from('profiles')
        .select('id, pseudo, image_profile, current_job')
        .ilike('pseudo', `${searchQuery}%`) // Changé pour chercher les profils qui commencent par la recherche
        .limit(5);

      if (error) throw error;
      return data as SearchResult[];
    },
    enabled: searchQuery.length > 0,
    staleTime: 1000, // Cache les résultats pendant 1 seconde
    refetchOnWindowFocus: false,
  });

  const handleSelect = (userId: string) => {
    setOpen(false);
    setSearchQuery("");
    navigate(`/profile/${userId}`);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full max-w-lg mx-auto flex items-center gap-2 p-3 text-muted-foreground bg-futuristic-gray/20 backdrop-blur-md rounded-lg border border-neon-purple/30 hover:border-neon-purple/50 transition-colors"
      >
        <Search className="w-4 h-4" />
        <span>Rechercher des profils...</span>
      </button>

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
            {searchResults.map((result) => (
              <CommandItem
                key={result.id}
                onSelect={() => handleSelect(result.id)}
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
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};