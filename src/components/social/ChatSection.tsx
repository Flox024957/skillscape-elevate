import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";

interface ChatSectionProps {
  userId: string;
}

export const ChatSection = ({ userId }: ChatSectionProps) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    // TODO: Implement message sending
    setMessage('');
  };

  return (
    <div className="h-[600px] flex flex-col bg-card rounded-lg">
      <div className="p-4 border-b">
        <h2 className="font-semibold">Messages</h2>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {/* Message example */}
          <div className="flex gap-3">
            <Avatar className="h-8 w-8">
              <img src="/placeholder.svg" alt="User" />
            </Avatar>
            <div className="bg-muted p-3 rounded-lg max-w-[80%]">
              <p className="text-sm">Exemple de message</p>
            </div>
          </div>
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Écrivez votre message..."
            className="flex-1"
          />
          <Button onClick={handleSendMessage}>Envoyer</Button>
        </div>
      </div>
    </div>
  );
};