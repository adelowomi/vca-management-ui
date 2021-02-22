import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import { cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';

// Components
import Select from './Select';

afterEach(cleanup);

describe('Select', () => {
  const data = [
    { id: 1, value: 'Governmant', label: 'Governmant' },
    { id: 2, value: 'Tech', label: 'Tech' },
    { id: 3, value: 'Law', label: 'Law' },
  ];
  test('render properly', () => {
    const mockCallBack = jest.fn();
    const { container } = render(
      <Select
        label="Industry"
        placeholder={'Select'}
        options={data}
        onSelect={mockCallBack}
      />
    );
    expect(container).toMatchSnapshot();
  });
  describe('Select a Government from dropdown', () => {
    test('trigers a clcik event that selects Government', () => {
      const mockCallBack = jest.fn();
      const { getByText } = render(
        <Select
          onSelect={mockCallBack}
          label="Industry"
          placeholder={'Select'}
          options={data}
        />
      );
      fireEvent.click(getByText(/Governmant/i));
      expect(mockCallBack).toBeCalledWith('Governmant');
      expect(mockCallBack).toHaveBeenCalled();
    });
  });
  describe('Select is in disabled state', () => {
    test('render a disabled Select', () => {
      const mockCallBack = jest.fn();
      const { getByTestId, getByText } = render(
        <Select
          label="Industry"
          placeholder={'Select'}
          options={data}
          onSelect={mockCallBack}
          disabled={true}
        />
      );
      fireEvent.click(getByText(/Industry/i));
      expect(getByTestId('select-container-test')).toHaveClass(
        'app-select-disabled'
      );
      expect(getByTestId('select-list-test')).toHaveAttribute(
        'style',
        'display: none;'
      );
      expect(mockCallBack).not.toHaveBeenCalled();
    });
  });
});
