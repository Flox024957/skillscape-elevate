import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export interface FiltersSectionProps {
  filters: {
    userSkillsOnly: boolean;
    includeMastered: boolean;
    playbackSpeed: number;
  };
  onFilterChange: (key: string, value: any) => void;
}

export const FiltersSection = ({ filters, onFilterChange }: FiltersSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Filtres</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="userSkillsOnly">Afficher uniquement mes compétences</Label>
            <Switch
              id="userSkillsOnly"
              checked={filters.userSkillsOnly}
              onCheckedChange={(checked) => onFilterChange('userSkillsOnly', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="includeMastered">Inclure les compétences maîtrisées</Label>
            <Switch
              id="includeMastered"
              checked={filters.includeMastered}
              onCheckedChange={(checked) => onFilterChange('includeMastered', checked)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Paramètres de lecture</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Vitesse de lecture : {filters.playbackSpeed}x</Label>
            <Slider
              value={[filters.playbackSpeed]}
              min={0.5}
              max={2}
              step={0.1}
              onValueChange={([value]) => onFilterChange('playbackSpeed', value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};