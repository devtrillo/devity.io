import React from 'react';
import { render } from '@testing-library/react';

import Home from '../Home';
import Search from '../Search';
import PostsIcon from '../Posts';
import Google from '../Google';

describe('all the icons of the app', function () {
  it('should never change the home icon', function () {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
  it('should never change the Posts icon', function () {
    const { container } = render(<PostsIcon />);
    expect(container).toMatchSnapshot();
  });
  it('should never change the Search icon', function () {
    const { container } = render(<Search />);
    expect(container).toMatchSnapshot();
  });
  it('should never change the home icon', function () {
    const { container } = render(<Google />);
    expect(container).toMatchSnapshot();
  });
});
