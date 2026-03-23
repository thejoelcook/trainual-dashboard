'use client';

import { useState } from 'react';
import { Info } from 'lucide-react';

type TrainualUPopupProps = {
  onUseTrainingBar?: () => void;
};

export function TrainualUPopup({ onUseTrainingBar }: TrainualUPopupProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [showVideo, setShowVideo] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Scrim */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Popup */}
      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden">
        {/* Hero section: illustration or video */}
        {showVideo ? (
          <div className="relative w-full aspect-video">
            <iframe
              src="https://player.vimeo.com/video/1123347309?h=81ce7e49ad&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              title="Trainual U Opt-in intro"
              className="absolute inset-0 w-full h-full"
              style={{ border: 'none' }}
            />
          </div>
        ) : (
          <div className="w-full">
            <img
              src="/assets/pop-up-image.png"
              alt="Trainual U"
              className="w-full h-auto block"
            />
          </div>
        )}

        {/* Content */}
        <div className="px-8 pt-6 pb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            There&apos;s still so much more to discover with Trainual.
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-2">
            Trainual University (a.k.a. &ldquo;{' '}
            <button
              type="button"
              onClick={() => setShowVideo(true)}
              className="inline-flex items-center gap-1 text-[#7C3AED] underline hover:text-[#6D28D9] transition-colors"
            >
              Trainual U
              <Info className="w-3.5 h-3.5 inline" />
            </button>
            {' '}&rdquo;) is designed to help you get the hang of Trainual faster.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed mb-6">
            You can also learn in real time with our new Training Bar. Simply search for the task you want to complete or a question you have, and get instant answers along with helpful videos.
          </p>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={() => {
                setIsOpen(false);
                onUseTrainingBar?.();
              }}
              className="px-5 py-2.5 rounded-full border border-[#6A28EA] text-sm font-medium text-[#6A28EA] hover:bg-[#6A28EA]/5 transition-colors"
            >
              Use Training Bar
            </button>
            <span
              className="px-5 py-2.5 rounded-full bg-[#7C3AED] text-sm font-medium text-white cursor-default"
            >
              Trainual U
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
