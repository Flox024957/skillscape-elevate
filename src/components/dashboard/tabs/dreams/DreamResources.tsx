import { Card } from "@/components/ui/card";
import { BookMarked, Lightbulb, GraduationCap, Users } from "lucide-react";

export const DreamResources = () => {
  const resources = [
    {
      title: "Guides et Articles",
      description: "Ressources pour développer votre projet professionnel",
      icon: BookMarked,
      links: [
        { text: "Guide de reconversion professionnelle", url: "#" },
        { text: "Construire son plan de carrière", url: "#" },
        { text: "Développer ses soft skills", url: "#" },
      ],
    },
    {
      title: "Formations Recommandées",
      description: "Parcours d'apprentissage adaptés à vos objectifs",
      icon: GraduationCap,
      links: [
        { text: "Formations certifiantes", url: "#" },
        { text: "MOOC et cours en ligne", url: "#" },
        { text: "Ateliers pratiques", url: "#" },
      ],
    },
    {
      title: "Communauté et Networking",
      description: "Connectez-vous avec des professionnels partageant vos aspirations",
      icon: Users,
      links: [
        { text: "Groupes de discussion", url: "#" },
        { text: "Événements professionnels", url: "#" },
        { text: "Programme de mentorat", url: "#" },
      ],
    },
    {
      title: "Conseils et Inspiration",
      description: "Histoires de réussite et conseils d'experts",
      icon: Lightbulb,
      links: [
        { text: "Témoignages de reconversion", url: "#" },
        { text: "Interviews d'experts", url: "#" },
        { text: "Blog carrière", url: "#" },
      ],
    },
  ];

  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border">
      <h2 className="text-2xl font-bold mb-6">Ressources et Outils</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((resource, index) => {
          const Icon = resource.icon;
          return (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">{resource.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {resource.description}
                  </p>
                  <ul className="space-y-2">
                    {resource.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href={link.url}
                          className="text-sm text-primary hover:underline"
                        >
                          {link.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};