import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Link } from 'gatsby';
import style from './header.module.css';
import Search from '../icons/Search';

const SearchModal = lazy(() => import('../SearchModal'));

const Header = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const toggleModal = () => setOpenSearch(!openSearch);
  useEffect(() => {
    console.warn(openSearch);
  }, [openSearch]);
  return (
    <header className={style.header}>
      <div role="button" onClick={toggleModal}>
        <Search className={style.icon} />
      </div>
      <Suspense fallback={null}>
        <SearchModal open={openSearch} toggleModal={toggleModal} />
      </Suspense>
      <Link to={'/'}>Devity.io</Link>
      <Link to={'/signup'}>Signup</Link>
    </header>
  );
};

export default Header;
