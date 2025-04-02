import { type JSX } from 'preact';
import { useRoute } from 'preact-iso';
import { Loader } from '@/components';
import { buildApiURL, createItemKey, createItemsKey } from '@/helpers';
import { useFetch } from '@/hooks';
import { type Item } from '@/responses';
import { EditItemForm } from './edit-item-form';

export function EditItem(): JSX.Element {
  const {
    params: { shoppingListId, itemId },
  } = useRoute();

  const { invalidate: invalidateItems } = useFetch<Item[]>({
    url: buildApiURL(`/list/${shoppingListId}/items`),
    key: createItemsKey(shoppingListId),
  });

  const {
    data: item,
    isLoading: isLoadingItem,
    invalidate: invalidateItem,
  } = useFetch<Item>({
    url: buildApiURL(`/list/${shoppingListId}/items/${itemId}`),
    key: createItemKey(itemId),
  });

  if (isLoadingItem.value || item.value == null) {
    return <Loader />;
  }

  return (
    <>
      <h1>Modifier l&apos;article {item.value?.name}</h1>
      <EditItemForm invalidateItems={invalidateItems} invalidateItem={invalidateItem} itemInitialValue={item.value} />
    </>
  );
}
