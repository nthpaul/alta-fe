import { Typography } from '@/components/ui';
import React from 'react';

interface TypingIndicatorProps {
  description: string;
}

export const TypingIndicator: React.ComponentType<TypingIndicatorProps> = ({ description }) => {
  return (
    <div className="flex items-center space-x-1 ml-1 mb-3">
      <Typography className="text-zinc-400 animate-pulse" variant='body-md'>
        {description}
      </Typography>
    </div>
  );
};
