import { BehaviorSubject } from 'rxjs';
import {
  catchError,
  concatMap,
  mergeMap,
  withLatestFrom,
} from 'rxjs/operators';
import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  REHYDRATE,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import { AuthReducer } from './Authentication';
import { themeReducer } from './themes';
import { lazyLoadEpics } from './lazyLoading/epics';

const persistConfig = {
  key: 'devity-io',
  storage,
  blacklist: ['modal'],
};

const rootReducer = combineReducers({
  authentication: AuthReducer,
  theme: themeReducer,
});

export const epic$ = new BehaviorSubject(combineEpics(lazyLoadEpics));

const rootEpic = (action$, state$, dependencies) =>
  epic$.pipe(
    mergeMap(epic => epic(action$, state$, dependencies)),
    catchError((err, source) => {
      if (process.env.NODE_ENV === 'development') console.error(err);
      return epic$.pipe(
        withLatestFrom(dependencies.sentry$),
        concatMap(([, sentry]) => {
          sentry.addBreadcrumb({
            category: 'epics',
            level: sentry.Severity.Info,
            message: 'Getting error on an epic :)',
          });
          sentry.captureException(err);
          return source;
        }),
      );
    }),
  );

const createStore = (dependencies = {}, initialState) => {
  const epicMiddleware = createEpicMiddleware({ dependencies });

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = configureStore({
    reducer: persistedReducer,
    preloadedState: initialState,
    middleware: [
      ...getDefaultMiddleware({
        thunk: false,
        serializableCheck: {
          ignoredActions: [FLUSH, PAUSE, PERSIST, REHYDRATE],
        },
      }),
      epicMiddleware,
    ],
  });
  const persistor = persistStore(store);
  epicMiddleware.run(rootEpic);
  return { store, persistor };
};

export default createStore;
