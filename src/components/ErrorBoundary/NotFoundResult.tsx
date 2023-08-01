import type { FC, ReactNode } from 'react';

import { ErrorLayout } from './ErrorLayout';

interface NotFoundResultProps {
  children?: ReactNode;
}
export const NotFoundResult: FC<NotFoundResultProps> = ({ children }) => {
  return (
    <ErrorLayout
      heading={"Page doesn't exist"}
      subheading={
        'Probably you got here by accident. If you think there is something wrong on our side, please contact us!'
      }
    >
      {children}
    </ErrorLayout>
  );
};
