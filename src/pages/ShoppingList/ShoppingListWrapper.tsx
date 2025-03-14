import { type Signal } from '@preact/signals';
import { type JSX } from 'preact';
import { type Item } from '@/responses';

type ShoppingListWrapperProps = {
  children: JSX.Element;
  items: Signal<Item[] | null>;
};

export function ShoppingListWrapper({ children, items: itemsSignal }: ShoppingListWrapperProps): JSX.Element {
  const items = itemsSignal.value ?? [];

  if (items.length === 0) {
    return <p>Pas d&apos;articles trouvés</p>;
  }
  return (
    <ul>
      <div className="bg-crust relative flex flex-col rounded-xl">
        <div className="flex min-w-[240px] flex-col gap-1 p-2">{children}</div>
      </div>
    </ul>
  );
}
