import { type Locator, type Page } from '@playwright/test';

export class Sidebar {
  constructor(private readonly page: Page) {}

  get root(): Locator {
    return this.page.getByRole('navigation');
  }

  get newExpenseButton(): Locator {
    return this.root.getByRole('button', { name: 'New Expense' });
  }

  get ledgerButton(): Locator {
    return this.root.getByRole('button', { name: 'Ledger' });
  }

  get goalsButton(): Locator {
    return this.root.getByRole('button', { name: 'Goals' });
  }

  get profileButton(): Locator {
    return this.page.getByRole('button', { name: 'Open profile' });
  }

  async goToNewExpense() {
    await this.newExpenseButton.click();
  }

  async goToLedger() {
    await this.ledgerButton.click();
  }

  async goToGoals() {
    await this.goalsButton.click();
  }

  async openProfile() {
    await this.profileButton.click();
  }
}
