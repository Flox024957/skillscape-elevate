import { Search } from 'lucide-react';

interface SearchButtonProps {
  onClick: () => void;
}

export const SearchButton = ({ onClick }: SearchButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full max-w-lg mx-auto flex items-center gap-2 p-3 text-muted-foreground bg-futuristic-gray/20 backdrop-blur-md rounded-lg border border-neon-purple/30 hover:border-neon-purple/50 transition-colors"
    >
      <Search className="w-4 h-4" />
      <span>Rechercher des profils...</span>
    </button>
  );
};