import { Loader2 } from 'lucide-preact';
import { type JSX } from 'preact';
import { useLocation } from 'preact-iso';
import { useForm } from 'react-hook-form';
import { Button, Checkbox, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input } from '@/components/ui';
import { buildApiURL, feedServerErrorsToForm, type FormErrors } from '@/helpers';
import { useMutation } from '@/hooks';
import { itemErrorMessages } from '@/messages';
import { type CreateItem } from '@/pages';
import { type Item } from '@/responses';

type EditItemProps = CreateItem & {
  isInCart: boolean;
};

type EditItemErrors = FormErrors<EditItemProps>;

type EditItemFormProps = {
  invalidateItems: () => void;
  invalidateItem: () => void;
  itemInitialValue: Item;
};

/**
 * The Edit Form has been created as a standalone with pre-fetched values to avoid a case
 * where you need to use a useEffect to set up each field
 *
 * see https://github.com/shadcn-ui/ui/discussions/2003
 *
 * @param invalidateItems invalidate the list of values
 * @param invalidateItem invalidate a single item
 * @param itemInitialValue the initial values
 * @constructor
 */
export function EditItemForm({ invalidateItems, invalidateItem, itemInitialValue }: EditItemFormProps): JSX.Element {
  const { route } = useLocation();
  const form = useForm<EditItemProps>();

  const {
    executeRequest: editItem,
    isLoading: isLoadingEditItem,
    error,
  } = useMutation<Item, EditItemErrors, EditItemProps>({
    url: buildApiURL(`/list/${itemInitialValue.listId}/items/${itemInitialValue.id}`),
    method: 'PATCH',
    onSuccessCallback: () => {
      invalidateItems();
      invalidateItem();
      route(`/list/${itemInitialValue.listId}`, false);
    },
    onErrorCallback: () => {
      feedServerErrorsToForm(form.setError, error, itemErrorMessages);
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(editItem)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          defaultValue={itemInitialValue.name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de l&apos;article</FormLabel>
              <FormControl>
                <Input placeholder="🍔 ou 🍫" {...field} />
              </FormControl>
              <FormDescription>Bravo on a fait une faute 🤦</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isInCart"
          defaultValue={itemInitialValue.isInCart}
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Dans le panier 🛒 ?</FormLabel>
                <FormDescription>As-tu déjà pris l&apos;article ?</FormDescription>
              </div>
            </FormItem>
          )}
        />
        <Button className="font-semibold" type="submit" disabled={isLoadingEditItem.value}>
          {isLoadingEditItem.value ? (
            <>
              <Loader2 className="animate-spin" /> Attendez
            </>
          ) : (
            'Modifier'
          )}
        </Button>
      </form>
    </Form>
  );
}
