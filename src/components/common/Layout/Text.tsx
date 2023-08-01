import type { FC } from 'react';

import { cn } from '@/lib/utils';

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}
export const Text: FC<TextProps> = ({ children, className, ...props }) => {
  return (
    <p className={cn('text-base', className)} {...props}>
      {children}
    </p>
  );
};
