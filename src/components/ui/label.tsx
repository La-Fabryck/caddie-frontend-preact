import * as LabelPrimitive from '@radix-ui/react-label';
import { type ComponentProps } from 'react';
import { classNameMerger } from '@/lib/utils';

function Label({ className, ...props }: ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    // @ts-expect-error shadcn types
    <LabelPrimitive.Root
      data-slot="label"
      className={classNameMerger(
        'text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

export { Label };
