import { createReducer } from '@reduxjs/toolkit';

import { LAZY_LOAD_COMPLETE, LAZY_LOAD_INIT } from './actions';

export default createReducer(
  { loaded: false },
  {
    [LAZY_LOAD_INIT]: () => ({ loaded: false }),
    [LAZY_LOAD_COMPLETE]: () => ({ loaded: true }),
  },
);
