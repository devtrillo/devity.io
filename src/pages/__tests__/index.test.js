import { render } from '@testing-library/react';
import HomePage from '../index';
import React from 'react';

describe('The homePage', function () {
  it('should not change', function () {
    const { container } = render(<HomePage />);
    expect(container).toMatchSnapshot();
  });
});
