import React, { useState } from 'react';
import { Landing } from './views/Landing';
import { Processing } from './views/Processing';
import { Dashboard } from './views/Dashboard';
import { AppState, AnalysisResult } from './types';
import { analyzeAndHumanize } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleStartAnalysis = async (url: string) => {
    setState(AppState.PROCESSING);
    
    // Simulate initial delay for "connection" effect
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      // Call our service (Simulated scrape + Real Gemini generation)
      const data = await analyzeAndHumanize(url);
      
      setResult({
        url,
        ...data
      });
      
      // Ensure the loader stays for at least a few seconds to feel "heavy"/premium
      setTimeout(() => {
        setState(AppState.COMPLETE);
      }, 3000);

    } catch (error) {
      console.error(error);
      setState(AppState.ERROR); // In a real app, we'd have an error view
      setState(AppState.IDLE); // Reset for now
    }
  };

  const handleReset = () => {
    setState(AppState.IDLE);
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation / Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto">
            <span className="font-serif text-xl tracking-tighter font-bold text-white">AURA</span>
        </div>
        <div className="pointer-events-auto">
             <a href="#" className="text-xs uppercase tracking-widest text-gray-500 hover:text-white transition-colors">About</a>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col pt-24 relative z-10">
        
        {state === AppState.IDLE && (
            <Landing onStart={handleStartAnalysis} />
        )}

        {state === AppState.PROCESSING && (
            <Processing />
        )}

        {state === AppState.COMPLETE && result && (
            <Dashboard result={result} onReset={handleReset} />
        )}

      </main>

      {/* Background Noise/Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 mix-blend-overlay"
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>
    </div>
  );
};

export default App;
