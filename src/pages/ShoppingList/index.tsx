import { type JSX } from 'preact/compat';
import { useRoute } from 'preact-iso';
import { buildURL, createItemKey, createListKey } from '@/helpers';
import { useFetch } from '@/hooks';
import { type Item, type List } from '@/responses';

function printLists(items: Item[]): JSX.Element {
  if (!items.length) {
    return <p>Pas d&apos;items trouvés</p>;
  }

  return (
    <ul>
      <div className="bg-crust relative flex flex-col rounded-xl">
        <div className="flex min-w-[240px] flex-col gap-1 p-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="hover:bg-base flex w-full items-center rounded-lg p-0 transition-all focus:bg-slate-100 active:bg-slate-100"
            >
              <label htmlFor={item.id} className="flex w-full cursor-pointer items-center px-3 py-2" aria-labelledby={`label-${item.id}`}>
                <div className="inline-flex items-center">
                  <div className="relative flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      className="peer border-pink checked:bg-pink h-5 w-5 cursor-pointer appearance-none rounded-sm border shadow-sm transition-all hover:shadow-md"
                      id={item.id}
                      aria-labelledby={`label-${item.id}`}
                    />
                    <svg
                      className="stroke-crust pointer-events-none absolute ml-1 hidden h-4 w-3 outline-hidden peer-checked:block"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span id={`label-${item.id}`} className="ml-2 cursor-pointer text-sm">
                    {item.name}
                  </span>
                </div>
              </label>
            </li>
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

  const { data: listDetail, isLoading: isLoadingList } = useFetch<List>({
    url: buildURL(`/list/${shoppingListId}`),
    key: createListKey(shoppingListId),
  });

  const { data: items, isLoading: isLoadingItems } = useFetch<Item[]>({
    url: buildURL(`/list/${shoppingListId}/items`),
    key: createItemKey(shoppingListId),
  });

  if (isLoadingItems.value || isLoadingList.value) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="mx-auto my-5 max-w-2xl lg:mx-0">
        <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">{listDetail.value?.title ?? 'Ma liste'}</h2>
      </div>
      {printLists(items.value ?? [])}
    </>
  );
}
