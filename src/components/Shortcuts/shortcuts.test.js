import { render, screen } from '@testing-library/react';
import Shortcuts from './index';
import React from 'react';

describe('The shortcuts component', function () {
  it('should not change', function () {
    const { container } = render(<Shortcuts />);
    expect(container).toMatchSnapshot();
  });
  it('should have 4 icons for good navigation', function () {});
  it('should have a home icon', function () {});
  it('should have a quick videos', function () {});
  it('should have a courses icon', function () {});
  it('should have a posts icon', async function () {
    const { container } = render(<Shortcuts />);
    const iconTitle = await screen.findByText(/posts/i);
    expect(1).toBe(1);
  });
});
