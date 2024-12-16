import { useState } from "react";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";
import { DreamInput } from "./dreams/DreamInput";
import { AnalysisButton } from "./dreams/AnalysisButton";
import { AnalysisResult } from "./dreams/AnalysisResult";
import { analyzeDreamText } from "./dreams/dreamAnalysis";

export const DreamAnalysisTab = () => {
  const [dream, setDream] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalysis = async () => {
    if (!dream.trim()) {
      toast.error("Veuillez décrire votre rêve avant de continuer");
      return;
    }

    if (dream.length > 1500) { // ~300 mots
      toast.error("Votre description est trop longue. Maximum 300 mots.");
      return;
    }

    setIsLoading(true);
    try {
      const advice = await analyzeDreamText(dream);
      setAnalysis(advice);
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
      <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-purple-400" />
          Analyseur de Rêves
        </h2>
        
        <p className="text-muted-foreground mb-6">
          Décrivez votre rêve professionnel (300 mots maximum) et laissez l'IA vous guider 
          vers sa réalisation avec des conseils personnalisés.
        </p>

        <div className="space-y-4">
          <DreamInput dream={dream} onChange={setDream} />
          <AnalysisButton onClick={handleAnalysis} isLoading={isLoading} />
        </div>

        <AnalysisResult analysis={analysis} />
      </div>
    </div>
  );
};

export default DreamAnalysisTab;