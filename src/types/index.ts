export interface BonusLevel {
  id: string;
  name: string;
  multiplier: number;
  probability: number;
  color: string;
}

export interface AllowancePreset {
  id: string;
  name: string;
  bonusLevels: BonusLevel[];
  isRobloxMode: boolean;
}

export interface AllowanceResult {
  baseAmount: number;
  selectedBonus: BonusLevel;
  finalAmount: number;
  calculation: string;
}

export interface CalculatorState {
  baseAllowance: number;
  childName: string;
  bonusLevels: BonusLevel[];
  isRobloxMode: boolean;
  savedPresets: AllowancePreset[];
  currentResult: AllowanceResult | null;
  isCalculating: boolean;
  choreGrade: number; // 1-10 scale
  showModal: boolean;
}