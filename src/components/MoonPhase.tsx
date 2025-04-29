import React from 'react';
import { getMoonPhase, getMoonPhaseName } from '../utils/moonCalculations';

interface MoonPhaseProps {
  date?: Date;
}

const MoonPhase: React.FC<MoonPhaseProps> = ({ date = new Date() }) => {
  const phase = getMoonPhase(date);
  const phaseName = getMoonPhaseName(phase);
  
  // Calculate the styling based on the moon phase (0-1)
  const getPhaseStyle = () => {
    // New moon is 0, full moon is 0.5
    if (phase < 0.5) {
      // Waxing (right side lit)
      const illuminationPercentage = phase * 2 * 100;
      return {
        backgroundImage: `linear-gradient(to left, 
          rgb(255, 255, 255) 50%, 
          rgba(23, 25, 35, 1) ${50 + illuminationPercentage / 2}%)`
      };
    } else {
      // Waning (left side lit)
      const illuminationPercentage = (1 - phase) * 2 * 100;
      return {
        backgroundImage: `linear-gradient(to right, 
          rgb(255, 255, 255) 50%, 
          rgba(23, 25, 35, 1) ${50 + illuminationPercentage / 2}%)`
      };
    }
  };

  return (
    <div className="text-center space-y-4">
      <h2 className="text-xl font-light text-gray-300">Current Moon Phase</h2>
      <div className="flex flex-col items-center">
        <div 
          className="w-36 h-36 rounded-full shadow-lg bg-gray-900 transition-all duration-1000 ease-in-out"
          style={getPhaseStyle()}
        ></div>
        <p className="mt-3 text-white text-xl">{phaseName}</p>
        <p className="text-gray-400 text-sm">
          {Math.round(phase * 100)}% through lunar cycle
        </p>
      </div>
    </div>
  );
};

export default MoonPhase;