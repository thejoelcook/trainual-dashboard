'use client';

import { X, Play, ChevronLeft } from 'lucide-react';
import type { ChatMessage } from './types';

type ChatContextWindowProps = {
  message: ChatMessage;
  showVideo: boolean;
  onToggleVideo: () => void;
  onClose: () => void;
};

export function ChatContextWindow({
  message,
  showVideo,
  onToggleVideo,
  onClose
}: ChatContextWindowProps) {
  return (
    <div
      className="absolute bottom-[90px] left-0 right-0 flex justify-center px-4 pointer-events-none"
    >
      <div
        className="w-full max-w-3xl bg-white/95 backdrop-blur-md rounded-3xl border border-white/40 shadow-xl pointer-events-auto context-window-appear"
        style={{
          boxShadow: '0 8px 32px rgba(106, 40, 234, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-foreground pr-8 flex-1">
            {message.question}
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors flex-shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 transition-all duration-300">
          {!showVideo ? (
            // Text Response View
            <div>
              <p className="text-base leading-7 text-gray-700 mb-4">
                {message.answer}
              </p>

              {message.videoUrl && (
                <button
                  onClick={onToggleVideo}
                  className="inline-flex items-center gap-2 px-5 h-11 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  <Play className="w-4 h-4" />
                  Watch Video
                </button>
              )}
            </div>
          ) : (
            // Video View
            <div>
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black mb-4">
                <iframe
                  width="100%"
                  height="100%"
                  src={message.videoUrl}
                  title={message.videoTitle || 'Training Video'}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0"
                />
              </div>

              <button
                onClick={onToggleVideo}
                className="inline-flex items-center gap-2 px-5 h-11 rounded-full border border-gray-200 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Back to Answer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
