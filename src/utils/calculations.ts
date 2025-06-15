import { BonusLevel, AllowanceResult } from '../types';

export const calculateTotalProbability = (bonusLevels: BonusLevel[]): number => {
  return bonusLevels.reduce((sum, level) => sum + level.probability, 0);
};

export const selectRandomBonus = (bonusLevels: BonusLevel[]): BonusLevel => {
  const random = Math.random() * 100;
  let cumulative = 0;
  
  for (const level of bonusLevels) {
    cumulative += level.probability;
    if (random <= cumulative) {
      return level;
    }
  }
  
  // Fallback to first level if something goes wrong
  return bonusLevels[0];
};

export const calculateFinalAmount = (baseAmount: number, bonus: BonusLevel): AllowanceResult => {
  const finalAmount = Math.round((baseAmount * bonus.multiplier) * 100) / 100;
  const calculation = `$${baseAmount} × ${bonus.multiplier} (${bonus.name}) = $${finalAmount}`;
  
  return {
    baseAmount,
    selectedBonus: bonus,
    finalAmount,
    calculation
  };
};

export const convertToRobux = (dollarAmount: number, conversionRate: number): number => {
  return Math.round(dollarAmount * conversionRate);
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};