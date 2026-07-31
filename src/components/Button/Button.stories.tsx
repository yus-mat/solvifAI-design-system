import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
import { Send } from '@/icons';
import type { ButtonEmphasis, ButtonIntent, ButtonSize } from './buttonTypes';

const meta = {
  title: 'Action/Button',
  component: Button,
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
    loading: { control: 'boolean' },
    leadingIcon: { control: false },
    trailingIcon: { control: false },
  },
  args: {
    children: 'Button',
    emphasis: 'primary',
    intent: 'default',
    size: 'md',
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithLeadingIcon: Story = {
  args: {
    leadingIcon: <Send />,
  },
};

export const WithTrailingIcon: Story = {
  args: {
    trailingIcon: <Send />,
  },
};

export const WithBothIcons: Story = {
  args: {
    leadingIcon: <Send />,
    trailingIcon: <Send />,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    leadingIcon: <Send />,
  },
};

export const LoadingSmall: Story = {
  args: {
    loading: true,
    size: 'sm',
    leadingIcon: <Send />,
  },
};

const emphases: ButtonEmphasis[] = ['primary', 'secondary', 'ghost'];
const intents: ButtonIntent[] = ['default', 'danger'];
const sizes: ButtonSize[] = ['md', 'sm'];

function VariantMatrix({ disabled = false }: { disabled?: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {sizes.map((size) => (
        <div key={size}>
          <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 500 }}>
            Size: {size.toUpperCase()}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {intents.map((intent) => (
              <div key={intent}>
                <p style={{ margin: '0 0 8px', fontSize: 12, opacity: 0.7 }}>
                  Intent: {intent}
                </p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  {emphases.map((emphasis) => (
                    <Button
                      key={`${emphasis}-${intent}-${size}`}
                      emphasis={emphasis}
                      intent={intent}
                      size={size}
                      disabled={disabled}
                      leadingIcon={<Send />}
                    >
                      Button
                    </Button>
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
  parameters: {
    layout: 'padded',
  },
};

export const AllVariantsDisabled: Story = {
  render: () => <VariantMatrix disabled />,
  parameters: {
    layout: 'padded',
  },
};
