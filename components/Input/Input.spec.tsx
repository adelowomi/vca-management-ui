import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import React from 'react';

// Components
import Input from './Input';

describe('Input', () => {
  it('Renders input', () => {
    const { container } = render(<Input label="Default" name="Default" />);
    expect(container.firstChild).toMatchSnapshot();
  });
  it('Renders disabled input', () => {
    const { container } = render(
      <Input label="Default" name="Default" disabled={true} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  it('Renders input with placeholder', () => {
    const { container } = render(
      <Input label="Default" name="Default" placeholder="Placeholder" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  it('Renders readonly input', () => {
    const { container } = render(
      <Input label="Default" name="Default" readOnly={true} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  it('Renders input with maxLength', () => {
    const { container } = render(
      <Input label="Default" name="Default" maxLength={6} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  it('Renders error', () => {
    const { container } = render(
      <Input label="Default" name="Default" errorDescription="error" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
