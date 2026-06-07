'use client';

import type { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
import { useState } from 'react';

import { Button } from '../Button/Button';
import { ProfileIcon } from '../icons/ProfileIcon';

type ProfileModalProps = {
  session: Session | null;
};

export function ProfileModal({ session }: ProfileModalProps) {
  const user = session?.user;
  const [isOpen, setIsOpen] = useState(Boolean(user) ? false : true);

  return (
    <>
      <Button
        label="Open profile"
        onClick={() => {
          setIsOpen(true);
        }}
        className="h-14 w-14"
      >
        <ProfileIcon />
      </Button>

      {isOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Profile"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20"
          onClick={() => {
            if (Boolean(user)) setIsOpen(false);
          }}
        >
          <div
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <section className="flex w-full min-w-56 max-w-md flex-col gap-2 rounded-lg border border-neutral bg-white p-6">
              {user ? (
                <>
                  <span className="text-sm text-zinc-600">Signed in as:</span>
                  <span className="text-sm text-zinc-600">{user.email}</span>
                  <Button
                    label="Sign out"
                    onClick={() => {
                      signOut().then(() => setIsOpen(false));
                    }}
                    className="h-11"
                  >
                    Sign out
                  </Button>
                </>
              ) : (
                <Button
                  label="Sign in with Google"
                  onClick={() => {
                    signIn('google');
                  }}
                  className="h-11"
                >
                  Sign in with Google
                </Button>
              )}
            </section>
          </div>
        </div>
      ) : null}
    </>
  );
}
