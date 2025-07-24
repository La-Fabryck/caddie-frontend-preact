import { type Signal } from '@preact/signals';
import { type JSX } from 'preact';
import { type Item } from '@/responses';
import { SelectShoppingItem } from './select-shopping-item';
import { ShoppingListWrapper } from './shopping-list-wrapper';

type ShoppingItemsProps = {
  items: Signal<Item[] | null>;
  invalidate: () => void;
};

export function ShoppingListSelectMode({ items, invalidate }: ShoppingItemsProps): JSX.Element {
  return (
    <ShoppingListWrapper items={items}>
      <>
        {items.value?.map((item) => (
          <SelectShoppingItem item={item} key={item.id} invalidateItems={invalidate} />
        ))}
      </>
    </ShoppingListWrapper>
  );
}
