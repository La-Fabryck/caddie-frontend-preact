import { type Signal } from '@preact/signals';
import { type FieldValues, type Path, type UseFormSetError } from 'react-hook-form';

type ErrorMessage = { message: string };
type DefaultKeys = `root.${string}` | 'root';

type ErrorKeys<T> = keyof T | DefaultKeys;

/**
 * Helper to type backend errors and add a "root" key
 */
export type FormErrors<T> = Record<ErrorKeys<T>, ErrorMessage[]>;

/**
 * Transforms server errors to useForm compatible errors
 *
 * @param setError useForm's setError
 * @param error the raw server error
 */
export function feedServerErrorsToForm<T extends FieldValues>(
  setError: UseFormSetError<T>,
  error: Signal<Record<Path<T> | DefaultKeys, ErrorMessage[]> | null>,
) {
  Object.entries(error.value ?? {}).forEach(([key, value]) => {
    setError(key as Path<T> | DefaultKeys, {
      message: value.find(({ message }) => message != null)?.message ?? 'DEFAULT MESSAGE',
    });
  });
}
