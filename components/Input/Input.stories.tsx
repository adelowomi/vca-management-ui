import { action } from '@storybook/addon-actions';
import {
  boolean,
  number,
  select,
  text,
  withKnobs,
} from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import Input from './Input';

const options = {
  button: 'button',
  checkbox: 'checkbox',
  color: 'color',
  email: 'email',
  file: 'file',
  hidden: 'hidden',
  image: 'image',
  number: 'number',
  password: 'password',
  radio: 'radio',
  range: 'range',
  reset: 'reset',
  search: 'search',
  submit: 'submit',
  tel: 'tel',
  text: 'text',
  url: 'url',
};

storiesOf('Input', module)
  .addDecorator(withKnobs)
  .add('Input Demo', () => (
    <Input
      name="demo-input"
      disabled={boolean('Disable', false)}
      label={text('Label', 'Name')}
      errorDescription={text('Error Description', '')}
      placeholder={text('Placeholder', 'Placeholder')}
      readOnly={boolean('Read only', false)}
      requiredy={boolean('Required', false)}
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore *
      type={select('Type', options, 'text')}
      maxLength={number('Max Length', 15)}
      onChange={action('onChange')}
    />
  ))
  .add('Input with max length', () => (
    <div>
      <Input
        name="random-input"
        label="Random"
        placeholder="Start typing"
        maxLength={5}
      />
      You can only enter a max of 5 words
    </div>
  ))
  .add('Input with error', () => (
    <Input
      name="error-input"
      label={'Username'}
      errorDescription={'Invalid input'}
    />
  ))
  .add('Readonly Input', () => (
    <Input
      name="readonly-input"
      label={text('Label', 'Name')}
      readOnly={true}
    />
  ));
