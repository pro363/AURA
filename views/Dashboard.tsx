import React from 'react';
import { AnalysisResult } from '../types';
import { Button, GlassCard, Badge } from '../components/UIComponents';
import { AssetComparison } from '../components/AssetComparison';
import { RefreshCw, Download, ExternalLink, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface DashboardProps {
  result: AnalysisResult;
  onReset: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ result, onReset }) => {
  
  // Calculate score color
  const getScoreColor = (score: number) => {
    if (score > 80) return "text-red-500";
    if (score > 50) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-12 animate-[fadeIn_0.5s_ease-out]">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
            <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-serif text-white">Analysis Report</h2>
                <span className="px-2 py-1 bg-white/10 text-xs rounded text-gray-300 font-mono">{new URL(result.url).hostname}</span>
            </div>
            <p className="text-gray-400 max-w-xl">
                We detected high levels of synthetic patterns. Below are studio-grade replacements designed to ground your brand in reality.
            </p>
        </div>
        <div className="flex gap-3">
            <Button variant="secondary" onClick={onReset} icon={<RefreshCw className="w-4 h-4"/>}>
                Analyze New
            </Button>
            <Button variant="primary" icon={<Download className="w-4 h-4"/>}>
                Export Assets
            </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <GlassCard className="flex flex-col justify-between h-40">
            <span className="text-xs uppercase text-gray-500 font-semibold tracking-wider">Artificiality Score</span>
            <div className="flex items-baseline gap-2">
                <span className={`text-6xl font-light ${getScoreColor(result.score)}`}>{result.score}</span>
                <span className="text-xl text-gray-600">/100</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
                {result.score > 70 ? "Critical levels of AI tropes detected." : "Moderate AI influence."}
            </p>
        </GlassCard>

        <GlassCard className="col-span-1 md:col-span-2 flex flex-col justify-between h-40">
             <div className="flex justify-between items-start">
                <span className="text-xs uppercase text-gray-500 font-semibold tracking-wider">Detected Patterns</span>
                <AlertTriangle className="text-yellow-500/50 w-5 h-5" />
             </div>
             <div className="flex flex-wrap gap-2 mt-4">
                 {result.detectedPatterns.map((pattern, i) => (
                     <span key={i} className="px-3 py-1.5 rounded-md bg-white/5 border border-white/5 text-sm text-gray-300">
                         {pattern}
                     </span>
                 ))}
             </div>
             <div className="mt-auto pt-4 flex items-center gap-2 text-xs text-gray-500">
                 <CheckCircle2 className="w-3 h-3 text-blue-500" />
                 <span>Automated Heuristic Scan Complete</span>
             </div>
        </GlassCard>
      </div>

      {/* Tabs / Filter (Visual only for now) */}
      <div className="flex gap-6 border-b border-white/5 mb-8 pb-4 overflow-x-auto">
          <button className="text-white font-medium border-b-2 border-blue-500 pb-4 -mb-4.5">All Assets</button>
          <button className="text-gray-500 hover:text-white transition-colors">Copywriting</button>
          <button className="text-gray-500 hover:text-white transition-colors">Imagery</button>
          <button className="text-gray-500 hover:text-white transition-colors">Color System</button>
      </div>

      {/* Results List */}
      <div className="grid gap-8">
        {result.items.map((item) => (
            <AssetComparison 
                key={item.id} 
                item={item} 
                onToggle={() => {}} 
            />
        ))}
      </div>

    </div>
  );
};
