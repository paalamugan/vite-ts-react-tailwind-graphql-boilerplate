import { act, renderHook, waitFor } from '@/test-utils';

import { useFetcher } from './useFetcher';

describe('useFetcher', () => {
  it('fetches data and returns it correctly', async () => {
    const fetcher = vi.fn((_arg: { name: string }) => Promise.resolve('data'));
    const { result } = renderHook(() => useFetcher(fetcher, { name: 'test' }));

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.initialized).toBe(false);

    await waitFor(() => {
      expect(result.current.data).toBe('data');
    });
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.initialized).toBe(true);
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it('handles errors correctly', async () => {
    const error = new Error('error');
    const fetcher = vi.fn((_arg: { name: string }) => Promise.reject(error));
    const { result } = renderHook(() => useFetcher(fetcher, { name: 'test' }));

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.initialized).toBe(false);

    await waitFor(() => {
      expect(result.current.data).toBeNull();
    });
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.initialized).toBe(false);
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it('skips fetching data when skip is true', () => {
    const fetcher = vi.fn((_arg: { name: string }) => Promise.resolve('data'));
    const { result } = renderHook(() => useFetcher(fetcher, { name: 'test' }));

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.initialized).toBe(false);
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it('refetch data when refetch is called', async () => {
    const fetcher = vi.fn((_arg: { name: string }) => Promise.resolve('data'));
    const { result } = renderHook(() => useFetcher(fetcher, { name: 'test' }));

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.initialized).toBe(false);

    await waitFor(() => {
      expect(result.current.data).toBe('data');
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.initialized).toBe(true);
    expect(fetcher).toHaveBeenCalledTimes(1);

    act(() => {
      void result.current.refetch({ name: 'test' });
    });

    expect(result.current.data).toBe('data');
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.initialized).toBe(true);

    await waitFor(() => {
      expect(result.current.data).toBe('data');
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.initialized).toBe(true);
    expect(fetcher).toHaveBeenCalledTimes(2);
  });
});
