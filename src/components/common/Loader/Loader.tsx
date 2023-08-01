import type React from 'react';

import spinner from '@/assets/spinner.svg';
import { cn } from '@/lib/utils';

interface LoaderProps {
  show: boolean;
  className?: string;
  spin?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ show, className, spin }) => {
  return (
    <>
      {show && (
        <img
          src={spinner}
          className={cn({
            [`${className ?? ''}`]: !!className,
            'animate-spin': !!spin,
            'block h-fit w-fit text-white': !className,
          })}
          alt="spinner"
        />
      )}
    </>
  );
};

export default Loader;
