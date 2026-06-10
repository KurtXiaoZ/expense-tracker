import { ProfileModal } from '../components/profile-modal';
import { test as sidebarTest, expect } from './sidebar';

type ProfileModalFixtures = {
  profileModal: ProfileModal;
};

export const test = sidebarTest.extend<ProfileModalFixtures>({
  profileModal: async ({ page }, fixtureUse) => {
    await fixtureUse(new ProfileModal(page));
  },
});

export { expect };
