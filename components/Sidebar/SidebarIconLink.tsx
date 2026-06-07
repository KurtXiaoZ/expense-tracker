import Link from 'next/link';

import { cn } from '@/lib/utils';

type SidebarIconLinkProps = {
  children: React.ReactNode;
  href: string;
  label: string;
};

export function SidebarIconLink({
  children,
  href,
  label,
}: SidebarIconLinkProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={cn(
        'flex h-14 w-14 items-center justify-center',
        'rounded-lg border border-solid border-neutral bg-foreground-primary',
        'text-[#736E64]',
        'transition-colors',
        'cursor-pointer hover:border-neutral-hover hover:bg-[#f6f5f2] hover:text-selected',
      )}
    >
      {children}
    </Link>
  );
}
