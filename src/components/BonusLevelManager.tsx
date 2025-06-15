import React from 'react';
import { Plus, Trash2, AlertCircle } from 'lucide-react';
import { BonusLevel } from '../types';
import { generateId, calculateTotalProbability } from '../utils/calculations';

interface BonusLevelManagerProps {
  bonusLevels: BonusLevel[];
  isRobloxMode: boolean;
  onBonusLevelsChange: (levels: BonusLevel[]) => void;
  onRobloxModeToggle: (enabled: boolean) => void;
}

const COLORS = [
  '#9CA3AF', '#10B981', '#3B82F6', '#8B5CF6', 
  '#F59E0B', '#EF4444', '#EC4899', '#14B8A6'
];

export const BonusLevelManager: React.FC<BonusLevelManagerProps> = ({
  bonusLevels,
  isRobloxMode,
  onBonusLevelsChange,
  onRobloxModeToggle
}) => {
  const totalProbability = calculateTotalProbability(bonusLevels);
  const isValidProbability = Math.abs(totalProbability - 100) < 0.01;

  const addBonusLevel = () => {
    const newLevel: BonusLevel = {
      id: generateId(),
      name: `Level ${bonusLevels.length + 1}`,
      multiplier: 1.0,
      probability: 0,
      color: COLORS[bonusLevels.length % COLORS.length]
    };
    onBonusLevelsChange([...bonusLevels, newLevel]);
  };

  const updateBonusLevel = (id: string, updates: Partial<BonusLevel>) => {
    onBonusLevelsChange(
      bonusLevels.map(level => 
        level.id === id ? { ...level, ...updates } : level
      )
    );
  };

  const removeBonusLevel = (id: string) => {
    onBonusLevelsChange(bonusLevels.filter(level => level.id !== id));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Bonus Levels</h2>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isRobloxMode}
              onChange={(e) => onRobloxModeToggle(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Auto Bonus Mode</span>
          </label>
          {!isRobloxMode && (
            <button
              onClick={addBonusLevel}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Level
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {bonusLevels.map((level, index) => (
          <div
            key={level.id}
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
            style={{ borderLeft: `4px solid ${level.color}` }}
          >
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={level.name}
                  onChange={(e) => updateBonusLevel(level.id, { name: e.target.value })}
                  disabled={isRobloxMode}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Multiplier
                </label>
                <input
                  type="number"
                  value={level.multiplier}
                  onChange={(e) => updateBonusLevel(level.id, { multiplier: parseFloat(e.target.value) || 1 })}
                  disabled={isRobloxMode}
                  min="0.1"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Probability (%)
                </label>
                <input
                  type="number"
                  value={level.probability}
                  onChange={(e) => updateBonusLevel(level.id, { probability: parseFloat(e.target.value) || 0 })}
                  disabled={isRobloxMode}
                  min="0"
                  max="100"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                />
              </div>
            </div>
            
            {!isRobloxMode && (
              <button
                onClick={() => removeBonusLevel(level.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className={`flex items-center gap-2 ${isValidProbability ? 'text-green-600' : 'text-red-600'}`}>
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm font-medium">
            Total Probability: {totalProbability.toFixed(1)}%
            {isValidProbability ? ' ✓' : ' (Must equal 100%)'}
          </span>
        </div>
      </div>
    </div>
  );
};