import React, { useState } from 'react';
import { X, Copy, Check, Linkedin, Download, ExternalLink } from 'lucide-react';

export default function ShareModal({ isOpen, onClose, onDownload }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const defaultCaption = `Always learning. Always growing. 🚀

Proud to be part of Yarl Insight 3.0, where passionate learners come together to explore, build, and grow through technology.

#IEEEUOJ #YarlInsight2026 #YarlInsight #ContinuousLearning #TechCommunity #FutureReady`;

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(defaultCaption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenLinkedIn = () => {
    const linkedinUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(defaultCaption)}`;
    window.open(linkedinUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#0d1626] border border-slate-800/90 rounded-3xl shadow-2xl overflow-hidden text-slate-100 p-6 md:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="p-3 bg-gradient-to-br from-blue-700 to-amber-500 rounded-2xl text-white shadow-lg shadow-blue-600/20">
            <Linkedin className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight font-outfit">Share on LinkedIn</h3>
            <p className="text-xs text-slate-400">Follow these 2 easy steps to publish your entry</p>
          </div>
        </div>

        {/* Step 1: Download Image */}
        <div className="space-y-4">
          <div className="p-4 bg-slate-900/60 border border-slate-800/80 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 font-outfit">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs">1</span>
                Download Framed Photo
              </span>
            </div>
            <p className="text-xs text-slate-300 mb-3">
              Save your high-resolution framed photo to your device first.
            </p>
            <button
              onClick={onDownload}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold rounded-xl transition-colors border border-slate-700"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Download High-Res Photo (PNG)</span>
            </button>
          </div>

          {/* Step 2: Copy Caption & Open LinkedIn */}
          <div className="p-4 bg-slate-900/60 border border-slate-800/80 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 font-outfit">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs">2</span>
                Copy Caption & Post
              </span>
            </div>

            {/* Caption Box */}
            <div className="relative mb-3">
              <textarea
                readOnly
                value={defaultCaption}
                rows={5}
                className="w-full p-3.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-200 font-sans leading-relaxed resize-none focus:outline-none"
              />
              <button
                onClick={handleCopyCaption}
                className="absolute top-2.5 right-2.5 flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors shadow-sm"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-amber-400" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>
            </div>

            {/* Share to LinkedIn Trigger Button */}
            <button
              onClick={handleOpenLinkedIn}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-blue-700 via-blue-600 to-amber-500 hover:from-blue-600 hover:to-amber-400 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-blue-600/30 group"
            >
              <Linkedin className="w-4 h-4" />
              <span>Open LinkedIn Feed to Post</span>
              <ExternalLink className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-[11px] text-center text-slate-400 mt-5">
          Tip: Make sure to post publicly with hashtags <strong className="text-amber-400">#IEEEUOJ #YarlInsight2026</strong> so organizers can track your entry!
        </p>
      </div>
    </div>
  );
}
