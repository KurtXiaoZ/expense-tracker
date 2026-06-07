'use client';

import type { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
import { useState } from 'react';

import { cn } from '@/lib/utils';

import { ProfileIcon } from '../icons/ProfileIcon';
import { SidebarIconButton } from './SidebarIconButton';

type SidebarProfileButtonProps = {
  session: Session | null;
};

export function SidebarProfileButton({ session }: SidebarProfileButtonProps) {
  const isLoggedIn = Boolean(session?.user);
  const [isOpen, setIsOpen] = useState(isLoggedIn ? false : true);

  return (
    <>
      <SidebarIconButton
        label="Open profile"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <ProfileIcon />
      </SidebarIconButton>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20"
          onClick={() => {
            if (isLoggedIn) setIsOpen(false);
          }}
        >
          <div
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <section className="flex w-full max-w-md flex-col gap-3 rounded-lg border border-neutral bg-white p-6">
              <p className="text-sm text-zinc-600">
                {session?.user?.email
                  ? `Signed in as ${session.user.email}`
                  : 'Sign in with Google OAuth.'}
              </p>
              {isLoggedIn ? (
                <button
                  type="button"
                  onClick={() => {
                    signOut().then(() => setIsOpen(false));
                  }}
                  className={cn(
                    'h-11 w-full rounded-md border border-zinc-300 px-4',
                    'text-sm font-medium text-zinc-950',
                    'cursor-pointer transition-colors hover:bg-zinc-100',
                  )}
                >
                  Sign out
                </button>
              ) : (
                <button
                  type="button"
                  className={cn(
                    'h-11 w-full rounded-md bg-zinc-950 px-4',
                    'text-sm font-medium text-white',
                    'cursor-pointer transition-colors hover:bg-zinc-800',
                  )}
                  onClick={() => signIn('google')}
                >
                  Sign in with Google
                </button>
              )}
            </section>
          </div>
        </div>
      ) : null}
    </>
  );
}
