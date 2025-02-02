import { type JSX } from 'preact/compat';
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

//TODO: handle errors
export function Login(): JSX.Element {
  const location = useLocation();
  const { handleSubmit, formState, register } = useForm<Credentials>();
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

  return (
    <>
      {isLoading.value && <p>Loading...</p>}
      {/* TODO: */}
      {/* eslint-disable-next-line @typescript-eslint/no-magic-numbers */}
      {error.value != null && <p>errors {JSON.stringify(error.value, null, 4)}</p>}
      <br />
      <br />
      <form onSubmit={handleSubmit(handleLogin)}>
        {/* <Form > */}
        <label htmlFor="email">Email</label>
        {formState.errors.email?.type === 'required' && <p role="alert">Email is required</p>}
        <input id="email" type="email" {...register('email', { required: true })} />
        <br />
        <label htmlFor="password">Password</label>
        {formState.errors.password?.type === 'required' && <p role="alert">Password is required</p>}
        <input id="password" type="password" {...register('password', { required: false })} />
        <br />
        <input type="submit" />
      </form>
      {/* </Form> */}
    </>
  );
}
