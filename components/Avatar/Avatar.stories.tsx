import { number, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import Avatar from './Avatar';

storiesOf('Avatar', module)
  .addDecorator(withKnobs)
  .add('Avatar Demo', () => (
    <Avatar
      firstName={text('First name', 'John')}
      lastName={text('Last name', 'Doe')}
      size={number('Progress', 18, { range: true, min: 0, max: 100 })}
    />
  ))
  .add('Avatar without initials', () => (
    <Avatar
      firstName={text('First name', 'John')}
      lastName={text('Last name', 'Doe')}
      hasInitials={false}
      size={number('Progress', 30, { range: true, min: 0, max: 100 })}
    />
  ));
