import { type JSX } from 'preact/compat';
import { useLocation } from 'preact-iso';
import { useForm } from 'react-hook-form';
import { buildURL, feedServerErrorsToForm, type FormErrors } from '@/helpers';
import { useFetch } from '@/hooks';

type Credentials = {
  email: string;
  password: string;
};

type LoginErrors = FormErrors<Credentials>;

export function Login(): JSX.Element {
  const location = useLocation();
  const { handleSubmit, formState, register, setError } = useForm<Credentials>();
  const {
    executeRequest: handleLogin,
    isLoading,
    error,
  } = useFetch<null, LoginErrors, Credentials>({
    url: buildURL('/authentication/login'),
    method: 'POST',
    onSuccessCallback: () => {
      window.localStorage.setItem('isAuthenticated', '1');
      location.route('/', true);
    },
    onErrorCallback: () => {
      feedServerErrorsToForm(setError, error);
    },
  });

  return (
    <>
      <h1>Mon super formulaire des familles</h1>
      {isLoading.value && <p>Loading...</p>}
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
