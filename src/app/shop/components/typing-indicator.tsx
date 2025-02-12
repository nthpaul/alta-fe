import React from 'react';

interface TypingIndicatorProps {
  description: string;
}

export const TypingIndicator: React.ComponentType<TypingIndicatorProps> = ({
  description
}) => (
  <div className="flex items-center space-x-1 ml-1 mb-3">
    <div className="w-6 h-6 rounded-full flex items-center justify-center mb-1">
      <div className="w-4 h-4 border-4 border-t-transparent border-alta-gray-500 rounded-full animate-spin"></div>
    </div>
    <span className="text-xs text-zinc-400">{description}</span>
  </div>
);
