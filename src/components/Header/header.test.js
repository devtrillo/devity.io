import { render } from '@testing-library/react';
import React from 'react';
import Header from './index';

describe('The header component', function () {
  it('should not change', function () {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });
});
