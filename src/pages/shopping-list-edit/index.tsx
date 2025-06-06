import { type JSX } from 'preact';
import { useRoute } from 'preact-iso';
import { Loader } from '@/components';
import { buildApiURL, createListKey } from '@/helpers';
import { useQuery } from '@/hooks';
import { type List } from '@/responses';

export function EditShoppingList(): JSX.Element {
  const {
    params: { shoppingListId },
  } = useRoute();

  const { data: list, isLoading } = useQuery<List>({
    url: buildApiURL(`/list/${shoppingListId}`),
    key: createListKey(shoppingListId),
  });

  if (isLoading.value) {
    return <Loader />;
  }

  return (
    <div>
      <div className="mx-auto my-5 max-w-2xl lg:mx-0">
        <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Modifier ma liste</h2>
      </div>
      <p>list: {JSON.stringify(list)}</p>
    </div>
  );
}
