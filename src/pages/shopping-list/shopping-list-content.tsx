import { effect, type Signal } from '@preact/signals';
import { Plus } from 'lucide-preact';
import { type JSX } from 'preact';
import { useLocation } from 'preact-iso';
import { type Action, Loader } from '@/components';
import { buttonVariants } from '@/components/ui';
import { buildApiURL, createItemsKey } from '@/helpers';
import { useQuery } from '@/hooks';
import { type Item } from '@/responses';
import { ShoppingListDeleteMode } from './shopping-list-delete-mode';
import { ShoppingListEditMode } from './shopping-list-edit-mode';
import { ShoppingListSelectMode } from './shopping-list-select-mode';

type ShoppingListContentProps = {
  shoppingListId: string;
  action: Signal<Action>;
};

export function ShoppingListContent({ action, shoppingListId }: ShoppingListContentProps): JSX.Element {
  const { route } = useLocation();

  const {
    data: items,
    isLoading: isLoadingItems,
    invalidate: invalidateItems,
  } = useQuery<Item[]>({
    url: buildApiURL(`/list/${shoppingListId}/items`),
    key: createItemsKey(shoppingListId),
  });

  effect(() => {
    if (items.value?.length === 0) {
      route(`/list/${shoppingListId}/items/add`, true);
    }
  });

  if (isLoadingItems.value) {
    return <Loader />;
  }

  switch (action.value) {
    case 'selection':
      return (
        <>
          <a
            className={`${buttonVariants({ variant: 'default', size: 'lg', className: 'font-semibold' })}, mb-3`}
            href={`/list/${shoppingListId}/items/add`}
          >
            <Plus />
            Ajoute un article
          </a>
          <ShoppingListSelectMode items={items} invalidate={invalidateItems} />
        </>
      );

    case 'edition':
      return <ShoppingListEditMode items={items} />;
    case 'deletion':
      return <ShoppingListDeleteMode items={items} invalidate={invalidateItems} action={action} />;
    default:
      throw new Error('Invalid action');
  }
}
