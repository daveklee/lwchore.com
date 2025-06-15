import { BonusLevel } from '../types';

// Base bonus structure for different grades
const BONUS_STRUCTURES = {
  1: { // F - Worst possible
    common: { probability: 100, multiplier: 1 }
  },
  2: { // D-
    common: { probability: 90, multiplier: 1 },
    uncommon: { probability: 10, multiplier: 2 }
  },
  3: { // D
    common: { probability: 80, multiplier: 1 },
    uncommon: { probability: 18, multiplier: 2 },
    rare: { probability: 2, multiplier: 3 }
  },
  4: { // D+
    common: { probability: 70, multiplier: 1 },
    uncommon: { probability: 25, multiplier: 2 },
    rare: { probability: 5, multiplier: 3 }
  },
  5: { // C - Middle
    common: { probability: 50, multiplier: 1 },
    uncommon: { probability: 25, multiplier: 2 },
    rare: { probability: 13, multiplier: 3 },
    epic: { probability: 8, multiplier: 5 },
    legendary: { probability: 3, multiplier: 10 },
    mythical: { probability: 1, multiplier: 20 }
  },
  6: { // B-
    common: { probability: 40, multiplier: 1 },
    uncommon: { probability: 30, multiplier: 2 },
    rare: { probability: 15, multiplier: 3 },
    epic: { probability: 10, multiplier: 5 },
    legendary: { probability: 4, multiplier: 10 },
    mythical: { probability: 1, multiplier: 20 }
  },
  7: { // B+
    common: { probability: 35, multiplier: 1 },
    uncommon: { probability: 25, multiplier: 2 },
    rare: { probability: 20, multiplier: 3 },
    epic: { probability: 12, multiplier: 5 },
    legendary: { probability: 6, multiplier: 10 },
    mythical: { probability: 2, multiplier: 20 }
  },
  8: { // A-
    common: { probability: 30, multiplier: 1 },
    uncommon: { probability: 25, multiplier: 2 },
    rare: { probability: 20, multiplier: 3 },
    epic: { probability: 15, multiplier: 5 },
    legendary: { probability: 7, multiplier: 10 },
    mythical: { probability: 3, multiplier: 20 }
  },
  9: { // A+
    common: { probability: 25, multiplier: 1 },
    uncommon: { probability: 22, multiplier: 2 },
    rare: { probability: 20, multiplier: 3 },
    epic: { probability: 15, multiplier: 5 },
    legendary: { probability: 9, multiplier: 10 },
    mythical: { probability: 6, multiplier: 20 },
    godly: { probability: 3, multiplier: 25 }
  },
  10: { // S - Best possible
    common: { probability: 20, multiplier: 1 },
    uncommon: { probability: 20, multiplier: 2 },
    rare: { probability: 20, multiplier: 3 },
    epic: { probability: 15, multiplier: 5 },
    legendary: { probability: 10, multiplier: 10 },
    mythical: { probability: 10, multiplier: 20 },
    godly: { probability: 5, multiplier: 25 }
  }
};

const BONUS_COLORS = {
  common: '#9CA3AF',
  uncommon: '#10B981',
  rare: '#3B82F6',
  epic: '#8B5CF6',
  legendary: '#F59E0B',
  mythical: '#EF4444',
  godly: '#EC4899'
};

// CRITICAL: Ensure consistent ordering by defining the order explicitly
const BONUS_ORDER = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythical', 'godly'];

export const getRobloxBonusLevels = (grade: number): BonusLevel[] => {
  const structure = BONUS_STRUCTURES[grade as keyof typeof BONUS_STRUCTURES];
  
  // Create levels in the exact same order every time
  const levels: BonusLevel[] = [];
  
  for (const bonusName of BONUS_ORDER) {
    if (structure[bonusName as keyof typeof structure]) {
      const config = structure[bonusName as keyof typeof structure];
      levels.push({
        id: bonusName,
        name: bonusName.charAt(0).toUpperCase() + bonusName.slice(1),
        multiplier: config.multiplier,
        probability: config.probability,
        color: BONUS_COLORS[bonusName as keyof typeof BONUS_COLORS]
      });
    }
  }
  
  return levels;
};

export const ROBLOX_PRESET: BonusLevel[] = getRobloxBonusLevels(5); // Default to middle grade

export const ROBUX_CONVERSION_RATE = 80; // Roughly 80 Robux per USD
export const ROBLOX_PURCHASE_URL = 'https://www.roblox.com/upgrades/robux';