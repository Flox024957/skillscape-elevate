import { useState } from "react";
import { pipeline } from "@huggingface/transformers";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export const AIAssistant = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const analyzeText = async () => {
    if (!input.trim()) {
      toast.error("Veuillez entrer du texte à analyser");
      return;
    }

    setIsLoading(true);
    try {
      // Utilisation d'un petit modèle de classification de sentiment
      const classifier = await pipeline(
        "sentiment-analysis",
        "Xenova/distilbert-base-uncased-finetuned-sst-2-english"
      );

      const result = await classifier(input);
      console.log("Résultat de l'analyse:", result);

      setOutput(
        `Sentiment détecté: ${
          result[0].label === "POSITIVE" ? "Positif" : "Négatif"
        } (Confiance: ${Math.round(result[0].score * 100)}%)`
      );
      
      toast.success("Analyse terminée !");
    } catch (error) {
      console.error("Erreur lors de l'analyse:", error);
      toast.error("Une erreur est survenue lors de l'analyse");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-4 bg-black/20 backdrop-blur-lg rounded-xl border border-purple-500/20">
      <h2 className="text-2xl font-bold text-center text-white">
        Assistant IA - Analyse de Sentiment
      </h2>
      
      <div className="space-y-4">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Entrez votre texte ici (en anglais pour de meilleurs résultats)..."
          className="min-h-[100px] bg-black/30 border-purple-500/30"
        />
        
        <Button
          onClick={analyzeText}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyse en cours...
            </>
          ) : (
            "Analyser le texte"
          )}
        </Button>

        {output && (
          <div className="p-4 bg-white/5 rounded-lg border border-purple-500/20">
            <p className="text-white">{output}</p>
          </div>
        )}
      </div>
    </div>
  );
};