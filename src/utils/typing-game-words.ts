import { supabase } from "@/integrations/supabase/client";

export const loadWords = async (): Promise<string[]> => {
  console.log("Loading words from skills...");
  const { data: skills, error } = await supabase
    .from("skills")
    .select("titre, resume, description")
    .limit(50);

  if (error) {
    console.error("Error loading words:", error);
    return [];
  }

  if (skills) {
    const extractedWords = skills.flatMap(skill => {
      const allText = `${skill.titre} ${skill.resume} ${skill.description}`;
      return allText.split(/\s+/)
        .filter(word => word.length >= 3 && word.length <= 15)
        .map(word => word.toLowerCase())
        .filter(word => /^[a-zÀ-ÿ]+$/i.test(word));
    });
    
    return extractedWords.sort(() => Math.random() - 0.5);
  }

  return [];
};