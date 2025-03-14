import { signal } from '@preact/signals';
import { type JSX } from 'preact';
import { useRoute } from 'preact-iso';
import { type Action, ToggleActionGroup } from '@/components';
import { ShoppingListContent } from './ShoppingListContent';
import { ShoppingListHeader } from './ShoppingListHeader';

export function ShoppingList(): JSX.Element {
  const action = signal<Action>('selection');

  const {
    params: { shoppingListId },
  } = useRoute();

  return (
    <>
      <ToggleActionGroup action={action} />
      <ShoppingListHeader shoppingListId={shoppingListId} />
      <ShoppingListContent action={action} shoppingListId={shoppingListId} />
    </>
  );
}
