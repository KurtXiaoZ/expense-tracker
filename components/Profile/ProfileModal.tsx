'use client';

import type { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
import { useState } from 'react';

import { ProfileIcon } from '../icons/ProfileIcon';
import { Button } from '../Button/Button';

type ProfileModalProps = {
  session: Session | null;
};

export function ProfileModal({ session }: ProfileModalProps) {
  const isLoggedIn = Boolean(session?.user);
  const [isOpen, setIsOpen] = useState(isLoggedIn ? false : true);

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
                <Button
                  label="Sign out"
                  onClick={() => {
                    signOut().then(() => setIsOpen(false));
                  }}
                  className="h-11"
                >
                  Sign out
                </Button>
              ) : (
                <Button
                  label="Sign in with Google"
                  onClick={() => signIn('google')}
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
