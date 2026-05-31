import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import { HouseIcon } from '@/components/icons/HouseIcon';
import { SelectorButton } from './SelectorButton';

const meta: Meta<typeof SelectorButton> = {
  title: 'Components/SelectorButton',
  component: SelectorButton,
  argTypes: {
    icon: { control: false },
    label: { control: 'text' },
    selected: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof SelectorButton>;

function ToggleableSelectorButton(
  args: React.ComponentProps<typeof SelectorButton>,
) {
  const [selected, setSelected] = useState(args.selected);

  return (
    <SelectorButton
      {...args}
      selected={selected}
      onClick={() => setSelected((current) => !current)}
    />
  );
}

function SelectorButtonRow(args: React.ComponentProps<typeof SelectorButton>) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="flex items-center gap-2">
      {[0, 1, 2, 3].map((index) => (
        <SelectorButton
          {...args}
          key={index}
          label={`${args.label} ${index + 1}`}
          selected={selectedIndex === index}
          onClick={() => setSelectedIndex(index)}
        />
      ))}
    </div>
  );
}

function MultiSelectSelectorButtonRow(
  args: React.ComponentProps<typeof SelectorButton>,
) {
  const [selectedIndexes, setSelectedIndexes] = useState(() => new Set([0, 2]));

  const toggleIndex = (index: number) => {
    setSelectedIndexes((current) => {
      const next = new Set(current);

      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }

      return next;
    });
  };

  return (
    <div className="flex items-center gap-2">
      {[0, 1, 2, 3].map((index) => (
        <SelectorButton
          {...args}
          key={index}
          label={`${args.label} ${index + 1}`}
          selected={selectedIndexes.has(index)}
          onClick={() => toggleIndex(index)}
        />
      ))}
    </div>
  );
}

export const Default: Story = {
  args: {
    icon: <HouseIcon className="size-5" />,
    label: 'Home',
    selected: false,
  },
  render: (args) => <ToggleableSelectorButton {...args} />,
};

export const Row: Story = {
  args: {
    icon: <HouseIcon className="size-5" />,
    label: 'Home',
  },
  render: (args) => <SelectorButtonRow {...args} />,
};

export const MultiSelectRow: Story = {
  args: {
    icon: <HouseIcon className="size-5" />,
    label: 'Home',
  },
  render: (args) => <MultiSelectSelectorButtonRow {...args} />,
};
