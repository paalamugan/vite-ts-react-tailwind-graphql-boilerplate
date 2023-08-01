import { act, renderHook } from '@/test-utils';

import { useLocalStorage, useSessionStorage } from './useStorage';

describe('useLocalStorage', () => {
  test('useLocalStorage should store and retrieve values from localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'defaultValue'));

    expect(result.current[0]).toBe('defaultValue');

    act(() => {
      result.current[1]('updatedValue');
    });

    expect(result.current[0]).toBe('updatedValue');
    expect(window.localStorage.getItem('testKey')).toBe(JSON.stringify('updatedValue'));

    act(() => {
      result.current[2]();
    });

    expect(result.current[0]).toBeUndefined();
    expect(window.localStorage.getItem('testKey')).toBeNull();
  });
  test('useSessionStorage should store and retrieve values from sessionStorage', () => {
    const { result } = renderHook(() => useSessionStorage('testKey', 'defaultValue'));

    expect(result.current[0]).toBe('defaultValue');

    act(() => {
      result.current[1]('updatedValue');
    });

    expect(result.current[0]).toBe('updatedValue');
    expect(window.sessionStorage.getItem('testKey')).toBe(JSON.stringify('updatedValue'));

    act(() => {
      result.current[2]();
    });

    expect(result.current[0]).toBeUndefined();
    expect(window.sessionStorage.getItem('testKey')).toBeNull();
  });
});
