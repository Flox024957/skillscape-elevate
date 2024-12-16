import { useState } from "react";
import { Sparkles, History, BookMarked } from "lucide-react";
import { toast } from "sonner";
import { DreamInput } from "./dreams/DreamInput";
import { AnalysisButton } from "./dreams/AnalysisButton";
import { AnalysisResult } from "./dreams/AnalysisResult";
import { analyzeDreamText } from "./dreams/dreamAnalysis";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DreamHistory } from "./dreams/DreamHistory";
import { DreamResources } from "./dreams/DreamResources";

export const DreamAnalysisTab = () => {
  const [dream, setDream] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalysis = async () => {
    if (!dream.trim()) {
      toast.error("Veuillez décrire votre rêve avant de continuer");
      return;
    }

    if (dream.length > 1500) {
      toast.error("Votre description est trop longue. Maximum 300 mots.");
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
      toast.success("Analyse terminée !");
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
        <TabsList className="grid w-full grid-cols-3 mb-8">
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
        </TabsList>

        <TabsContent value="analyze">
          <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-purple-400" />
              Analyseur de Rêves Professionnels
            </h2>
            
            <p className="text-muted-foreground mb-6">
              Décrivez votre rêve professionnel et laissez l'IA vous guider 
              vers sa réalisation avec des conseils personnalisés et un plan d'action concret.
            </p>

            <div className="space-y-4">
              <DreamInput dream={dream} onChange={setDream} />
              <AnalysisButton onClick={handleAnalysis} isLoading={isLoading} />
              {analysis && <AnalysisResult analysis={analysis} />}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <DreamHistory />
        </TabsContent>

        <TabsContent value="resources">
          <DreamResources />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DreamAnalysisTab;