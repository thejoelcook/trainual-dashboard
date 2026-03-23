'use client';

import { X } from 'lucide-react';
import type { ChatMessage } from './types';

type ChatContextWindowProps = {
  message: ChatMessage;
  onClose: () => void;
};

export function ChatContextWindow({
  message,
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
        <div className="p-6 transition-all duration-300 max-h-[60vh] overflow-y-auto">
          {message.videoUrl && (
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
          )}

          <div
            className="text-sm leading-7 text-gray-700 prose prose-sm max-w-none [&_strong]:font-semibold [&_strong]:text-gray-900 [&_strong]:block [&_strong]:mt-4 [&_strong]:mb-1 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-1 [&_li]:my-0.5 [&_ul_ul]:mt-0.5"
            dangerouslySetInnerHTML={{ __html: message.answer }}
          />
        </div>
      </div>
    </div>
  );
}
