import { type JSX } from 'preact/compat';
import { Button } from '@/components/ui/button';
import { buildURL, createAllListsKey, formatDateToISO, formatDateToLongFormat } from '@/helpers';
import { useFetch } from '@/hooks';
import { type List } from '@/responses';

function printLists(isLoading: boolean, lists: List[]): JSX.Element {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!lists.length) {
    return <p>Créé ta première liste nondidju !</p>;
  }

  return (
    <ul>
      {lists.map((l) => (
        <li key={l.id}>
          <a href={`/list/${l.id}`} className="flex justify-between gap-x-6 p-5 my-2 bg-surface0 hover:bg-surface1">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-lg font-bold">{l.title}</p>
                <p className="mt-1 truncate text-xs/5">
                  Créé le <time dateTime={formatDateToISO(l.createdAt)}>{formatDateToLongFormat(l.createdAt)}</time>
                </p>
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
                  Modifié le <time dateTime={formatDateToISO(l.updatedAt)}>{formatDateToLongFormat(l.updatedAt)}</time>
                </p>
              </div>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Home(): JSX.Element {
  const { data: allLists, isLoading } = useFetch<List[]>({
    url: buildURL('/list'),
    key: createAllListsKey(),
  });

  return (
    <>
      {/* TODO: link not button */}
      <Button variant="default" size="lg" onClick={() => console.log('toto')}>
        + Nouvelle liste
      </Button>
      <div className="mx-auto max-w-2xl lg:mx-0 my-5">
        <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Mes listes de courses</h2>
      </div>
      {printLists(isLoading.value, allLists.value ?? [])}
    </>
  );
}
