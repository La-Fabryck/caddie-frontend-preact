import { type FC, type JSX } from 'preact/compat';
import { useRoute } from 'preact-iso';
import { useFetch } from '@/hooks';
import { type Item, type List } from '@/responses';

function printLists(items: Item[]): JSX.Element {
  if (items.length === 0) {
    return <p>No items found</p>;
  }

  return (
    <table>
      <tr>
        <th>id</th>
        <th>name</th>
      </tr>
      {items.map((item) => (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
        </tr>
      ))}
    </table>
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
    <div className="home">
      {list != null && <h1>{list.title}</h1>}
      {items != null && printLists(items)}
    </div>
  );
};
