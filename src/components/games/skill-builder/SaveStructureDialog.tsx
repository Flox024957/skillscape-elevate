import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Skill } from "@/types/skills";

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

    setIsSaving(true);
    try {
      const { error } = await supabase.from("skill_builder_structures").insert({
        name: structureName,
        skills: skills,
        score: score,
      });

      if (error) throw error;

      toast({
        title: "Structure sauvegardée !",
        description: "Votre structure a été sauvegardée avec succès.",
      });
      onClose();
    } catch (error) {
      console.error("Error saving structure:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sauvegarder la structure</DialogTitle>
          <DialogDescription>
            Donnez un nom à votre structure pour la sauvegarder
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nom
            </Label>
            <Input
              id="name"
              value={structureName}
              onChange={(e) => setStructureName(e.target.value)}
              className="col-span-3"
              placeholder="Ma structure de compétences"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Score</Label>
            <div className="col-span-3">
              <span className="text-2xl font-bold text-primary">{score}</span>
              <span className="text-muted-foreground ml-2">points</span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Sauvegarde..." : "Sauvegarder"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};