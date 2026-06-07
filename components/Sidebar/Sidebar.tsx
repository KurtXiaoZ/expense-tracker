import { auth } from '@/auth';
import { cn } from '@/lib/utils';

import { GoalIcon } from '../icons/GoalIcon';
import { LedgerIcon } from '../icons/LedgerIcon';
import { PlusIcon } from '../icons/PlusIcon';
import { SidebarIconLink } from './SidebarIconLink';
import { SidebarProfileButton } from './SidebarProfileButton';

export const Sidebar = async () => {
  const session = await auth();

  return (
    <div
      className={cn(
        'fixed left-16 top-0 z-50 flex h-full flex-col items-center',
        'py-16',
      )}
    >
      <nav className="flex flex-1 flex-col justify-center gap-3">
        <SidebarIconLink href="/new" label="New Expense">
          <PlusIcon />
        </SidebarIconLink>
        <SidebarIconLink href="/ledger" label="Ledger">
          <LedgerIcon />
        </SidebarIconLink>
        <SidebarIconLink href="/goals" label="Goals">
          <GoalIcon />
        </SidebarIconLink>
      </nav>
      <SidebarProfileButton session={session} />
    </div>
  );
};
