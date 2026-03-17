'use client';

import {useState, type ReactNode} from 'react';

type Props = {
  front: ReactNode;
  back: ReactNode;
};

export default function FlipCard({front, back}: Props) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="perspective-[600px] aspect-square cursor-pointer"
      onClick={() => setFlipped((prev) => !prev)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setFlipped((prev) => !prev);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="Flip card"
      data-testid="flip-card"
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
          flipped ? '[transform:rotateY(180deg)]' : ''
        }`}
        data-testid="flip-inner"
      >
        {/* Front */}
        <div className="absolute inset-0 [backface-visibility:hidden] flex items-center justify-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          {front}
        </div>
        {/* Back */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] flex items-center justify-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-blue-50 dark:bg-gray-900">
          {back}
        </div>
      </div>
    </div>
  );
}
