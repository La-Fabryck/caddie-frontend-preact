import { Loader } from 'lucide-preact';
import { type JSX } from 'preact';
import { useRoute } from 'preact-iso';
import { buildApiURL, createAllListsKey, createListKey } from '@/helpers';
import { useQuery } from '@/hooks';
import { type List } from '@/responses';
import { DeleteShoppingListForm } from './delete-shopping-list-form';

export function DeleteShoppingList(): JSX.Element {
  const {
    params: { shoppingListId },
  } = useRoute();

  const { invalidate: invalidateLists } = useQuery<List[]>({
    url: buildApiURL('/list'),
    key: createAllListsKey(),
  });

  const {
    data: list,
    isLoading,
    invalidate: invalidateList,
  } = useQuery<List>({
    url: buildApiURL(`/list/${shoppingListId}`),
    key: createListKey(shoppingListId),
  });

  if (isLoading.value || list.value == null) {
    return <Loader />;
  }

  return (
    <div>
      <div className="mx-auto my-5 max-w-2xl lg:mx-0">
        <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Supprimer ma liste 😨</h2>
      </div>
      <DeleteShoppingListForm listInitialValue={list.value} invalidateList={invalidateList} invalidateLists={invalidateLists} />
    </div>
  );
}
