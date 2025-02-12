import { type JSX } from 'preact/compat';
import { useLocation } from 'preact-iso';
import { useForm } from 'react-hook-form';
import { Button, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input } from '@/components/ui';
import { buildURL, feedServerErrorsToForm, type FormErrors } from '@/helpers';
import { useFetch } from '@/hooks';
import { type ListWithSubs } from '@/responses/createList';

type CreateList = {
  title: string;
  pseudonym: string;
};

type ListErrors = FormErrors<CreateList>;

export function CreateList(): JSX.Element {
  const location = useLocation();
  const form = useForm<CreateList>();
  const {
    executeRequest: handleLogin,
    isLoading,
    error,
    data,
  } = useFetch<ListWithSubs, ListErrors, CreateList>({
    url: buildURL('/list'),
    method: 'POST',
    onSuccessCallback: () => {
      location.route(`/list/${data.value?.id}`, true);
    },
    onErrorCallback: () => {
      feedServerErrorsToForm(form.setError, error);
    },
  });

  console.log('data', data);

  if (isLoading.value) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Crée une nouvelle liste</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom de la liste</FormLabel>
                <FormControl>
                  <Input placeholder="Courses" {...field} />
                </FormControl>
                <FormDescription>Donne un nom à ta liste.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pseudonym"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ton surnom</FormLabel>
                <FormControl>
                  <Input placeholder="Ton surnom que tout le monde verra" {...field} />
                </FormControl>
                <FormDescription>Donne toi un surnom rigolo 🌶️</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Créer</Button>
        </form>
      </Form>
    </>
  );
}
