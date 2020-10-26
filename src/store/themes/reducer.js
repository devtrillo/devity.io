import { createReducer } from '@reduxjs/toolkit';
import { CYCLE_THEME } from 'store/themes/actions';

const themeReducer = createReducer('light', {
  [CYCLE_THEME]: state => {
    if (state === 'light') return 'dark';
    if (state === 'dark') return 'light';
  },
});
export default themeReducer;
