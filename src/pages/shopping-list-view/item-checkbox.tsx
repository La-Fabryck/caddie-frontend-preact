import { type JSX } from 'preact';
import { type Item } from '@/responses';
import { ListItem } from './list-item';

type ItemCheckboxType = {
  item: Item;
  onChange: JSX.GenericEventHandler<HTMLInputElement>;
  isChecked: boolean;
};

export function ItemCheckbox({ item, onChange, isChecked }: ItemCheckboxType) {
  return (
    <ListItem key={item.id}>
      <label htmlFor={item.id} className="flex w-full cursor-pointer items-center px-3 py-2" aria-labelledby={`label-${item.id}`}>
        <div className="inline-flex items-center">
          <div className="relative flex cursor-pointer items-center">
            <input
              type="checkbox"
              className="peer border-pink checked:bg-pink h-5 w-5 cursor-pointer appearance-none rounded-sm border shadow-sm transition-all hover:shadow-md"
              id={item.id}
              aria-labelledby={`label-${item.id}`}
              checked={isChecked}
              onChange={onChange}
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
    </ListItem>
  );
}
