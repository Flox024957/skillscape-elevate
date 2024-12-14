import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { MindMapNodeType } from "../types";

export const useMindMapNodes = () => {
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

  const addNode = () => {
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
      setNodes(prev => [...prev, newNode]);
      return newNode;
    }
  };

  const addChild = (parentId: string) => {
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
        
        setNodes(prev => prev.map(node => {
          if (node.id === parentId) {
            return {
              ...node,
              children: [...node.children, newChild]
            };
          }
          return node;
        }));
        
        return newChild;
      }
    }
  };

  const updateNode = (nodeId: string, content: string) => {
    setNodes(prev => prev.map(node => {
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
    }));
  };

  const deleteNode = (nodeId: string) => {
    setNodes(prev => prev.filter(node => node.id !== nodeId)
      .map(node => ({
        ...node,
        children: node.children.filter(child => child.id !== nodeId)
      }))
    );
  };

  return {
    nodes,
    addNode,
    addChild,
    updateNode,
    deleteNode
  };
};