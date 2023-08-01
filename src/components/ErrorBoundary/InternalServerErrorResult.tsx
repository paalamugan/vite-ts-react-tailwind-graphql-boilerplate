import type { FC, ReactNode } from 'react';

import { ErrorLayout } from './ErrorLayout';

interface InternalServerErrorResultProps {
  children?: ReactNode;
}
export const InternalServerErrorResult: FC<InternalServerErrorResultProps> = ({ children }) => {
  return (
    <ErrorLayout
      heading={'Something went seriously wrong'}
      subheading={
        'It sounds like something unexpected happened right now. Please, inform our support team about this issue ASAP!'
      }
    >
      {children}
    </ErrorLayout>
  );
};
