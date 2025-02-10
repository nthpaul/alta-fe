import { Typography } from "@ui";
import { ThemeToggle } from '@/components/theme/theme-toggle';
import React from 'react';

interface Props {
  title?: string;
}

const TopNavbar: React.ComponentType<Props> = ({
  title
}) => {
  return <div className='justify-between items-center flex w-full'>
    {title && <Typography variant='h1'>{title}</Typography>}
    <ThemeToggle />
  </div>;
};

export default TopNavbar;
