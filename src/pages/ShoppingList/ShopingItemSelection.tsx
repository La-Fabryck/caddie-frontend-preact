import { useSignal } from '@preact/signals';
import { type JSX } from 'preact';
import { buildApiURL, debounce } from '@/helpers';
import { useFetch } from '@/hooks';
import { type Item } from '@/responses';
import { ItemCheckbox } from './ItemCheckbox';

type ShoppingItemSelectionType = {
  item: Item;
  invalidateItems: () => void;
};

export function ShoppingItemSelection({ item: itemInitalValue, invalidateItems }: ShoppingItemSelectionType): JSX.Element {
  const item = useSignal(itemInitalValue);
  const { executeRequest: updateIsInCart, data: updatedItem } = useFetch<Item, null, Pick<Item, 'isInCart'>>({
    method: 'PATCH',
    url: buildApiURL(`/list/${itemInitalValue.listId}/items/${itemInitalValue.id}`),
    onSuccessCallback: () => {
      if (updatedItem.value != null) {
        item.value = updatedItem.value;
        invalidateItems();
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onErrorCallback: () => {},
  });

  const debouncedUpdateIsInCart = debounce(async (isChecked: boolean, initValue: Item) => {
    if (initValue.isInCart !== isChecked) {
      await updateIsInCart({ isInCart: isChecked });
    }
  });

  function handleOnChange(event: JSX.TargetedEvent<HTMLInputElement, Event>, initValue: Item): void {
    const isChecked = event.currentTarget.checked;

    // Call the debounced function
    debouncedUpdateIsInCart(isChecked, initValue);
  }

  return <ItemCheckbox item={item.value} onChange={(event) => handleOnChange(event, item.value)} isChecked={item.value.isInCart} />;
}
