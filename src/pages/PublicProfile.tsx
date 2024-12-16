import { useParams } from "react-router-dom";
import { useProfileData } from "@/hooks/useProfileData";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FriendsList } from "@/components/social/FriendsList";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileExperienceEducation } from "@/components/profile/ProfileExperienceEducation";
import { ProfileSidebar } from "@/components/profile/ProfileSidebar";
import { NewsFeed } from "@/components/social/NewsFeed";
import { CreatePost } from "@/components/social/CreatePost";
import { FriendshipButton } from "@/components/profile/FriendshipButton";
import { UserMediaGallery } from "@/components/profile/UserMediaGallery";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Users, Image, BookOpen, Activity } from "lucide-react";

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
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Profil non trouvé</h1>
          <p className="text-muted-foreground">
            Le profil que vous recherchez n'existe pas.
          </p>
        </div>
      </div>
    );
  }

  const isOwnProfile = currentUser === userId;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background/50 backdrop-blur-sm"
    >
      <div className="container mx-auto p-4 space-y-6">
        <div className="relative z-10">
          <ProfileHeader profile={profile} />
          {!isOwnProfile && currentUser && (
            <div className="absolute top-4 right-4">
              <FriendshipButton 
                currentUserId={currentUser} 
                targetUserId={userId as string} 
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <ProfileSidebar profile={profile} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="posts" className="w-full">
              <TabsList className="w-full justify-start mb-6 bg-background/50 backdrop-blur-sm">
                <TabsTrigger value="posts" className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Publications
                </TabsTrigger>
                <TabsTrigger value="media" className="flex items-center gap-2">
                  <Image className="h-4 w-4" />
                  Médias
                </TabsTrigger>
                <TabsTrigger value="friends" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Amis
                </TabsTrigger>
                <TabsTrigger value="experience" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Expérience
                </TabsTrigger>
              </TabsList>

              <TabsContent value="posts" className="space-y-6">
                {isOwnProfile && (
                  <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
                    <CardContent className="pt-6">
                      <CreatePost userId={userId as string} />
                    </CardContent>
                  </Card>
                )}
                <NewsFeed userId={userId as string} profileFeed={true} />
              </TabsContent>

              <TabsContent value="media">
                <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Médias partagés</h3>
                      <Badge variant="secondary" className="bg-primary/10">
                        Galerie
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <UserMediaGallery userId={userId as string} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="friends">
                <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Amis</h3>
                      <Badge variant="secondary" className="bg-primary/10">
                        Réseau
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <FriendsList userId={profile.id} variant="full" />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="experience">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <ProfileExperienceEducation profile={profile} />
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </motion.div>
  );
}