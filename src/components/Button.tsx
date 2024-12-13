import type { JSX } from 'preact/jsx-runtime';

interface ButtonProps {
  text: string;
}

export function Button({ text }: ButtonProps): JSX.Element {
  return (
    <button
      type="button"
      className="flex-none rounded-md bg-green hover:outline-dotted outline-green px-3.5 py-2.5 text-sm font-semibold text-base"
    >
      {text}
    </button>
  );
}
