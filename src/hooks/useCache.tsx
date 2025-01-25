import { createContext, type JSX } from 'preact';
import { useContext } from 'preact/hooks';
import { type ReactNode } from 'react';

type ContextType<T> = {
  getCache: (key: string) => T | null;
  setCache: (key: string, value: T | null, ttl?: number) => void;
  clearCache: () => void;
  deleteCache: (key: string) => void;
};

type CacheEntry<T> = {
  expiry: Date;
  data: T;
};

const CacheContext = createContext(null as any);

export function useCache<T>() {
  return useContext<ContextType<T>>(CacheContext);
}

export function CacheProvider<T>({ children }: { children: ReactNode }): JSX.Element {
  const map = new Map<string, CacheEntry<T>>();

  function getCache(key: string): T | null {
    const cacheValue = map.get(key);
    if (!cacheValue) {
      return null;
    }

    if (new Date().getTime() > cacheValue.expiry.getTime()) {
      map.delete(key);
      return null;
    }

    return cacheValue.data;
  }

  function setCache(key: string, value: T | null, ttl: number = 10): void {
    if (value == null) {
      return;
    }

    map.set(key, {
      expiry: new Date(new Date().getTime() + ttl),
      data: value,
    });
  }

  function clearCache(): void {
    map.clear();
  }

  function deleteCache(key: string): void {
    map.delete(key);
  }

  const contextValue = {
    getCache,
    setCache,
    clearCache,
    deleteCache,
  };

  return <CacheContext.Provider value={contextValue}>{children}</CacheContext.Provider>;
}
