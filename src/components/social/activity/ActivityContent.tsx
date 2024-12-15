import { Badge } from "@/components/ui/badge";
import { ActivityIcon } from "./ActivityIcon";

interface ActivityContentProps {
  activity: {
    type: string;
    postContent?: string;
    content?: string;
    status?: string;
  };
}

export const ActivityContent = ({ activity }: ActivityContentProps) => {
  switch (activity.type) {
    case 'like':
      return (
        <span>
          a aimé votre publication
          <span className="block text-xs text-muted-foreground mt-1 italic">
            "{activity.postContent?.substring(0, 50)}..."
          </span>
        </span>
      );
    case 'comment':
      return (
        <span>
          a commenté : 
          <span className="block text-xs text-muted-foreground mt-1 italic">
            "{activity.content?.substring(0, 50)}..."
          </span>
        </span>
      );
    case 'friendship':
      return (
        <span>
          {activity.status === 'accepted' 
            ? 'est maintenant votre ami(e)' 
            : 'vous a envoyé une demande d\'ami'}
          <Badge 
            variant={activity.status === 'accepted' ? "success" : "secondary"}
            className="ml-2"
          >
            {activity.status === 'accepted' ? 'Acceptée' : 'En attente'}
          </Badge>
        </span>
      );
    default:
      return null;
  }
};