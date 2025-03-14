import { type Signal } from '@preact/signals';
import { type JSX } from 'preact';
import { type Item } from '@/responses';
import { ShoppingItemSelection } from './ShopingItemSelection';
import { ShoppingListWrapper } from './ShoppingListWrapper';

type ShoppingItemsProps = {
  items: Signal<Item[] | null>;
  invalidate: () => void;
};

export function ShoppingListSelection({ items, invalidate }: ShoppingItemsProps): JSX.Element {
  return (
    <ShoppingListWrapper items={items}>
      <>{items.value?.map((item) => <ShoppingItemSelection item={item} key={item.id} invalidateItems={invalidate} />)}</>
    </ShoppingListWrapper>
  );
}
