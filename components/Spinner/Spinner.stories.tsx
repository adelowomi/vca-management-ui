import { number, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import Spinner from './Spinner';

storiesOf('Spinner', module)
  .addDecorator(withKnobs)
  .add('Spinner Demo', () => (
    <div className="spinners">
      <div>
        Small
        <Spinner size="small" />
      </div>
      <div>
        Medium
        <Spinner size="medium" />
      </div>
      <div>
        Large
        <Spinner size="large" />
      </div>
    </div>
  ))
  .add('Spinner with progress', () => (
    <Spinner
      size="medium"
      progress={number('Progress', 10, { range: true, min: 0, max: 100 })}
    />
  ));
