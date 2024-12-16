export const generateDreamAnalysisPrompt = (dream: string): string => {
  return `En tant que conseiller professionnel expert, analysez ce rêve professionnel et fournissez une analyse détaillée et personnalisée. Voici le rêve à analyser :

${dream}

Structurez votre réponse selon le format suivant, en étant précis et concret dans chaque section :

SYNTHÈSE GLOBALE :
[Fournissez une analyse concise mais percutante du rêve professionnel, sa signification profonde et son potentiel de réalisation]

ANALYSE DES COMPÉTENCES :
• Forces actuelles :
- [Identifiez une force majeure déjà présente, avec explication]
- [Identifiez une deuxième force, avec explication]
- [Identifiez une troisième force, avec explication]

• Compétences à développer :
- [Identifiez une compétence clé à acquérir, avec justification]
- [Identifiez une deuxième compétence à développer, avec justification]
- [Identifiez une troisième compétence manquante, avec justification]

OBSTACLES ET SOLUTIONS :
1. [Identifiez un obstacle majeur]
   Solution proposée : [Proposez une solution concrète et détaillée]

2. [Identifiez un deuxième obstacle]
   Solution proposée : [Proposez une solution concrète et détaillée]

3. [Identifiez un troisième obstacle]
   Solution proposée : [Proposez une solution concrète et détaillée]

PLAN D'ACTION :
• Court terme (0-6 mois) :
1. [Action spécifique et mesurable à entreprendre immédiatement]
2. [Deuxième action à court terme]
3. [Troisième action à court terme]

• Moyen terme (6-18 mois) :
1. [Action spécifique pour le développement à moyen terme]
2. [Deuxième action à moyen terme]
3. [Troisième action à moyen terme]

• Long terme (18+ mois) :
1. [Action stratégique pour l'objectif final]
2. [Deuxième action stratégique]
3. [Troisième action stratégique]

RECOMMANDATIONS CONCRÈTES :
• Formation et développement :
- [Recommandation spécifique de formation ou certification]
- [Deuxième recommandation de développement]
- [Troisième recommandation de développement]

• Réseau et mentorat :
- [Recommandation spécifique pour le networking]
- [Type de mentor à rechercher]
- [Communautés professionnelles à rejoindre]

INDICATEURS DE SUCCÈS :
1. [Premier indicateur mesurable et concret]
2. [Deuxième indicateur de progrès]
3. [Troisième indicateur de réussite]

CONCLUSION ET PROCHAINES ÉTAPES :
[Résumez les points clés et identifiez les 2-3 actions prioritaires à entreprendre immédiatement]

Assurez-vous que chaque section soit pertinente, actionnable et directement liée au rêve professionnel décrit.`;
};

export const getFallbackTemplate = (): string => {
  return `Une erreur est survenue lors de l'analyse. Veuillez réessayer dans quelques instants.`;
};