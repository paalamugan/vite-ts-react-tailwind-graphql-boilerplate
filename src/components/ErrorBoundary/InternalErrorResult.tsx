import type { FC, ReactNode } from 'react';

import { ErrorLayout } from './ErrorLayout';

interface InternalErrorResultProps {
  children?: ReactNode;
}
export const InternalErrorResult: FC<InternalErrorResultProps> = ({ children }) => {
  return (
    <ErrorLayout
      heading={'Something went wrong'}
      subheading={
        "It sounds like something unexpected happened right now. Please, give it a try later or, if it's urgent, contact our support team."
      }
    >
      {children}
    </ErrorLayout>
  );
};
