import { Card } from "@/components/ui/card";
import { 
  Book, 
  Compass, 
  GraduationCap, 
  Users, 
  Target,
  Calendar
} from "lucide-react";

const resources = [
  {
    icon: Book,
    title: "Lectures Recommandées",
    items: [
      "L'Art de se Réinventer Professionnellement",
      "Du Rêve à la Réalité : Guide Pratique",
      "Les Clés de la Transition de Carrière",
    ],
  },
  {
    icon: Compass,
    title: "Outils d'Orientation",
    items: [
      "Test de Personnalité Professionnelle",
      "Bilan de Compétences en Ligne",
      "Évaluation des Valeurs Professionnelles",
    ],
  },
  {
    icon: GraduationCap,
    title: "Formations",
    items: [
      "Formations Certifiantes en Ligne",
      "MOOC Spécialisés",
      "Ateliers de Développement Personnel",
    ],
  },
  {
    icon: Users,
    title: "Communauté & Réseaux",
    items: [
      "Groupes de Soutien Professionnel",
      "Réseaux d'Alumni",
      "Mentoring entre Pairs",
    ],
  },
  {
    icon: Target,
    title: "Objectifs & Planning",
    items: [
      "Template de Plan d'Action",
      "Checklist de Transition",
      "Guide d'Établissement d'Objectifs",
    ],
  },
  {
    icon: Calendar,
    title: "Événements",
    items: [
      "Salons Professionnels",
      "Webinaires Thématiques",
      "Ateliers de Networking",
    ],
  },
];

export const DreamResources = () => {
  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border">
      <h2 className="text-2xl font-bold mb-6">Ressources & Outils</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((resource) => {
          const Icon = resource.icon;
          return (
            <Card key={resource.title} className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Icon className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">{resource.title}</h3>
              </div>
              <ul className="space-y-2">
                {resource.items.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground">
                    • {item}
                  </li>
                ))}
              </ul>
            </Card>
          )
        })}
      </div>
    </div>
  );
};