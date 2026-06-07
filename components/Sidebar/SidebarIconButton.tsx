import { cn } from '@/lib/utils';

type SidebarIconButtonProps = {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
};

export function SidebarIconButton({
  children,
  label,
  onClick,
}: SidebarIconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        'flex h-14 w-14 items-center justify-center',
        'rounded-lg border border-solid border-neutral bg-foreground-primary',
        'text-[#736E64]',
        'transition-colors',
        'cursor-pointer hover:border-neutral-hover hover:bg-[#f6f5f2] hover:text-selected',
      )}
    >
      {children}
    </button>
  );
}
