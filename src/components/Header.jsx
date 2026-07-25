import React from 'react';
import { Gift, Award } from 'lucide-react';

export default function Header() {
  return (
    <header className="relative border-b border-slate-800/80 bg-[#060b13]/80 backdrop-blur-xl sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo & Tag */}
        <div className="flex items-center gap-3.5">
          <a href="#" className="flex items-center gap-2 group">
            <img 
              src="/sample_logo.png" 
              alt="YarlInsight Logo" 
              className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            />
          </a>
          <div className="hidden sm:flex items-center border-l border-slate-800/80 pl-3.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 text-[11px] font-bold tracking-wide uppercase bg-amber-500/10 text-amber-400 border border-amber-500/25 rounded-full shadow-sm">
              <Award className="w-3 h-3 text-amber-400" />
              Official Giveaway 2026
            </span>
          </div>
        </div>

        {/* Right Action Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800/90 text-xs font-semibold text-slate-200 shadow-inner">
            <Gift className="w-4 h-4 text-amber-400" />
            <span>Win Free Swags</span>
          </div>
        </div>
      </div>
    </header>
  );
}
