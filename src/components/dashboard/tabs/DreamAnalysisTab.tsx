import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { pipeline } from "@huggingface/transformers";

export const DreamAnalysisTab = () => {
  const [dream, setDream] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const analyzeDream = async () => {
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
      const classifier = await pipeline(
        "text-generation",
        "Xenova/distilgpt2"
      );

      const prompt = `En tant que coach professionnel, voici mes conseils pour réaliser ce rêve : ${dream}\n\nConseils :\n1.`;
      const result = await classifier(prompt, {
        max_length: 150,
        temperature: 0.7,
      });

      const advice = result[0].generated_text
        .split("Conseils :")[1]
        .trim()
        .replace(/^\d+\.\s*/gm, "• ");

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
          <Textarea
            value={dream}
            onChange={(e) => setDream(e.target.value)}
            placeholder="Décrivez votre rêve professionnel ici..."
            className="min-h-[150px] bg-background/50"
          />
          
          <Button
            onClick={analyzeDream}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 
                     hover:from-purple-600 hover:to-pink-600"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyse en cours...
              </>
            ) : (
              "Analyser mon rêve"
            )}
          </Button>
        </div>

        {analysis && (
          <div className="mt-6 p-4 bg-card/30 rounded-lg border border-border">
            <h3 className="font-semibold mb-2">Conseils pour réaliser votre rêve :</h3>
            <p className="text-muted-foreground whitespace-pre-line">{analysis}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DreamAnalysisTab;