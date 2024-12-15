import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreatePost } from "../CreatePost";
import { NewsFeed } from "../NewsFeed";
import { MediaGallery } from "./MediaGallery";
import { useParams } from "react-router-dom";

export const ProfileTabs = ({ isCurrentUser }: { isCurrentUser: boolean }) => {
  const { userId } = useParams();

  if (!userId) return null;

  return (
    <Tabs defaultValue="posts" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="posts" className="flex-1">Publications</TabsTrigger>
        <TabsTrigger value="media" className="flex-1">Médias</TabsTrigger>
      </TabsList>

      <TabsContent value="posts" className="space-y-4">
        {isCurrentUser && (
          <CreatePost userId={userId} />
        )}
        <NewsFeed userId={userId} profileFeed />
      </TabsContent>

      <TabsContent value="media">
        <MediaGallery userId={userId} />
      </TabsContent>
    </Tabs>
  );
};