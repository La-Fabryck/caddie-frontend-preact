import { type JSX } from 'preact';
import { useLocation } from 'preact-iso';
import { useForm } from 'react-hook-form';
import { Loader } from '@/components';
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
import { buildApiURL, feedServerErrorsToForm, type FormErrors } from '@/helpers';
import { useFetch } from '@/hooks';
import { loginErrorMessages } from '@/messages';

type Credentials = {
  email: string;
  password: string;
};

type LoginErrors = FormErrors<Credentials>;

export function Login(): JSX.Element {
  const { route } = useLocation();
  const form = useForm<Credentials>();
  const {
    executeRequest: handleLogin,
    isLoading,
    error,
  } = useFetch<null, LoginErrors, Credentials>({
    url: buildApiURL('/authentication/login'),
    method: 'POST',
    onSuccessCallback: () => {
      window.localStorage.setItem('isAuthenticated', '1');
      route('/', true);
    },
    onErrorCallback: () => {
      feedServerErrorsToForm(form.setError, error, loginErrorMessages);
    },
  });

  if (isLoading.value) {
    return <Loader />;
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
        <Button className="font-semibold" type="submit">
          S&apos;authentifier
        </Button>
      </form>
    </Form>
  );
}
