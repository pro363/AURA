import React from 'react';
import { TransformationItem, AssetType } from '../types';
import { GlassCard, Badge } from './UIComponents';
import { ArrowRight, Copy, Check, RefreshCcw } from 'lucide-react';

interface AssetComparisonProps {
  item: TransformationItem;
  onToggle: (id: string) => void;
}

export const AssetComparison: React.FC<AssetComparisonProps> = ({ item, onToggle }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <GlassCard className="group relative overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${item.type === AssetType.COPY ? 'bg-indigo-500/10 text-indigo-400' : 'bg-pink-500/10 text-pink-400'}`}>
                {item.type === AssetType.COPY ? <span className="text-xs font-bold">TXT</span> : <span className="text-xs font-bold">IMG</span>}
            </div>
            <div>
                <h3 className="text-sm font-medium text-gray-300">{item.suggestionLabel}</h3>
                <p className="text-xs text-gray-600">Replaces: {item.originalLabel}</p>
            </div>
        </div>
        <Badge color="blue">Detected AI Pattern</Badge>
      </div>

      {/* Comparison Body */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        {/* Connector Arrow (Desktop) */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-charcoal border border-glass-border items-center justify-center z-10">
            <ArrowRight className="w-4 h-4 text-gray-500" />
        </div>

        {/* Original (Bad) */}
        <div className="space-y-2 opacity-60 group-hover:opacity-100 transition-opacity">
            <p className="text-xs uppercase tracking-wider text-red-400 font-semibold mb-2">Original (Generic)</p>
            {item.type === AssetType.COPY ? (
                <div className="p-4 rounded-lg bg-red-900/10 border border-red-500/10 text-gray-400 font-mono text-sm leading-relaxed">
                    "{item.original}"
                </div>
            ) : (
                <div className="aspect-video rounded-lg overflow-hidden border border-red-500/10 opacity-50 grayscale">
                    <img src={item.original} alt="Original" className="w-full h-full object-cover" />
                </div>
            )}
        </div>

        {/* Suggestion (Good) */}
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                 <p className="text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-2">Suggestion (Human)</p>
                 {item.type === AssetType.COPY && (
                     <button onClick={() => handleCopy(item.suggestion)} className="text-gray-500 hover:text-white transition-colors">
                         {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                     </button>
                 )}
            </div>
           
            {item.type === AssetType.COPY ? (
                <div className="p-4 rounded-lg bg-emerald-900/10 border border-emerald-500/10 text-emerald-100 font-sans text-lg font-medium leading-relaxed shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                    "{item.suggestion}"
                </div>
            ) : (
                <div className="aspect-video rounded-lg overflow-hidden border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                    <img src={item.suggestion} alt="Suggestion" className="w-full h-full object-cover" />
                </div>
            )}
        </div>
      </div>

      {/* Footer / Reasoning */}
      <div className="mt-6 pt-4 border-t border-glass-border">
          <p className="text-sm text-gray-500 italic">
              <span className="text-indigo-400 not-italic font-medium mr-2">Analysis:</span>
              {item.reasoning}
          </p>
      </div>
    </GlassCard>
  );
};
