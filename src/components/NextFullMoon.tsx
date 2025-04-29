import React from 'react';
import { formatDate } from '../utils/moonCalculations';
import { Moon } from 'lucide-react';

interface NextFullMoonProps {
  date: Date;
}

const NextFullMoon: React.FC<NextFullMoonProps> = ({ date }) => {
  return (
    <div className="relative">
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <div className="flex justify-center mb-3">
          <Moon className="text-yellow-200" size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold text-white mb-2">
          Next Full Moon
        </h1>
        <div 
          className="text-2xl md:text-3xl text-yellow-100 mt-6 flex flex-col items-center"
        >
          <div className="bg-indigo-900/30 backdrop-blur-sm py-4 px-6 rounded-lg border border-indigo-400/20 shadow-lg">
            {formatDate(date)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextFullMoon;