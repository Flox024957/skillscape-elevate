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
import { motion, AnimatePresence } from "framer-motion";
import { Users, Image, BookOpen, Activity, MessageSquare } from "lucide-react";

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
            <Tabs defaultValue="posts" className="w-full">
              <TabsList className="w-full justify-start mb-6 glass-panel">
                <TabsTrigger value="posts" className="flex items-center gap-2 data-[state=active]:bg-primary/20">
                  <Activity className="h-4 w-4" />
                  Publications
                </TabsTrigger>
                <TabsTrigger value="media" className="flex items-center gap-2 data-[state=active]:bg-primary/20">
                  <Image className="h-4 w-4" />
                  Médias
                </TabsTrigger>
                <TabsTrigger value="friends" className="flex items-center gap-2 data-[state=active]:bg-primary/20">
                  <Users className="h-4 w-4" />
                  Amis
                </TabsTrigger>
                <TabsTrigger value="experience" className="flex items-center gap-2 data-[state=active]:bg-primary/20">
                  <BookOpen className="h-4 w-4" />
                  Expérience
                </TabsTrigger>
                <TabsTrigger value="messages" className="flex items-center gap-2 data-[state=active]:bg-primary/20">
                  <MessageSquare className="h-4 w-4" />
                  Messages
                </TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                <TabsContent value="posts" className="space-y-6">
                  {isOwnProfile && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <Card className="glass-panel border-primary/20">
                        <CardContent className="pt-6">
                          <CreatePost userId={userId as string} />
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                  <NewsFeed userId={userId as string} profileFeed={true} />
                </TabsContent>

                <TabsContent value="media">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="glass-panel rounded-lg p-6"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold gradient-text">Galerie Média</h3>
                      <Badge variant="secondary" className="bg-primary/10">
                        Collection
                      </Badge>
                    </div>
                    <UserMediaGallery userId={userId as string} />
                  </motion.div>
                </TabsContent>

                <TabsContent value="friends">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="glass-panel rounded-lg p-6"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold gradient-text">Réseau</h3>
                      <Badge variant="secondary" className="bg-primary/10">
                        Connexions
                      </Badge>
                    </div>
                    <FriendsList userId={profile.id} variant="full" />
                  </motion.div>
                </TabsContent>

                <TabsContent value="experience">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="glass-panel rounded-lg p-6"
                  >
                    <ProfileExperienceEducation profile={profile} />
                  </motion.div>
                </TabsContent>

                <TabsContent value="messages">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="glass-panel rounded-lg p-6"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold gradient-text">Messages</h3>
                      <Badge variant="secondary" className="bg-primary/10">
                        Communication
                      </Badge>
                    </div>
                    {/* Intégration future du composant de messagerie */}
                    <p className="text-center text-muted-foreground">
                      La messagerie sera bientôt disponible
                    </p>
                  </motion.div>
                </TabsContent>
              </AnimatePresence>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}