import { useParams } from "react-router-dom";
import { useProfileData } from "@/hooks/useProfileData";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileSidebar } from "@/components/profile/ProfileSidebar";
import { FriendshipButton } from "@/components/profile/FriendshipButton";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ProfileTabs } from "@/components/profile/ProfileTabs";

export default function PublicProfile() {
  const { userId } = useParams();
  const { data: profile, isLoading } = useProfileData(userId as string);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUser(user.id);
      }
    };
    getCurrentUser();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-48 bg-muted rounded-lg"></div>
          <div className="h-32 bg-muted rounded-lg"></div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <div className="h-64 bg-muted rounded-lg"></div>
            </div>
            <div className="lg:col-span-3">
              <div className="h-96 bg-muted rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto p-4"
      >
        <Card className="max-w-lg mx-auto text-center p-8">
          <CardHeader>
            <h1 className="text-2xl font-bold text-primary">Profil non trouvé</h1>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Le profil que vous recherchez n'existe pas ou n'est plus disponible.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  const isOwnProfile = currentUser === userId;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-background to-background/80"
    >
      <div className="container mx-auto p-4 space-y-6">
        <div className="relative z-10">
          <ProfileHeader profile={profile} />
          {!isOwnProfile && currentUser && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-4 right-4 glass-panel p-2 rounded-lg"
            >
              <FriendshipButton 
                currentUserId={currentUser} 
                targetUserId={userId as string} 
              />
            </motion.div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 space-y-6"
          >
            <ProfileSidebar profile={profile} />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <ProfileTabs 
              userId={userId as string} 
              isOwnProfile={isOwnProfile} 
              profile={profile}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}