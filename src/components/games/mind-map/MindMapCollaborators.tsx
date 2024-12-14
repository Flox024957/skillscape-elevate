import { useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, Plus, X } from 'lucide-react';
import type { MindMapCollaborator } from '@/types/mind-map';

interface MindMapCollaboratorsProps {
  collaborators: MindMapCollaborator[];
  activeUsers: Set<string>;
  onAddCollaborator: (userId: string, role: 'viewer' | 'editor') => void;
  onRemoveCollaborator: (userId: string) => void;
}

export const MindMapCollaborators = ({
  collaborators,
  activeUsers,
  onAddCollaborator,
  onRemoveCollaborator
}: MindMapCollaboratorsProps) => {
  const [newCollaboratorId, setNewCollaboratorId] = useState('');

  const handleAddCollaborator = () => {
    if (newCollaboratorId) {
      onAddCollaborator(newCollaboratorId, 'viewer');
      setNewCollaboratorId('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-2">
        <Users className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Collaborateurs</h3>
      </div>

      <div className="flex items-center gap-2">
        <Input
          value={newCollaboratorId}
          onChange={(e) => setNewCollaboratorId(e.target.value)}
          placeholder="ID de l'utilisateur"
          className="flex-1"
        />
        <Button onClick={handleAddCollaborator} size="icon">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {collaborators.map((collaborator) => (
          <motion.div
            key={collaborator.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-2 bg-background/50 backdrop-blur-sm rounded-full px-3 py-1.5"
          >
            <Avatar className="w-6 h-6">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${collaborator.user_id}`} />
              <AvatarFallback>
                {collaborator.user_id.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm">
              {collaborator.user_id.slice(0, 8)}...
            </span>
            <div className={`w-2 h-2 rounded-full ${
              activeUsers.has(collaborator.user_id) ? 'bg-green-500' : 'bg-gray-300'
            }`} />
            <Button
              variant="ghost"
              size="icon"
              className="w-6 h-6"
              onClick={() => onRemoveCollaborator(collaborator.user_id)}
            >
              <X className="w-4 h-4" />
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};