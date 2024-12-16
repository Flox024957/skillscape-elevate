import { ScrollArea } from "@/components/ui/scroll-area";
import { CreateGroupDialog } from "../groups/CreateGroupDialog";
import { GroupList } from "../groups/GroupList";
import { EventsList } from "../events/EventsList";
import { CreateEventDialog } from "../events/CreateEventDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Calendar, Users, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import { motion } from "framer-motion";

const sidebarVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 }
};

export const RightSidebar = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();
  }, []);

  if (!user) return null;

  return (
    <motion.aside 
      className="hidden lg:flex flex-col w-80 min-h-screen bg-card/50 border-l border-border p-4 space-y-6 sticky top-16"
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Card className="glass-panel">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Groupes
            </CardTitle>
            <div className="flex items-center gap-2">
              <CreateGroupDialog>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Plus className="h-4 w-4" />
                </Button>
              </CreateGroupDialog>
              <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                <Link to="/groups/manage">
                  <Settings className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[300px] px-4">
              <GroupList />
            </ScrollArea>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Card className="glass-panel">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Événements
            </CardTitle>
            <div className="flex items-center gap-2">
              <CreateEventDialog userId={user.id}>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Plus className="h-4 w-4" />
                </Button>
              </CreateEventDialog>
              <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                <Link to="/events/manage">
                  <Settings className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[300px] px-4">
              <EventsList userId={user.id} />
            </ScrollArea>
          </CardContent>
        </Card>
      </motion.div>
    </motion.aside>
  );
};