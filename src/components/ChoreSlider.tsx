import React from 'react';
import { TrendingUp, Award } from 'lucide-react';

interface ChoreSliderProps {
  choreGrade: number;
  onChoreGradeChange: (grade: number) => void;
}

const GRADE_INFO = {
  1: { letter: 'F', color: '#EF4444', description: 'Needs Major Improvement' },
  2: { letter: 'D-', color: '#F97316', description: 'Below Expectations' },
  3: { letter: 'D', color: '#F59E0B', description: 'Minimal Effort' },
  4: { letter: 'D+', color: '#EAB308', description: 'Some Effort Shown' },
  5: { letter: 'C', color: '#84CC16', description: 'Average Performance' },
  6: { letter: 'B-', color: '#22C55E', description: 'Good Work' },
  7: { letter: 'B+', color: '#10B981', description: 'Very Good' },
  8: { letter: 'A-', color: '#06B6D4', description: 'Excellent Work' },
  9: { letter: 'A+', color: '#3B82F6', description: 'Outstanding!' },
  10: { letter: 'S', color: '#8B5CF6', description: 'Perfect Performance!' }
};

export const ChoreSlider: React.FC<ChoreSliderProps> = ({
  choreGrade,
  onChoreGradeChange
}) => {
  const currentGrade = GRADE_INFO[choreGrade as keyof typeof GRADE_INFO];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Award className="text-yellow-500" />
        Chore Performance Rating
      </h2>
      
      <div className="space-y-6">
        {/* Current Grade Display */}
        <div className="text-center">
          <div 
            className="inline-flex items-center justify-center w-24 h-24 rounded-full text-4xl font-bold text-white shadow-lg mb-4"
            style={{ backgroundColor: currentGrade.color }}
          >
            {currentGrade.letter}
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Grade: {currentGrade.letter}
          </h3>
          <p className="text-lg text-gray-600 mb-4">
            {currentGrade.description}
          </p>
        </div>

        {/* Slider */}
        <div className="relative">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Needs Work</span>
            <span>Perfect!</span>
          </div>
          
          <div className="relative">
            <input
              type="range"
              min="1"
              max="10"
              value={choreGrade}
              onChange={(e) => onChoreGradeChange(parseInt(e.target.value))}
              className="w-full h-3 bg-gradient-to-r from-red-200 via-yellow-200 via-green-200 to-purple-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, 
                  #FEE2E2 0%, #FED7AA 20%, #FEF3C7 40%, 
                  #ECFCCB 60%, #D1FAE5 80%, #E0E7FF 100%)`
              }}
            />
          </div>
          
          {/* Grade markers */}
          <div className="flex justify-between mt-2 text-xs">
            {Object.entries(GRADE_INFO).map(([grade, info]) => (
              <div 
                key={grade}
                className="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform"
                onClick={() => onChoreGradeChange(parseInt(grade))}
              >
                <div 
                  className={`w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center ${
                    parseInt(grade) === choreGrade ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                  }`}
                  style={{ backgroundColor: info.color }}
                >
                  {info.letter}
                </div>
                <span className="mt-1 text-gray-400">{grade}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Impact */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold text-blue-800">Bonus Impact</h4>
          </div>
          <p className="text-blue-700 text-sm">
            {choreGrade >= 8 && "Amazing work! You'll have the best chances for rare bonuses! 🌟"}
            {choreGrade >= 6 && choreGrade < 8 && "Good job! You have solid chances for nice bonuses! 👍"}
            {choreGrade >= 4 && choreGrade < 6 && "Keep trying! Your bonus chances are average. 📈"}
            {choreGrade < 4 && "Time to step up your game! Better chore performance = better bonuses! 💪"}
          </p>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: ${currentGrade.color};
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: ${currentGrade.color};
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          cursor: pointer;
          border: none;
        }
        
        .slider::-ms-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: ${currentGrade.color};
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};