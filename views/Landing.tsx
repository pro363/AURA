import React, { useState } from 'react';
import { Button, Input } from '../components/UIComponents';
import { ArrowRight, Wand2 } from 'lucide-react';

interface LandingProps {
  onStart: (url: string) => void;
}

export const Landing: React.FC<LandingProps> = ({ onStart }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onStart(url);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-4xl mx-auto px-6 text-center">
      {/* Decorative Blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400">
        <Wand2 className="w-3 h-3 text-purple-400" />
        <span>V 1.0.0 Public Preview</span>
      </div>

      <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-500">
        Humanize <br className="hidden md:block" /> Your Presence.
      </h1>

      <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 font-light leading-relaxed">
        The web is drowning in generic AI content. 
        <span className="text-white font-medium"> AURA </span> restores the soul to your digital assets.
        Enter your URL to detect and replace synthetic patterns.
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-4">
        <div className="relative group">
            <Input 
                placeholder="https://your-startup.com" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="pr-12"
            />
            <div className="absolute right-2 top-2 bottom-2">
                 <Button 
                    type="submit" 
                    disabled={!url} 
                    className="h-full !px-4 !py-0 aspect-square rounded-md"
                >
                    <ArrowRight className="w-5 h-5" />
                 </Button>
            </div>
        </div>
        <p className="text-xs text-gray-600">
            Supports Landing Pages, Blogs, and Portfolio sites.
        </p>
      </form>

      {/* Mock Footer Links */}
      <div className="mt-24 flex gap-8 text-sm text-gray-600">
        <span>Studio Quality</span>
        <span className="w-1 h-1 rounded-full bg-gray-700 my-auto"></span>
        <span>Semantic Analysis</span>
        <span className="w-1 h-1 rounded-full bg-gray-700 my-auto"></span>
        <span>De-AI Engine</span>
      </div>
    </div>
  );
};
