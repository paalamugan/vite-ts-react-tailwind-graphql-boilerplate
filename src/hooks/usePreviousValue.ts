import { useEffect, useRef } from 'react';

export const usePreviousValue = <T>(value: T) => {
  const prevValueRef = useRef(value);

  useEffect(() => {
    prevValueRef.current = value;
  }, [value]);

  return prevValueRef.current;
};
