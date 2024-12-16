import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";

interface FiltersSectionProps {
  filters: {
    userSkillsOnly: boolean;
    includeMastered: boolean;
    playbackSpeed: number;
  };
  onFilterChange: (key: string, value: any) => void;
}

export const FiltersSection = ({ filters, onFilterChange }: FiltersSectionProps) => {
  return (
    <Card className="bg-[#1E3D7B]/20 border-[#1E3D7B]/30 p-4 space-y-6">
      <h3 className="text-lg font-semibold text-[#E5DEFF]">Filtres et paramètres</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="userSkills" className="text-sm font-medium text-[#8B9CC7]">
            Mes compétences uniquement
          </Label>
          <Switch
            id="userSkills"
            checked={filters.userSkillsOnly}
            onCheckedChange={(checked) => onFilterChange('userSkillsOnly', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="mastered" className="text-sm font-medium text-[#8B9CC7]">
            Inclure les compétences maîtrisées
          </Label>
          <Switch
            id="mastered"
            checked={filters.includeMastered}
            onCheckedChange={(checked) => onFilterChange('includeMastered', checked)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="speed" className="text-sm font-medium text-[#8B9CC7]">
            Vitesse de lecture ({filters.playbackSpeed}x)
          </Label>
          <Slider
            id="speed"
            min={0.5}
            max={2}
            step={0.1}
            value={[filters.playbackSpeed]}
            onValueChange={([value]) => onFilterChange('playbackSpeed', value)}
            className="w-full"
          />
        </div>
      </div>
    </Card>
  );
};