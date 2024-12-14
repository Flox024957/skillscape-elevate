import { supabase } from "@/integrations/supabase/client";

const cleanWord = (word: string): string => {
  return word.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z]/g, " ")
    .trim();
};

const extractRelevantWords = (text: string): string[] => {
  return text.split(/\s+/)
    .map(cleanWord)
    .filter(word => 
      word.length >= 3 && 
      word.length <= 15 &&
      !/^\d+$/.test(word) // Exclure les nombres
    );
};

export const loadWords = async (): Promise<string[]> => {
  console.log("Loading words from skills and categories...");
  
  // Charger les compétences
  const { data: skills, error: skillsError } = await supabase
    .from("skills")
    .select("titre, resume, description, action_concrete")
    .limit(50);

  if (skillsError) {
    console.error("Error loading skills:", skillsError);
    return [];
  }

  // Charger les catégories
  const { data: categories, error: categoriesError } = await supabase
    .from("categories")
    .select("name, description")
    .limit(20);

  if (categoriesError) {
    console.error("Error loading categories:", categoriesError);
    return [];
  }

  const words = new Set<string>();

  // Extraire les mots des compétences
  if (skills) {
    skills.forEach(skill => {
      const allText = `${skill.titre} ${skill.resume} ${skill.description} ${skill.action_concrete}`;
      extractRelevantWords(allText).forEach(word => words.add(word));
    });
  }

  // Extraire les mots des catégories
  if (categories) {
    categories.forEach(category => {
      const allText = `${category.name} ${category.description || ""}`;
      extractRelevantWords(allText).forEach(word => words.add(word));
    });
  }

  // Convertir le Set en array et mélanger les mots
  const wordArray = Array.from(words);
  return wordArray.sort(() => Math.random() - 0.5);
};