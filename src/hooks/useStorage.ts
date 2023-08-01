/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { useCallback, useEffect, useState } from 'react';

type DefaultValue<T2 extends (() => unknown) | unknown> = T2 extends () => infer R ? R : T2;

function useStorage<T1 extends string, T2 extends (() => unknown) | unknown, T3 extends Storage | null>(
  key: T1,
  defaultValue?: T2,
  storageObject?: T3,
) {
  const [value, setValue] = useState<DefaultValue<T2> | null>(() => {
    if (!storageObject) return null;
    const jsonValue = storageObject.getItem(key);
    if (jsonValue !== null) return JSON.parse(jsonValue) as DefaultValue<T2>;

    if (typeof defaultValue === 'function') {
      return defaultValue() as DefaultValue<T2>;
    } else {
      return defaultValue as DefaultValue<T2>;
    }
  });

  useEffect(() => {
    if (!storageObject) return;
    if (value === undefined) return storageObject.removeItem(key);
    storageObject.setItem(key, JSON.stringify(value));
  }, [key, value, storageObject]);

  const removeValue = useCallback(() => {
    setValue(undefined as DefaultValue<T2>);
  }, []);

  return [value, setValue, removeValue] as const;
}

export function useLocalStorage<T2 extends (() => unknown) | unknown>(key: string, defaultValue?: T2) {
  return useStorage<string, T2, typeof window.localStorage>(
    key,
    defaultValue,
    typeof window !== 'undefined' ? window.localStorage : undefined,
  );
}

export function useSessionStorage<T2 extends (() => unknown) | unknown>(key: string, defaultValue?: T2) {
  return useStorage<string, T2, typeof window.sessionStorage>(
    key,
    defaultValue,
    typeof window !== 'undefined' ? window.sessionStorage : undefined,
  );
}
