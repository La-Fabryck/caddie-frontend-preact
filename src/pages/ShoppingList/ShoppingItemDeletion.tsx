import { type JSX } from 'preact';
import { buildApiURL } from '@/helpers';
import { useFetch } from '@/hooks';
import { type Item } from '@/responses';
import { ItemCheckbox } from './ItemCheckbox';
import { type ItemsToDeleteType } from './ShoppingListDeletion';

type ShoppingItemDeletionType = {
  item: Item;
  itemsToDelete: ItemsToDeleteType;
};

export function ShoppingItemDeletion({ item, itemsToDelete }: ShoppingItemDeletionType): JSX.Element {
  const { executeRequest: deleteItem } = useFetch<Item, null, null>({
    method: 'DELETE',
    url: buildApiURL(`/list/${item.listId}/items/${item.id}`),
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSuccessCallback: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onErrorCallback: () => {},
  });

  function handleOnChange(event: JSX.TargetedEvent<HTMLInputElement, Event>) {
    const isChecked = event.currentTarget.checked;
    if (isChecked) {
      itemsToDelete.value = [...itemsToDelete.value, [item.id, async () => deleteItem()]];
    } else {
      itemsToDelete.value = itemsToDelete.value.filter(([id]) => id !== item.id);
    }
  }

  return <ItemCheckbox item={item} onChange={handleOnChange} isChecked={itemsToDelete.value.some(([id]) => id === item.id)} />;
}
