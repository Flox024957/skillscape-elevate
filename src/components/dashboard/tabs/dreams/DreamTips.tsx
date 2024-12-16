import { Card } from "@/components/ui/card";
import { Lightbulb, Target, Brain, Pencil } from "lucide-react";

export const DreamTips = () => {
  const tips = [
    {
      icon: Target,
      title: "Soyez Spécifique",
      description: "Plus votre description est détaillée, plus l'analyse sera pertinente. Incluez vos motivations, vos objectifs et vos attentes."
    },
    {
      icon: Brain,
      title: "Explorez vos Émotions",
      description: "Décrivez ce que vous ressentez par rapport à ce rêve professionnel. Vos émotions sont des indicateurs précieux de vos véritables aspirations."
    },
    {
      icon: Pencil,
      title: "Notez les Détails",
      description: "Prenez le temps d'écrire tous les aspects de votre rêve, même ceux qui peuvent sembler moins importants. Chaque détail peut être significatif."
    },
    {
      icon: Lightbulb,
      title: "Restez Ouvert",
      description: "L'analyse peut révéler des aspects de votre rêve auxquels vous n'aviez pas pensé. Gardez l'esprit ouvert aux nouvelles perspectives."
    }
  ];

  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Lightbulb className="h-6 w-6 text-yellow-400" />
        Conseils pour une Meilleure Analyse
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tips.map((tip, index) => {
          const Icon = tip.icon;
          return (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{tip.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {tip.description}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};