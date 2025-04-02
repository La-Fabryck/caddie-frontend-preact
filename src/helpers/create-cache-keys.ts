const ALL_LISTS = 'lists';
const LIST_KEY = 'list';
const ITEMS_KEY = 'items';
const ITEM_KEY = 'item';

function createKey(type: string, id: string): string {
  return `${type}_${id}`;
}

export function createAllListsKey(): string {
  return ALL_LISTS;
}

export function createListKey(id: string): string {
  return createKey(LIST_KEY, id);
}

export function createItemsKey(id: string): string {
  return createKey(ITEMS_KEY, id);
}

export function createItemKey(id: string): string {
  return createKey(ITEM_KEY, id);
}
