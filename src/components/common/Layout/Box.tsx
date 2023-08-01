import type { FC } from 'react';

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}
export const Box: FC<BoxProps> = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};
