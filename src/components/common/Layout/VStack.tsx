import type { FC } from 'react';

import { cn } from '@/lib/utils';

import { Box } from './Box';

interface VStackProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const VStack: FC<VStackProps> = ({ children, className, ...props }) => {
  return (
    <Box className={cn('flex flex-col', className)} {...props}>
      {children}
    </Box>
  );
};
