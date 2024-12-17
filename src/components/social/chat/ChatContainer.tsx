import { Message } from '@/integrations/supabase/types/messages';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { motion } from "framer-motion";
import { ArrowLeft, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ChatContainerProps {
  selectedFriend: string | null;
  messages: Message[];
  currentUserId: string;
  friendName?: string | null;
  onSendMessage: (content: string) => void;
  onBack?: () => void;
  isError?: boolean;
}

export const ChatContainer = ({
  selectedFriend,
  messages,
  currentUserId,
  friendName,
  onSendMessage,
  onBack,
  isError
}: ChatContainerProps) => {
  const isMobile = useIsMobile();

  const renderHeader = () => (
    <div className="p-3 border-b border-border/50 flex items-center gap-2 sticky top-0 bg-background/80 backdrop-blur-sm z-10">
      {isMobile && onBack && (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
      )}
      <h2 className="font-semibold neon-text">{friendName}</h2>
    </div>
  );

  const renderConnectionError = () => (
    <Alert variant="destructive" className="m-4">
      <WifiOff className="h-4 w-4" />
      <AlertDescription>
        Le serveur est temporairement indisponible. Veuillez patienter ou rafraîchir la page.
      </AlertDescription>
    </Alert>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "glass-panel flex flex-col h-full relative",
        isMobile && "w-full"
      )}
    >
      {selectedFriend ? (
        <>
          {renderHeader()}
          {isError && renderConnectionError()}
          <MessageList messages={messages} currentUserId={currentUserId} />
          <MessageInput onSend={onSendMessage} disabled={isError} />
        </>
      ) : (
        <div className="h-full flex items-center justify-center text-muted-foreground">
          Sélectionnez une conversation
        </div>
      )}
    </motion.div>
  );
};