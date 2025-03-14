import { type Signal } from '@preact/signals';
import { type FieldValues, type Path, type UseFormSetError } from 'react-hook-form';

type ErrorMessage = { message: string };
type DefaultKeys = `root.${string}` | 'root';

type ErrorKeys<T> = Path<T> | DefaultKeys;

/**
 * Helper to type backend errors and add a "root" key
 */
export type FormErrors<T> = Record<ErrorKeys<T>, ErrorMessage[]>;

/**
 * Transforms server errors to useForm compatible errors and initialize them
 *
 * The error from the back-end and are structured such as :
 *
 * {
 *    "name":[
 *      {"message":"ITEM_NAME"}
 *    ]
 * }
 *
 * It loops over the keys, finds the message key and find the corresponding errorMessage
 *
 * const itemErrorMessages = {
 *   ITEM_NAME: "error message",
 * };
 *
 * @param setError useForm's setError
 * @param error the raw server error
 * @param errorMessages the key value error messages
 */
export function feedServerErrorsToForm<T extends FieldValues>(
  setError: UseFormSetError<T>,
  error: Signal<Record<ErrorKeys<T>, ErrorMessage[]> | null>,
  errorMessages: Record<string, string>,
) {
  Object.entries(error.value ?? {}).forEach(([key, value]) => {
    const errorMessageKey = value.find(({ message }) => message != null)?.message;
    const message = errorMessageKey != null ? errorMessages[errorMessageKey] : 'DEFAULT MESSAGE';
    setError(key as ErrorKeys<T>, {
      message,
    });
  });
}
