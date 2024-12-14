import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import type { Skill } from "@/types/skills";
import type { Json } from "@/integrations/supabase/types";
import { motion } from "framer-motion";
import { Trophy, Save } from "lucide-react";

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
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      setIsSaving(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast({
          title: "Erreur",
          description: "Vous devez être connecté pour sauvegarder une structure.",
          variant: "destructive",
        });
        return;
      }

      // Convert skills to a format compatible with Supabase's Json type
      const skillsForStorage = skills.map(skill => ({
        id: skill.id,
        titre: skill.titre,
        resume: skill.resume,
        description: skill.description,
        action_concrete: skill.action_concrete,
        exemples: skill.exemples,
        category_id: skill.category_id,
        category: skill.categories ? {
          id: skill.categories.id,
          name: skill.categories.name,
          description: skill.categories.description
        } : null
      }));

      const { error } = await supabase
        .from('skill_builder_structures')
        .insert({
          name: structureName,
          user_id: user.id,
          skills: skillsForStorage as unknown as Json[],
          score: score,
        });

      if (error) throw error;

      toast({
        title: "Structure sauvegardée !",
        description: `Votre structure "${structureName}" a été sauvegardée avec succès.`,
      });

      // Navigate to dashboard after successful save
      navigate("/dashboard", { 
        state: { 
          savedStructure: true,
          structureName,
          score 
        } 
      });
    } catch (error) {
      console.error("Error saving structure:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            Sauvegarder votre structure
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Label htmlFor="structureName">Nom de la structure</Label>
              <Input
                id="structureName"
                value={structureName}
                onChange={(e) => setStructureName(e.target.value)}
                placeholder="Ma structure de compétences"
                className="mt-1"
              />
            </div>
            <div className="text-right">
              <Label>Score</Label>
              <div className="text-2xl font-bold text-primary mt-1">{score}</div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Compétences incluses</Label>
            <motion.div 
              className="space-y-2 max-h-48 overflow-y-auto pr-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-2 bg-muted/50 rounded-lg text-sm"
                >
                  {skill.titre}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-4">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={!structureName || isSaving}
            className="bg-gradient-to-r from-primary to-primary-foreground hover:opacity-90"
          >
            {isSaving ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Save className="w-4 h-4 mr-2" />
              </motion.div>
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Sauvegarder
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};