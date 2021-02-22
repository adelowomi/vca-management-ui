import { action } from '@storybook/addon-actions';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import Select from './Select';

const data = [
  { id: 1, value: 'Governmant', label: 'Governmant' },
  { id: 2, value: 'Tech', label: 'Tech' },
  { id: 3, value: 'Law', label: 'Law' },
];
storiesOf('Select', module)
  .addDecorator(withKnobs)
  .add('Select Demo', () => (
    <Select
      label={text('Label', 'Industry')}
      placeholder={text('Placeholder', 'Placeholder')}
      options={data}
      onSelect={action('onSelect')}
      disabled={boolean('Disabled', false)}
    />
  ))
  .add('Disabled Select', () => (
    <Select
      label={text('Label', 'Industry')}
      placeholder={text('Placeholder', 'Placeholder')}
      options={data}
      onSelect={action('onSelect')}
      disabled={true}
    />
  ));
