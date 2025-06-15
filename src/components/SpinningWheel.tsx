import React, { useEffect, useState } from 'react';
import { BonusLevel } from '../types';

interface SpinningWheelProps {
  bonusLevels: BonusLevel[];
  selectedBonus: BonusLevel | null;
  isSpinning: boolean;
  onSpinComplete: () => void;
}

export const SpinningWheel: React.FC<SpinningWheelProps> = ({
  bonusLevels,
  selectedBonus,
  isSpinning,
  onSpinComplete
}) => {
  const [rotation, setRotation] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isSpinning && selectedBonus) {
      // Calculate segment positions in the original wheel
      let cumulativeAngle = 0;
      let targetSegmentCenter = 0;
      let foundTarget = false;
      
      for (let i = 0; i < bonusLevels.length; i++) {
        const level = bonusLevels[i];
        const segmentAngle = (level.probability / 100) * 360;
        const segmentCenter = cumulativeAngle + (segmentAngle / 2);
        
        if (level.id === selectedBonus.id) {
          targetSegmentCenter = segmentCenter;
          foundTarget = true;
          break;
        }
        
        cumulativeAngle += segmentAngle;
      }
      
      if (!foundTarget) return;
      
      // Calculate rotation to bring target to pointer (0°)
      const extraSpins = 8 + Math.random() * 4;
      const baseRotationNeeded = -targetSegmentCenter;
      const normalizedBaseRotation = baseRotationNeeded < 0 ? baseRotationNeeded : baseRotationNeeded - 360;
      const totalRotation = (360 * extraSpins) + normalizedBaseRotation;
      
      // Verification and emergency correction
      const finalTargetPosition = (targetSegmentCenter + totalRotation) % 360;
      const normalizedFinalPosition = finalTargetPosition < 0 ? finalTargetPosition + 360 : finalTargetPosition;
      
      let finalRotation = totalRotation;
      
      if (!(Math.abs(normalizedFinalPosition) < 1 || Math.abs(normalizedFinalPosition - 360) < 1)) {
        const correctionNeeded = -normalizedFinalPosition;
        finalRotation = totalRotation + correctionNeeded;
      }
      
      setRotation(finalRotation);

      const timer = setTimeout(() => {
        setShowConfetti(true);
        onSpinComplete();
        setTimeout(() => setShowConfetti(false), 4000);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isSpinning, selectedBonus, bonusLevels, onSpinComplete]);

  const createWheelSegments = (size: number) => {
    let cumulativeAngle = 0;
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = (size / 2) - 30;
    
    return bonusLevels.map((level, index) => {
      const segmentAngle = (level.probability / 100) * 360;
      const startAngle = cumulativeAngle;
      cumulativeAngle += segmentAngle;
      
      // Create SVG path for segment
      const startAngleRad = (startAngle - 90) * Math.PI / 180;
      const endAngleRad = (startAngle + segmentAngle - 90) * Math.PI / 180;
      
      const x1 = centerX + radius * Math.cos(startAngleRad);
      const y1 = centerY + radius * Math.sin(startAngleRad);
      const x2 = centerX + radius * Math.cos(endAngleRad);
      const y2 = centerY + radius * Math.sin(endAngleRad);
      
      const largeArcFlag = segmentAngle > 180 ? 1 : 0;
      
      const pathData = [
        `M ${centerX} ${centerY}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        'Z'
      ].join(' ');
      
      // Text positioning
      const textAngle = startAngle + segmentAngle / 2;
      const textAngleRad = (textAngle - 90) * Math.PI / 180;
      const textRadius = radius * 0.7;
      const textX = centerX + textRadius * Math.cos(textAngleRad);
      const textY = centerY + textRadius * Math.sin(textAngleRad);
      
      return (
        <g key={level.id}>
          {/* Main segment */}
          <path
            d={pathData}
            fill={level.color}
            stroke="white"
            strokeWidth="2"
          />
          
          {/* Small white circle background for text */}
          <circle
            cx={textX}
            cy={textY}
            r={size / 25}
            fill="white"
            stroke="rgba(0,0,0,0.1)"
            strokeWidth="1"
          />
          
          {/* Level name ONLY - clean and simple */}
          <text
            x={textX}
            y={textY}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#374151"
            fontSize={size / 35}
            fontWeight="600"
          >
            {level.name}
          </text>
        </g>
      );
    });
  };

  // Larger wheel size for better visibility in modal
  const wheelSize = 500;

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        {/* Decorative outer ring */}
        <div 
          className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 p-4 shadow-2xl"
          style={{ width: wheelSize + 40, height: wheelSize + 40, left: -20, top: -20 }}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-white to-gray-100 p-3 shadow-inner">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-50 to-gray-200" />
          </div>
        </div>
        
        <svg 
          width={wheelSize} 
          height={wheelSize} 
          className="relative z-10 drop-shadow-xl"
        >
          {/* Wheel segments */}
          <g
            style={{
              transform: `rotate(${rotation}deg)`,
              transformOrigin: `${wheelSize/2}px ${wheelSize/2}px`,
              transition: isSpinning 
                ? 'transform 4s cubic-bezier(0.25, 0.46, 0.45, 0.94)' 
                : 'none'
            }}
          >
            {createWheelSegments(wheelSize)}
          </g>
          
          {/* Center hub */}
          <circle
            cx={wheelSize/2}
            cy={wheelSize/2}
            r={wheelSize/12}
            fill="white"
            stroke="#374151"
            strokeWidth="3"
          />
          
          {/* Center icon */}
          <text
            x={wheelSize/2}
            y={wheelSize/2 + 6}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={wheelSize/15}
            fill="#374151"
          >
            💰
          </text>
          
          {/* Clean pointer */}
          <polygon
            points={`${wheelSize/2},15 ${wheelSize/2 + 15},40 ${wheelSize/2 - 15},40`}
            fill="#F59E0B"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
        
        {/* Confetti effect */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-bounce text-2xl"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1.5 + Math.random() * 2}s`,
                }}
              >
                {['🎉', '✨', '🎊', '💫', '⭐', '🌟'][Math.floor(Math.random() * 6)]}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Spinning status indicator */}
      {isSpinning && (
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3 text-2xl font-bold text-gray-700">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            <span className="animate-pulse bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Spinning the wheel of fortune...
            </span>
          </div>
          <div className="text-lg text-gray-600 animate-bounce">
            🎰 Good luck! 🍀
          </div>
        </div>
      )}
    </div>
  );
};