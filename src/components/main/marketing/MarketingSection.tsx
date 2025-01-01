import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { MarketingCard } from "./MarketingCard";

const marketingPoints = [
  {
    title: "Développez votre potentiel",
    description: "Découvrez vos forces et transformez-les en compétences durables grâce à notre approche personnalisée.",
    gradient: "from-[#FF6B6B] to-[#FFE66D]",
    delay: 0.1
  },
  {
    title: "Progression structurée",
    description: "Suivez un parcours adapté à votre rythme avec des objectifs clairs et atteignables.",
    gradient: "from-[#4ECDC4] to-[#556270]",
    delay: 0.2
  },
  {
    title: "Apprentissage actif",
    description: "Transformez vos connaissances en actions concrètes avec des exercices pratiques et des défis stimulants.",
    gradient: "from-[#6C5B7B] to-[#C06C84]",
    delay: 0.3
  },
  {
    title: "Suivi personnalisé",
    description: "Visualisez vos progrès et adaptez votre parcours selon vos besoins et objectifs personnels.",
    gradient: "from-[#2F80ED] to-[#56CCF2]",
    delay: 0.4
  }
];

export const MarketingSection = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className={cn(
      "py-16 px-4 max-w-7xl mx-auto",
      isMobile && "py-8"
    )}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className={cn(
          "font-bold mb-4",
          "bg-clip-text text-transparent",
          "bg-gradient-to-r from-white via-primary/90 to-white",
          isMobile ? "text-2xl" : "text-4xl"
        )}>
          Votre Voyage vers l'Excellence Personnelle
        </h2>
        <p className={cn(
          "text-gray-300 max-w-2xl mx-auto",
          isMobile ? "text-sm px-2" : "text-lg"
        )}>
          FLAP vous accompagne dans votre développement personnel avec des outils innovants 
          et une approche centrée sur vos objectifs individuels.
        </p>
      </motion.div>

      <div className={cn(
        "grid gap-6",
        isMobile ? "grid-cols-1" : "grid-cols-2 lg:grid-cols-4"
      )}>
        {marketingPoints.map((point, index) => (
          <MarketingCard key={index} {...point} />
        ))}
      </div>
    </section>
  );
};