export const generateDreamAnalysisPrompt = (dream: string): string => {
  return `En tant que conseiller professionnel expert, analysez ce rêve professionnel et fournissez une analyse structurée avec des recommandations concrètes :

${dream}

Veuillez structurer votre réponse selon le format suivant :

SYNTHÈSE GLOBALE :
[Une analyse concise et percutante du rêve professionnel, sa signification et son potentiel de réalisation]

ANALYSE DES COMPÉTENCES :
• Forces actuelles :
- [Force majeure 1 avec explication]
- [Force majeure 2 avec explication]
- [Force majeure 3 avec explication]

• Compétences à développer :
- [Compétence 1 avec justification]
- [Compétence 2 avec justification]
- [Compétence 3 avec justification]

OBSTACLES ET SOLUTIONS :
1. [Obstacle 1]
   Solution proposée : [Solution détaillée]
2. [Obstacle 2]
   Solution proposée : [Solution détaillée]
3. [Obstacle 3]
   Solution proposée : [Solution détaillée]

PLAN D'ACTION :
• Court terme (0-6 mois) :
1. [Action spécifique et mesurable]
2. [Action spécifique et mesurable]
3. [Action spécifique et mesurable]

• Moyen terme (6-18 mois) :
1. [Action spécifique et mesurable]
2. [Action spécifique et mesurable]
3. [Action spécifique et mesurable]

• Long terme (18+ mois) :
1. [Action stratégique]
2. [Action stratégique]
3. [Action stratégique]

RECOMMANDATIONS CONCRÈTES :
• Formation et développement :
- [Formation/certification spécifique 1]
- [Formation/certification spécifique 2]
- [Formation/certification spécifique 3]

• Réseau et mentorat :
- [Recommandation spécifique pour le networking]
- [Type de mentor à rechercher]
- [Communautés professionnelles à rejoindre]

INDICATEURS DE SUCCÈS :
1. [Indicateur mesurable 1]
2. [Indicateur mesurable 2]
3. [Indicateur mesurable 3]

CONCLUSION ET PROCHAINES ÉTAPES :
[Résumé des points clés et des actions prioritaires à entreprendre immédiatement]`;
};

export const getFallbackTemplate = (): string => {
  return `SYNTHÈSE GLOBALE :
[Analyse à développer]

ANALYSE DES COMPÉTENCES :
• Forces actuelles :
- Force à identifier
- Force à identifier
- Force à identifier

• Compétences à développer :
- Compétence à développer
- Compétence à développer
- Compétence à développer

OBSTACLES ET SOLUTIONS :
1. Obstacle à identifier
   Solution proposée : À développer
2. Obstacle à identifier
   Solution proposée : À développer
3. Obstacle à identifier
   Solution proposée : À développer

PLAN D'ACTION :
• Court terme (0-6 mois) :
1. Action à définir
2. Action à définir
3. Action à définir

• Moyen terme (6-18 mois) :
1. Action à définir
2. Action à définir
3. Action à définir

• Long terme (18+ mois) :
1. Action à définir
2. Action à définir
3. Action à définir

RECOMMANDATIONS CONCRÈTES :
• Formation et développement :
- Recommandation à définir
- Recommandation à définir
- Recommandation à définir

• Réseau et mentorat :
- Recommandation à définir
- Recommandation à définir
- Recommandation à définir

INDICATEURS DE SUCCÈS :
1. Indicateur à définir
2. Indicateur à définir
3. Indicateur à définir

CONCLUSION ET PROCHAINES ÉTAPES :
[À développer]`;
};