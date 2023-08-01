import type { FC } from 'react';

import { cn } from '@/lib/utils';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const headingSizes = {
  h1: 'text-2xl',
  h2: 'text-xl',
  h3: 'text-lg',
  h4: 'text-base',
  h5: 'text-sm',
  h6: 'text-xs',
};
export const Heading: FC<HeadingProps> = ({ children, className, as = 'h1', ...props }) => {
  const Component = as;
  const size = headingSizes[as];
  return (
    <Component className={cn(size, className)} {...props}>
      {children}
    </Component>
  );
};
