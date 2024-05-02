import type { JSX } from 'preact/jsx-runtime';
import { useLocation } from 'preact-iso';

export function Header(): JSX.Element {
  const { url } = useLocation();

  return (
    <header>
      <nav>
        <a href="/" className={url == '/' ? 'active' : undefined}>
          Home
        </a>
        <a href="/login" className={url == '/login' ? 'active' : undefined}>
          Login
        </a>
        <a href="/404" className={url == '/404' ? 'active' : undefined}>
          404
        </a>
      </nav>
    </header>
  );
}
