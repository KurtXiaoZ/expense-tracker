import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/prisma';

const providers = [
  Google,
  ...(process.env.NODE_ENV === 'development'
    ? [
        Credentials({
          id: 'password',
          credentials: {
            password: {
              label: 'Password',
              type: 'password',
            },
          },
          authorize: (credentials) => {
            if (credentials.password === 'password') {
              return {
                email: 'user@example.com',
                name: 'Functional Test User',
              };
            }

            return null;
          },
        }),
      ]
    : []),
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers,
  session: {
    strategy: process.env.NODE_ENV === 'development' ? 'jwt' : 'database',
  },
});
