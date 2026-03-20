'use client';

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { Send, ArrowRight, RotateCcw, X } from 'lucide-react';
import { ChatContextWindow } from './LiveLearn/ChatContextWindow';
import { getResponseForQuestion, sampleQuestions } from './LiveLearn/mockResponses';
import type { ChatMessage } from './LiveLearn/types';

type LiveLearnProps = {
  isSidebarCollapsed: boolean;
  isSidebarHovering: boolean;
  showTrainingBarTooltip?: boolean;
  onDismissTooltip?: () => void;
};

export function LiveLearn({ isSidebarCollapsed, isSidebarHovering, showTrainingBarTooltip, onDismissTooltip }: LiveLearnProps) {
  const [input, setInput] = useState('');
  const [currentMessage, setCurrentMessage] = useState<ChatMessage | null>(null);
  const [showVideo, setShowVideo] = useState(false);
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
  const hasClosedSuggestionsRef = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const contextWindowRef = useRef<HTMLDivElement>(null);
  const taskbarRef = useRef<HTMLDivElement>(null);
  const tooltipVideoRef = useRef<HTMLVideoElement>(null);
  const tooltip2VideoRef = useRef<HTMLVideoElement>(null);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const response = getResponseForQuestion(input);
    setCurrentMessage(response);
    setShowVideo(false);
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
    setShowVideo(false);
  }, []);

  const handleToggleVideo = useCallback(() => {
    setShowVideo(prev => !prev);
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

  const sidebarWidth = !isSidebarCollapsed || (isSidebarCollapsed && isSidebarHovering) ? '240px' : '78px';

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 transition-[margin] duration-300" style={{ marginLeft: sidebarWidth }}>
      {/* Context Window */}
      {currentMessage && (
        <div ref={contextWindowRef}>
          <ChatContextWindow
            message={currentMessage}
            showVideo={showVideo}
            onToggleVideo={handleToggleVideo}
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
                <video
                  ref={tooltipVideoRef}
                  autoPlay
                  playsInline
                  className="w-full aspect-video"
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
            className="w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center transition-colors"
            aria-label={input.trim() ? "Send" : "Show suggested topics"}
          >
            {input.trim() ? (
              <Send className="w-5 h-5 text-white" />
            ) : showHelpSuggestions ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <span className="text-white text-xl font-semibold">?</span>
            )}
          </button>
        </div>
        </form>
      </div>
    </div>
  );
}
