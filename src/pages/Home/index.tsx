import preactLogo from '../../assets/preact.svg';
import { useFetch } from '@/hooks';
import type { List } from '@/responses';
import './style.css';

export function Home() {
  const { data: lists, isLoading } = useFetch<List[]>({
    url: '/api/list',
    options: { key: 'lists' },
  });

  return (
    <div class="home">
      <p>{isLoading ? 'Loading...' : JSON.stringify(lists, null, 4)}</p>
      <a href="https://preactjs.com" target="_blank" rel="noreferrer">
        <img src={preactLogo} alt="Preact logo" height="160" width="160" />
      </a>
      <h1>Get Started building Vite-powered Preact Apps </h1>
    </div>
  );
}
