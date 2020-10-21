import { BehaviorSubject } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { firebaseReducer, lazyLoadEpics } from './lazyLoading';

export const epic$ = new BehaviorSubject(combineEpics(...lazyLoadEpics));

const createStore = (dependencies = {}, initialState) => {
  const rootReducer = combineReducers({
    firebase: firebaseReducer,
  });

  const epicMiddleware = createEpicMiddleware({ dependencies });
  const rootEpic = (action$, state$, dependencies) =>
    epic$.pipe(
      mergeMap(epic => epic(action$, state$, dependencies)),
      catchError((err, source) => {
        console.error('ERR', err);
        return source;
      }),
    );

  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: [...getDefaultMiddleware({ thunk: false }), epicMiddleware],
  });

  epicMiddleware.run(rootEpic);
  return store;
};

export default createStore;

/**
 * tope nivel 1
 * 38,400
 *
 * 3K abajo de un nivel 3
 */
