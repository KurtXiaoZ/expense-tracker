import { auth, signIn, signOut } from '@/auth';

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 py-16">
      <section className="flex w-full max-w-md flex-col gap-6 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-zinc-950">
            Expense Tracker
          </h1>
          <p className="text-sm text-zinc-600">
            {session?.user?.email
              ? `Signed in as ${session.user.email}`
              : 'Sign in to test Auth.js with Google OAuth.'}
          </p>
        </div>

        {session?.user ? (
          <form
            action={async () => {
              'use server';
              await signOut();
            }}
          >
            <button
              className="h-11 w-full rounded-md border border-zinc-300 px-4 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-100"
              type="submit"
            >
              Sign out
            </button>
          </form>
        ) : (
          <form
            action={async () => {
              'use server';
              await signIn('google');
            }}
          >
            <button
              className="h-11 w-full rounded-md bg-zinc-950 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
              type="submit"
            >
              Sign in with Google
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
