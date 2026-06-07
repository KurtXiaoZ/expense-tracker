import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import { ProfileModal } from './ProfileModal';

const meta = {
  title: 'Profile/ProfileModal',
  component: ProfileModal,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ProfileModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SignedOut: Story = {
  args: {
    session: null,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify modal texts', async () => {
      await expect(
        canvas.getByRole('dialog', { name: 'Profile' }),
      ).toBeVisible();
      await expect(canvas.getByText('Sign in with Google')).toBeVisible();
    });
  },
};

export const SignedIn: Story = {
  args: {
    session: {
      expires: '2036-12-31T23:59:59.999Z',
      user: {
        email: 'user@example.com',
        name: 'Example User',
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Profile button should be visible', async () => {
      await expect(
        canvas.getByRole('button', { name: 'Open profile' }),
      ).toBeVisible();
    });

    await step('Profile modal should be absent', async () => {
      await expect(
        canvas.queryByRole('dialog', { name: 'Profile' }),
      ).not.toBeInTheDocument();
    });

    await step('Open profile modal', async () => {
      await userEvent.click(
        canvas.getByRole('button', { name: 'Open profile' }),
      );
      const dialog = await canvas.findByRole('dialog', { name: 'Profile' });
      await expect(dialog).toBeVisible();
    });

    await step('Verify modal texts', async () => {
      await expect(canvas.getByText('Signed in as:')).toBeVisible();
      await expect(canvas.getByText('user@example.com')).toBeVisible();
      await expect(
        canvas.getByRole('button', { name: 'Sign out' }),
      ).toBeVisible();
    });
  },
};
