export const generateDreamAnalysisPrompt = (dream: string): string => {
  return `En tant que conseiller professionnel expert, analysez ce rêve professionnel et fournissez une analyse détaillée et personnalisée. Voici le rêve à analyser :

${dream}

Structurez votre réponse selon le format suivant, en étant précis et concret dans chaque section :

SYNTHÈSE GLOBALE :
[Fournissez une analyse concise mais percutante du rêve professionnel, en identifiant les aspirations profondes, les motivations sous-jacentes et le potentiel de réalisation]

ANALYSE DES COMPÉTENCES :
• Forces actuelles :
- [Identifiez une force majeure déjà présente qui soutient ce rêve, avec exemples concrets]
- [Identifiez une deuxième force qui pourra être exploitée, avec applications pratiques]
- [Identifiez une troisième force distinctive, avec son potentiel d'impact]

• Compétences à développer :
- [Identifiez une compétence clé manquante, avec des moyens spécifiques de l'acquérir]
- [Identifiez une deuxième compétence stratégique à développer, avec ressources]
- [Identifiez une troisième compétence transformationnelle, avec plan d'apprentissage]

OBSTACLES ET SOLUTIONS :
1. [Identifiez un obstacle majeur spécifique au contexte]
   Solution proposée : [Proposez une solution détaillée et actionnable]

2. [Identifiez un deuxième obstacle concret]
   Solution proposée : [Proposez une solution pratique avec étapes]

3. [Identifiez un troisième obstacle potentiel]
   Solution proposée : [Proposez une approche préventive]

PLAN D'ACTION :
• Court terme (0-6 mois) :
1. [Action immédiate spécifique et mesurable]
2. [Deuxième action prioritaire avec objectifs]
3. [Troisième action fondatrice avec résultats attendus]

• Moyen terme (6-18 mois) :
1. [Action stratégique de développement avec jalons]
2. [Deuxième action d'expansion avec indicateurs]
3. [Troisième action de consolidation avec livrables]

• Long terme (18+ mois) :
1. [Action visionnaire alignée sur l'objectif final]
2. [Deuxième action transformationnelle majeure]
3. [Troisième action d'accomplissement du rêve]

RECOMMANDATIONS CONCRÈTES :
• Formation et développement :
- [Recommandation spécifique de formation ou certification avec organisme]
- [Deuxième recommandation de développement avec ressources]
- [Troisième recommandation d'apprentissage avec timeline]

• Réseau et mentorat :
- [Recommandation spécifique pour le networking avec événements]
- [Type de mentor idéal à rechercher avec profil détaillé]
- [Communautés professionnelles pertinentes à rejoindre avec bénéfices]

INDICATEURS DE SUCCÈS :
1. [Premier indicateur mesurable et quantifiable]
2. [Deuxième indicateur de progrès avec seuils]
3. [Troisième indicateur de réussite avec critères]

CONCLUSION ET PROCHAINES ÉTAPES :
[Résumez les points clés et identifiez les 2-3 actions prioritaires à entreprendre immédiatement, avec un message motivant et réaliste]

Assurez-vous que chaque section soit détaillée, personnalisée et directement liée au rêve professionnel décrit. Évitez les généralités et privilégiez les recommandations spécifiques et actionnables.`;
};

export const getFallbackTemplate = (): string => {
  return `Une erreur est survenue lors de l'analyse. Veuillez réessayer dans quelques instants.`;
};