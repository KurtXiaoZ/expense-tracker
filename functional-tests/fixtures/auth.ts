import { test as profileModalTest, expect } from './profile-modal';

const signedInUser = {
  email: 'user@example.com',
};

type SignedInUser = {
  email: string;
};

type AuthFixtures = {
  signedInUser: SignedInUser;
};

export const test = profileModalTest.extend<AuthFixtures>({
  signedInUser: async ({ baseURL, context }, fixtureUse) => {
    const callbackUrl = baseURL ?? 'http://localhost:3000';
    const csrfResponse = await context.request.get('/api/auth/csrf');
    const { csrfToken } = await csrfResponse.json();

    const signInResponse = await context.request.post(
      '/api/auth/callback/password',
      {
        form: {
          callbackUrl,
          csrfToken,
          password: 'password',
        },
      },
    );

    expect(signInResponse.ok()).toBe(true);

    try {
      await fixtureUse(signedInUser);
    } finally {
      await context.clearCookies();
    }
  },
});

export { expect };
