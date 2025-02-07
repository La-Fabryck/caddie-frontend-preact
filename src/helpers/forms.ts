import { type Signal } from '@preact/signals';
import { type FieldValues, type Path, type UseFormSetError } from 'react-hook-form';

type ErrorMessage = { message: string };
type DefaultKeys = `root.${string}` | 'root';

type ErrorKeys<T> = keyof T | DefaultKeys;
export type FormErrors<T> = Record<ErrorKeys<T>, ErrorMessage[]>;

export function transformBackendErrorsToForm<T extends FieldValues>(
  setError: UseFormSetError<T>,
  error: Signal<Record<Path<T> | DefaultKeys, ErrorMessage[]> | null>,
) {
  Object.entries(error.value ?? {}).forEach(([key, value]) => {
    setError(key as Path<T> | DefaultKeys, {
      message: value.find(({ message }) => message != null)?.message ?? 'DEFAULT MESSAGE',
    });
  });
}
