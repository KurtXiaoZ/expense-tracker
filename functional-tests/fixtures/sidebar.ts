import { test as base, expect } from '@playwright/test';

import { Sidebar } from '../components/sidebar';

type SidebarFixtures = {
  sidebar: Sidebar;
};

export const test = base.extend<SidebarFixtures>({
  sidebar: async ({ page }, fixtureUse) => {
    await fixtureUse(new Sidebar(page));
  },
});

export { expect };
