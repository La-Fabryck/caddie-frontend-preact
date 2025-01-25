import { useEffect, useState } from 'preact/hooks';
import { useCache } from './useCache';

type HTTPMethods = 'CONNECT' | 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT' | 'TRACE';
type RequestOptions = Omit<RequestInit, 'method'> & { method: HTTPMethods };

//TODO: instead of init, a helper method, just pass the HTTP Method and it initiates on its own
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
 * Verify if the mehod is safe or not. Same behaviour as the fetch, default is GET.
 *
 * https://developer.mozilla.org/en-US/docs/Glossary/Safe/HTTP
 */
function isSafeMethod(method: HTTPMethods = 'GET'): boolean {
  return ['GET', 'HEAD', 'OPTIONS'].includes(method);
}

/**
 * Custom hook intended to work similarly as useQuery but less bloated. One hook for both
 */
export function useFetch<TResponse = unknown, UError = unknown, VBody = unknown>({
  url,
  init,
  options: { noCache = false, ttl = TTL_DEFAULT, key },
  onSuccessCallback,
}: FetchConfig) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<TResponse | null>(null);
  const [error, setError] = useState<UError | null>(null);
  const { getCache, setCache, deleteCache } = useCache<TResponse>();

  async function handleRequest(body?: VBody): Promise<void> {
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
      body: isSafeMethod(init?.method) ? null : JSON.stringify(body),
    });

    //if the content is null, it fails when using response.json()
    const hasJsonContent = Boolean(parseInt(response.headers.get('content-length') ?? '0', 10));

    if (response.ok) {
      setError(null);
      setIsLoading(false);

      const contentResponse = hasJsonContent ? ((await response.json()) as TResponse) : null;
      setData(contentResponse);
      setCache(key, contentResponse, ttl);

      if (typeof onSuccessCallback === 'function') {
        onSuccessCallback();
      }
    } else {
      setIsLoading(false);
      setData(null);

      const errorResponse = hasJsonContent ? ((await response.json()) as UError) : null;
      setError(errorResponse);
    }
  }

  function inValidate(key: FetchConfig['options']['key']) {
    deleteCache(key);
  }

  useEffect(() => {
    if (isSafeMethod(init?.method)) {
      void handleRequest();
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
