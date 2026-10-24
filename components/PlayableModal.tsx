"use client";

import { useState, useEffect, useRef } from "react";

interface PlayableModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameUrl: string;
  title?: string;
}

type ViewportMode = "mobile" | "tablet" | "expanded";

export default function PlayableModal({
  isOpen,
  onClose,
  gameUrl,
  title = "Jenga – Interactive Playable Demo",
}: PlayableModalProps) {
  const [viewportMode, setViewportMode] = useState<ViewportMode>("mobile");
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsLoading(true);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleRestart = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="playable-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Dialog Container */}
      <div className="relative z-10 flex flex-col w-full max-w-5xl max-h-[96vh] rounded-3xl border border-white/15 bg-neutral-950/95 shadow-2xl shadow-cyan-500/10 overflow-hidden">
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-neutral-900/80 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3 min-w-0">
            {/* Game Controller Icon */}
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3
                  id="playable-modal-title"
                  className="truncate text-sm sm:text-base font-bold text-white"
                >
                  {title}
                </h3>
                <span className="hidden sm:inline-flex rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2 py-0.5 text-[10px] font-mono font-medium text-cyan-300">
                  Phaser 3 + Spine
                </span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Interactive Canvas Playable Ad • Matter.js Physics Engine
              </p>
            </div>
          </div>

          {/* Controls: Viewport switcher + Restart + Fullscreen + Close */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Viewport switchers */}
            <div className="flex items-center rounded-xl border border-white/10 bg-neutral-900 p-0.5">
              <button
                type="button"
                onClick={() => setViewportMode("mobile")}
                title="Mobile Portrait View (9:16)"
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${viewportMode === "mobile"
                  ? "bg-white text-black shadow-sm"
                  : "text-neutral-400 hover:text-white"
                  }`}
              >
                <span className="sm:inline">📱 Phone</span>
              </button>
              <button
                type="button"
                onClick={() => setViewportMode("tablet")}
                title="Tablet View (3:4)"
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${viewportMode === "tablet"
                  ? "bg-white text-black shadow-sm"
                  : "text-neutral-400 hover:text-white"
                  }`}
              >
                <span className="sm:inline">📱 Tablet</span>
              </button>
              <button
                type="button"
                onClick={() => setViewportMode("expanded")}
                title="Theater / Expanded View"
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${viewportMode === "expanded"
                  ? "bg-white text-black shadow-sm"
                  : "text-neutral-400 hover:text-white"
                  }`}
              >
                <span className="sm:inline">🖥️ Full</span>
              </button>
            </div>

            {/* Restart button */}
            <button
              type="button"
              onClick={handleRestart}
              title="Restart / Reload Playable"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-neutral-200 transition-colors hover:border-white/30 hover:bg-white/15"
            >
              <svg
                className="h-3.5 w-3.5 text-cyan-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span className="hidden md:inline">Restart</span>
            </button>

            {/* Open Direct Tab */}
            <a
              href={gameUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Open standalone playable in new tab"
              className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 p-1.5 text-neutral-300 transition-colors hover:border-white/30 hover:bg-white/15 hover:text-white"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              title="Close modal (Esc)"
              className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 p-1.5 text-neutral-300 transition-colors hover:border-red-500/40 hover:bg-red-500/20 hover:text-white"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Content / Stage */}
        <div className="relative flex flex-1 items-center justify-center bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 p-2 sm:p-4 overflow-auto min-h-[460px] sm:min-h-[560px]">
          {/* Subtle decorative grid/glow behind stage */}
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

          {/* Device Frame Wrapper depending on ViewportMode */}
          <div
            className={`relative transition-all duration-300 ease-out flex items-center justify-center ${viewportMode === "mobile"
              ? "w-[360px] sm:w-[390px] h-[640px] sm:h-[690px] rounded-[40px] border-4 border-neutral-700/80 bg-black p-2.5 shadow-2xl shadow-cyan-500/20 ring-1 ring-white/15"
              : viewportMode === "tablet"
                ? "w-[540px] sm:w-[600px] h-[640px] sm:h-[700px] rounded-3xl border-4 border-neutral-700/80 bg-black p-2.5 shadow-2xl shadow-blue-500/20 ring-1 ring-white/15"
                : "w-full h-[75vh] rounded-2xl border border-white/10 bg-black overflow-hidden shadow-xl"
              }`}
          >
            {/* Notch and dynamic island indicator for mobile frame */}
            {viewportMode === "mobile" && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 rounded-full bg-neutral-900/90 px-3 py-0.5 border border-white/10 pointer-events-none">
                <span className="h-2 w-2 rounded-full bg-neutral-700" />
                <span className="h-1.5 w-8 rounded-full bg-neutral-800" />
              </div>
            )}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-neutral-950/90 rounded-[32px]">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent shadow-lg shadow-cyan-500/20" />
                <p className="text-xs font-mono text-cyan-300">
                  Booting Phaser 3 Game Engine...
                </p>
                <p className="text-[11px] text-neutral-500">
                  Loading Spine 2D assets &amp; Matter.js physics
                </p>
              </div>
            )}

            {/* Playable iframe */}
            <iframe
              ref={iframeRef}
              key={iframeKey}
              src={gameUrl}
              title="Jenga Playable Ad"
              className="h-full w-full rounded-[30px] border-0 bg-neutral-950"
              allow="autoplay; fullscreen; accelerometer; gyroscope"
              onLoad={() => setIsLoading(false)}
            />
          </div>
        </div>

        {/* Bottom Status / Instructions Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-white/10 bg-neutral-900/70 px-4 py-3 sm:px-6 text-xs text-neutral-400">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              <strong className="text-white">Interactive Mechanics:</strong> Pull
              or tap the highlighted blocks while keeping the tower upright.
            </span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[11px] text-neutral-400">
            <span>Size: ~6.4MB Single-File</span>
            <span>•</span>
            <span>Ad Network: AppLovin / MRAID</span>
          </div>
        </div>
      </div>
    </div>
  );
}
