import { useEffect } from 'react';
import type { Decorator, Preview } from '@storybook/react-vite';
import { INITIAL_VIEWPORTS } from 'storybook/viewport';
import '../src/styles/global.css';

const STORY_CANVAS_CLASS = 'p-8';

const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme ?? 'light';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  if (context.parameters.storyPadding === false) {
    return <Story />;
  }

  return (
    <div className={STORY_CANVAS_CLASS}>
      <Story />
    </div>
  );
};

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Semantic color theme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
    viewport: {
      value: '1440-816',
      isRotated: false,
    },
  },
  decorators: [withTheme],
  parameters: {
    layout: 'fullscreen',
    docs: {
      canvas: {
        layout: 'fullscreen',
      },
    },
    viewport: {
      options: {
        ...INITIAL_VIEWPORTS,
        '1440-816': {
          name: 'Design canvas',
          styles: {
            width: '1440px',
            height: '816px',
          },
          type: 'desktop',
        },
      },
    },
    options: {
      storySort: {
        order: [
          'Foundation',
          ['Colors', ['SemanticPalette', 'RawPalettes', '*'], 'Typography', 'Spacing', 'Motion', 'IconWrapper', 'Token Wiring', 'Link', 'Divider', '*'],
          'Action',
          ['Button', 'ButtonIcon', 'SplitButton', '*'],
          'Content Display',
          ['Card', 'Chip', 'ChipGroup', 'InfoBlock', 'Tag', 'AccordionCard', 'Skeleton', '*'],
          'Control',
          ['Checkbox', 'CheckboxField', 'Toggle', 'Picker', 'PickerGroup', '*'],
          'Forms',
          'Navigation',
          ['Tab', 'TabGroup', 'SegmentedControl', '*'],
          'List',
          'Overlay',
          'Pages',
          ['成果物生成v2', 'ドラフト画面', '*'],
        ],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
