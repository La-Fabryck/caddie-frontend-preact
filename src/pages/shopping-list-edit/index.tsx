import { type JSX } from 'preact';
import { useRoute } from 'preact-iso';
import { Loader } from '@/components';
import { buildApiURL, createAllListsKey, createListKey } from '@/helpers';
import { useQuery } from '@/hooks';
import { type List } from '@/responses';
import { EditShoppingListForm } from './edit-shopping-list-form';

//TODO: Refacto avec shopping-list-delete
export function EditShoppingList(): JSX.Element {
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
        <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Modifier ma liste</h2>
      </div>
      <EditShoppingListForm listInitialValue={list.value} invalidateList={invalidateList} invalidateLists={invalidateLists} />
    </div>
  );
}
