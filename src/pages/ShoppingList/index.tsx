import { type JSX } from 'preact/compat';
import { useRoute } from 'preact-iso';
import { createItemKey, createListKey } from '@/helpers';
import { useFetch } from '@/hooks';
import { type Item, type List } from '@/responses';

function printLists(items: Item[]): JSX.Element {
  if (!items.length) {
    return <p>No items found</p>;
  }

  return (
    <ul>
      <div className="relative flex flex-col rounded-xl bg-crust">
        <div className="flex min-w-[240px] flex-col gap-1 p-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex w-full items-center rounded-lg p-0 transition-all hover:bg-base focus:bg-slate-100 active:bg-slate-100"
            >
              <label htmlFor={item.id} className="flex w-full cursor-pointer items-center px-3 py-2" aria-labelledby={`label-${item.id}`}>
                <div className="inline-flex items-center">
                  <div className="flex items-center cursor-pointer relative">
                    <input
                      type="checkbox"
                      className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded-sm shadow-sm hover:shadow-md border border-pink checked:bg-pink"
                      id={item.id}
                      aria-labelledby={`label-${item.id}`}
                    />
                    <svg
                      className="absolute w-3 h-4 pointer-events-none hidden peer-checked:block stroke-crust ml-1 outline-hidden"
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
                  <span id={`label-${item.id}`} className="cursor-pointer ml-2 text-sm">
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
    url: `/api/list/${shoppingListId}`,
    key: createListKey(shoppingListId),
  });

  const { data: items, isLoading: isLoadingItems } = useFetch<Item[]>({
    url: `/api/list/${shoppingListId}/items`,
    key: createItemKey(shoppingListId),
  });

  if (isLoadingItems.value || isLoadingList.value) {
    return <p>Loading...</p>;
  }

  return (
    <div className="py-5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 my-5">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">{listDetail.value?.title ?? 'Ma liste'}</h2>
        </div>
        {printLists(items.value ?? [])}
      </div>
    </div>
  );
}
