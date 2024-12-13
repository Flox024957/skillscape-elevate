import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from '@tanstack/react-query';
import { Avatar } from "@/components/ui/avatar";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

interface SearchResult {
  id: string;
  pseudo: string;
  image_profile: string;
  current_job?: string;
}

export const SearchBar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const { data: searchResults = [], isLoading } = useQuery({
    queryKey: ['profileSearch', searchQuery],
    queryFn: async () => {
      if (!searchQuery.trim()) return [];
      
      // Modification de la requête pour chercher dans tous les profils
      const { data, error } = await supabase
        .from('profiles')
        .select('id, pseudo, image_profile, current_job')
        .ilike('pseudo', `%${searchQuery}%`)
        .not('pseudo', 'is', null) // Exclure les profils sans pseudo
        .order('pseudo') // Trier par pseudo
        .limit(10);

      if (error) {
        console.error('Erreur lors de la recherche:', error);
        throw error;
      }

      console.log('Résultats de recherche:', data); // Pour le débogage
      return data as SearchResult[];
    },
    enabled: searchQuery.length > 0,
    staleTime: 1000,
    refetchOnWindowFocus: false,
  });

  const handleSelect = (userId: string) => {
    setSearchQuery("");
    setIsSearching(false);
    navigate(`/profile/${userId}`);
  };

  const handleClickOutside = () => {
    if (isSearching) {
      setIsSearching(false);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto" onClick={(e) => e.stopPropagation()}>
      <Command className="rounded-xl border border-neon-purple/30 bg-futuristic-gray/20 backdrop-blur-md shadow-lg">
        <div className="flex items-center px-3 border-b border-neon-purple/20">
          <Search className="w-4 h-4 mr-2 text-muted-foreground shrink-0" />
          <CommandInput
            placeholder="Rechercher des profils..."
            value={searchQuery}
            onValueChange={setSearchQuery}
            onFocus={() => setIsSearching(true)}
            className="h-11 bg-transparent border-none focus:ring-0 placeholder:text-muted-foreground"
          />
        </div>
        {isSearching && (
          <CommandList className="animate-fade-in">
            <CommandEmpty className="py-6 text-sm text-center text-muted-foreground">
              {isLoading ? "Recherche en cours..." : "Aucun résultat trouvé."}
            </CommandEmpty>
            <CommandGroup heading="Profils">
              {searchResults.map((result) => (
                <CommandItem
                  key={result.id}
                  onSelect={() => handleSelect(result.id)}
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
          </CommandList>
        )}
      </Command>
    </div>
  );
};