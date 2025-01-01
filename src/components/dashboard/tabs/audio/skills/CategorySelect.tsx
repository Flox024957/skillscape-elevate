import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Category {
  id: string;
  name: string;
}

interface CategorySelectProps {
  categories: Category[];
  onSelect: (value: string) => void;
}

export const CategorySelect = ({ categories, onSelect }: CategorySelectProps) => {
  return (
    <Select onValueChange={(value) => onSelect(value === "all" ? "" : value)}>
      <SelectTrigger className="w-full sm:w-[200px]">
        <SelectValue placeholder="Filtrer par catégorie" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Toutes les catégories</SelectItem>
        {categories.map((category) => (
          <SelectItem key={category.id} value={category.id}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};