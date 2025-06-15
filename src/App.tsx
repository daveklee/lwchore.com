import React, { useState, useEffect } from 'react';
import { Sparkles, Calculator } from 'lucide-react';
import { AllowanceForm } from './components/AllowanceForm';
import { BonusLevelManager } from './components/BonusLevelManager';
import { SpinningWheel } from './components/SpinningWheel';
import { ResultsDisplay } from './components/ResultsDisplay';
import { PresetManager } from './components/PresetManager';
import { ChoreSlider } from './components/ChoreSlider';
import { Modal } from './components/Modal';
import { CalculatorState, AllowancePreset, BonusLevel } from './types';
import { calculateTotalProbability, selectRandomBonus, calculateFinalAmount } from './utils/calculations';
import { getRobloxBonusLevels } from './utils/robloxData';
import { savePresets, loadPresets } from './utils/localStorage';
import { initGA, trackAllowanceCalculation, trackChoreGradeChange, trackPresetAction, trackModeToggle } from './utils/analytics';

const INITIAL_BONUS_LEVELS: BonusLevel[] = [
  {
    id: 'basic',
    name: 'Basic',
    multiplier: 1.0,
    probability: 70,
    color: '#9CA3AF'
  },
  {
    id: 'bonus',
    name: 'Bonus',
    multiplier: 1.5,
    probability: 30,
    color: '#10B981'
  }
];

