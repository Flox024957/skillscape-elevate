import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AudioPlayer from "@/components/dashboard/AudioPlayer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Mic, List, Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

const AudioTab = () => {
  const [selectedContent, setSelectedContent] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

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

  const handleContentSelect = (content: string) => {
    setSelectedContent(content);
  };

  const toggleSkillSelection = (skillId: string) => {
    setSelectedSkills(prev => 
      prev.includes(skillId)
        ? prev.filter(id => id !== skillId)
        : [...prev, skillId]
    );
  };

  const getSkillContent = (skill: any) => {
    return `${skill.titre}. ${skill.resume}. ${skill.description}`;
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const handlePlaySelected = () => {
    if (selectedSkills.length === 0) return;
    const selectedSkill = skills?.find(s => s.id === selectedSkills[0]);
    if (selectedSkill) {
      handleContentSelect(getSkillContent(selectedSkill));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Lecteur Audio</span>
          <Button 
            variant={isRecording ? "destructive" : "outline"}
            size="sm"
            onClick={toggleRecording}
          >
            <Mic className="w-4 h-4 mr-2" />
            {isRecording ? "Arrêter" : "Enregistrer"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="skills" className="space-y-4">
          <TabsList>
            <TabsTrigger value="skills" className="flex items-center gap-2">
              <List className="w-4 h-4" />
              Compétences
            </TabsTrigger>
            <TabsTrigger value="filters" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filtres
            </TabsTrigger>
          </TabsList>

          <TabsContent value="skills" className="space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[200px]">
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
            </div>

            <ScrollArea className="h-[300px] rounded-md border p-4">
              <div className="space-y-2">
                {skills?.map((skill) => (
                  <div key={skill.id} className="flex items-center gap-2">
                    <Checkbox
                      checked={selectedSkills.includes(skill.id)}
                      onCheckedChange={() => toggleSkillSelection(skill.id)}
                    />
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left font-normal"
                      onClick={() => handleContentSelect(getSkillContent(skill))}
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

            <div className="flex gap-2">
              <Button
                onClick={handlePlaySelected}
                disabled={selectedSkills.length === 0}
                className="w-full"
              >
                Lire la sélection
              </Button>
            </div>

            <AudioPlayer 
              selectedContent={selectedContent}
              userSkills={skills?.filter(s => userSkills?.includes(s.id))}
              onContentSelect={handleContentSelect}
            />
          </TabsContent>

          <TabsContent value="filters" className="min-h-[300px]">
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Options de lecture</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox id="userSkills" />
                    <label htmlFor="userSkills" className="text-sm">
                      Uniquement mes compétences
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="mastered" />
                    <label htmlFor="mastered" className="text-sm">
                      Inclure les compétences maîtrisées
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AudioTab;