import React, { useState } from 'react';
import { Save, Upload, Trash2, Plus } from 'lucide-react';
import { AllowancePreset, BonusLevel } from '../types';
import { generateId } from '../utils/calculations';

interface PresetManagerProps {
  presets: AllowancePreset[];
  currentBonusLevels: BonusLevel[];
  isRobloxMode: boolean;
  onSavePreset: (preset: AllowancePreset) => void;
  onLoadPreset: (preset: AllowancePreset) => void;
  onDeletePreset: (presetId: string) => void;
}

export const PresetManager: React.FC<PresetManagerProps> = ({
  presets,
  currentBonusLevels,
  isRobloxMode,
  onSavePreset,
  onLoadPreset,
  onDeletePreset
}) => {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [presetName, setPresetName] = useState('');

  const handleSavePreset = () => {
    if (!presetName.trim()) return;
    
    const newPreset: AllowancePreset = {
      id: generateId(),
      name: presetName.trim(),
      bonusLevels: [...currentBonusLevels],
      isRobloxMode
    };
    
    onSavePreset(newPreset);
    setPresetName('');
    setShowSaveDialog(false);
  };

  return (
    <div className="bg-gray-50 rounded-lg shadow-sm p-4 opacity-75">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-700">Saved Presets</h3>
        <button
          onClick={() => setShowSaveDialog(true)}
          className="flex items-center gap-2 px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors text-sm"
        >
          <Save className="w-3 h-3" />
          Save Current
        </button>
      </div>

      {showSaveDialog && (
        <div className="mb-3 p-3 bg-white rounded-md border">
          <div className="flex items-center gap-2 mb-2">
            <input
              type="text"
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              placeholder="Enter preset name..."
              className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-gray-400 focus:border-transparent"
            />
            <button
              onClick={handleSavePreset}
              disabled={!presetName.trim()}
              className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 disabled:bg-gray-300 transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => {
                setShowSaveDialog(false);
                setPresetName('');
              }}
              className="px-3 py-1 bg-gray-400 text-white rounded text-sm hover:bg-gray-500 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {presets.length === 0 ? (
          <div className="text-center py-4 text-gray-400">
            <Plus className="w-6 h-6 mx-auto mb-1 opacity-50" />
            <p className="text-sm">No saved presets yet</p>
            <p className="text-xs">Save your current configuration to get started!</p>
          </div>
        ) : (
          presets.map(preset => (
            <div
              key={preset.id}
              className="flex items-center justify-between p-3 bg-white rounded-md hover:bg-gray-50 transition-colors border"
            >
              <div>
                <h4 className="font-medium text-gray-700 text-sm">{preset.name}</h4>
                <div className="text-xs text-gray-500">
                  {preset.bonusLevels.length} levels
                  {preset.isRobloxMode && (
                    <span className="ml-2 px-1 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                      Auto Mode
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onLoadPreset(preset)}
                  className="flex items-center gap-1 px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors"
                >
                  <Upload className="w-3 h-3" />
                  Load
                </button>
                <button
                  onClick={() => onDeletePreset(preset.id)}
                  className="flex items-center gap-1 px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};