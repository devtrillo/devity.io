import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';

import { ReplaySubject } from 'rxjs';

import createStore from 'store';
import { LAZY_LOAD_INIT } from 'store/lazyLoading';

const firebase$ = new ReplaySubject(1);

export const RootLayout = ({ children }) => {
  const store = createStore({ firebase$ });
  useEffect(() => {
    store.dispatch(LAZY_LOAD_INIT());
  });
  return <Provider store={store}>{children}</Provider>;
};

const duration = 0.5;

const variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: duration,
      delay: duration,
      when: 'beforeChildren',
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: duration },
  },
};

export const PageLayout = ({ children, location }) => (
  <AnimatePresence>
    <motion.main
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
