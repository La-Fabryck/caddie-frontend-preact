import { batch, useSignal } from '@preact/signals';
import { useEffect } from 'preact/hooks';
import { useCache } from './useCache';

type HTTPMethods = 'CONNECT' | 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT' | 'TRACE';
type FetchRequestInit = Omit<RequestInit, 'method'> & { method: HTTPMethods };

type FetchConfig = GetConfig | MutationConfig;

type GetConfig = {
  url: RequestInfo;
  method?: Extract<HTTPMethods, 'GET'>;
  key: string;
  options?: {
    noCache?: boolean;
    ttl?: number;
  };
};

type MutationConfig = {
  url: RequestInfo;
  method: Extract<HTTPMethods, 'DELETE' | 'PATCH' | 'POST' | 'PUT'>;
  /*
   * Perform side effect actions. To be used with mutation (patch, post, put, etc).
   * Redirection, state update, etc, to be performed here
   */
  onSuccessCallback: () => void;
  onErrorCallback: () => void;
};

// 5 minutes in ms
// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const TTL_DEFAULT = 5 * 60 * 1000;

/**
 * Verify if the mehod is safe or not. Same behaviour as the fetch, default is GET.
 *
 * https://developer.mozilla.org/en-US/docs/Glossary/Safe/HTTP
 */
function isSafeMethod(method: HTTPMethods = 'GET'): boolean {
  return ['GET', 'HEAD', 'OPTIONS'].includes(method);
}

function isMutation(method: HTTPMethods = 'GET'): boolean {
  return ['PATCH', 'POST', 'PUT'].includes(method);
}

function fetchInitConfig(method: HTTPMethods = 'GET', body?: unknown): FetchRequestInit {
  if (!isMutation(method) || method === 'DELETE') {
    return {
      method,
    };
  }

  return {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
}

/**
 * Custom hook intended to work similarly as useQuery but less bloated. One hook for both
 */
export function useFetch<TResponse = unknown, UError = unknown, VBody = FetchRequestInit['body']>(fetchConfig: FetchConfig) {
  const isLoading = useSignal<boolean>(false);
  const data = useSignal<TResponse | null>(null);
  const error = useSignal<UError | null>(null);
  const { getCache, setCache, deleteCache } = useCache<TResponse>();

  async function executeRequest(body?: VBody): Promise<void> {
    if ('key' in fetchConfig && !(fetchConfig.options?.noCache ?? false)) {
      const cacheHit = getCache(fetchConfig.key);
      if (cacheHit != null) {
        batch(() => {
          data.value = cacheHit;
          isLoading.value = false;
          error.value = null;
        });

        return;
      }
    }

    batch(() => {
      data.value = null;
      isLoading.value = true;
      error.value = null;
    });

    const response = await fetch(fetchConfig.url, {
      ...fetchInitConfig(fetchConfig.method, body),
    });

    //if the content is null, it fails when using response.json()
    const hasJsonContent = Boolean(parseInt(response.headers.get('content-length') ?? '0'));

    if (response.ok) {
      const contentResponse = hasJsonContent ? ((await response.json()) as TResponse) : null;
      batch(() => {
        error.value = null;
        isLoading.value = false;
        data.value = contentResponse;
      });

      if ('key' in fetchConfig && isSafeMethod(fetchConfig.method)) {
        setCache(fetchConfig.key, contentResponse, fetchConfig.options?.ttl ?? TTL_DEFAULT);
      }

      if ('onSuccessCallback' in fetchConfig && typeof fetchConfig.onSuccessCallback === 'function') {
        fetchConfig.onSuccessCallback();
      }
    } else {
      const errorResponse = hasJsonContent ? ((await response.json()) as UError) : null;
      batch(() => {
        error.value = errorResponse;
        isLoading.value = false;
        data.value = null;
      });

      if ('onErrorCallback' in fetchConfig && typeof fetchConfig.onErrorCallback === 'function') {
        fetchConfig.onErrorCallback();
      }
    }
  }

  function invalidate(key: GetConfig['key']) {
    deleteCache(key);
  }

  useEffect(() => {
    if (isSafeMethod(fetchConfig.method)) {
      void executeRequest();
    }
  });

  return {
    isLoading,
    data,
    error,
    executeRequest,
    invalidate,
  } as const;
}
