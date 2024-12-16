import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { BookMarked, ExternalLink } from "lucide-react";

const resources = [
  {
    title: "Guide de Reconversion Professionnelle",
    description: "Un guide complet pour réussir votre changement de carrière",
    link: "https://www.pole-emploi.fr/candidat/votre-projet-professionnel/definir-votre-projet-professionnel/la-reconversion-professionnelle.html",
    category: "Reconversion",
  },
  {
    title: "Création d'Entreprise",
    description: "Les étapes clés pour créer votre entreprise",
    link: "https://www.economie.gouv.fr/entreprises/creation-entreprise",
    category: "Entrepreneuriat",
  },
  {
    title: "Formation Continue",
    description: "Trouvez la formation adaptée à votre projet",
    link: "https://www.moncompteformation.gouv.fr",
    category: "Formation",
  },
  {
    title: "Bilan de Compétences",
    description: "Évaluez vos compétences et définissez votre projet",
    link: "https://travail-emploi.gouv.fr/formation-professionnelle/droit-a-la-formation-et-orientation/bilan-competences",
    category: "Orientation",
  },
  {
    title: "Financement de Projet",
    description: "Les différentes aides et financements disponibles",
    link: "https://www.service-public.fr/professionnels-entreprises/vosdroits/N16147",
    category: "Financement",
  },
];

export const DreamResources = () => {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <BookMarked className="h-6 w-6 text-purple-400" />
        Ressources Utiles
      </h2>

      <ScrollArea className="h-[600px] pr-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.map((resource, index) => (
            <Card key={index} className="p-4 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {resource.description}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                    {resource.category}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary/90"
                    onClick={() => window.open(resource.link, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Consulter
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};