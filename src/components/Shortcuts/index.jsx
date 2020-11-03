import React from 'react';
import { Link } from 'gatsby';
import clsx from 'clsx';
import style from './shortcuts.module.css';
import PostsIcon from '../icons/Posts';
import Home from '../icons/Home';

const Shortcuts = () => (
  <nav className={clsx(style.navbar, style.show)}>
    <Link to="/">
      <Home />
      <span>Home</span>
    </Link>
    <Link to="/posts">
      <PostsIcon />
      <span>Posts</span>
    </Link>
  </nav>
);

export default Shortcuts;
