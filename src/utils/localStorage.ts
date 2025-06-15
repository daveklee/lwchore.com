import { AllowancePreset } from '../types';

const STORAGE_KEY = 'allowance-calculator-presets';

export const savePresets = (presets: AllowancePreset[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
  } catch (error) {
    console.error('Failed to save presets:', error);
  }
};

export const loadPresets = (): AllowancePreset[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to load presets:', error);
    return [];
  }
};