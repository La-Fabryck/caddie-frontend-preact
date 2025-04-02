import { type JSX } from 'preact';
import { Loader } from '@/components';
import { buildApiURL, createListKey } from '@/helpers';
import { useFetch } from '@/hooks';
import { type List } from '@/responses';

type ShoppingListHeaderProps = {
  shoppingListId: string;
};

export function ShoppingListHeader({ shoppingListId }: ShoppingListHeaderProps): JSX.Element {
  const { data: listDetail, isLoading: isLoadingList } = useFetch<List>({
    url: buildApiURL(`/list/${shoppingListId}`),
    key: createListKey(shoppingListId),
  });

  if (isLoadingList.value) {
    return <Loader />;
  }

  return (
    <div className="mx-auto my-5 max-w-2xl lg:mx-0">
      <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">{listDetail.value?.title ?? 'Ma liste'}</h2>
    </div>
  );
}
