import { type Signal, useSignal } from '@preact/signals';
import { Trash2 } from 'lucide-preact';
import { type JSX } from 'preact';
import { type Action } from '@/components';
import { Button } from '@/components/ui';
import { type Item } from '@/responses';
import { ShoppingItemDeletion } from './ShoppingItemDeletion';
import { ShoppingListWrapper } from './ShoppingListWrapper';

type ItemToDeleteTuple = [string, () => Promise<void>];
type ItemsToDeleteType = Signal<ItemToDeleteTuple[]>;

type ShoppingItemsProps = {
  items: Signal<Item[] | null>;
  invalidate: () => void;
  action: Signal<Action>;
};

const singular = 1;
function computeDeletionButtonText(length: number) {
  if (length === 0) {
    return 'Sélectionner des éléments à supprimer';
  }

  if (length === singular) {
    return 'Supprimer 1 article';
  }

  return `Supprimer ${length} articles`;
}

function ShoppingListDeletion({ items, invalidate, action }: ShoppingItemsProps): JSX.Element {
  const itemsToDelete = useSignal<ItemToDeleteTuple[]>([]);

  async function onClick(it: ItemToDeleteTuple[]) {
    await Promise.all(it.map(async ([_id, deleteFunction]) => deleteFunction()));

    invalidate();

    // navigate to the selection after the removal
    action.value = 'selection';
  }

  return (
    <>
      <Button variant={'destructive'} disabled={itemsToDelete.value.length === 0} onClick={async () => onClick(itemsToDelete.value)}>
        <Trash2 />
        {computeDeletionButtonText(itemsToDelete.value.length)}
      </Button>
      <ShoppingListWrapper items={items}>
        <>{items.value?.map((item) => <ShoppingItemDeletion item={item} key={item.id} itemsToDelete={itemsToDelete} />)}</>
      </ShoppingListWrapper>
    </>
  );
}

export { ShoppingListDeletion, type ItemsToDeleteType };
