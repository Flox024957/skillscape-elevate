import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Command, CommandList } from "@/components/ui/command";
import { SearchInput } from './search/SearchInput';
import { SearchResults } from './search/SearchResults';
import { useProfileSearch } from './search/useProfileSearch';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

export const SearchBar = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const { data: searchResults = [], isLoading } = useProfileSearch(searchQuery);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearching(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (userId: string) => {
    setSearchQuery("");
    setIsSearching(false);
    navigate(`/profile/${userId}`);
  };

  return (
    <motion.div 
      ref={searchRef}
      className={`relative w-full ${isMobile ? 'max-w-full' : 'max-w-2xl'} mx-auto`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Command 
        className="rounded-xl border border-neon-purple/30 bg-futuristic-gray/20 backdrop-blur-md shadow-lg transition-all duration-300 hover:border-neon-purple/50 hover:shadow-neon-purple/20"
        shouldFilter={false} 
        loop
      >
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          onFocus={() => setIsSearching(true)}
        />
        <AnimatePresence>
          {isSearching && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`absolute w-full ${isMobile ? 'max-h-[60vh]' : 'max-h-[400px]'} overflow-auto z-50`}
            >
              <CommandList className="animate-fade-in">
                <SearchResults
                  results={searchResults}
                  isLoading={isLoading}
                  onSelect={handleSelect}
                />
              </CommandList>
            </motion.div>
          )}
        </AnimatePresence>
      </Command>
    </motion.div>
  );
};