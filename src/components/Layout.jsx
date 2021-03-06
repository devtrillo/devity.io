import React, { lazy, Suspense, useEffect } from 'react';
import { Provider } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { PersistGate } from 'redux-persist/integration/react';
import { ReplaySubject } from 'rxjs';

import '../style/global.css';
import '../style/post.css';
import { LAZY_LOAD_INIT } from '../store/lazyLoading/actions';
import Header from './Header';
import createStore from '../store';

const firebase$ = new ReplaySubject(1);
const sentry$ = new ReplaySubject(1);

const Shortcuts = lazy(() => import('./Shortcuts'));
const Footer = lazy(() => import('./footer'));

export const RootLayout = ({ children }) => {
  const { store, persistor } = createStore({ firebase$, sentry$ });
  useEffect(() => {
    store.dispatch(LAZY_LOAD_INIT());
  }, [store]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Header />
        {children}
        <Suspense fallback={null}>
          <Shortcuts />
        </Suspense>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </PersistGate>
    </Provider>
  );
};

const variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
    },
  },
};

export const PageLayout = ({ children, location }) => (
  <AnimatePresence exitBeforeEnter>
    <motion.main
      className="screen"
      key={location.pathname}
      variants={variants}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      {children}
    </motion.main>
  </AnimatePresence>
);
