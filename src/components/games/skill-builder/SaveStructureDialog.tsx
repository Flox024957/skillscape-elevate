import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trophy, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Skill } from "@/types/skills";
import type { Json } from "@/integrations/supabase/types";

interface SaveStructureDialogProps {
  isOpen: boolean;
  onClose: () => void;
  skills: Skill[];
  score: number;
}

export const SaveStructureDialog = ({
  isOpen,
  onClose,
  skills,
  score,
}: SaveStructureDialogProps) => {
  const [structureName, setStructureName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    if (!structureName.trim()) {
      toast({
        title: "Nom requis",
        description: "Veuillez donner un nom à votre structure",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSaving(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast({
          title: "Non connecté",
          description: "Vous devez être connecté pour sauvegarder une structure",
          variant: "destructive",
        });
        return;
      }

      // Convert skills array to a format compatible with Supabase's Json type
      const skillsForStorage = skills.map(skill => ({
        id: skill.id,
        titre: skill.titre,
        resume: skill.resume,
        description: skill.description,
        action_concrete: skill.action_concrete,
        exemples: skill.exemples,
        category_id: skill.category_id,
        // Convert the categories object to a simple format that matches Json type
        categories: skill.categories ? {
          id: skill.categories.id,
          name: skill.categories.name,
          description: skill.categories.description
        } : null
      })) as unknown as Json[];

      const { error } = await supabase
        .from('skill_builder_structures')
        .insert({
          name: structureName,
          user_id: user.id,
          skills: skillsForStorage,
          score: score,
        });

      if (error) throw error;

      toast({
        title: "Structure sauvegardée !",
        description: `"${structureName}" a été sauvegardée avec succès.`,
      });

      onClose();
    } catch (error) {
      console.error("Error saving structure:", error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder la structure. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Trophy className="w-6 h-6 text-primary" />
            Sauvegarder la Structure
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex items-center gap-4 p-4 bg-primary/10 rounded-lg">
            <Trophy className="w-8 h-8 text-primary" />
            <div>
              <p className="text-sm font-medium">Score Final</p>
              <p className="text-2xl font-bold text-primary">{score} points</p>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="structureName" className="text-sm font-medium">
              Nom de la Structure
            </label>
            <Input
              id="structureName"
              value={structureName}
              onChange={(e) => setStructureName(e.target.value)}
              placeholder="Ma super structure"
              className="w-full"
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={onClose} disabled={isSaving}>
              Annuler
            </Button>
            <Button onClick={handleSave} disabled={isSaving} className="gap-2">
              <Save className="w-4 h-4" />
              {isSaving ? "Sauvegarde..." : "Sauvegarder"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};