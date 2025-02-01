import { createContext, type JSX } from 'preact';
import { useContext } from 'preact/hooks';
import { type ReactNode } from 'react';

type ContextType<T = unknown> = {
  getCache: (key: string) => T | null;
  setCache: (key: string, value: T | null, ttl: number) => void;
  clearCache: () => void;
  deleteCache: (key: string) => void;
};

type CacheEntry<T> = {
  expiry: Date;
  data: T;
};

const CacheContext = createContext({});

export function useCache<T>(): ContextType<T> {
  return useContext(CacheContext) as unknown as ContextType<T>;
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

  function setCache(key: string, value: T | null, ttl: number): void {
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

  const contextValue: ContextType<T> = {
    getCache,
    setCache,
    clearCache,
    deleteCache,
  };

  return <CacheContext.Provider value={contextValue}>{children}</CacheContext.Provider>;
}
