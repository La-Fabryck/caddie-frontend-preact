interface ButtonProps {
  text: string;
}

export const Button = ({ text }: ButtonProps) => {
  return (
    <button
      type="button"
      className="flex-none rounded-md bg-green hover:outline-dotted outline-green px-3.5 py-2.5 text-sm font-semibold text-base"
    >
      {text}
    </button>
  );
};
