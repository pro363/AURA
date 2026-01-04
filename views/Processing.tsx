import React, { useEffect, useState } from 'react';

const steps = [
  "Connecting to URL...",
  "Parsing DOM Structure...",
  "Identifying 'Uncanny Valley' Copy...",
  "Detecting Stock Asset Patterns...",
  "Consulting Design Heuristics...",
  "Generative Humanization...",
  "Finalizing Premium Assets..."
];

export const Processing: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 800); // Cycle through steps

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full text-center relative overflow-hidden">
      
      {/* Central Animation */}
      <div className="relative w-32 h-32 mb-12">
        <div className="absolute inset-0 border-t-2 border-l-2 border-white/20 rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-r-2 border-b-2 border-blue-500/40 rounded-full animate-spin duration-1000"></div>
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        </div>
      </div>

      <h2 className="text-2xl font-light text-white mb-2 tracking-wide">
        Analyzing <span className="font-serif italic text-blue-400">Essence</span>
      </h2>
      
      <div className="h-8 overflow-hidden relative">
        <p key={currentStep} className="text-gray-400 font-mono text-sm animate-pulse">
            {">"} {steps[currentStep]}
        </p>
      </div>

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20" 
           style={{ 
             backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }}>
      </div>
    </div>
  );
};
