import type { FC, ReactNode } from 'react';

import { cn } from '@/lib/utils';

import { Box } from './Box';

interface CenterProps {
  children: ReactNode;
  className?: string;
}
export const Center: FC<CenterProps> = ({ children, className }) => {
  return <Box className={cn('flex items-center justify-center', className)}>{children}</Box>;
};
