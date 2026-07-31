import type { Meta, StoryObj } from '@storybook/react-vite';
import { ListItem } from '@/components/Overlay/ListItem';
import { SplitButton } from './SplitButton';
import type { SplitButtonVariant } from './splitButtonTypes';

const variants: SplitButtonVariant[] = ['primary', 'secondary'];

const menu = (
  <>
    <ListItem>オプション 1</ListItem>
    <ListItem>オプション 2</ListItem>
  </>
);

const meta = {
  title: 'Action/SplitButton',
  component: SplitButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: variants,
    },
    leadingIcon: { control: false },
    menu: { control: false },
  },
  args: {
    variant: 'primary',
    children: 'Button',
    menu,
  },
} satisfies Meta<typeof SplitButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {variants.map((variant) => (
        <SplitButton key={variant} variant={variant} menu={menu}>
          Button
        </SplitButton>
      ))}
    </div>
  ),
};

export const MenuAbove: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex h-40 items-end justify-end overflow-hidden rounded-lg border border-border-neutral-muted p-4">
      <SplitButton
        variant="secondary"
        menu={menu}
        menuPlacement="above"
        defaultMenuOpen
      >
        回答を生成
      </SplitButton>
    </div>
  ),
};
