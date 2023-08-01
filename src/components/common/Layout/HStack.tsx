import type { FC } from 'react';

import { cn } from '@/lib/utils';

import { Box } from './Box';

interface HStackProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}
export const HStack: FC<HStackProps> = ({ children, className, ...props }) => {
  return (
    <Box className={cn('flex flex-row', className)} {...props}>
      {children}
    </Box>
  );
};
