import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import React from 'react';

// Components
import ShipmentCard, { ShipmentStatusTypes } from './ShipmentCard';

global.console.warn = jest.fn();

describe('ShipmentCard', () => {
  const status: ShipmentStatusTypes[] = ['paid', 'ongoing', 'created'];
  describe.each([status])('Given status is (%s)', (status) => {
    it('render status of shipment', () => {
      const { getByTestId, container } = render(
        <ShipmentCard shippindId={'125'} totalCapacity={'34'} status={status} />
      );
      expect(container.firstChild).toMatchSnapshot();
      expect(getByTestId('shipment-card-test')).toHaveTextContent(status);
    });
  });
  describe('Given invalid status is passed', () => {
    const originalError = console.error;
    const mockedError = jest.fn();
    beforeEach(() => {
      console.error = mockedError;
    });
    afterEach(() => {
      console.warn = originalError;
    });

    it('should call console.warn', () => {
      const status = 'unknown';
      render(
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore *
        <ShipmentCard shippindId={'125'} totalCapacity={'34'} status={status} />
      );
      expect(console.warn).toBeCalledTimes(1);
      expect(console.warn).toHaveBeenLastCalledWith(
        `INVALID ${status} status in Shipment card. Status is wither 'paid', 'ongoing' or 'created'`
      );
    });
  });
});
