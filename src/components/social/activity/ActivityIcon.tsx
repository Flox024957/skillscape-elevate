import { Heart, MessageCircle, UserPlus } from "lucide-react";

interface ActivityIconProps {
  type: string;
}

export const ActivityIcon = ({ type }: ActivityIconProps) => {
  switch (type) {
    case 'like':
      return <Heart className="h-4 w-4 text-red-500" />;
    case 'comment':
      return <MessageCircle className="h-4 w-4 text-blue-500" />;
    case 'friendship':
      return <UserPlus className="h-4 w-4 text-green-500" />;
    default:
      return null;
  }
};