function App() {
  const [state, setState] = useState<CalculatorState>({
    baseAllowance: 1,
    childName: '',
    bonusLevels: INITIAL_BONUS_LEVELS,
    isRobloxMode: true, // Default to Auto Bonus mode
    savedPresets: [],
    currentResult: null,
    isCalculating: false,
    choreGrade: 5, // Default to middle grade (C)
    showModal: false
  });

  // Initialize Google Analytics on component mount
  useEffect(() => {
    initGA();
  }, []);

  // Load presets from localStorage on component mount
  useEffect(() => {
    const savedPresets = loadPresets();
    setState(prev => ({ ...prev, savedPresets }));
  }, []);

  // Save presets to localStorage whenever they change
  useEffect(() => {
    savePresets(state.savedPresets);
  }, [state.savedPresets]);

  // Update bonus levels when Auto Bonus mode changes or chore grade changes
  useEffect(() => {
    if (state.isRobloxMode) {
      const robloxLevels = getRobloxBonusLevels(state.choreGrade);
      setState(prev => ({ ...prev, bonusLevels: robloxLevels }));
    }
  }, [state.isRobloxMode, state.choreGrade]);

  const handleCalculateAllowance = () => {
    const totalProbability = calculateTotalProbability(state.bonusLevels);
    if (Math.abs(totalProbability - 100) > 0.01) {
      alert('Probabilities must total exactly 100%!');
      return;
    }

    if (state.baseAllowance <= 0) {
      alert('Please enter a valid base allowance amount!');
      return;
    }

    // CRITICAL: Calculate the result FIRST, then use it for both wheel and text
    // This ensures they always match
    const selectedBonus = selectRandomBonus(state.bonusLevels);
    const result = calculateFinalAmount(state.baseAllowance, selectedBonus);

    // Track the allowance calculation
    trackAllowanceCalculation(
      state.baseAllowance,
      result.finalAmount,
      selectedBonus.name,
      state.isRobloxMode
    );

    setState(prev => ({ 
      ...prev, 
      isCalculating: true,
      currentResult: result, // This is our single source of truth for both wheel and text
      showModal: true
    }));
  };

  const handleSpinComplete = () => {
    setState(prev => ({ ...prev, isCalculating: false }));
  };

  const handleCloseModal = () => {
    setState(prev => ({ ...prev, showModal: false }));
  };

  const handleSavePreset = (preset: AllowancePreset) => {
    setState(prev => ({
      ...prev,
      savedPresets: [...prev.savedPresets, preset]
    }));
    trackPresetAction('save', preset.name);
  };

  const handleLoadPreset = (preset: AllowancePreset) => {
    setState(prev => ({
      ...prev,
      bonusLevels: [...preset.bonusLevels],
      isRobloxMode: preset.isRobloxMode
    }));
    trackPresetAction('load', preset.name);
  };

  const handleDeletePreset = (presetId: string) => {
    const preset = state.savedPresets.find(p => p.id === presetId);
    setState(prev => ({
      ...prev,
      savedPresets: prev.savedPresets.filter(p => p.id !== presetId)
    }));
    trackPresetAction('delete', preset?.name);
  };

  const handleChoreGradeChange = (grade: number) => {
    setState(prev => ({ ...prev, choreGrade: grade }));
    trackChoreGradeChange(grade);
  };

  const handleRobloxModeToggle = (enabled: boolean) => {
    setState(prev => ({ ...prev, isRobloxMode: enabled }));
    trackModeToggle(enabled);
  };

  const totalProbability = calculateTotalProbability(state.bonusLevels);
  const isValidConfiguration = Math.abs(totalProbability - 100) < 0.01 && state.baseAllowance > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            🎉 LWChore 🎉
          </h1>
          <p className="text-xl text-gray-600">
            Rate your chore performance and spin the wheel for your allowance bonus!
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-6">
          {/* Allowance Form */}
          <AllowanceForm
            baseAllowance={state.baseAllowance}
            childName={state.childName}
            onBaseAllowanceChange={(amount) => setState(prev => ({ ...prev, baseAllowance: amount }))}
            onChildNameChange={(name) => setState(prev => ({ ...prev, childName: name }))}
          />

          {/* Chore Slider */}
          <ChoreSlider
            choreGrade={state.choreGrade}
            onChoreGradeChange={handleChoreGradeChange}
          />

          {/* Bonus Level Manager */}
          <BonusLevelManager
            bonusLevels={state.bonusLevels}
            isRobloxMode={state.isRobloxMode}
            onBonusLevelsChange={(levels) => setState(prev => ({ ...prev, bonusLevels: levels }))}
            onRobloxModeToggle={handleRobloxModeToggle}
          />

          {/* Calculate Button */}
          <div className="text-center">
            <button
              onClick={handleCalculateAllowance}
              disabled={!isValidConfiguration || state.isCalculating}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <Calculator className="w-6 h-6" />
              {state.isCalculating ? 'Spinning...' : 'Calculate My Allowance!'}
            </button>
            {!isValidConfiguration && (
              <p className="mt-2 text-red-600 text-sm">
                Please ensure probabilities total 100% and base allowance is greater than 0
              </p>
            )}
          </div>

          {/* Results Display on main page */}
          {state.currentResult && !state.isCalculating && !state.showModal && (
            <ResultsDisplay
              result={state.currentResult}
              isRobloxMode={state.isRobloxMode}
              childName={state.childName}
            />
          )}

          {/* Preset Manager - Only show when Auto Bonus Mode is OFF and make it less prominent */}
          {!state.isRobloxMode && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <PresetManager
                presets={state.savedPresets}
                currentBonusLevels={state.bonusLevels}
                isRobloxMode={state.isRobloxMode}
                onSavePreset={handleSavePreset}
                onLoadPreset={handleLoadPreset}
                onDeletePreset={handleDeletePreset}
              />
            </div>
          )}
        </div>
      </div>

      {/* Modal for Spinning Wheel and Results */}
      <Modal 
        isOpen={state.showModal} 
        onClose={handleCloseModal}
        title={state.isCalculating ? "🎰 Spinning the Wheel!" : "🎉 Your Allowance Results!"}
      >
        <div className="space-y-8">
          {/* Spinning Wheel - Uses the pre-calculated result */}
          <div className="text-center">
            <SpinningWheel
              bonusLevels={state.bonusLevels}
              selectedBonus={state.currentResult?.selectedBonus || null}
              isSpinning={state.isCalculating}
              onSpinComplete={handleSpinComplete}
            />
          </div>

          {/* Results in Modal - Uses the same pre-calculated result */}
          {state.currentResult && !state.isCalculating && (
            <ResultsDisplay
              result={state.currentResult}
              isRobloxMode={state.isRobloxMode}
              childName={state.childName}
            />
          )}
        </div>
      </Modal>
    </div>
  );
}

export default App;