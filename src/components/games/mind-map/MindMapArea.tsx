import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { MindMapToolbar } from "./MindMapToolbar";
import { MindMapNodeList } from "./MindMapNodeList";
import { useMindMap } from "./useMindMap";

export const MindMapArea = () => {
  const { toast } = useToast();
  const {
    nodes,
    handleContentChange,
    handleAddChild,
    handleDeleteNode,
    resetNodes,
    setNodesData,
  } = useMindMap();

  const handleSave = () => {
    const mindMapData = JSON.stringify(nodes);
    localStorage.setItem("mindMap", mindMapData);
    toast({
      title: "Carte mentale sauvegardée",
      description: "Votre carte mentale a été sauvegardée localement",
    });
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(nodes, null, 2);
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
          const importedNodes = JSON.parse(e.target?.result as string);
          setNodesData(importedNodes);
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
    toast({
      title: "Réinitialisation",
      description: "La carte mentale a été réinitialisée",
    });
  };

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
            onSave={handleSave}
            onExport={handleExport}
            onImport={handleImport}
            onReset={handleReset}
          />

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