import { motion } from "framer-motion";
import { Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MindMapArea } from "@/components/games/mind-map/MindMapArea";

export default function MindMapPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 pt-24">
      <div className="container mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto space-y-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2,
                }}
              >
                <Brain className="w-12 h-12 text-primary animate-pulse" />
              </motion.div>
              <div>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-primary-foreground">
                  Mind Map Masters
                </h1>
                <p className="text-muted-foreground">
                  Créez la meilleure carte mentale en collaboration !
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={() => navigate("/challenges")}>
              Quitter
            </Button>
          </div>

          <MindMapArea />
        </motion.div>
      </div>
    </div>
  );
}