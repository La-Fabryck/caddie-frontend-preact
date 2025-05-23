import { DiamondPlus } from 'lucide-preact';
import { type JSX } from 'preact';
import { Loader } from '@/components';
import { buttonVariants } from '@/components/ui/button';
import { buildApiURL, createAllListsKey, formatDateToISO, formatDateToLongFormat } from '@/helpers';
import { useQuery } from '@/hooks';
import { type List } from '@/responses';

function printLists(isLoading: boolean, lists: List[]): JSX.Element {
  if (isLoading) {
    return <Loader />;
  }

  if (!lists.length) {
    return <p>Créé ta première liste nondidju !</p>;
  }

  return (
    <ul>
      {lists.map((list) => (
        <li key={list.id}>
          <a href={`/list/${list.id}`} className="bg-surface0 hover:bg-surface1 my-2 flex justify-between gap-x-6 p-5">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-lg font-bold">{list.title}</p>
                <p className="mt-1 truncate text-xs/5">
                  Créé le <time dateTime={formatDateToISO(list.createdAt)}>{formatDateToLongFormat(list.createdAt)}</time>
                </p>
              </div>
            </div>
            <div>
              <div className="mt-1 flex items-center gap-x-1.5">
                <div className="bg-green flex-none rounded-full p-1">
                  <div className="bg-green size-1.5 rounded-full" />
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-xs/5">En cours</p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="mt-1 text-xs/5">
                  Modifié le <time dateTime={formatDateToISO(list.updatedAt)}>{formatDateToLongFormat(list.updatedAt)}</time>
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
  const { data: allLists, isLoading } = useQuery<List[]>({
    url: buildApiURL('/list'),
    key: createAllListsKey(),
  });

  return (
    <>
      <a className={buttonVariants({ variant: 'default', size: 'lg', className: 'font-semibold' })} href="/list/create">
        <DiamondPlus />
        Nouvelle liste
      </a>
      <div className="mx-auto my-5 max-w-2xl lg:mx-0">
        <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Mes listes de courses</h2>
      </div>
      {printLists(isLoading.value, allLists.value ?? [])}
    </>
  );
}
