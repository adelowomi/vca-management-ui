import { render } from '@testing-library/react';
import React from 'react';

import {
  Add,
  BackArrow,
  Box,
  ChevronDown,
  ChevronUp,
  DryVan,
  Error,
  FlatBedTruck,
  HorizontalLine,
  MapPin,
  MapPinLarge,
  Origin,
  PaymentCards,
  Question,
  Search,
  User,
  VerticalLine,
} from './index';

describe('<AssetsSVG />', () => {
  describe('Insanity', () => {
    describe('Add SVG', () => {
      const { container, getAllByTestId } = render(<Add />);
      expect(container.firstChild).toMatchSnapshot();
      it('renders properly', () => {
        expect(getAllByTestId('add')).toHaveLength(1);
      });
    });
    describe('BackArrow SVG', () => {
      const { container } = render(<BackArrow />);
      expect(container.firstChild).toMatchSnapshot();
    });
    describe('Box SVG', () => {
      const { container } = render(<Box />);
      expect(container.firstChild).toMatchSnapshot();
    });
    describe('ChevronDown SVG', () => {
      const { container } = render(ChevronDown);
      expect(container.firstChild).toMatchSnapshot();
    });
    describe('ChevronUp SVG', () => {
      const { container } = render(ChevronUp);
      expect(container.firstChild).toMatchSnapshot();
    });
    describe('Error SVG', () => {
      const { container } = render(<Error />);
      expect(container.firstChild).toMatchSnapshot();
    });
    describe('FlatBedTruck SVG', () => {
      const { container } = render(<FlatBedTruck />);
      expect(container.firstChild).toMatchSnapshot();
    });
    describe('HorizontalLine SVG', () => {
      const { container } = render(<HorizontalLine />);
      expect(container.firstChild).toMatchSnapshot();
    });
    describe('MapPin SVG', () => {
      const { container } = render(<MapPin />);
      expect(container.firstChild).toMatchSnapshot();
    });
    describe('MapPinLarge SVG', () => {
      const { container } = render(<MapPinLarge />);
      expect(container.firstChild).toMatchSnapshot();
    });
    describe('Origin SVG', () => {
      const { container } = render(<Origin />);
      expect(container.firstChild).toMatchSnapshot();
    });
    describe('PaymentCards SVG', () => {
      const { container } = render(<PaymentCards />);
      expect(container.firstChild).toMatchSnapshot();
    });
    describe('Question SVG', () => {
      const { container } = render(<Question />);
      expect(container.firstChild).toMatchSnapshot();
    });
    describe('Search SVG', () => {
      const { container } = render(<Search />);
      expect(container.firstChild).toMatchSnapshot();
    });
    describe('User SVG', () => {
      const { container } = render(<User />);
      expect(container.firstChild).toMatchSnapshot();
    });
    describe('VerticalLine SVG', () => {
      const { container } = render(<VerticalLine />);
      expect(container.firstChild).toMatchSnapshot();
    });
    describe('DryVan SVG', () => {
      const { container } = render(<DryVan />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
