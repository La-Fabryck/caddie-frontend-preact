import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

type MenuProps = { children: React.ReactNode; items: Record<'label' | 'path', string>[] };

export function Menu({ items, children }: MenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        {items.map(({ path, label }) => (
          <DropdownMenuItem key={path}>
            <a href={path}>{label}</a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
