import type { Meta, StoryObj } from '@storybook/react-vite';
import { PencilLine } from '@/icons';
import { ButtonIcon } from './ButtonIcon';
import type { ButtonEmphasis, ButtonIntent, ButtonSize } from './buttonTypes';

const meta = {
  title: 'Action/ButtonIcon',
  component: ButtonIcon,
  tags: ['autodocs'],
  argTypes: {
    emphasis: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'] satisfies ButtonEmphasis[],
    },
    intent: {
      control: 'select',
      options: ['default', 'danger'] satisfies ButtonIntent[],
    },
    size: {
      control: 'select',
      options: ['md', 'sm'] satisfies ButtonSize[],
    },
    disabled: { control: 'boolean' },
    icon: { control: false },
  },
  args: {
    'aria-label': '送信',
    emphasis: 'primary',
    intent: 'default',
    size: 'md',
    disabled: false,
  },
} satisfies Meta<typeof ButtonIcon>;

export default meta;
type Story = StoryObj;

export const Playground: Story = {};

export const CustomIcon: Story = {
  args: {
    icon: <PencilLine aria-hidden />,
    'aria-label': '編集',
    emphasis: 'ghost',
  },
};

const emphases: ButtonEmphasis[] = ['primary', 'secondary', 'ghost'];
const intents: ButtonIntent[] = ['default', 'danger'];
const sizes: ButtonSize[] = ['md', 'sm'];

function VariantMatrix({ disabled = false }: { disabled?: boolean }) {
  return (
    <div className="flex flex-col gap-8">
      {sizes.map((size) => (
        <div key={size}>
          <h3 className="mb-4 body-2-bold">Size: {size.toUpperCase()}</h3>
          <div className="flex flex-col gap-4">
            {intents.map((intent) => (
              <div key={intent}>
                <p className="mb-2 caption text-muted">Intent: {intent}</p>
                <div className="flex flex-wrap gap-3">
                  {emphases.map((emphasis) => (
                    <ButtonIcon
                      key={`${emphasis}-${intent}-${size}`}
                      emphasis={emphasis}
                      intent={intent}
                      size={size}
                      disabled={disabled}
                      aria-label="送信"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export const AllVariants: Story = {
  render: () => <VariantMatrix />,
  parameters: { layout: 'padded' },
};

export const AllVariantsDisabled: Story = {
  render: () => <VariantMatrix disabled />,
  parameters: { layout: 'padded' },
};
