import { createReducer } from '@reduxjs/toolkit';
import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
} from 'store/Authentication/actions';

const initialState = {};

export default createReducer(initialState, {
  [SET_AUTHENTICATED]: (state, payload) => ({ ...payload }),
  [SET_UNAUTHENTICATED]: () => initialState,
});
