import type { JSX } from 'preact/jsx-runtime';
import { useLocation } from 'preact-iso';

export function Header(): JSX.Element {
  const { url } = useLocation();

  const links = [
    {
      route: '/',
      text: 'Home',
    },
    {
      route: '/login',
      text: 'Login',
    },
    {
      route: '/404',
      text: '404',
    },
  ];

  return (
    <header className="flex justify-end bg-crust">
      <nav className="flex">
        {links.map((l) => (
          <a key={l.route} href={l.route} className={url === l.route ? 'bg-mantle p-3' : 'hover:bg-mantle p-3'}>
            {l.text}
          </a>
        ))}
      </nav>
    </header>
  );
}
