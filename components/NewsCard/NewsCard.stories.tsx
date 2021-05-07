import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import data from '../../data.json';
const ParsedData = JSON.parse(JSON.stringify(data));

const singleNews = ParsedData.SingleNews;

import { NewsCard } from './NewsCard';

storiesOf('NewsCard', module)
  .addDecorator(withKnobs)
  .add('NewsCard Demo', () => <NewsCard news={singleNews} />);
