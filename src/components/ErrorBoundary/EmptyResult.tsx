import type { FC, ReactNode } from 'react';

import { ErrorLayout } from './ErrorLayout';

interface EmptyResultProps {
  children?: ReactNode;
}
export const EmptyResult: FC<EmptyResultProps> = ({ children }) => {
  return (
    <ErrorLayout heading={'No results found'} subheading={'Unfortunately, there is nothing for you here yet!'}>
      {children}
    </ErrorLayout>
  );
};
