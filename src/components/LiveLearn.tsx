'use client';

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ArrowUp, ArrowRight, RotateCcw, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ChatContextWindow } from './LiveLearn/ChatContextWindow';
import { getResponseForQuestion, sampleQuestions } from './LiveLearn/mockResponses';
import type { ChatMessage } from './LiveLearn/types';

type LiveLearnProps = {
  isSidebarCollapsed: boolean;
  isSidebarHovering: boolean;
  showTrainingBarTooltip?: boolean;
  onDismissTooltip?: () => void;
  isHidden?: boolean;
};

export function LiveLearn({ isSidebarCollapsed, isSidebarHovering, showTrainingBarTooltip, onDismissTooltip, isHidden = false }: LiveLearnProps) {
  const [input, setInput] = useState('');
  const [currentMessage, setCurrentMessage] = useState<ChatMessage | null>(null);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showHelpSuggestions, setShowHelpSuggestions] = useState(false);
  const [tooltipVideoEnded, setTooltipVideoEnded] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipAnimateIn, setTooltipAnimateIn] = useState(false);
  // Second tooltip (ask anything)
  const [showTooltip2, setShowTooltip2] = useState(false);
  const [tooltip2VideoEnded, setTooltip2VideoEnded] = useState(false);
  const [tooltip2Visible, setTooltip2Visible] = useState(false);
  const [tooltip2AnimateIn, setTooltip2AnimateIn] = useState(false);
  // Third tooltip (after first search close)
  const [showTooltip3, setShowTooltip3] = useState(false);
  const [tooltip3VideoEnded, setTooltip3VideoEnded] = useState(false);
  const [tooltip3Visible, setTooltip3Visible] = useState(false);
  const [tooltip3AnimateIn, setTooltip3AnimateIn] = useState(false);
  // Celebration video popup (after 3rd search)
  const [showCelebrationVideo, setShowCelebrationVideo] = useState(false);
  const [celebrationVideoEnded, setCelebrationVideoEnded] = useState(false);
  const [searchCount, setSearchCount] = useState(0);
  const hasClosedSuggestionsRef = useRef(false);
  const hasClosedFirstSearchRef = useRef(false);
  const celebrationVideoRef = useRef<HTMLVideoElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const contextWindowRef = useRef<HTMLDivElement>(null);
  const taskbarRef = useRef<HTMLDivElement>(null);
  const tooltipVideoRef = useRef<HTMLVideoElement>(null);
  const tooltip2VideoRef = useRef<HTMLVideoElement>(null);
  const tooltip3VideoRef = useRef<HTMLVideoElement>(null);

  // Filter suggestions based on input
  const suggestions = useMemo(() => {
    if (!input.trim() || input.length < 2) return [];
    const lowerInput = input.toLowerCase();
    return sampleQuestions.filter(q =>
      q.toLowerCase().includes(lowerInput)
    ).slice(0, 5); // Limit to 5 suggestions
  }, [input]);

  // Show/hide suggestions based on filtered results
  useEffect(() => {
    setShowSuggestions(suggestions.length > 0 && input.length >= 2);
    setSelectedSuggestionIndex(-1);
  }, [suggestions, input]);

  const firePurpleConfetti = useCallback(() => {
    const duration = 2500;
    const end = Date.now() + duration;
    const purples = ['#6A28EA', '#8B5CF6', '#A78BFA', '#C4B5FD', '#7C3AED'];

    const frame = () => {
      // Shoot from left side
      confetti({
        particleCount: 3,
        angle: 30,
        spread: 50,
        origin: { x: 0, y: 0.5 },
        colors: purples,
        gravity: 0.6,
        ticks: 400,
        scalar: 1.1,
        startVelocity: 45,
      });
      // Shoot from right side
      confetti({
        particleCount: 3,
        angle: 150,
        spread: 50,
        origin: { x: 1, y: 0.5 },
        colors: purples,
        gravity: 0.6,
        ticks: 400,
        scalar: 1.1,
        startVelocity: 45,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newCount = searchCount + 1;
    setSearchCount(newCount);

    if (newCount === 3) {
      setTimeout(firePurpleConfetti, 1000);
      setTimeout(() => setShowCelebrationVideo(true), 3000);
    }

    const response = getResponseForQuestion(input);
    setCurrentMessage(response);
    setInput('');
    setShowSuggestions(false);
    setShowHelpSuggestions(false);
  };

  const handleHelpClick = useCallback(() => {
    if (showTrainingBarTooltip) {
      onDismissTooltip?.();
    }
    // If closing suggestions for the first time, trigger tooltip 2
    if (showHelpSuggestions && !hasClosedSuggestionsRef.current) {
      hasClosedSuggestionsRef.current = true;
      setShowTooltip2(true);
    }
    setShowHelpSuggestions(prev => !prev);
    setShowSuggestions(false);
  }, [showTrainingBarTooltip, onDismissTooltip, showHelpSuggestions]);

  const selectSuggestion = useCallback((suggestion: string) => {
    setInput(suggestion);
    setShowSuggestions(false);
    setShowHelpSuggestions(false);
    setSelectedSuggestionIndex(-1);
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
      setShowHelpSuggestions(false);
      setSelectedSuggestionIndex(-1);
      return;
    }

    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedSuggestionIndex(prev =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedSuggestionIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter' && selectedSuggestionIndex >= 0) {
      e.preventDefault();
      selectSuggestion(suggestions[selectedSuggestionIndex]);
    }
  }, [showSuggestions, suggestions, selectedSuggestionIndex, selectSuggestion]);

  const handleClose = useCallback(() => {
    setCurrentMessage(null);
    if (!hasClosedFirstSearchRef.current) {
      hasClosedFirstSearchRef.current = true;
      setShowTooltip3(true);
    }
  }, []);

  // Close context window when clicking outside
  useEffect(() => {
    if (!currentMessage) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (contextWindowRef.current && !contextWindowRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [currentMessage, handleClose]);

  // Close suggestions when clicking outside
  useEffect(() => {
    if (!showHelpSuggestions && !showSuggestions) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (taskbarRef.current && !taskbarRef.current.contains(event.target as Node)) {
        setShowHelpSuggestions(false);
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showHelpSuggestions, showSuggestions]);

  // Delay tooltip appearance and animate in
  useEffect(() => {
    if (showTrainingBarTooltip) {
      const delayTimer = setTimeout(() => {
        setTooltipVisible(true);
        // Trigger animation on next frame
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setTooltipAnimateIn(true);
          });
        });
      }, 800);
      return () => clearTimeout(delayTimer);
    } else {
      setTooltipVisible(false);
      setTooltipAnimateIn(false);
      setTooltipVideoEnded(false);
    }
  }, [showTrainingBarTooltip]);

  // Delay tooltip 2 appearance and animate in
  useEffect(() => {
    if (showTooltip2) {
      const delayTimer = setTimeout(() => {
        setTooltip2Visible(true);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setTooltip2AnimateIn(true);
          });
        });
      }, 800);
      return () => clearTimeout(delayTimer);
    } else {
      setTooltip2Visible(false);
      setTooltip2AnimateIn(false);
      setTooltip2VideoEnded(false);
    }
  }, [showTooltip2]);

  // Delay tooltip 3 appearance and animate in
  useEffect(() => {
    if (showTooltip3) {
      const delayTimer = setTimeout(() => {
        setTooltip3Visible(true);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setTooltip3AnimateIn(true);
          });
        });
      }, 800);
      return () => clearTimeout(delayTimer);
    } else {
      setTooltip3Visible(false);
      setTooltip3AnimateIn(false);
      setTooltip3VideoEnded(false);
    }
  }, [showTooltip3]);

  const sidebarWidth = !isSidebarCollapsed || (isSidebarCollapsed && isSidebarHovering) ? '240px' : '78px';

  return (
    <>
    <div
      className={`fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        isHidden
          ? 'opacity-0 translate-y-6 pointer-events-none'
          : 'opacity-100 translate-y-0 pointer-events-auto'
      }`}
      style={{ marginLeft: sidebarWidth }}
    >
      {/* Context Window */}
      {currentMessage && (
        <div ref={contextWindowRef}>
          <ChatContextWindow
            message={currentMessage}
            onClose={handleClose}
          />
        </div>
      )}

      {/* Taskbar */}
      <div ref={taskbarRef} className="relative w-full max-w-3xl">
        {/* Help Suggestions Dropdown */}
        {showHelpSuggestions && (
          <div className="absolute bottom-full left-0 right-0 mb-2 bg-white/95 backdrop-blur-md rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(88, 23, 216, 0.1)', boxShadow: '0 0 40px rgba(106, 40, 234, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)' }}>
            <div className="px-5 py-3 border-b border-gray-200 bg-gray-50/50">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Suggested Topics</p>
            </div>
            {sampleQuestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => selectSuggestion(suggestion)}
                className="w-full text-left px-5 py-3 text-sm text-gray-700 hover:bg-[#6A28EA]/5 hover:text-[#6A28EA] transition-colors"
              >
                {suggestion}
              </button>
            ))}
            <button
              type="button"
              className="w-full px-5 py-3 border-t border-gray-200 bg-gray-50/50 text-left flex items-center justify-between group transition-colors hover:bg-purple-50"
            >
              <span className="text-xs text-gray-600 group-hover:text-purple-600 group-hover:underline transition-colors">
                Jump over to Trainual U to access all your available training courses
              </span>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors flex-shrink-0 ml-2" />
            </button>
          </div>
        )}

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute bottom-full left-0 right-0 mb-2 bg-white/95 backdrop-blur-md rounded-2xl border border-white/40 shadow-xl overflow-hidden">
            {suggestions.map((suggestion, index) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => selectSuggestion(suggestion)}
                className={`w-full text-left px-5 py-3 text-sm transition-colors ${
                  index === selectedSuggestionIndex
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-700 hover:bg-[#6A28EA]/5 hover:text-[#6A28EA]'
                }`}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {/* Post-Search Video Tooltip (Tooltip 3) */}
        {tooltip3Visible && (
          <div
            className={`absolute bottom-full left-0 mb-4 z-50 flex flex-col items-start transition-all duration-[750ms] ease-out origin-bottom-left ${
              tooltip3AnimateIn
                ? 'opacity-100 scale-100 translate-y-0'
                : 'opacity-0 scale-90 translate-y-4'
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#1a1145] shadow-xl bg-black">
              <button
                type="button"
                onClick={() => setShowTooltip3(false)}
                className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition-colors"
                aria-label="Close tooltip"
              >
                <X className="w-3.5 h-3.5 text-white" />
              </button>
              <video
                ref={tooltip3VideoRef}
                autoPlay
                playsInline
                className="w-72 block"
                onEnded={() => setTooltip3VideoEnded(true)}
              >
                <source src="/assets/videos/video-step3.mp4" type="video/mp4" />
              </video>
              {tooltip3VideoEnded && (
                <button
                  type="button"
                  onClick={() => {
                    setTooltip3VideoEnded(false);
                    if (tooltip3VideoRef.current) {
                      tooltip3VideoRef.current.currentTime = 0;
                      tooltip3VideoRef.current.play();
                    }
                  }}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity"
                >
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                    <RotateCcw className="w-6 h-6 text-[#1a1145]" />
                  </div>
                </button>
              )}
            </div>
            {/* Arrow pointing down */}
            <div className="pl-8">
              <div className="w-0 h-0 -mt-[2px]" style={{ borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '8px solid #1a1145' }} />
            </div>
          </div>
        )}

        {/* Ask Anything Video Tooltip (Tooltip 2) */}
        {tooltip2Visible && (
          <div
            className={`absolute bottom-full left-0 mb-4 z-50 flex flex-col items-start transition-all duration-[750ms] ease-out origin-bottom-left ${
              tooltip2AnimateIn
                ? 'opacity-100 scale-100 translate-y-0'
                : 'opacity-0 scale-90 translate-y-4'
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#1a1145] shadow-xl bg-black">
              <button
                type="button"
                onClick={() => setShowTooltip2(false)}
                className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition-colors"
                aria-label="Close tooltip"
              >
                <X className="w-3.5 h-3.5 text-white" />
              </button>
              <video
                ref={tooltip2VideoRef}
                autoPlay
                playsInline
                className="w-72 block"
                onEnded={() => setTooltip2VideoEnded(true)}
              >
                <source src="/assets/videos/video-step2.mp4" type="video/mp4" />
              </video>
              {tooltip2VideoEnded && (
                <button
                  type="button"
                  onClick={() => {
                    setTooltip2VideoEnded(false);
                    if (tooltip2VideoRef.current) {
                      tooltip2VideoRef.current.currentTime = 0;
                      tooltip2VideoRef.current.play();
                    }
                  }}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity"
                >
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                    <RotateCcw className="w-6 h-6 text-[#1a1145]" />
                  </div>
                </button>
              )}
            </div>
            {/* Arrow pointing down */}
            <div className="pl-8">
              <div className="w-0 h-0 -mt-[2px]" style={{ borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '8px solid #1a1145' }} />
            </div>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white/60 backdrop-blur-md rounded-full border border-white/30 flex items-center gap-3 px-6 py-3 transition-all"
          style={{
            boxShadow: '0 0 40px rgba(106, 40, 234, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setShowHelpSuggestions(false);
              if (showTooltip2) setShowTooltip2(false);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
            className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder:text-gray-400 text-sm"
            autoComplete="off"
          />

        <div className="relative flex items-center gap-2">
          {/* Training Bar Video Tooltip */}
          {tooltipVisible && (
            <div
              className={`absolute bottom-full right-0 mb-4 w-72 z-50 flex flex-col items-end transition-all duration-[750ms] ease-out origin-bottom-right ${
                tooltipAnimateIn
                  ? 'opacity-100 scale-100 translate-y-0'
                  : 'opacity-0 scale-90 translate-y-4'
              }`}
            >
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#1a1145] shadow-xl bg-black">
                <button
                  type="button"
                  onClick={() => {
                    onDismissTooltip?.();
                  }}
                  className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition-colors"
                  aria-label="Close tooltip"
                >
                  <X className="w-3.5 h-3.5 text-white" />
                </button>
                <video
                  ref={tooltipVideoRef}
                  autoPlay
                  playsInline
                  className="w-full block"
                  onEnded={() => setTooltipVideoEnded(true)}
                >
                  <source src="/assets/videos/video-step1.mp4" type="video/mp4" />
                </video>
                {tooltipVideoEnded && (
                  <button
                    type="button"
                    onClick={() => {
                      setTooltipVideoEnded(false);
                      if (tooltipVideoRef.current) {
                        tooltipVideoRef.current.currentTime = 0;
                        tooltipVideoRef.current.play();
                      }
                    }}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity"
                  >
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                      <RotateCcw className="w-6 h-6 text-[#1a1145]" />
                    </div>
                  </button>
                )}
              </div>
              {/* Arrow pointing down */}
              <div className="w-0 h-0 mr-3 -mt-[2px]" style={{ borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '8px solid #1a1145' }} />
            </div>
          )}
          <button
            type={input.trim() ? "submit" : "button"}
            onClick={input.trim() ? undefined : handleHelpClick}
            className="w-10 h-10 rounded-full bg-primary hover:bg-[#5916DF] flex items-center justify-center transition-colors"
            aria-label={input.trim() ? "Send" : "Show suggested topics"}
          >
            {input.trim() ? (
              <ArrowUp className="w-5 h-5 text-white" />
            ) : showHelpSuggestions ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Image src="/assets/sparkle.svg" alt="Help" width={18} height={20} className="ml-[2px]" />
            )}
          </button>
        </div>
        </form>
      </div>
    </div>

    {/* Celebration Video Popup (after 3rd search) */}
    {showCelebrationVideo && (
      <div className="fixed inset-0 z-[200] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40" onClick={() => setShowCelebrationVideo(false)} />
        <div className="relative rounded-2xl overflow-hidden border-2 border-[#1a1145] shadow-2xl bg-black max-w-lg w-full mx-4">
          <button
            type="button"
            onClick={() => setShowCelebrationVideo(false)}
            className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition-colors"
            aria-label="Close video"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          <video
            ref={celebrationVideoRef}
            autoPlay
            playsInline
            className="w-full block"
            onEnded={() => setCelebrationVideoEnded(true)}
          >
            <source src="/assets/videos/video-step4.mp4" type="video/mp4" />
          </video>
          {celebrationVideoEnded && (
            <button
              type="button"
              onClick={() => {
                setCelebrationVideoEnded(false);
                if (celebrationVideoRef.current) {
                  celebrationVideoRef.current.currentTime = 0;
                  celebrationVideoRef.current.play();
                }
              }}
              className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity"
            >
              <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                <RotateCcw className="w-6 h-6 text-[#1a1145]" />
              </div>
            </button>
          )}
        </div>
      </div>
    )}
    </>
  );
}
