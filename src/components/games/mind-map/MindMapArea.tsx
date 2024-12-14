import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { MindMapToolbar } from "./MindMapToolbar";
import { MindMapNodeList } from "./MindMapNodeList";
import { MindMapCollaborators } from "./MindMapCollaborators";
import { useMindMap } from "./useMindMap";
import { useMindMapPersistence } from "@/hooks/use-mind-map-persistence";
import { useMindMapCollaboration } from "@/hooks/use-mind-map-collaboration";
import { useMindMapHistory } from "@/hooks/use-mind-map-history";
import type { MindMapNodeType } from "./types";

interface MindMapAreaProps {
  id?: string;
}

export const MindMapArea = ({ id }: MindMapAreaProps) => {
  const { toast } = useToast();
  const {
    nodes,
    handleContentChange,
    handleAddChild,
    handleDeleteNode,
    resetNodes,
    setNodesData,
  } = useMindMap();

  const { mindMap, isLoading, saveMindMap } = useMindMapPersistence(id);
  const { collaborators, activeUsers, addCollaborator, removeCollaborator } = useMindMapCollaboration(id || '');
  const { addToHistory, undo, redo } = useMindMapHistory(id || '');

  const [title, setTitle] = useState("Nouvelle carte mentale");

  useEffect(() => {
    if (mindMap) {
      setTitle(mindMap.title);
      setNodesData(mindMap.data);
    }
  }, [mindMap]);

  const handleSave = async () => {
    await saveMindMap(title, nodes);
    addToHistory({
      type: 'UPDATE_NODE',
      payload: { nodes }
    });
  };

  const handleExport = () => {
    const dataStr = JSON.stringify({ title, nodes }, null, 2);
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = "mind-map.json";

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Export réussi",
      description: "Votre carte mentale a été exportée au format JSON",
    });
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target?.result as string);
          setTitle(importedData.title);
          setNodesData(importedData.nodes);
          toast({
            title: "Import réussi",
            description: "Votre carte mentale a été importée avec succès",
          });
        } catch (error) {
          toast({
            title: "Erreur d'import",
            description: "Le fichier sélectionné n'est pas valide",
            variant: "destructive",
          });
        }
      };
      reader.readAsText(file);
    }
  };

  const handleReset = () => {
    resetNodes();
    setTitle("Nouvelle carte mentale");
    toast({
      title: "Réinitialisation",
      description: "La carte mentale a été réinitialisée",
    });
  };

  const handleUndo = () => {
    const previousState = undo();
    if (previousState) {
      setNodesData(previousState.data.nodes);
    }
  };

  const handleRedo = () => {
    const nextState = redo();
    if (nextState) {
      setNodesData(nextState.data.nodes);
    }
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-8"
    >
      <Card className="p-6 bg-background/50 backdrop-blur-sm border-2 border-primary/20">
        <div className="space-y-6">
          <MindMapToolbar
            title={title}
            onTitleChange={setTitle}
            onSave={handleSave}
            onExport={handleExport}
            onImport={handleImport}
            onReset={handleReset}
            onUndo={handleUndo}
            onRedo={handleRedo}
          />

          {id && (
            <MindMapCollaborators
              collaborators={collaborators}
              activeUsers={activeUsers}
              onAddCollaborator={addCollaborator}
              onRemoveCollaborator={removeCollaborator}
            />
          )}

          <div className="min-h-[400px] p-4 bg-background/30 rounded-lg border border-primary/10">
            <MindMapNodeList
              nodes={nodes}
              onContentChange={handleContentChange}
              onAddChild={handleAddChild}
              onDeleteNode={handleDeleteNode}
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};