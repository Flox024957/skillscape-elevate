import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Users, BookOpen } from "lucide-react";

interface ProfileStatsProps {
  friendsCount: number;
  skillsCount: number;
  achievementsCount: number;
}

export const ProfileStats = ({ friendsCount, skillsCount, achievementsCount }: ProfileStatsProps) => {
  const stats = [
    {
      label: "Amis",
      value: friendsCount,
      icon: Users,
    },
    {
      label: "Compétences",
      value: skillsCount,
      icon: BookOpen,
    },
    {
      label: "Réalisations",
      value: achievementsCount,
      icon: Trophy,
    },
  ];

  return (
    <Card className="mt-6">
      <CardContent className="grid grid-cols-3 gap-4 p-6">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="flex justify-center mb-2">
              <stat.icon className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};