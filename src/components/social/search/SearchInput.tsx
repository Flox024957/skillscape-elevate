import { Search } from 'lucide-react';
import { CommandInput } from "@/components/ui/command";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
}

export const SearchInput = ({ value, onChange, onFocus }: SearchInputProps) => {
  return (
    <div className="flex items-center px-3 border-b border-neon-purple/20">
      <Search className="w-4 h-4 mr-2 text-muted-foreground shrink-0" />
      <CommandInput
        placeholder="Rechercher des profils..."
        value={value}
        onValueChange={onChange}
        onFocus={onFocus}
        className="h-11 bg-transparent border-none focus:ring-0 placeholder:text-muted-foreground"
      />
    </div>
  );
};