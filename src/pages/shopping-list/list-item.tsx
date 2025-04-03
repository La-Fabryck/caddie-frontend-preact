import { type JSX } from 'preact';

type ListItemProps = {
  children: JSX.Element | JSX.Element[];
  key: string;
};

export function ListItem({ children, key }: ListItemProps) {
  return (
    <li
      key={key}
      className="hover:bg-surface1 flex w-full items-center rounded-lg p-0 transition-all focus:bg-slate-100 active:bg-slate-100"
    >
      {children}
    </li>
  );
}
