import { type JSX } from 'preact/compat';
import { useLocation } from 'preact-iso';
import { useForm } from 'react-hook-form';
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormRootError,
  Input,
} from '@/components/ui';
import { buildURL, feedServerErrorsToForm, type FormErrors } from '@/helpers';
import { useFetch } from '@/hooks';

type Credentials = {
  email: string;
  password: string;
};

type LoginErrors = FormErrors<Credentials>;

export function Login(): JSX.Element {
  const location = useLocation();
  const form = useForm<Credentials>();
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
      feedServerErrorsToForm(form.setError, error);
    },
  });

  if (isLoading.value) {
    return <p>Loading...</p>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-8">
        <FormRootError />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="ton@email.com" {...field} />
              </FormControl>
              <FormDescription>Rentre ton email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.errors.password && <p role="alert">{form.formState.errors.password.message}</p>}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de Passe</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Mot de passe super sécurisé" {...field} />
              </FormControl>
              <FormDescription>Ton mot de passe personnel.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
