import type { FC } from 'react';

import { cn } from '@/lib/utils';

import { Box } from './Box';

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Grid: FC<GridProps> = ({ children, className, ...props }) => {
  return (
    <Box className={cn('grid', className)} {...props}>
      {children}
    </Box>
  );
};
