import { useEffect, useState } from 'preact/hooks';
import { useCache } from './useCache';

type HTTPMethods =
  | 'CONNECT'
  | 'DELETE'
  | 'GET'
  | 'HEAD'
  | 'OPTIONS'
  | 'PATCH'
  | 'POST'
  | 'PUT'
  | 'TRACE';
type RequestOptions = Omit<RequestInit, 'method'> & { method: HTTPMethods };

type FetchConfig = {
  url: RequestInfo;
  init?: RequestOptions;
  options: {
    noCache?: boolean;
    ttl?: number;
    key: string;
  };
  onSuccessCallback?: () => void;
};

const TTL_DEFAULT = 5 * 60 * 1000;

function shouldUseCache(method: HTTPMethods = 'GET') {
  return method === 'GET';
}

export function useFetch<T>({
  url,
  init,
  options: { noCache = false, ttl = TTL_DEFAULT, key },
  onSuccessCallback,
}: FetchConfig) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Awaited<Promise<T>>>(null);
  const [error, setError] = useState(null);
  const { getCache, setCache, deleteCache } = useCache();

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
      body: JSON.stringify(body),
    });

    //if the content is null, it fails when using response.json()
    const hasJsonContent = Boolean(
      parseInt(response.headers.get('content-length'), 10),
    );

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
    if (shouldUseCache(init?.method)) {
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
