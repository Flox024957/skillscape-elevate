import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Command, CommandList } from "@/components/ui/command";
import { SearchInput } from './search/SearchInput';
import { SearchResults } from './search/SearchResults';
import { useProfileSearch } from './search/useProfileSearch';

export const SearchBar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const { data: searchResults = [], isLoading } = useProfileSearch(searchQuery);

  const handleSelect = (userId: string) => {
    setSearchQuery("");
    setIsSearching(false);
    navigate(`/profile/${userId}`);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto" onClick={(e) => e.stopPropagation()}>
      <Command className="rounded-xl border border-neon-purple/30 bg-futuristic-gray/20 backdrop-blur-md shadow-lg">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          onFocus={() => setIsSearching(true)}
        />
        {isSearching && (
          <CommandList className="animate-fade-in">
            <SearchResults
              results={searchResults}
              isLoading={isLoading}
              onSelect={handleSelect}
            />
          </CommandList>
        )}
      </Command>
    </div>
  );
};