import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { MindMapNode } from "./MindMapNode";
import { MindMapToolbar } from "./MindMapToolbar";
import { CollaborativeToolbar } from "./CollaborativeToolbar";
import { MindMapCollaborators } from "./MindMapCollaborators";
import { useMindMapHistory } from "@/hooks/use-mind-map-history";
import { useMindMapPersistence } from "@/hooks/use-mind-map-persistence";
import { useMindMapCollaboration } from "@/hooks/use-mind-map-collaboration";
import type { MindMapNodeType } from "./types";

export const MindMapArea = () => {
  const [nodes, setNodes] = useState<MindMapNodeType[]>([]);
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select(`
          id,
          name,
          description,
          skills (
            id,
            titre,
            resume,
            description,
            action_concrete
          )
        `);
      
      if (error) throw error;
      return data;
    },
  });

  // Hooks pour la collaboration et la persistence
  const { history, addToHistory, undo, redo } = useMindMapHistory("temp-id");
  const { mindMap, saveMindMap, updateMindMap } = useMindMapPersistence("temp-id");
  const { collaborators, activeUsers, addCollaborator, removeCollaborator } = useMindMapCollaboration("temp-id");

  useEffect(() => {
    if (categories && categories.length > 0) {
      const rootNode: MindMapNodeType = {
        id: categories[0].id,
        content: categories[0].name,
        parentId: null,
        color: "from-purple-500 to-blue-500",
        children: categories[0].skills.map((skill: any) => ({
          id: skill.id,
          content: skill.titre,
          parentId: categories[0].id,
          color: "from-blue-400 to-cyan-400",
          children: []
        }))
      };
      setNodes([rootNode]);
    }
  }, [categories]);

  const handleAddNode = () => {
    if (categories && categories.length > 0) {
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      const newNode: MindMapNodeType = {
        id: randomCategory.id,
        content: randomCategory.name,
        parentId: null,
        color: "from-purple-500 to-blue-500",
        children: randomCategory.skills.map((skill: any) => ({
          id: skill.id,
          content: skill.titre,
          parentId: randomCategory.id,
          color: "from-blue-400 to-cyan-400",
          children: []
        }))
      };
      setNodes([...nodes, newNode]);
      addToHistory({ type: 'ADD_NODE', payload: newNode });
      updateMindMap(nodes);
      toast.success("Nouvelle catégorie ajoutée !");
    }
  };

  const handleAddChild = (parentId: string) => {
    const parentNode = nodes.find(n => n.id === parentId);
    if (parentNode && categories) {
      const category = categories.find(c => c.id === parentId);
      if (category && category.skills.length > 0) {
        const randomSkill = category.skills[Math.floor(Math.random() * category.skills.length)];
        const newChild: MindMapNodeType = {
          id: randomSkill.id,
          content: randomSkill.titre,
          parentId: parentId,
          color: "from-blue-400 to-cyan-400",
          children: []
        };
        const updatedNodes = nodes.map(node => {
          if (node.id === parentId) {
            return {
              ...node,
              children: [...node.children, newChild]
            };
          }
          return node;
        });
        setNodes(updatedNodes);
        addToHistory({ type: 'ADD_NODE', payload: newChild });
        updateMindMap(updatedNodes);
        toast.success("Nouvelle compétence ajoutée !");
      }
    }
  };

  const handleUpdateNode = (nodeId: string, content: string) => {
    const updatedNodes = nodes.map(node => {
      if (node.id === nodeId) {
        return { ...node, content };
      }
      if (node.children.some(child => child.id === nodeId)) {
        return {
          ...node,
          children: node.children.map(child => 
            child.id === nodeId ? { ...child, content } : child
          )
        };
      }
      return node;
    });
    setNodes(updatedNodes);
    addToHistory({ type: 'UPDATE_NODE', payload: { id: nodeId, content } });
    updateMindMap(updatedNodes);
  };

  const handleDeleteNode = (nodeId: string) => {
    const updatedNodes = nodes.filter(node => node.id !== nodeId)
      .map(node => ({
        ...node,
        children: node.children.filter(child => child.id !== nodeId)
      }));
    setNodes(updatedNodes);
    addToHistory({ type: 'DELETE_NODE', payload: { id: nodeId } });
    updateMindMap(updatedNodes);
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
      
      <div className="mt-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-50 pointer-events-none" />
        <div className="relative z-10">
          {nodes.map(node => (
            <MindMapNode
              key={node.id}
              node={node}
              nodes={nodes}
              onAddChild={handleAddChild}
              onUpdate={handleUpdateNode}
              onDelete={handleDeleteNode}
            />
          ))}
        </div>
      </div>
    </div>
  );
};