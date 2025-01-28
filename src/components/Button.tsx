import { type JSX } from 'preact/jsx-runtime';

export const primary = 'bg-green outline-green';
export const secondary = 'bg-red outline-red';

type Variant = typeof primary | typeof secondary;

interface ButtonProps {
  text: string;
  variant?: Variant;
  onClick: () => void;
}

export function Button({ text, variant = primary, onClick }: ButtonProps): JSX.Element {
  return (
    <button
      type="button"
      className={`flex-none rounded-md hover:outline-dotted ${variant} px-3.5 py-2.5 text-sm font-semibold text-base`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
