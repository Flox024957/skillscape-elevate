import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Lightbulb, CheckCircle2 } from "lucide-react";

const tips = [
  {
    title: "Définissez des objectifs SMART",
    description: "Vos objectifs doivent être Spécifiques, Mesurables, Atteignables, Réalistes et Temporellement définis.",
    steps: [
      "Écrivez vos objectifs de manière précise",
      "Fixez des indicateurs de réussite",
      "Assurez-vous qu'ils sont réalisables",
      "Établissez un calendrier",
    ],
  },
  {
    title: "Développez votre réseau",
    description: "Le networking est essentiel pour concrétiser vos rêves professionnels.",
    steps: [
      "Participez à des événements professionnels",
      "Rejoignez des groupes LinkedIn pertinents",
      "Contactez d'anciens collègues",
      "Partagez votre expertise en ligne",
    ],
  },
  {
    title: "Investissez dans votre formation",
    description: "L'apprentissage continu est la clé du succès professionnel.",
    steps: [
      "Identifiez les compétences requises",
      "Suivez des formations certifiantes",
      "Pratiquez régulièrement",
      "Demandez des retours d'expérience",
    ],
  },
  {
    title: "Planifiez votre transition",
    description: "Une transition professionnelle réussie nécessite une préparation minutieuse.",
    steps: [
      "Évaluez votre situation actuelle",
      "Constituez une épargne de sécurité",
      "Préparez votre entourage",
      "Définissez des étapes intermédiaires",
    ],
  },
];

export const DreamTips = () => {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Lightbulb className="h-6 w-6 text-purple-400" />
        Conseils pour Réaliser vos Rêves
      </h2>

      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-6">
          {tips.map((tip, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-2">{tip.title}</h3>
              <p className="text-muted-foreground mb-4">{tip.description}</p>
              
              <div className="space-y-2">
                {tip.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <p className="text-sm">{step}</p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};