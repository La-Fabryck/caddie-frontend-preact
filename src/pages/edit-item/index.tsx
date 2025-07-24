import { type JSX } from 'preact';
import { useRoute } from 'preact-iso';
import { Loader } from '@/components';
import { buildApiURL, createItemKey, createItemsKey } from '@/helpers';
import { useQuery } from '@/hooks';
import { type Item } from '@/responses';
import { EditItemForm } from './edit-item-form';

export function EditItem(): JSX.Element {
  const {
    params: { shoppingListId, itemId },
  } = useRoute();

  const { invalidate: invalidateItems } = useQuery<Item[]>({
    url: buildApiURL(`/list/${shoppingListId}/items`),
    key: createItemsKey(shoppingListId),
  });

  const {
    data: item,
    isLoading: isLoadingItem,
    invalidate: invalidateItem,
  } = useQuery<Item>({
    url: buildApiURL(`/list/${shoppingListId}/items/${itemId}`),
    key: createItemKey(itemId),
  });

  if (isLoadingItem.value || item.value == null) {
    return <Loader />;
  }

  return (
    <>
      <div className="mx-auto my-5 max-w-2xl lg:mx-0">
        <h2 className="mb-2 text-4xl font-semibold tracking-tight sm:text-5xl">Modifier l&apos;article {item.value?.name}</h2>
      </div>
      <EditItemForm invalidateItems={invalidateItems} invalidateItem={invalidateItem} itemInitialValue={item.value} />
    </>
  );
}
