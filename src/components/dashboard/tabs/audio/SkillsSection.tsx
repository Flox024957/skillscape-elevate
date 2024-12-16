import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SkillsSectionProps {
  onContentSelect: (content: string) => void;
  selectedSkills: string[];
  onSkillSelect: (skillId: string) => void;
}

export const SkillsSection = ({
  onContentSelect,
  selectedSkills,
  onSkillSelect,
}: SkillsSectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });

  const { data: skills } = useQuery({
    queryKey: ['skills', selectedCategory],
    queryFn: async () => {
      let query = supabase
        .from('skills')
        .select(`
          id,
          titre,
          resume,
          description,
          category_id,
          categories (
            name
          )
        `)
        .order('titre');

      if (selectedCategory !== "all") {
        query = query.eq('category_id', selectedCategory);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const { data: userSkills } = useQuery({
    queryKey: ['userSkills'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_skills')
        .select('skill_id')
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data.map(s => s.skill_id);
    },
  });

  const getSkillContent = (skill: any) => {
    return `${skill.titre}. ${skill.resume}. ${skill.description}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compétences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select
          value={selectedCategory}
          onValueChange={setSelectedCategory}
        >
          <SelectTrigger>
            <SelectValue placeholder="Catégorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les catégories</SelectItem>
            {categories?.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <ScrollArea className="h-[300px] rounded-md border p-4">
          <div className="space-y-2">
            {skills?.map((skill) => (
              <div key={skill.id} className="flex items-center gap-2">
                <Checkbox
                  checked={selectedSkills.includes(skill.id)}
                  onCheckedChange={() => onSkillSelect(skill.id)}
                />
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left font-normal"
                  onClick={() => onContentSelect(getSkillContent(skill))}
                >
                  {skill.titre}
                  {userSkills?.includes(skill.id) && (
                    <Badge variant="secondary" className="ml-2">
                      En cours
                    </Badge>
                  )}
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};