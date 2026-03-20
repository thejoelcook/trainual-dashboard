'use client';

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { ChatContextWindow } from './LiveLearn/ChatContextWindow';
import { getResponseForQuestion, sampleQuestions } from './LiveLearn/mockResponses';
import type { ChatMessage } from './LiveLearn/types';

export function LiveLearn() {
  const [input, setInput] = useState('');
  const [currentMessage, setCurrentMessage] = useState<ChatMessage | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
  };

  const selectSuggestion = useCallback((suggestion: string) => {
    setInput(suggestion);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
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
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
    }
  }, [showSuggestions, suggestions, selectedSuggestionIndex, selectSuggestion]);

  const handleClose = useCallback(() => {
    setCurrentMessage(null);
    setShowVideo(false);
  }, []);

  const handleToggleVideo = useCallback(() => {
    setShowVideo(prev => !prev);
  }, []);

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4" style={{ marginLeft: '240px' }}>
      {/* Context Window */}
      {currentMessage && (
        <ChatContextWindow
          message={currentMessage}
          showVideo={showVideo}
          onToggleVideo={handleToggleVideo}
          onClose={handleClose}
        />
      )}

      {/* Taskbar */}
      <div className="relative w-full max-w-3xl">
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
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
            className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder:text-gray-400 text-sm"
            autoComplete="off"
          />

        <div className="flex items-center gap-2">
          <button
            type="submit"
            disabled={!input.trim()}
            className="w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            aria-label="Send"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
        </form>
      </div>
    </div>
  );
}
