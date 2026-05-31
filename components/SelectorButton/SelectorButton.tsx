import { cn } from '@/lib/utils';

type SelectorButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  label: string;
  selected?: boolean;
};

export const SelectorButton = ({
  children,
  className,
  label,
  selected,
  type = 'button',
  ...props
}: SelectorButtonProps) => {
  return (
    <button
      type={type}
      {...props}
      aria-label={label}
      aria-pressed={selected ?? false}
      className={cn(
        'w-11 h-11 cursor-pointer pb-1',
        'rounded-lg border border-solid border-neutral bg-shadow',
        'transition-[padding,translate] duration-75 ease-out',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-selected',
        'active:border-selected active:translate-y-0.5 active:pb-px',
        !selected && 'hover:border-neutral-hover',
        selected && 'translate-y-0.5 pb-0.5 border-selected',
        className,
      )}
    >
      <span
        className={cn(
          'w-full h-full',
          'flex items-center justify-center',
          'rounded-lg bg-foreground-primary text-[#736E64]',
        )}
      >
        {children}
      </span>
    </button>
  );
};
