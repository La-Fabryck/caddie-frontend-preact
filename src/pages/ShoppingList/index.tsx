import { effect, type Signal } from '@preact/signals';
import { DiamondPlus } from 'lucide-preact';
import { type JSX } from 'preact/compat';
import { useLocation, useRoute } from 'preact-iso';
import { buttonVariants } from '@/components/ui';
import { buildApiURL, createItemKey, createListKey } from '@/helpers';
import { useFetch } from '@/hooks';
import { type Item, type List } from '@/responses';
import { ShoppingItem } from './ShopingItem';

function printLists(itemsSignal: Signal<Item[] | null>): JSX.Element {
  const items = itemsSignal.value ?? [];

  if (items.length === 0) {
    return <p>Pas d&apos;articles trouvés</p>;
  }

  return (
    <ul>
      <div className="bg-crust relative flex flex-col rounded-xl">
        <div className="flex min-w-[240px] flex-col gap-1 p-2">
          {items.map((item) => (
            <ShoppingItem item={item} key={item.id} />
          ))}
        </div>
      </div>
    </ul>
  );
}

export function ShoppingList(): JSX.Element {
  const {
    params: { shoppingListId },
  } = useRoute();
  const { route } = useLocation();

  const { data: listDetail, isLoading: isLoadingList } = useFetch<List>({
    url: buildApiURL(`/list/${shoppingListId}`),
    key: createListKey(shoppingListId),
  });

  const { data: items, isLoading: isLoadingItems } = useFetch<Item[]>({
    url: buildApiURL(`/list/${shoppingListId}/items`),
    key: createItemKey(shoppingListId),
  });

  if (isLoadingItems.value || isLoadingList.value) {
    return <p>Loading...</p>;
  }

  effect(() => {
    if (items.value?.length === 0) {
      route(`/list/${shoppingListId}/items/add`, true);
    }
  });

  return (
    <>
      <div className="mx-auto my-5 max-w-2xl lg:mx-0">
        <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">{listDetail.value?.title ?? 'Ma liste'}</h2>
      </div>
      <a className={buttonVariants({ variant: 'default', size: 'lg' })} href={`/list/${shoppingListId}/items/add`}>
        <DiamondPlus />
        Ajoute un objet
      </a>
      {printLists(items)}
    </>
  );
}
