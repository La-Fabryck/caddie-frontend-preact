import { batch, useSignal } from '@preact/signals';
import { useEffect } from 'preact/hooks';
import { useCache } from './use-cache';

type HTTPMethods = 'CONNECT' | 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT' | 'TRACE';
type FetchRequestInit = Omit<RequestInit, 'method'> & { method: HTTPMethods };

type GetConfig = {
  url: URL | string;
  key: string;
  options?: {
    noCache?: boolean;
    ttl?: number;
  };
};

type MutationConfig = {
  url: URL | string;
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
 * Safely extracts JSON content from a Response, returning null if:
 * - The response has no content (content-length is 0 or missing)
 * - The response body is empty
 *
 * Avoids errors when calling response.json() on empty responses.
 */
async function extractContent<T>(response: Response): Promise<T | null> {
  const hasContent = Boolean(parseInt(response.headers.get('content-length') ?? '0'));
  return hasContent ? ((await response.json()) as T) : null;
}

/**
 * Hook for performing data mutations (POST/PUT/PATCH/DELETE) with built-in state management.
 *
 * Features:
 * - Handles success/error states automatically
 * - Supports optional side effects via callbacks
 * - Provides loading state tracking
 * - Type-safe request/response handling
 */
function useMutation<TResponse = unknown, UError = unknown, VBody = FetchRequestInit['body']>({
  url,
  method,
  onErrorCallback,
  onSuccessCallback,
}: MutationConfig) {
  const isLoading = useSignal<boolean>(false);
  const data = useSignal<TResponse | null>(null);
  const error = useSignal<UError | null>(null);

  async function executeRequest(body: VBody): Promise<void> {
    batch(() => {
      data.value = null;
      isLoading.value = true;
      error.value = null;
    });

    const response = await fetch(url, {
      ...fetchInitConfig(method, body),
    });

    if (response.ok) {
      const contentResponse = await extractContent<TResponse>(response);
      batch(() => {
        error.value = null;
        isLoading.value = false;
        data.value = contentResponse;
      });

      if (typeof onSuccessCallback === 'function') {
        onSuccessCallback();
      }
    } else {
      const errorResponse = await extractContent<UError>(response);
      batch(() => {
        error.value = errorResponse;
        isLoading.value = false;
        data.value = null;
      });

      if (typeof onErrorCallback === 'function') {
        onErrorCallback();
      }
    }
  }

  return {
    isLoading,
    data,
    error,
    executeRequest,
  } as const;
}

/**
 * A lightweight data-fetching hook with built-in caching and request management.
 *
 * Features:
 * - Automatic GET requests on mount
 * - Caching with TTL (time-to-live)
 * - Manual cache invalidation
 * - Loading and error states
 */
function useQuery<TResponse = unknown, UError = unknown>({ key, url, options: { noCache = false, ttl = TTL_DEFAULT } = {} }: GetConfig) {
  const isLoading = useSignal<boolean>(false);
  const data = useSignal<TResponse | null>(null);
  const error = useSignal<UError | null>(null);
  const { getCache, setCache, deleteCache } = useCache<TResponse>();

  async function executeRequest(): Promise<void> {
    if (!noCache) {
      const cacheHit = getCache(key);
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

    const response = await fetch(url, {
      ...fetchInitConfig('GET'),
    });

    if (response.ok) {
      const contentResponse = await extractContent<TResponse>(response);
      batch(() => {
        error.value = null;
        isLoading.value = false;
        data.value = contentResponse;
      });

      setCache(key, contentResponse, ttl);
    } else {
      const errorResponse = await extractContent<UError>(response);
      batch(() => {
        error.value = errorResponse;
        isLoading.value = false;
        data.value = null;
      });
    }
  }

  function invalidate() {
    deleteCache(key);
  }

  useEffect(() => {
    void executeRequest();
  });

  return {
    isLoading,
    data,
    error,
    executeRequest,
    invalidate,
  } as const;
}

export { useMutation, useQuery };
