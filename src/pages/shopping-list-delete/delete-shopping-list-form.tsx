import { Loader2 } from 'lucide-preact';
import { type JSX } from 'preact';
import { useLocation } from 'preact-iso';
import { useForm } from 'react-hook-form';
import { Button, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input } from '@/components/ui';
import { buildApiURL, feedServerErrorsToForm, type FormErrors } from '@/helpers';
import { useMutation } from '@/hooks';
import { listErrorMessages } from '@/messages';
import { type List } from '@/responses';
import { type MutateListFormProps } from '@/types';

type EditListProps = Pick<List, 'title'>;
type EditListErrors = FormErrors<EditListProps>;

export function DeleteShoppingListForm({ listInitialValue, invalidateList, invalidateLists }: MutateListFormProps): JSX.Element {
  const { route } = useLocation();
  const form = useForm();

  const {
    executeRequest: deleteList,
    isLoading: isLoadingEditItem,
    error,
  } = useMutation<List, EditListErrors, EditListProps>({
    url: buildApiURL(`/list/${listInitialValue.id}`),
    method: 'DELETE',
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
      <form onSubmit={form.handleSubmit(deleteList)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          defaultValue={listInitialValue.title}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Cette action est irréversible. Es-tu que tu tu tu turlututu es sur de chez sur ? La liste suivante va être supprimée. Oh non
                😢
              </FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
              <FormDescription>Tu vas mettre quoi dans tes sacs 🛍️ ?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="text-destructive-foreground font-semibold"
          type="submit"
          variant="destructive"
          disabled={isLoadingEditItem.value}
        >
          {isLoadingEditItem.value ? (
            <>
              <Loader2 className="animate-spin" /> Attendez
            </>
          ) : (
            'Supprimer'
          )}
        </Button>
      </form>
    </Form>
  );
}
