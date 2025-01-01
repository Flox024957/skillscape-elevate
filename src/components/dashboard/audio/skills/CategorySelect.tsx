import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CategorySelectProps {
  categories: { id: string; name: string }[];
  onSelect: (value: string) => void;
}

export const CategorySelect = ({ categories, onSelect }: CategorySelectProps) => {
  return (
    <Select onValueChange={onSelect}>
      <SelectTrigger className="w-full bg-[#1E3D7B]/20 border-[#1E3D7B]/30">
        <SelectValue placeholder="Filtrer par catégorie" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="">Toutes les catégories</SelectItem>
        {categories.map((category) => (
          <SelectItem key={category.id} value={category.id}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};