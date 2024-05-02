import { useEffect, useState } from 'preact/hooks';
import { useCache } from './useCache';

type HTTPMethods = 'CONNECT' | 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT' | 'TRACE';
type RequestOptions = Omit<RequestInit, 'method'> & { method: HTTPMethods };

type FetchConfig = {
  url: RequestInfo;
  init?: RequestOptions;
  options: {
    noCache?: boolean;
    ttl?: number;
    key: string;
  };
  /*
   * Perform side effect actions. To be used with mutation (patch, post, put, etc).
   * Redirection, state update, etc, to be performed here
   */
  onSuccessCallback?: () => void;
};

const TTL_DEFAULT = 5 * 60 * 1000;

/**
 * Verify if the mehod is a mutation or not. Same behaviour as the fetch, default is GET
 */
function isMutation(method: HTTPMethods = 'GET'): boolean {
  return method === 'GET';
}

/**
 * Custom hook intended to work similarly as useQuery but less bloated. One hook for both
 */
export function useFetch<T, U = unknown>({
  url,
  init,
  options: { noCache = false, ttl = TTL_DEFAULT, key },
  onSuccessCallback,
}: FetchConfig) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<U | null>(null);
  const { getCache, setCache, deleteCache } = useCache<T>();

  const handleRequest = async (body?: T): Promise<void> => {
    if (!noCache && getCache(key) != null) {
      setData(getCache(key));
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    const response = await fetch(url, {
      ...init,
      body: isMutation(init?.method) ? JSON.stringify(body) : null,
    });

    //if the content is null, it fails when using response.json()
    const hasJsonContent = Boolean(parseInt(response.headers.get('content-length') ?? '0', 10));

    const content = hasJsonContent ? await response.json() : null;

    if (response.ok) {
      setError(null);
      setIsLoading(false);
      setData(content);
      setCache(key, content, ttl);

      if (typeof onSuccessCallback === 'function') {
        onSuccessCallback();
      }
    } else {
      setError(content);
      setIsLoading(false);
      setData(null);
    }
  };

  function inValidate(key: FetchConfig['options']['key']) {
    deleteCache(key);
  }

  useEffect(() => {
    if (isMutation(init?.method)) {
      handleRequest();
    }
  });

  return {
    isLoading,
    data,
    error,
    handleRequest,
    inValidate,
  } as const;
}
