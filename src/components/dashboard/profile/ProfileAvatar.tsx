import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProfileAvatarProps {
  avatarUrl?: string;
  email?: string;
}

export const ProfileAvatar = ({ avatarUrl, email }: ProfileAvatarProps) => {
  const isMobile = useIsMobile();
  
  return (
    <Avatar className={cn(
      "ring-2 ring-primary/20 ring-offset-2 ring-offset-background",
      "transform hover:scale-105 transition-all duration-300",
      isMobile ? "h-14 w-14" : "h-16 w-16"
    )}>
      <AvatarImage src={avatarUrl} />
      <AvatarFallback>{email?.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};