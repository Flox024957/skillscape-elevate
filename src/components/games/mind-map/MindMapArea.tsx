import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const MindMapArea = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-8"
    >
      <Card className="p-6 bg-background/50 backdrop-blur-sm border-2 border-primary/20">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-primary">
            Fonctionnalité en développement
          </h2>
          <p className="text-muted-foreground">
            Le jeu Mind Map Masters sera bientôt disponible ! Vous pourrez créer et partager des cartes mentales collaboratives.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" disabled>
              Créer une nouvelle carte
            </Button>
            <Button variant="outline" disabled>
              Rejoindre une session
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};