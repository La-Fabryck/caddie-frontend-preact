import { useSignal } from '@preact/signals';
import { type JSX } from 'preact/compat';
import { buildApiURL, debounce } from '@/helpers';
import { useFetch } from '@/hooks';
import { type Item } from '@/responses';

export function ShoppingItem({ item: itemInitalValue }: { item: Item }): JSX.Element {
  const item = useSignal(itemInitalValue);
  const { executeRequest: updateIsInCart, data: updatedItem } = useFetch<Item, null, Pick<Item, 'isInCart'>>({
    method: 'PATCH',
    url: buildApiURL(`/list/${itemInitalValue.listId}/items/${itemInitalValue.id}`),
    onSuccessCallback: () => {
      if (updatedItem.value != null) {
        item.value = updatedItem.value;
        //TODO: update global state or invalidate state ? Pointless if SSE ?
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onErrorCallback: () => {},
  });

  const debouncedUpdateIsInCart = debounce(async (isChecked: boolean, initValue: Item) => {
    if (initValue.isInCart !== isChecked) {
      await updateIsInCart({ isInCart: isChecked });
    }
  });

  function handleOnChange(event: JSX.TargetedEvent<HTMLInputElement, Event>, initValue: Item): void {
    const isChecked = event.currentTarget.checked;

    // Call the debounced function
    debouncedUpdateIsInCart(isChecked, initValue);
  }

  return (
    <li
      key={item.value.id}
      className="hover:bg-base flex w-full items-center rounded-lg p-0 transition-all focus:bg-slate-100 active:bg-slate-100"
    >
      <label
        htmlFor={item.value.id}
        className="flex w-full cursor-pointer items-center px-3 py-2"
        aria-labelledby={`label-${item.value.id}`}
      >
        <div className="inline-flex items-center">
          <div className="relative flex cursor-pointer items-center">
            <input
              type="checkbox"
              className="peer border-pink checked:bg-pink h-5 w-5 cursor-pointer appearance-none rounded-sm border shadow-sm transition-all hover:shadow-md"
              id={item.value.id}
              aria-labelledby={`label-${item.value.id}`}
              checked={item.value.isInCart}
              onChange={(event) => handleOnChange(event, item.value)}
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
          <span id={`label-${item.value.id}`} className="ml-2 cursor-pointer text-sm">
            {item.value.name}
          </span>
        </div>
      </label>
    </li>
  );
}
