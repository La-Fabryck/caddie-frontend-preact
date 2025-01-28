import { type FC, type JSX } from 'preact/compat';
import { useRoute } from 'preact-iso';
import { useFetch } from '@/hooks';
import { type Item, type List } from '@/responses';

function printLists(items: Item[]): JSX.Element {
  if (items.length === 0) {
    return <p>No items found</p>;
  }

  return (
    <ul>
      <div className="relative flex flex-col rounded-xl bg-crust">
        <nav className="flex min-w-[240px] flex-col gap-1 p-2">
          {items.map((item) => (
            <div
              key={item.id}
              role="button"
              className="flex w-full items-center rounded-lg p-0 transition-all hover:bg-base focus:bg-slate-100 active:bg-slate-100"
            >
              <label htmlFor={item.id} className="flex w-full cursor-pointer items-center px-3 py-2 ">
                <div className="inline-flex items-center">
                  <label className="flex items-center cursor-pointer relative" htmlFor={item.id}>
                    <input
                      type="checkbox"
                      className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-pink checked:bg-pink"
                      id={item.id}
                    />
                    <svg
                      className="absolute w-3 h-4 pointer-events-none hidden peer-checked:block stroke-crust ml-1 outline-none"
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
                  </label>
                  <label className="cursor-pointer ml-2 text-sm" htmlFor={item.id}>
                    {item.name}
                  </label>
                </div>
              </label>
            </div>
          ))}
        </nav>
      </div>
    </ul>
  );
}

export const ShoppingList: FC = () => {
  const {
    params: { shoppingListId },
  } = useRoute();

  const { data: list, isLoading: isLoadingList } = useFetch<List>({
    url: `/api/list/${shoppingListId}`,
    options: { key: 'lists' },
  });

  const { data: items, isLoading: isLoadingItems } = useFetch<Item[]>({
    url: `/api/list/${shoppingListId}/items`,
    options: { key: shoppingListId },
  });

  if (isLoadingItems || isLoadingList) {
    return <p>Loading...</p>;
  }

  return (
    <div className="py-5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 my-5">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">{list?.title || 'Ma liste'}</h2>
        </div>
        {items != null && printLists(items)}
      </div>
    </div>
  );
};
