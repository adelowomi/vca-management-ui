import { select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import ShipmentCard from './ShipmentCard';

storiesOf('Shipment Card', module)
  .addDecorator(withKnobs)
  .add('Shipment Card Demo', () => (
    <ShipmentCard
      shippindId={text('Shipping ID', '26282922')}
      totalCapacity={text('Total Capacity', '29322')}
      status={select(
        'Status',
        {
          paid: 'paid',
          ongoing: 'ongoing',
          created: 'created',
        },
        'paid'
      )}
    />
  ));
