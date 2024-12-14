import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Save, Download, Upload, Trash2 } from "lucide-react";
import { MindMapNode } from "./MindMapNode";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/components/ui/use-toast";

interface MindMapNode {
  id: string;
  content: string;
  parentId: string | null;
  color?: string;
}

const colors = [
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-green-500 to-emerald-500",
  "from-orange-500 to-red-500",
  "from-indigo-500 to-violet-500"
];

export const MindMapArea = () => {
  const [nodes, setNodes] = useState<MindMapNode[]>([
    { 
      id: "root", 
      content: "Idée principale", 
      parentId: null,
      color: "from-primary to-primary-foreground"
    },
  ]);
  const { toast } = useToast();

  const handleContentChange = (id: string, content: string) => {
    setNodes((prev) =>
      prev.map((node) => (node.id === id ? { ...node, content } : node))
    );
  };

  const handleAddChild = (parentId: string) => {
    const parentNode = nodes.find(node => node.id === parentId);
    const childrenCount = nodes.filter(node => node.parentId === parentId).length;
    const colorIndex = childrenCount % colors.length;
    
    const newNode: MindMapNode = {
      id: uuidv4(),
      content: "",
      parentId,
      color: parentNode?.parentId === null ? colors[colorIndex] : parentNode?.color
    };
    setNodes((prev) => [...prev, newNode]);
  };

  const handleDeleteNode = (id: string) => {
    setNodes((prev) => {
      const nodesToDelete = [id];
      let currentIds = [id];

      while (currentIds.length > 0) {
        const childNodes = prev.filter((node) =>
          currentIds.includes(node.parentId || "")
        );
        const childIds = childNodes.map((node) => node.id);
        nodesToDelete.push(...childIds);
        currentIds = childIds;
      }

      return prev.filter((node) => !nodesToDelete.includes(node.id));
    });
  };

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
          setNodes(importedNodes);
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
    setNodes([
      { 
        id: "root", 
        content: "Idée principale", 
        parentId: null,
        color: "from-primary to-primary-foreground"
      },
    ]);
    toast({
      title: "Réinitialisation",
      description: "La carte mentale a été réinitialisée",
    });
  };

  const renderNodes = (parentId: string | null = null, level = 0) => {
    const childNodes = nodes.filter((node) => node.parentId === parentId);

    return (
      <div
        className={`flex flex-col gap-4 ${
          parentId ? "ml-8 pl-4 border-l border-primary/20" : ""
        }`}
      >
        <AnimatePresence>
          {childNodes.map((node) => (
            <motion.div key={node.id}>
              <MindMapNode
                id={node.id}
                content={node.content}
                color={node.color}
                onContentChange={handleContentChange}
                onAddChild={handleAddChild}
                onDelete={handleDeleteNode}
                isRoot={!parentId}
              />
              {renderNodes(node.id, level + 1)}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Brain className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-primary">
                Mind Map Masters
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleReset} className="gap-2">
                <Trash2 className="w-4 h-4" />
                Réinitialiser
              </Button>
              <Button variant="outline" onClick={handleExport} className="gap-2">
                <Download className="w-4 h-4" />
                Exporter
              </Button>
              <Button variant="outline" className="gap-2" onClick={() => document.getElementById('import-file')?.click()}>
                <Upload className="w-4 h-4" />
                Importer
                <input
                  id="import-file"
                  type="file"
                  accept=".json"
                  className="hidden"
                  onChange={handleImport}
                />
              </Button>
              <Button variant="default" onClick={handleSave} className="gap-2">
                <Save className="w-4 h-4" />
                Sauvegarder
              </Button>
            </div>
          </div>

          <div className="min-h-[400px] p-4 bg-background/30 rounded-lg border border-primary/10">
            {renderNodes()}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};