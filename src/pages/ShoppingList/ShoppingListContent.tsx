import { effect, type Signal } from '@preact/signals';
import { DiamondPlus } from 'lucide-preact';
import { type JSX } from 'preact';
import { useLocation } from 'preact-iso';
import { type Action, Loader } from '@/components';
import { buttonVariants } from '@/components/ui';
import { buildApiURL, createItemKey } from '@/helpers';
import { useFetch } from '@/hooks';
import { type Item } from '@/responses';
import { ShoppingListDeletion } from './ShoppingListDeletion';
import { ShoppingListSelection } from './ShoppingListSelection';

type ShoppingListContentProps = {
  shoppingListId: string;
  action: Signal<Action>;
};

export function ShoppingListContent({ action, shoppingListId }: ShoppingListContentProps): JSX.Element {
  const {
    data: items,
    isLoading: isLoadingItems,
    invalidate: invalidateItems,
  } = useFetch<Item[]>({
    url: buildApiURL(`/list/${shoppingListId}/items`),
    key: createItemKey(shoppingListId),
  });

  const { route } = useLocation();

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
            className={buttonVariants({ variant: 'default', size: 'lg', className: 'font-semibold' })}
            href={`/list/${shoppingListId}/items/add`}
          >
            <DiamondPlus />
            Ajoute un article
          </a>
          <ShoppingListSelection items={items} invalidate={invalidateItems} />
        </>
      );

    case 'edition':
      return <p>TODO...</p>;
    case 'deletion':
      return <ShoppingListDeletion items={items} invalidate={invalidateItems} action={action} />;
    default:
      throw new Error('Invalid action');
  }
}
