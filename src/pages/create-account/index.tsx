import { Loader2 } from 'lucide-preact';
import { type JSX } from 'preact';
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
import { buildApiURL, feedServerErrorsToForm, type FormErrors } from '@/helpers';
import { useMutation } from '@/hooks';
import { userCreationErrorMessages } from '@/messages';

type UserCreation = {
  email: string;
  name: string;
  password: string;
};

type UserCreationErrors = FormErrors<UserCreation>;

export function CreateAccount(): JSX.Element {
  const { route } = useLocation();
  const form = useForm<UserCreation>();
  const {
    executeRequest: createUser,
    isLoading,
    error,
  } = useMutation<null, UserCreationErrors, UserCreation>({
    url: buildApiURL('/users'),
    method: 'POST',
    onSuccessCallback: () => {
      route('/login', false);
    },
    onErrorCallback: () => {
      feedServerErrorsToForm(form.setError, error, userCreationErrorMessages);
    },
  });

  return (
    <>
      <h1 className="mb-8 text-center">Créer son compte</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(createUser)} className="space-y-8">
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ton surnom</FormLabel>
                <FormControl>
                  <Input placeholder="Ton surnom par défaut pour les listes." {...field} />
                </FormControl>
                <FormDescription>Ton surnom de 2 lettres minimum, on est sérieux ici.</FormDescription>
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
          <Button className="font-semibold" type="submit" disabled={isLoading.value}>
            {isLoading.value ? (
              <>
                <Loader2 className="animate-spin" /> Attendez
              </>
            ) : (
              "S'authentifier"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
