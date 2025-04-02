import { Loader2 } from 'lucide-preact';
import { type JSX } from 'preact';
import { useLocation, useRoute } from 'preact-iso';
import { useForm } from 'react-hook-form';
import { Loader } from '@/components';
import { Button, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input } from '@/components/ui';
import { buildApiURL, createItemsKey, createListKey, feedServerErrorsToForm, type FormErrors } from '@/helpers';
import { useFetch } from '@/hooks';
import { itemErrorMessages } from '@/messages';
import { type Item, type List } from '@/responses';

export type CreateItem = {
  name: string;
};

type CreateItemErrors = FormErrors<CreateItem>;

export function CreateItem(): JSX.Element {
  const { route } = useLocation();
  const {
    params: { shoppingListId },
  } = useRoute();
  const form = useForm<CreateItem>();

  const { data: listDetail, isLoading: isLoadingList } = useFetch<List>({
    url: buildApiURL(`/list/${shoppingListId}`),
    key: createListKey(shoppingListId),
  });

  const { invalidate: invalidateItems } = useFetch<Item[]>({
    url: buildApiURL(`/list/${shoppingListId}/items`),
    key: createItemsKey(shoppingListId),
  });

  const {
    executeRequest: addItem,
    isLoading: isLoadingAddItem,
    error,
  } = useFetch<Item, CreateItemErrors, CreateItem>({
    url: buildApiURL(`/list/${shoppingListId}/items`),
    method: 'POST',
    onSuccessCallback: () => {
      invalidateItems();
      route(`/list/${shoppingListId}`, true);
    },
    onErrorCallback: () => {
      feedServerErrorsToForm(form.setError, error, itemErrorMessages);
    },
  });

  if (isLoadingList.value) {
    return <Loader />;
  }

  return (
    <>
      <h1>🛒 Ajoute un nouvel article à {listDetail.value?.title} 🛒</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(addItem)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom de l&apos;article</FormLabel>
                <FormControl>
                  <Input placeholder="🍔 ou 🍫" {...field} />
                </FormControl>
                <FormDescription>Tu veux acheter quoi encore 🤌 ⁉️</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="font-semibold" type="submit" disabled={isLoadingAddItem.value}>
            {isLoadingAddItem.value ? (
              <>
                <Loader2 className="animate-spin" /> Attendez
              </>
            ) : (
              'Ajouter'
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
