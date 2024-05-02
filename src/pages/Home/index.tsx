import type { FC, JSX } from 'preact/compat';
import { useFetch } from '@/hooks';
import type { List } from '@/responses';
import './style.css';

function printLists(lists: List[]): JSX.Element {
  return (
    <ul>
      {lists.map((l) => (
        <li key={l.id}>
          <a key={l.id} href={`/list/${l.id}`}>
            {l.title}
          </a>
        </li>
      ))}
    </ul>
  );
}

export const Home: FC = () => {
  const { data: lists, isLoading } = useFetch<List[]>({
    url: '/api/list',
    options: { key: 'lists' },
  });

  return (
    <div className="home">
      <h1>Here is all your shopping lists</h1>
      {isLoading && <p>Loading...</p>}
      {lists != null && printLists(lists)}
    </div>
  );
};
