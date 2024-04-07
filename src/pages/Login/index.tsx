import { type FC } from 'preact/compat';
import { useForm } from 'react-hook-form';
import { useFetch } from '../../hooks/useFetch';

type LoginHandlerProps = {
  email: string;
  password: string;
};

export const Login: FC = () => {
  const { handleSubmit, formState, register } = useForm<LoginHandlerProps>();
  const { handleRequest, isLoading, data, error } = useFetch({
    url: '/api/authentication/login',
    init: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    options: { key: 'user' },
  });

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error != null && <p>errors {JSON.stringify(error, null, 4)}</p>}
      {data != null && <p>data {JSON.stringify(data, null, 4)}</p>}
      <br />
      <br />
      <form onSubmit={handleSubmit(handleRequest)}>
        <label for="email">Email</label>
        {formState.errors.email?.type === 'required' && (
          <p role="alert">Email is required</p>
        )}
        <input
          id="email"
          name="email"
          type="email"
          {...register('email', { required: true })}
        />
        <br />
        <label for="password">Password</label>
        {formState.errors.password?.type === 'required' && (
          <p role="alert">Password is required</p>
        )}
        <input
          id="password"
          name="password"
          type="password"
          {...register('password', { required: false })}
        />
        <br />
        <input type="submit" />
      </form>
    </>
  );
};
