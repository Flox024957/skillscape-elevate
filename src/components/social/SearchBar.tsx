import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from '@tanstack/react-query';
import { SearchButton } from './search/SearchButton';
import { SearchDialog } from './search/SearchDialog';
import { SearchResult } from './search/types';

export const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: searchResults = [], isLoading } = useQuery({
    queryKey: ['profileSearch', searchQuery],
    queryFn: async () => {
      if (!searchQuery.trim()) return [];
      
      const { data, error } = await supabase
        .from('profiles')
        .select('id, pseudo, image_profile, current_job')
        .ilike('pseudo', `%${searchQuery}%`)
        .limit(5);

      if (error) throw error;
      return data as SearchResult[];
    },
    enabled: searchQuery.length > 0,
    staleTime: 1000,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <SearchButton onClick={() => setOpen(true)} />
      <SearchDialog 
        open={open}
        setOpen={setOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchResults={searchResults}
        isLoading={isLoading}
      />
    </>
  );
};