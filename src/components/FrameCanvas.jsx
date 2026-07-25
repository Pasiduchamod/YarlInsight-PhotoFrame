import React, { useEffect, useRef, useState, useCallback, useImperativeHandle, forwardRef } from 'react';
import { ZoomIn, ZoomOut, RotateCw, Move, RefreshCw } from 'lucide-react';

const CanvasEditor = forwardRef(({
  imageSrc,
  selectedFrame,
  customFrameImg,
  customBadgeText
}, ref) => {
  const canvasRef = useRef(null);

  // Base cover-fit scale calculated when user image loads
  const [baseScale, setBaseScale] = useState(1);
  // Fixed multiplier: 0.5 (50%) to 2.5 (250%)
  const [zoomMultiplier, setZoomMultiplier] = useState(1.0);
  
  const [rotation, setRotation] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Loaded HTML Image object
  const [userImage, setUserImage] = useState(null);

  // Canvas size resolution (Square HD 1080x1080)
  const CANVAS_SIZE = 1080;

  // Load user image when imageSrc changes
  useEffect(() => {
    if (!imageSrc) {
      setUserImage(null);
      return;
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setUserImage(img);
      // Calculate cover fit base scale
      const coverFit = Math.max(CANVAS_SIZE / img.width, CANVAS_SIZE / img.height);
      setBaseScale(coverFit);
      setZoomMultiplier(1.0); // Reset to 100% fit
      setOffset({ x: 0, y: 0 });
      setRotation(0);
    };
    img.src = imageSrc;
  }, [imageSrc]);

  // Actual rendered scale
  const currentScale = baseScale * zoomMultiplier;

  // Main render loop to draw photo + frame overlay on HTML5 Canvas
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw user photo if present
    if (userImage) {
      ctx.save();
      // Move to canvas center for rotation & scaling around center
      ctx.translate(CANVAS_SIZE / 2 + offset.x, CANVAS_SIZE / 2 + offset.y);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(currentScale, currentScale);

      // Draw centered image
      const drawX = -userImage.width / 2;
      const drawY = -userImage.height / 2;
      ctx.drawImage(userImage, drawX, drawY);

      ctx.restore();
    } else {
      // Placeholder state if no image is uploaded yet
      ctx.fillStyle = '#0b1424';
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      
      ctx.fillStyle = '#64748b';
      ctx.font = "600 36px 'Inter', sans-serif";
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Upload your photo to view frame', CANVAS_SIZE / 2, CANVAS_SIZE / 2);
    }

    // Draw Frame Overlay
    if (customFrameImg) {
      ctx.drawImage(customFrameImg, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
    } else if (selectedFrame && selectedFrame.drawOverlay) {
      selectedFrame.drawOverlay(ctx, CANVAS_SIZE, CANVAS_SIZE, customBadgeText);
    }
  }, [userImage, currentScale, rotation, offset, selectedFrame, customFrameImg, customBadgeText]);

  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  // Expose export function to parent
  useImperativeHandle(ref, () => ({
    getExportDataURL: () => {
      const canvas = canvasRef.current;
      if (!canvas) return null;
      return canvas.toDataURL('image/png', 1.0);
    }
  }));

  // Pointer / Mouse events for drag-to-position
  const handlePointerDown = (e) => {
    if (!userImage) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y
    });
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Center fit helper
  const handleResetPosition = () => {
    if (!userImage) return;
    setZoomMultiplier(1.0);
    setOffset({ x: 0, y: 0 });
    setRotation(0);
  };

  // Step Zoom in/out helpers
  const handleZoomOut = () => {
    setZoomMultiplier(prev => Math.max(0.5, parseFloat((prev - 0.15).toFixed(2))));
  };

  const handleZoomIn = () => {
    setZoomMultiplier(prev => Math.min(2.5, parseFloat((prev + 0.15).toFixed(2))));
  };

  return (
    <div className="flex flex-col items-center w-full max-w-xl mx-auto">
      {/* Canvas Container with Drag Handlers */}
      <div 
        className="relative w-full aspect-square bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/60 cursor-grab active:cursor-grabbing group touch-none select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          className="w-full h-full object-contain"
        />

        {/* Drag Hint Overlay */}
        {userImage && (
          <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md text-slate-300 text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-slate-700/80 pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity shadow-lg">
            <Move className="w-3.5 h-3.5 text-amber-400" />
            <span>Drag photo to position</span>
          </div>
        )}
      </div>

      {/* Interactive Controls Bar */}
      {userImage && (
        <div className="w-full bg-slate-900/90 border border-slate-800 backdrop-blur-md rounded-xl p-4 mt-4 shadow-lg">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Zoom Slider with Clickable + and - Buttons */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto flex-1 max-w-xs">
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoomMultiplier <= 0.5}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 transition-colors border border-slate-700 shrink-0"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4 text-amber-400" />
              </button>

              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.05"
                value={zoomMultiplier}
                onChange={(e) => setZoomMultiplier(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />

              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoomMultiplier >= 2.5}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 transition-colors border border-slate-700 shrink-0"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4 text-amber-400" />
              </button>

              <span className="text-xs font-mono text-slate-300 w-12 text-right shrink-0">
                {Math.round(zoomMultiplier * 100)}%
              </span>
            </div>

            {/* Rotation & Reset Buttons */}
            <div className="flex items-center justify-end gap-2 w-full sm:w-auto shrink-0">
              <button
                type="button"
                onClick={() => setRotation((prev) => (prev + 90) % 360)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
                title="Rotate 90 degrees"
              >
                <RotateCw className="w-3.5 h-3.5 text-amber-400" />
                <span>Rotate</span>
              </button>

              <button
                type="button"
                onClick={handleResetPosition}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
                title="Reset Position"
              >
                <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                <span>Reset</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
});

export default CanvasEditor;
