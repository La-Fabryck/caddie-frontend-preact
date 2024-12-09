import type { FC, JSX } from 'preact/compat';
import { useFetch } from '@/hooks';
import type { List } from '@/responses';

function printLists(lists: List[]): JSX.Element {
  return (
    <ul role="list">
      {lists.map((l) => (
        <li key={l.id}>
          <a href={`/${l.id}`} className="flex justify-between gap-x-6 p-5 my-2 bg-surface1 hover:bg-surface2">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-lg font-bold">{l.title}</p>
                <p className="mt-1 truncate text-xs/5 text-subtext1">30 mars 2024</p>
              </div>
            </div>
            <div>
              <div className="mt-1 flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-green p-1">
                  <div className="size-1.5 rounded-full bg-green" />
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-xs/5">En cours</p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="mt-1 text-xs/5">
                  Modifié le <time dateTime="2024-04-01">1er avril 2024</time>
                </p>
              </div>
            </div>
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
    <div className="py-10 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <button
          type="button"
          className="mb-5 flex-none rounded-md bg-base px-3.5 py-2.5 text-sm font-semibold  shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500m"
        >
          + Nouvelle liste
        </button>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-pretty text-4xl font-semibold tracking-tight sm:text-5xl">Liste de listes</h2>
        </div>
        {isLoading && <p>Loading...</p>}
        {lists != null && printLists(lists)}
      </div>
    </div>
  );
};
