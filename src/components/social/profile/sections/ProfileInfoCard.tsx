import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ProfileInfoCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  link?: boolean;
}

export const ProfileInfoCard = ({ icon: Icon, title, value, link }: ProfileInfoCardProps) => {
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-5 w-5 text-primary" />
      <div>
        <h3 className="font-medium">{title}</h3>
        {link ? (
          <a 
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {value}
          </a>
        ) : (
          <p className="text-muted-foreground">{value}</p>
        )}
      </div>
    </div>
  );
};