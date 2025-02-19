const DEFAULT_DELAY = 500;

export function debounce<F extends (...args: never[]) => Promise<void>>(func: F, delay = DEFAULT_DELAY) {
  let timeout: NodeJS.Timeout;

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      void func.apply(this, args);
    }, delay);
  };
}
