import { useState } from "react";
import { Sparkles, History, BookMarked, Lightbulb } from "lucide-react";
import { toast } from "sonner";
import { DreamInput } from "./dreams/DreamInput";
import { AnalysisButton } from "./dreams/AnalysisButton";
import { AnalysisResult } from "./dreams/AnalysisResult";
import { analyzeDreamText } from "./dreams/dreamAnalysis";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DreamHistory } from "./dreams/DreamHistory";
import { DreamResources } from "./dreams/DreamResources";
import { DreamTips } from "./dreams/DreamTips";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

export const DreamAnalysisTab = () => {
  const [dream, setDream] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { refetch: refetchDreams } = useQuery({
    queryKey: ["dreams-history"],
    queryFn: async () => {
      const { data: dreams, error } = await supabase
        .from("user_dreams")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return dreams;
    },
  });

  const handleAnalysis = async () => {
    if (!dream.trim()) {
      toast.error("Veuillez décrire votre rêve avant de continuer");
      return;
    }

    if (dream.length > 2000) {
      toast.error("Votre description est trop longue. Maximum 400 mots.");
      return;
    }

    setIsLoading(true);
    try {
      const advice = await analyzeDreamText(dream);
      console.log("Réponse reçue de l'API:", advice);
      setAnalysis(advice);
      
      if (!advice) {
        toast.error("L'analyse n'a pas produit de résultats");
        return;
      }

      // Sauvegarder le rêve et son analyse dans la base de données
      const { error: saveError } = await supabase
        .from("user_dreams")
        .insert({
          title: dream.slice(0, 50) + "...",
          content: dream,
          analysis: advice,
        });

      if (saveError) {
        console.error("Erreur lors de la sauvegarde:", saveError);
        toast.error("Erreur lors de la sauvegarde du rêve");
        return;
      }

      await refetchDreams();
      toast.success("Analyse terminée et sauvegardée !");
    } catch (error) {
      console.error("Erreur lors de l'analyse:", error);
      toast.error("Une erreur est survenue lors de l'analyse");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="analyze" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="analyze" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Analyser
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            Historique
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <BookMarked className="h-4 w-4" />
            Ressources
          </TabsTrigger>
          <TabsTrigger value="tips" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Conseils
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analyze">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-purple-400" />
                Analyseur de Rêves Professionnels
              </h2>
              
              <p className="text-muted-foreground mb-6">
                Décrivez votre rêve professionnel en détail et laissez l'IA vous guider 
                vers sa réalisation avec des conseils personnalisés et un plan d'action concret.
              </p>

              <div className="space-y-4">
                <DreamInput 
                  dream={dream} 
                  onChange={setDream} 
                  placeholder="Décrivez votre rêve professionnel en détail (changement de carrière, projet d'entreprise, évolution professionnelle...)"
                />
                <AnalysisButton onClick={handleAnalysis} isLoading={isLoading} />
                {analysis && <AnalysisResult analysis={analysis} />}
              </div>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="history">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <DreamHistory />
          </motion.div>
        </TabsContent>

        <TabsContent value="resources">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <DreamResources />
          </motion.div>
        </TabsContent>

        <TabsContent value="tips">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <DreamTips />
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DreamAnalysisTab;