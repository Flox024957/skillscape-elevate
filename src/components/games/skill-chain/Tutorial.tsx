import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link, BookOpen, Target, Trophy, Sparkles } from "lucide-react";

const tutorialSteps = [
  {
    title: "Bienvenue dans Skill Chain !",
    content: "Créez des chaînes de compétences en reliant des compétences qui partagent des points communs.",
    icon: BookOpen
  },
  {
    title: "Connexions valides",
    content: "Les compétences peuvent être connectées si elles partagent la même catégorie, des mots-clés communs dans leurs descriptions ou des exemples similaires.",
    icon: Link
  },
  {
    title: "Objectif",
    content: "Créez les plus longues chaînes possibles avant la fin du temps imparti pour maximiser votre score !",
    icon: Target
  },
  {
    title: "Bonus",
    content: "Maintenez un combo en enchaînant les bonnes connexions et terminez rapidement pour obtenir des points bonus !",
    icon: Sparkles
  },
  {
    title: "Classement",
    content: "Vos meilleurs scores sont enregistrés dans le classement. Défiez-vous pour atteindre le sommet !",
    icon: Trophy
  }
];

export const Tutorial = ({ onClose }: { onClose: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="w-full max-w-lg"
        >
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              {tutorialSteps.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 rounded-full ${
                    index <= currentStep ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-4 mb-6">
              {React.createElement(tutorialSteps[currentStep].icon, {
                className: "w-8 h-8 text-primary"
              })}
              <h2 className="text-2xl font-semibold">
                {tutorialSteps[currentStep].title}
              </h2>
            </div>

            <p className="text-lg text-muted-foreground mb-8">
              {tutorialSteps[currentStep].content}
            </p>

            <div className="flex justify-between">
              <Button
                variant="ghost"
                onClick={onClose}
              >
                Passer
              </Button>
              <Button onClick={handleNext}>
                {currentStep < tutorialSteps.length - 1 ? "Suivant" : "Commencer"}
              </Button>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};