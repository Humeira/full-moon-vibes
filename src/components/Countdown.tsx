import React, { useState, useEffect } from 'react';
import { getTimeRemaining } from '../utils/moonCalculations';
import { Clock } from 'lucide-react';

interface CountdownProps {
  targetDate: Date;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(targetDate));
  
  useEffect(() => {
    // Update the countdown every second
    const timer = setInterval(() => {
      setTimeRemaining(getTimeRemaining(targetDate));
    }, 1000);
    
    // Clean up the interval on component unmount
    return () => clearInterval(timer);
  }, [targetDate]);
  
  return (
    <div className="p-6 bg-indigo-900/20 backdrop-blur-md rounded-lg shadow-lg max-w-md w-full">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="text-indigo-300" size={20} />
        <h2 className="text-xl font-light text-indigo-200">Countdown to Full Moon</h2>
      </div>
      
      <div className="grid grid-cols-4 gap-3 text-center">
        <div className="bg-indigo-950/80 p-3 rounded-lg shadow-inner">
          <div className="text-3xl font-semibold text-white animate-pulse">
            {timeRemaining.days}
          </div>
          <div className="text-xs text-indigo-300">DAYS</div>
        </div>
        
        <div className="bg-indigo-950/80 p-3 rounded-lg shadow-inner">
          <div className="text-3xl font-semibold text-white">
            {timeRemaining.hours}
          </div>
          <div className="text-xs text-indigo-300">HOURS</div>
        </div>
        
        <div className="bg-indigo-950/80 p-3 rounded-lg shadow-inner">
          <div className="text-3xl font-semibold text-white">
            {timeRemaining.minutes}
          </div>
          <div className="text-xs text-indigo-300">MINUTES</div>
        </div>
        
        <div className="bg-indigo-950/80 p-3 rounded-lg shadow-inner">
          <div className="text-3xl font-semibold text-white">
            {timeRemaining.seconds}
          </div>
          <div className="text-xs text-indigo-300">SECONDS</div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;