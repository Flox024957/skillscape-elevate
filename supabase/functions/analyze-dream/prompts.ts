export const generateDreamAnalysisPrompt = (dream: string): string => {
  return `En tant qu'expert en développement professionnel et personnel, analyse en détail le rêve professionnel suivant et fournis une analyse approfondie avec des conseils concrets pour sa réalisation :

${dream}

Format de réponse souhaité :

ANALYSE APPROFONDIE :
[Analyse détaillée du rêve, sa signification profonde, et son alignement avec les aspirations professionnelles de la personne]

POINTS FORTS IDENTIFIÉS :
1. [Point fort majeur 1 avec explication]
2. [Point fort majeur 2 avec explication]
3. [Point fort majeur 3 avec explication]
4. [Point fort majeur 4 avec explication]

DÉFIS À SURMONTER :
1. [Défi principal 1 et comment l'aborder]
2. [Défi principal 2 et comment l'aborder]
3. [Défi principal 3 et comment l'aborder]

PLAN D'ACTION DÉTAILLÉ :
Court terme (0-6 mois) :
1. [Action concrète 1]
2. [Action concrète 2]
3. [Action concrète 3]

Moyen terme (6-18 mois) :
1. [Action concrète 1]
2. [Action concrète 2]
3. [Action concrète 3]

Long terme (18+ mois) :
1. [Action concrète 1]
2. [Action concrète 2]
3. [Action concrète 3]

RESSOURCES RECOMMANDÉES :
1. [Ressource spécifique 1]
2. [Ressource spécifique 2]
3. [Ressource spécifique 3]
4. [Ressource spécifique 4]

CONSEILS DE DÉVELOPPEMENT PERSONNEL :
[Conseils personnalisés pour le développement personnel nécessaire à la réalisation de ce rêve]`;
};

export const getFallbackTemplate = (): string => {
  return `ANALYSE APPROFONDIE :
Analyse à développer

POINTS FORTS IDENTIFIÉS :
1. Point à développer
2. Point à développer
3. Point à développer
4. Point à développer

DÉFIS À SURMONTER :
1. Défi à identifier
2. Défi à identifier
3. Défi à identifier

PLAN D'ACTION DÉTAILLÉ :
Court terme (0-6 mois) :
1. Action à définir
2. Action à définir
3. Action à définir

Moyen terme (6-18 mois) :
1. Action à définir
2. Action à définir
3. Action à définir

Long terme (18+ mois) :
1. Action à définir
2. Action à définir
3. Action à définir

RESSOURCES RECOMMANDÉES :
1. Ressource à identifier
2. Ressource à identifier
3. Ressource à identifier
4. Ressource à identifier

CONSEILS DE DÉVELOPPEMENT PERSONNEL :
Conseils à développer`;
};