import { type FC } from 'preact/compat';
import { useForm } from 'react-hook-form';
import { useFetch } from '@/hooks';

type Credentials = {
  email: string;
  password: string;
};

type LoginProps = {
  onSuccessCallback: () => void;
};
//TODO: handle errors
export const Login: FC<LoginProps> = ({ onSuccessCallback }) => {
  const { handleSubmit, formState, register } = useForm<Credentials>();
  const {
    handleRequest: handleLogin,
    isLoading,
    error,
  } = useFetch<null, unknown, Credentials>({
    url: '/api/authentication/login',
    init: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    options: { key: 'user' },
    onSuccessCallback,
  });

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error != null && <p>errors {JSON.stringify(error, null, 4)}</p>}
      <br />
      <br />
      <form onSubmit={handleSubmit(handleLogin)}>
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
    </>
  );
};
