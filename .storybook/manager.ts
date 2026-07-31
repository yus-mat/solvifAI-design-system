import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

addons.setConfig({
  theme: create({
    base: 'dark',
    brandTitle: 'SOLA',
    brandUrl: './',
    brandImage: '/brand/sola-logo.png',
    brandTarget: '_self',
  }),
});
