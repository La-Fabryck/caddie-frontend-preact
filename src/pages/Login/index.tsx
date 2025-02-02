import { type JSX, useEffect } from 'preact/compat';
import { useLocation } from 'preact-iso';
import { useForm } from 'react-hook-form';
import { useFetch } from '@/hooks';

type Credentials = {
  email: string;
  password: string;
};
type ErrorMessage = { message: string };
type LoginErrors = {
  password: ErrorMessage[];
  email: ErrorMessage[];
  top: ErrorMessage[];
};

export function Login(): JSX.Element {
  const location = useLocation();
  const { handleSubmit, formState, register, setError } = useForm<Credentials>();
  const {
    executeRequest: handleLogin,
    isLoading,
    error,
  } = useFetch<null, LoginErrors, Credentials>({
    url: '/api/authentication/login',
    method: 'POST',
    onSuccessCallback: () => {
      window.localStorage.setItem('isAuthenticated', '1');
      location.route('/', true);
    },
  });

  useEffect(() => {
    if (error.value != null) {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      setError('root', { message: error.value.top[0].message });
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      setError('email', { message: error.value.top[0].message });
    }
  }, [setError, error.value]);

  return (
    <>
      {isLoading.value && <p>Loading...</p>}
      {/* TODO: */}
      {/* eslint-disable-next-line @typescript-eslint/no-magic-numbers */}
      {error.value != null && <p>errors {JSON.stringify(error.value, null, 4)}</p>}
      <br />
      <br />
      <form onSubmit={handleSubmit(handleLogin)}>
        {formState.errors.root && <p role="alert">{formState.errors.root.message}</p>}
        {formState.errors.email && <p role="alert">{formState.errors.email.message}</p>}
        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...register('email', { required: true })} />
        <br />
        {formState.errors.password && <p role="alert">Password is required</p>}
        <label htmlFor="password">Password</label>
        <input id="password" type="password" {...register('password', { required: true })} />
        <br />
        <input type="submit" />
      </form>
    </>
  );
}
