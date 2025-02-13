import { type JSX } from 'preact/compat';
import { useLocation, useRoute } from 'preact-iso';
import { useForm } from 'react-hook-form';
import { Button, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input } from '@/components/ui';
import { buildApiURL, createItemKey, feedServerErrorsToForm, type FormErrors } from '@/helpers';
import { useFetch } from '@/hooks';
import { type Item } from '@/responses';

type CreateItem = {
  name: string;
};

type ListErrors = FormErrors<CreateItem>;

export function CreateItem(): JSX.Element {
  const { route } = useLocation();
  const {
    params: { shoppingListId },
  } = useRoute();
  const form = useForm<CreateItem>();

  const {
    executeRequest: addItem,
    isLoading,
    error,
    invalidate,
  } = useFetch<Item, ListErrors, CreateItem>({
    url: buildApiURL(`/list/${shoppingListId}/items`),
    method: 'POST',
    onSuccessCallback: () => {
      invalidate(createItemKey(shoppingListId));
      route(`/list/${shoppingListId}`, true);
    },
    onErrorCallback: () => {
      feedServerErrorsToForm(form.setError, error);
    },
  });

  if (isLoading.value) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>🛒 Ajoute un nouvel objet 🛒</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(addItem)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom de l&apos;objet</FormLabel>
                <FormControl>
                  <Input placeholder="🍔 ou 🍫" {...field} />
                </FormControl>
                <FormDescription>Tu veux acheter quoi encore ??</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Ajouter</Button>
        </form>
      </Form>
    </>
  );
}
