import { type Signal } from '@preact/signals';
import { SquareArrowOutUpRight } from 'lucide-preact';
import { type JSX } from 'preact';
import { type Item } from '@/responses';
import { ListItem } from './list-item';
import { ShoppingListWrapper } from './shopping-list-wrapper';

type ShoppingListEditionProps = {
  items: Signal<Item[] | null>;
};

export function ShoppingListEdition({ items }: ShoppingListEditionProps): JSX.Element {
  return (
    <>
      <ShoppingListWrapper items={items}>
        <>
          {items.value?.map((item) => {
            return (
              <ListItem key={item.id}>
                <a className="flex flex-1 cursor-pointer items-center px-3 py-2" href={`/list/${item.listId}/items/${item.id}/edit`}>
                  <SquareArrowOutUpRight className="text-pink" />
                  <span className="ml-2 text-sm">{item.name}</span>
                </a>
              </ListItem>
            );
          })}
        </>
      </ShoppingListWrapper>
    </>
  );
}
