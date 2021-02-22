/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo } from 'react';

import theme from '../../styles/theme';
import { HorizontalLine, MapPin, Origin } from '../AssetsSVG';

export const mapColorToStatus = {
  paid: {
    solid: theme.colors.darkishGreen,
    highlight: theme.colors.darkishGreenBkg,
  },
  ongoing: {
    solid: theme.colors.barneyPurple,
    highlight: theme.colors.barneyPurpleBkg,
  },
  created: {
    solid: theme.colors.blue,
    highlight: theme.colors.blueBkg,
  },
};

export type ShipmentStatusTypes = 'paid' | 'ongoing' | 'created';

interface Props {
  /**
   * ID of the shipment
   */
  shippindId: string;
  /**
   * Total capacity of the shipment
   */
  totalCapacity: string;
  /**
   * Status of the shipment
   * Can be either paid, ongoing, created
   */
  status: ShipmentStatusTypes;
  /**
   * Date which shipment departs
   */
  departureDate?: object;
  /**
   * Date which shipment arrivess
   */
  arrivalDate?: object;
}

const ShipmentCard = ({
  arrivalDate,
  departureDate,
  shippindId,
  status,
  totalCapacity,
}: Props) => {
  const statusColor = mapColorToStatus[status];
  useEffect(() => {
    if (statusColor) return;
    // eslint-disable-next-line no-console
    console.warn(
      `INVALID ${status} status in Shipment card. Status is wither 'paid', 'ongoing' or 'created'`
    );
  }, [statusColor, status]);

  const cardClassName = useMemo(() => {
    return {
      borderWidth: 0.7,
      borderLeftWidth: 5,
      borderLeftColor: statusColor && statusColor.solid,
    };
  }, [statusColor]);

  //TODO: Once we determine the formate and library to use for date and time
  // This function should return an object or construct the time
  // const contructTime = (date) => ()

  return (
    <div className="flex flex-row w-auto h-auto rounded" style={cardClassName}>
      <div className="flex items-start flex-row justify-between py-3 pr-16 pl-5 w-full">
        <div className="flex flex-col items-start">
          <p
            className="text-sm font-medium app-indigo mb-2"
            data-testid="shipmentId-test"
          >
            Shipment ID number #{shippindId}
          </p>
          <p className="text-xs app-greyish-brown mb-4">
            Total Capacity: {totalCapacity}
          </p>
          <p
            className="text-xs font-semibold py-2 px-3 rounded-2xl capitalize"
            data-testid="shipment-card-test"
            style={{
              color: statusColor && statusColor.solid,
              backgroundColor: statusColor && statusColor.highlight,
            }}
          >
            {status}
          </p>
        </div>
        <div>
          <div className="shipment-card-grid-1 mb-6">
            <div className="flex flex-row items-center">
              <Origin />
              <p className="text-base font-medium app-indigo ml-2">Origin</p>
            </div>
            <HorizontalLine className="m-auto" />
            <div className="flex flex-row items-center">
              <MapPin />
              <p className="text-base font-medium app-indigo ml-2">
                Destination
              </p>
            </div>
          </div>
          <div className="shipment-card-grid-2 mb-2">
            <p className="text-xs font-medium app-greyish-brown mb-2">
              Leaving: July 25th
            </p>
            <p className="text-xs font-medium app-greyish-brown mb-2">
              Estimated Arrival: 26th
            </p>
            <p className="text-xs font-semibold app-greyish-brown">7am -6pm</p>
            <p className="text-xs font-semibold app-greyish-brown">
              4pm to 8pm
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShipmentCard;
