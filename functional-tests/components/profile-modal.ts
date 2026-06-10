import { type Locator, type Page } from '@playwright/test';

export class ProfileModal {
  constructor(private readonly page: Page) {}

  get dialog(): Locator {
    return this.page.getByRole('dialog', { name: 'Profile' });
  }

  get signInWithGoogleButton(): Locator {
    return this.dialog.getByRole('button', { name: 'Sign in with Google' });
  }

  get signOutButton(): Locator {
    return this.dialog.getByRole('button', { name: 'Sign out' });
  }

  get signedInAsText(): Locator {
    return this.dialog.getByText('Signed in as:');
  }

  userEmailText(email: string): Locator {
    return this.dialog.getByText(email);
  }

  async signInWithGoogle() {
    await this.signInWithGoogleButton.click();
  }

  async signOut() {
    await this.signOutButton.click();
  }
}
