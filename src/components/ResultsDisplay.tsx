import React from 'react';
import { ExternalLink, Trophy, DollarSign } from 'lucide-react';
import { AllowanceResult } from '../types';
import { convertToRobux } from '../utils/calculations';
import { ROBUX_CONVERSION_RATE, ROBLOX_PURCHASE_URL } from '../utils/robloxData';

interface ResultsDisplayProps {
  result: AllowanceResult;
  isRobloxMode: boolean;
  childName: string;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  result,
  isRobloxMode,
  childName
}) => {
  const robuxAmount = convertToRobux(result.finalAmount, ROBUX_CONVERSION_RATE);
  
  return (
    <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl shadow-lg p-6 border-2 border-yellow-300">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500 rounded-full mb-4">
          <Trophy className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          🎉 Congratulations{childName ? `, ${childName}` : ''}! 🎉
        </h2>
        <p className="text-lg text-gray-600">
          You got a <span className="font-bold" style={{ color: result.selectedBonus.color }}>
            {result.selectedBonus.name}
          </span> bonus!
        </p>
      </div>

      <div className="bg-white rounded-lg p-6 mb-6">
        <div className="text-center mb-4">
          <div className="text-4xl font-bold text-green-600 mb-2">
            ${result.finalAmount.toFixed(2)}
          </div>
          <p className="text-gray-600">{result.calculation}</p>
        </div>

        {isRobloxMode && (
          <div className="border-t pt-4">
            <div className="text-center mb-4">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {robuxAmount} Robux
              </div>
              <p className="text-sm text-gray-500">
                (Approximately {ROBUX_CONVERSION_RATE} Robux per $1)
              </p>
            </div>
            
            <div className="text-center">
              <a
                href={ROBLOX_PURCHASE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <DollarSign className="w-4 h-4" />
                Buy Robux on Roblox
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">Bonus Details</h4>
          <div className="space-y-1 text-blue-700">
            <div>Name: {result.selectedBonus.name}</div>
            <div>Multiplier: {result.selectedBonus.multiplier}x</div>
            <div>Probability: {result.selectedBonus.probability}%</div>
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-semibold text-green-800 mb-2">Math Breakdown</h4>
          <div className="space-y-1 text-green-700">
            <div>Base Amount: ${result.baseAmount}</div>
            <div>Bonus Multiplier: {result.selectedBonus.multiplier}x</div>
            <div>Final Amount: ${result.finalAmount.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};