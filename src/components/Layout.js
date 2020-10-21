import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { ReplaySubject } from 'rxjs';

import createStore from 'store';
import { LAZY_LOAD_INIT } from 'store/lazyLoading';

const firebase$ = new ReplaySubject(1);

const Layout = ({ children }) => {
  const store = createStore({ firebase$ });
  useEffect(() => {
    store.dispatch(LAZY_LOAD_INIT());
  });
  return <Provider store={store}>{children}</Provider>;
};

export default Layout;
