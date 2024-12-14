import { useToast } from "@/hooks/use-toast";
import type { Skill } from "@/types/skills";

export const useSkillValidation = () => {
  const { toast } = useToast();

  const isValidConnection = (prevSkill: Skill, nextSkill: Skill) => {
    // Vérifie si les compétences sont de la même catégorie
    if (prevSkill.category_id === nextSkill.category_id) {
      toast({
        title: "Connexion par catégorie !",
        description: `Les compétences sont de la catégorie ${prevSkill.categories?.name}`,
      });
      return true;
    }

    // Vérifie les mots-clés dans la description et l'action concrète
    const prevWords = [
      ...prevSkill.description.toLowerCase().split(" "),
      ...prevSkill.action_concrete.toLowerCase().split(" "),
    ];
    const nextWords = [
      ...nextSkill.description.toLowerCase().split(" "),
      ...nextSkill.action_concrete.toLowerCase().split(" "),
    ];

    const commonWords = prevWords.filter(
      (word) => word.length > 3 && nextWords.includes(word)
    );

    if (commonWords.length > 0) {
      toast({
        title: "Connexion par mots-clés !",
        description: `Mots-clés communs : ${commonWords.join(", ")}`,
      });
      return true;
    }

    // Vérifie les exemples pour des connexions possibles
    const prevExamples = Array.isArray(prevSkill.exemples)
      ? prevSkill.exemples
      : [];
    const nextExamples = Array.isArray(nextSkill.exemples)
      ? nextSkill.exemples
      : [];

    const exampleWords = prevExamples.flatMap((ex) =>
      String(ex).toLowerCase().split(" ")
    );
    const nextExampleWords = nextExamples.flatMap((ex) =>
      String(ex).toLowerCase().split(" ")
    );

    const commonExampleWords = exampleWords.filter(
      (word) => word.length > 3 && nextExampleWords.includes(word)
    );

    if (commonExampleWords.length > 0) {
      toast({
        title: "Connexion par exemples !",
        description: `Concepts communs trouvés dans les exemples`,
      });
      return true;
    }

    return false;
  };

  return { isValidConnection };
};