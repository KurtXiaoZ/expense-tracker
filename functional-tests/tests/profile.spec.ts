import { test, expect } from '../fixtures/auth';

test.describe('Profile', () => {
  test('Profile modal when signed out', async ({
    page,
    sidebar,
    profileModal,
  }) => {
    await test.step('Open home page', async () => {
      await page.goto('/');
    });

    await test.step('Verify signed-out profile modal', async () => {
      await expect(sidebar.profileButton).toBeVisible();
      await expect(profileModal.dialog).toBeVisible();
      await expect(profileModal.signInWithGoogleButton).toBeVisible();
    });

    await test.step('Click outside the signed-out profile modal', async () => {
      await profileModal.dialog.click({ position: { x: 10, y: 10 } });
    });

    await test.step('Verify signed-out profile modal stays open', async () => {
      await expect(profileModal.dialog).toBeVisible();
      await expect(profileModal.signInWithGoogleButton).toBeVisible();
    });
  });

  test('Profile modal when signed in', async ({
    page,
    sidebar,
    profileModal,
    signedInUser,
  }) => {
    await test.step('Open home page', async () => {
      await page.goto('/');
    });

    await test.step('Profile button should be visible', async () => {
      await expect(sidebar.profileButton).toBeVisible();
    });

    await test.step('Profile modal should be absent', async () => {
      await expect(profileModal.dialog).toBeHidden();
    });

    await test.step('Open profile modal', async () => {
      await sidebar.profileButton.click();
      await expect(profileModal.dialog).toBeVisible();
    });

    await test.step('Verify modal texts', async () => {
      await expect(profileModal.signedInAsText).toBeVisible();
      await expect(
        profileModal.userEmailText(signedInUser.email),
      ).toBeVisible();
      await expect(profileModal.signOutButton).toBeVisible();
    });

    await test.step('Close modal after outside click', async () => {
      await profileModal.dialog.click({ position: { x: 10, y: 10 } });
      await expect(profileModal.dialog).toBeHidden();
    });
  });
});
