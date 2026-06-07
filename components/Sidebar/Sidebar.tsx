import { cn } from '@/lib/utils';
import { GoalIcon } from '../icons/GoalIcon';
import { LedgerIcon } from '../icons/LedgerIcon';
import { PlusIcon } from '../icons/PlusIcon';
import { Button } from '../Button/Button';
import Link from 'next/link';

type SidebarProps = {
  className?: string;
};

export const Sidebar = async ({ className }: SidebarProps) => {
  return (
    <nav className={cn('flex flex-col justify-center gap-3 w-14', className)}>
      <Button className="h-14" label="New Expense">
        <Link href="/new">
          <PlusIcon />
        </Link>
      </Button>
      <Button className="h-14" label="Ledger">
        <Link href="/ledger">
          <LedgerIcon />
        </Link>
      </Button>
      <Button className="h-14" label="Goals">
        <Link href="/goals">
          <GoalIcon />
        </Link>
      </Button>
    </nav>
  );
};
