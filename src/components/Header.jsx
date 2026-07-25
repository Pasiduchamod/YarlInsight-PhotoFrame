import React from 'react';

export default function Header() {
  return (
    <header className="relative border-b border-slate-800/80 bg-[#060b13]/80 backdrop-blur-xl sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3.5">
          <a href="#" className="flex items-center gap-2 group">
            <img 
              src="/sample_logo.png" 
              alt="YarlInsight Logo" 
              className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            />
          </a>
        </div>
      </div>
    </header>
  );
}
