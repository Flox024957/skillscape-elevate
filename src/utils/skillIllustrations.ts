// Mapping des catégories d'illustrations
const illustrations = {
  default: '/skill-illustrations/default.svg',
  technology: '/skill-illustrations/technology.svg',
  business: '/skill-illustrations/business.svg',
  communication: '/skill-illustrations/communication.svg',
  leadership: '/skill-illustrations/leadership.svg',
  creativity: '/skill-illustrations/creativity.svg'
};

export const getSkillIllustration = (categoryId: string | null) => {
  // Pour l'instant, on retourne une illustration par défaut
  // Plus tard, on pourra mapper les categoryId avec des illustrations spécifiques
  return illustrations.default;
};