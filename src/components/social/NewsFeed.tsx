import { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { MessageSquare, Heart } from "lucide-react";

interface Post {
  id: string;
  content: string;
  created_at: string;
  profiles: {
    pseudo: string;
    image_profile: string;
  };
  likes: number;
  comments: number;
  user_has_liked: boolean;
}

interface NewsFeedProps {
  userId: string;
}

export const NewsFeed = ({ userId }: NewsFeedProps) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles (
            pseudo,
            image_profile
          ),
          likes: post_likes(count),
          comments: post_comments(count),
          user_has_liked: post_likes!inner(user_id)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
        return;
      }

      setPosts(data || []);
    };

    fetchPosts();
  }, []);

  const handleLike = async (postId: string) => {
    const { error } = await supabase
      .from('post_likes')
      .insert([{ post_id: postId, user_id: userId }]);

    if (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader className="flex flex-row items-center gap-3">
            <Avatar className="h-10 w-10">
              <img src={post.profiles.image_profile || '/placeholder.svg'} alt={post.profiles.pseudo} />
            </Avatar>
            <div>
              <h3 className="font-semibold">{post.profiles.pseudo}</h3>
              <p className="text-sm text-muted-foreground">
                {new Date(post.created_at).toLocaleDateString()}
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <p>{post.content}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleLike(post.id)}
              className={post.user_has_liked ? "text-primary" : ""}
            >
              <Heart className="w-4 h-4 mr-2" />
              {post.likes}
            </Button>
            <Button variant="ghost" size="sm">
              <MessageSquare className="w-4 h-4 mr-2" />
              {post.comments}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};