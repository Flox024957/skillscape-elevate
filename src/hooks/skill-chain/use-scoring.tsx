export const useScoring = () => {
  const calculatePoints = (chainLength: number, currentCombo: number, timeLeft: number) => {
    // Points de base : 2^(longueur-1) * 10
    const basePoints = Math.pow(2, chainLength - 1) * 10;
    
    // Bonus de combo : +20% par combo
    const comboMultiplier = 1 + (currentCombo * 0.2);
    
    // Bonus de temps restant : jusqu'à +50% si beaucoup de temps restant
    const timeBonus = 1 + (timeLeft / 180) * 0.5;
    
    return Math.round(basePoints * comboMultiplier * timeBonus);
  };

  return { calculatePoints };
};