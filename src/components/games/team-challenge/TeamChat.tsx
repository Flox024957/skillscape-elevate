import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TeamChatProps {
  sessionId: string;
  teamNumber: number;
  currentUserId: string;
}

interface ChatMessage {
  id: string;
  content: string;
  created_at: string;
  profiles?: {
    pseudo: string | null;
    image_profile: string | null;
  } | null;
}

export const TeamChat = ({ sessionId, teamNumber, currentUserId }: TeamChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Fetch existing messages
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("team_chat_messages")
        .select(`
          id,
          content,
          created_at,
          profiles (
            pseudo,
            image_profile
          )
        `)
        .eq("session_id", sessionId)
        .eq("team_number", teamNumber)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching messages:", error);
        return;
      }

      setMessages(data);
    };

    fetchMessages();

    // Subscribe to new messages
    const channel = supabase
      .channel("team_chat")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "team_chat_messages",
          filter: `session_id=eq.${sessionId} AND team_number=eq.${teamNumber}`,
        },
        async (payload: any) => {
          const { data: profileData } = await supabase
            .from("profiles")
            .select("pseudo, image_profile")
            .eq("id", payload.new.user_id)
            .single();

          const newMessage = {
            ...payload.new,
            profiles: profileData,
          };

          setMessages((prev) => [...prev, newMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId, teamNumber]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const { error } = await supabase.from("team_chat_messages").insert([
      {
        session_id: sessionId,
        team_number: teamNumber,
        content: newMessage.trim(),
        user_id: currentUserId,
      },
    ]);

    if (error) {
      console.error("Error sending message:", error);
      return;
    }

    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-[400px] bg-card rounded-lg border p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Chat Équipe {teamNumber}</h3>
      </div>

      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-2 ${
                message.profiles?.pseudo === currentUserId ? "flex-row-reverse" : ""
              }`}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={message.profiles?.image_profile || undefined}
                  alt={message.profiles?.pseudo || "User"}
                />
                <AvatarFallback>
                  {message.profiles?.pseudo?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div
                className={`px-3 py-2 rounded-lg max-w-[70%] ${
                  message.profiles?.pseudo === currentUserId
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="flex gap-2 mt-4">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Écrivez votre message..."
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button onClick={sendMessage}>Envoyer</Button>
      </div>
    </div>
  );
};