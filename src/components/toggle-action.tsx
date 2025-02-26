'use client';

import { type Signal } from '@preact/signals';
import { SquareCheckBig, SquarePen, Trash } from 'lucide-preact';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';

type Action = 'selection' | 'edition' | 'deletion';

export default function ToggleActionGroup({ action }: { action: Signal<Action> }) {
  return (
    <ToggleGroup
      type="single"
      variant="outline"
      value={action.value}
      onValueChange={(value: Action) => {
        if (value) {
          action.value = value;
        }
      }}
    >
      <ToggleGroupItem className="flex-1" value="selection" aria-label="selection">
        <SquareCheckBig />
      </ToggleGroupItem>
      <ToggleGroupItem className="flex-1" value="edition" aria-label="edition">
        <SquarePen />
      </ToggleGroupItem>
      <ToggleGroupItem className="flex-1" value="deletion" aria-label="deletion">
        <Trash />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

export { type Action, ToggleActionGroup };
