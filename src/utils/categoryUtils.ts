export const getCategoryImage = (categoryName: string) => {
  const images = {
    'Négociation': '/lovable-uploads/e9c7503e-7d72-442d-88b3-fb71c139dd55.png#cowboy',
    'Motivation': '/lovable-uploads/e9c7503e-7d72-442d-88b3-fb71c139dd55.png#flame',
    'Finance': '/lovable-uploads/e9c7503e-7d72-442d-88b3-fb71c139dd55.png#money',
    'Relation': '/lovable-uploads/e9c7503e-7d72-442d-88b3-fb71c139dd55.png#owl',
    'Gestion du stress': '/lovable-uploads/e9c7503e-7d72-442d-88b3-fb71c139dd55.png#feather',
    'Évolution': '/lovable-uploads/e9c7503e-7d72-442d-88b3-fb71c139dd55.png#book',
    'Entreprenariat': '/lovable-uploads/e9c7503e-7d72-442d-88b3-fb71c139dd55.png#scale',
    'Bien-être': '/lovable-uploads/e9c7503e-7d72-442d-88b3-fb71c139dd55.png#hourglass',
    'Confiance en soi': '/lovable-uploads/e9c7503e-7d72-442d-88b3-fb71c139dd55.png#tree'
  };
  return images[categoryName as keyof typeof images];
};

export const getImagePosition = (categoryName: string): string => {
  const positions = {
    'Négociation': 'object-[0%_54%]',
    'Motivation': 'object-[50%_54%]',
    'Finance': 'object-[100%_54%]',
    'Relation': 'object-[0%_71%]',
    'Gestion du stress': 'object-[50%_71%]',
    'Évolution': 'object-[100%_71%]',
    'Entreprenariat': 'object-[0%_88%]',
    'Bien-être': 'object-[50%_88%]',
    'Confiance en soi': 'object-[100%_88%]'
  };
  return positions[categoryName as keyof typeof positions];
};