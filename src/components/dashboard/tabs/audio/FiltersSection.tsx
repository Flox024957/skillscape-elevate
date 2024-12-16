import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

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
    <Card>
      <CardHeader>
        <CardTitle>Options de lecture</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Checkbox
              id="userSkills"
              checked={filters.userSkillsOnly}
              onCheckedChange={(checked) => 
                onFilterChange('userSkillsOnly', checked)
              }
            />
            <Label htmlFor="userSkills">
              Uniquement mes compétences
            </Label>
          </div>
          
          <div className="flex items-center gap-2">
            <Checkbox
              id="mastered"
              checked={filters.includeMastered}
              onCheckedChange={(checked) =>
                onFilterChange('includeMastered', checked)
              }
            />
            <Label htmlFor="mastered">
              Inclure les compétences maîtrisées
            </Label>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Vitesse de lecture ({filters.playbackSpeed}x)</Label>
          <Slider
            value={[filters.playbackSpeed]}
            min={0.5}
            max={2}
            step={0.1}
            onValueChange={([value]) =>
              onFilterChange('playbackSpeed', value)
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};