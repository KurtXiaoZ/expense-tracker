import { cn } from '@/lib/utils';

type ButtonProps = {
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
};

export const Button = ({
  children,
  label,
  onClick,
  className,
}: ButtonProps) => {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        'flex h-full w-full items-center justify-center',
        'rounded-lg border border-solid border-neutral bg-foreground-primary',
        'text-[#736E64]',
        'transition-colors',
        'cursor-pointer hover:border-neutral-hover hover:bg-[#f6f5f2] hover:text-selected',
        className,
      )}
    >
      {children}
    </button>
  );
};
