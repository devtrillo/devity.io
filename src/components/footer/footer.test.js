import { render } from '@testing-library/react';
import React from 'react';
import Footer from './index';

describe('The footer component', function () {
  it('should not change', function () {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
});
