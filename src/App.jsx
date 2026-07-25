import React, { useState, useRef } from 'react';
import Header from './components/Header';
import CanvasEditor from './components/FrameCanvas';
import ShareModal from './components/ShareModal';
import { OFFICIAL_FRAME } from './utils/frameTemplates';
import { 
  UploadCloud, 
  Download, 
  Linkedin, 
  RefreshCw,
  Gift,
  ArrowRight
} from 'lucide-react';

export default function App() {
  const editorRef = useRef(null);

  // User uploaded photo
  const [imageSrc, setImageSrc] = useState(null);

  // Share Modal State
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Download Trigger
  const handleDownload = () => {
    if (!editorRef.current) return;
    const dataUrl = editorRef.current.getExportDataURL();
    if (!dataUrl) return;

    const link = document.createElement('a');
    link.download = 'YarlInsight-Frame.png';
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle Photo Upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-[#060b13] text-slate-100 flex flex-col relative overflow-x-hidden">
      {/* Background Glow Orbs */}
      <div className="glow-bg w-[550px] h-[550px] bg-blue-700 top-[-100px] left-[-100px]" />
      <div className="glow-bg w-[650px] h-[650px] bg-amber-500 bottom-[0px] right-[-150px]" />

      {/* Header */}
      <Header />

      {/* Hero Banner */}
      <section className="relative pt-10 pb-6 text-center px-4 max-w-4xl mx-auto">
        <div className="flex justify-center mb-5">
          <img src="/sample_logo.png" alt="YarlInsight" className="h-11 sm:h-14 w-auto object-contain drop-shadow-lg" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-outfit text-white mb-3.5 leading-tight">
          Get Your Official <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-blue-400">YarlInsight Frame</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Upload your photo, align it inside our official event frame, and share on LinkedIn!
        </p>
      </section>

      {/* Main Grid Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Canvas Preview */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="w-full glass-panel p-5 sm:p-7 rounded-3xl border border-slate-800/80 shadow-2xl">
              <CanvasEditor
                ref={editorRef}
                imageSrc={imageSrc}
                selectedFrame={OFFICIAL_FRAME}
                customBadgeText="ATTENDING YARLINSIGHT 2026"
              />

              {/* Action Buttons under Canvas */}
              {imageSrc && (
                <div className="mt-6 flex flex-col sm:flex-row gap-3.5 w-full max-w-xl">
                  <button
                    onClick={handleDownload}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 px-5 bg-slate-800/90 hover:bg-slate-700 text-white font-semibold text-sm rounded-xl border border-slate-700/80 transition-all shadow-md active:scale-[0.98] group"
                  >
                    <Download className="w-4 h-4 text-amber-400 group-hover:-translate-y-0.5 transition-transform" />
                    <span>Download Photo</span>
                  </button>

                  <button
                    onClick={() => setIsShareModalOpen(true)}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 px-5 bg-[#0a66c2] hover:bg-[#0854a0] text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-[#0a66c2]/25 active:scale-[0.98] group"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>Share on LinkedIn</span>
                    <ArrowRight className="w-4 h-4 opacity-75 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Upload & Instructions Panel */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Step 1: Photo Upload Section */}
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800/80 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2 font-outfit">
                  <UploadCloud className="w-5 h-5 text-amber-400" />
                  Step 1: Upload Your Photo
                </h3>
                {imageSrc && (
                  <button
                    onClick={() => setImageSrc(null)}
                    className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1 transition-colors font-medium"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Clear Photo
                  </button>
                )}
              </div>

              {/* Upload Dropzone */}
              <label className="relative flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-slate-700/80 hover:border-amber-400/90 rounded-2xl cursor-pointer bg-slate-900/40 hover:bg-slate-900/70 transition-all group overflow-hidden shadow-inner">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                  <div className="w-12 h-12 rounded-full bg-slate-800/80 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all">
                    <UploadCloud className="w-6 h-6 text-slate-300 group-hover:text-amber-400 transition-colors" />
                  </div>
                  <p className="text-sm font-semibold text-slate-200">
                    <span className="text-amber-400 underline decoration-amber-400/40 underline-offset-4">Click to upload</span> or drag & drop
                  </p>
                  <p className="text-xs text-slate-400 mt-1">Supports PNG, JPG, WebP photos</p>
                </div>
              </label>
            </div>

            {/* Step 2: Instructions Card */}
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800/80 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2 font-outfit">
                <Gift className="w-5 h-5 text-amber-400" />
                Step 2: Fit & Share
              </h3>

              <div className="space-y-3.5">
                <div className="flex items-start gap-3 p-3 bg-slate-900/50 border border-slate-800/60 rounded-xl">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/30">1</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Upload your photo and drag/zoom to align it nicely inside the frame.
                  </p>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-900/50 border border-slate-800/60 rounded-xl">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/30">2</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Click <strong className="text-white">Download Photo</strong> and copy our pre-written post caption.
                  </p>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-900/50 border border-slate-800/60 rounded-xl">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/30">3</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Post on LinkedIn using hashtags <strong className="text-amber-400">#IEEEUOJ #YarlInsight2026 #YarlInsight</strong>!
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        onDownload={handleDownload}
      />
    </div>
  );
}
