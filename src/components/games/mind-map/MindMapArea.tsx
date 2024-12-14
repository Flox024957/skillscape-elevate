import { toast } from "sonner";
import { MindMapToolbar } from "./MindMapToolbar";
import { CollaborativeToolbar } from "./CollaborativeToolbar";
import { MindMapCollaborators } from "./MindMapCollaborators";
import { MindMapNodes } from "./MindMapNodes";
import { useMindMapNodes } from "./hooks/useMindMapNodes";
import { useMindMapHistory } from "@/hooks/use-mind-map-history";
import { useMindMapPersistence } from "@/hooks/use-mind-map-persistence";
import { useMindMapCollaboration } from "@/hooks/use-mind-map-collaboration";

export const MindMapArea = () => {
  const { 
    nodes, 
    addNode, 
    addChild, 
    updateNode, 
    deleteNode 
  } = useMindMapNodes();

  const { history, addToHistory, undo, redo } = useMindMapHistory("temp-id");
  const { mindMap, saveMindMap, updateMindMap } = useMindMapPersistence("temp-id");
  const { collaborators, activeUsers, addCollaborator, removeCollaborator } = useMindMapCollaboration("temp-id");

  const handleAddNode = () => {
    const newNode = addNode();
    if (newNode) {
      addToHistory({ type: 'ADD_NODE', payload: newNode });
      updateMindMap(nodes);
      toast.success("Nouvelle catégorie ajoutée !");
    }
  };

  const handleAddChild = (parentId: string) => {
    const newChild = addChild(parentId);
    if (newChild) {
      addToHistory({ type: 'ADD_NODE', payload: newChild });
      updateMindMap(nodes);
      toast.success("Nouvelle compétence ajoutée !");
    }
  };

  const handleUpdateNode = (nodeId: string, content: string) => {
    updateNode(nodeId, content);
    addToHistory({ type: 'UPDATE_NODE', payload: { id: nodeId, content } });
    updateMindMap(nodes);
  };

  const handleDeleteNode = (nodeId: string) => {
    deleteNode(nodeId);
    addToHistory({ type: 'DELETE_NODE', payload: { id: nodeId } });
    updateMindMap(nodes);
    toast.success("Élément supprimé !");
  };

  const handleSave = async () => {
    try {
      await saveMindMap("Ma carte mentale", nodes);
      toast.success("Carte mentale sauvegardée !");
    } catch (error) {
      toast.error("Erreur lors de la sauvegarde");
    }
  };

  return (
    <div className="min-h-[600px] bg-black/5 backdrop-blur-sm rounded-xl border border-white/10 p-8">
      <div className="flex items-center justify-between mb-6">
        <MindMapToolbar
          onAddNode={handleAddNode}
          onUndo={undo}
          onRedo={redo}
          canUndo={history.length > 0}
          canRedo={false}
        />
        
        <CollaborativeToolbar
          mindMapId="temp-id"
          onSave={handleSave}
          onUndo={undo}
          onRedo={redo}
          canUndo={history.length > 0}
          canRedo={false}
        />
      </div>

      <MindMapCollaborators
        collaborators={collaborators}
        activeUsers={activeUsers}
        onAddCollaborator={addCollaborator}
        onRemoveCollaborator={removeCollaborator}
      />
      
      <MindMapNodes
        nodes={nodes}
        onAddChild={handleAddChild}
        onUpdate={handleUpdateNode}
        onDelete={handleDeleteNode}
      />
    </div>
  );
};