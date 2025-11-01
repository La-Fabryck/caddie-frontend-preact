import { type JSX, type TargetedEvent } from 'preact';
import { buildApiURL } from '@/helpers';
import { useMutation } from '@/hooks';
import { type Item } from '@/responses';
import { ItemCheckbox } from './item-checkbox';
import { type ItemsToDeleteType } from './shopping-list-delete-mode';

type DeleteShoppingItem = {
  item: Item;
  itemsToDelete: ItemsToDeleteType;
};

export function DeleteShoppingItem({ item, itemsToDelete }: DeleteShoppingItem): JSX.Element {
  const { executeRequest: deleteItem } = useMutation<Item>({
    method: 'DELETE',
    url: buildApiURL(`/list/${item.listId}/items/${item.id}`),
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSuccessCallback: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onErrorCallback: () => {},
  });

  function handleOnChange(event: TargetedEvent<HTMLInputElement, Event>) {
    const isChecked = event.currentTarget.checked;
    if (isChecked) {
      itemsToDelete.value = [...itemsToDelete.value, [item.id, async () => deleteItem(null)]];
    } else {
      itemsToDelete.value = itemsToDelete.value.filter(([id]) => id !== item.id);
    }
  }

  return <ItemCheckbox item={item} onChange={handleOnChange} isChecked={itemsToDelete.value.some(([id]) => id === item.id)} />;
}
