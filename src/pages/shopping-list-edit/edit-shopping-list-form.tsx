import { Loader2 } from 'lucide-preact';
import { type JSX } from 'preact';
import { useLocation } from 'preact-iso';
import { useForm } from 'react-hook-form';
import { Button, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input } from '@/components/ui';
import { buildApiURL, feedServerErrorsToForm, type FormErrors } from '@/helpers';
import { useMutation } from '@/hooks';
import { listErrorMessages } from '@/messages';
import { type List } from '@/responses';

type EditListProps = Pick<List, 'title'>;

type EditListErrors = FormErrors<EditListProps>;

type EditListFormProps = {
  listInitialValue: List;
  invalidateList: () => void;
  invalidateLists: () => void;
};

export function EditShoppingListForm({ listInitialValue, invalidateList, invalidateLists }: EditListFormProps): JSX.Element {
  const { route } = useLocation();
  const form = useForm<EditListProps>();

  const {
    executeRequest: editList,
    isLoading: isLoadingEditItem,
    error,
  } = useMutation<List, EditListErrors, EditListProps>({
    url: buildApiURL(`/list/${listInitialValue.id}`),
    method: 'PATCH',
    onSuccessCallback: () => {
      invalidateLists();
      invalidateList();
      route(`/list/${listInitialValue.id}`, false);
    },
    onErrorCallback: () => {
      feedServerErrorsToForm(form.setError, error, listErrorMessages);
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(editList)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          defaultValue={listInitialValue.title}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de l&apos;article</FormLabel>
              <FormControl>
                <Input placeholder="Le nom de ta liste 🛒🛍️" {...field} />
              </FormControl>
              <FormDescription>Tu vas mettre quoi dans tes sacs 🛍️ ?</FormDescription>
              <FormMessage />
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
