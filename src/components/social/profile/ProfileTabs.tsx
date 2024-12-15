import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreatePost } from "../CreatePost";
import { NewsFeed } from "../NewsFeed";
import { MediaGallery } from "./MediaGallery";
import { useParams } from "react-router-dom";
import { FileText, Image, Video, FileArchive } from "lucide-react";

export const ProfileTabs = ({ isCurrentUser }: { isCurrentUser: boolean }) => {
  const { userId } = useParams();

  if (!userId) return null;

  return (
    <Tabs defaultValue="posts" className="w-full">
      <TabsList className="w-full grid grid-cols-4 gap-4">
        <TabsTrigger value="posts" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Publications
        </TabsTrigger>
        <TabsTrigger value="images" className="flex items-center gap-2">
          <Image className="h-4 w-4" />
          Images
        </TabsTrigger>
        <TabsTrigger value="videos" className="flex items-center gap-2">
          <Video className="h-4 w-4" />
          Vidéos
        </TabsTrigger>
        <TabsTrigger value="files" className="flex items-center gap-2">
          <FileArchive className="h-4 w-4" />
          Fichiers
        </TabsTrigger>
      </TabsList>

      <TabsContent value="posts" className="space-y-4">
        {isCurrentUser && (
          <CreatePost userId={userId} />
        )}
        <NewsFeed userId={userId} profileFeed />
      </TabsContent>

      <TabsContent value="images">
        <MediaGallery userId={userId} type="image" />
      </TabsContent>

      <TabsContent value="videos">
        <MediaGallery userId={userId} type="video" />
      </TabsContent>

      <TabsContent value="files">
        <MediaGallery userId={userId} type="file" />
      </TabsContent>
    </Tabs>
  );
};