import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProfileInfoProps {
  fullName: string;
  email: string;
}

export const ProfileInfo = ({ fullName, email }: ProfileInfoProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div>
      <h2 className={cn(
        "font-semibold",
        "bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent",
        isMobile ? "text-base" : "text-xl"
      )}>
        {fullName}
      </h2>
      <p className="text-sm text-muted-foreground truncate max-w-[200px]">
        {email}
      </p>
    </div>
  );
};