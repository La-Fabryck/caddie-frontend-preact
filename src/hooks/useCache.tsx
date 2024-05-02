import { createContext } from 'preact';
import { useContext } from 'preact/hooks';
import { ReactNode } from 'react';

type ContextType = {
  getCache: (key: string) => any;
  setCache: (key: string, value: any, ttl?: number) => void;
  clearCache: () => void;
  deleteCache: (key: string) => void;
};

type cacheBody<T = unknown> = {
  expiry: Date;
  data: T;
};

const CacheContext = createContext<ContextType>(null);

export function useCache() {
  return useContext(CacheContext);
}

export function CacheProvider<T>({ children }: { children: ReactNode }) {
  const map = new Map<string, cacheBody<T>>();

  function getCache(key: string) {
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

  function setCache(key: string, value: T, ttl: number = 10) {
    if (value == null) {
      return;
    }

    const t = new Date();
    t.setSeconds(t.getSeconds() + ttl);
    map.set(key, {
      expiry: t,
      data: value,
    });
  }

  function clearCache() {
    map.clear();
  }

  function deleteCache(key: string) {
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
