import { ofType } from 'redux-observable';
import { catchError, exhaustMap, filter, map, switchMap } from 'rxjs/operators';
import { forkJoin, from, of } from 'rxjs';

import { epic$ } from 'store';
import {
  LAZY_LOAD_COMPLETE,
  LAZY_LOAD_EPICS,
  LAZY_LOAD_INIT,
  SENTRY_LOADED,
} from './actions';

const lazyLoadFirebase = firebase$ => {
  const config = {
    apiKey: 'AIzaSyAv1wMt8Tj268_Ya2-74vgVfGRSRRyTJcE',
    authDomain: 'playground-devtrillo.firebaseapp.com',
    databaseURL: 'https://playground-devtrillo.firebaseio.com',
    projectId: 'playground-devtrillo',
    storageBucket: 'playground-devtrillo.appspot.com',
    messagingSenderId: '745069029187',
    appId: '1:745069029187:web:44cafa01225a2a405931f6',
    measurementId: 'G-6RY5TYB4XK',
  };
  return forkJoin([
    from(import('firebase/app')),
    from(import('firebase/analytics')),
    from(import('firebase/database')),
    from(import('firebase/firestore')),
    from(import('firebase/functions')),
    from(import('firebase/performance')),
    from(import('firebase/auth')),
  ]).pipe(
    map(([firebase]) => {
      const app = firebase.initializeApp(config);
      firebase$.next(app);
      return LAZY_LOAD_EPICS();
    }),
    catchError(err => {
      console.error(err);
      return of(LAZY_LOAD_EPICS);
    }),
  );
};

const lazyLoadFirebaseEpic = (action$, state$, { firebase$ }) =>
  action$.pipe(
    ofType(LAZY_LOAD_INIT.type),
    exhaustMap(() => lazyLoadFirebase(firebase$)),
  );

const lazyLoadSentry = (action$, state$, { sentry$ }) =>
  action$.pipe(
    ofType(LAZY_LOAD_INIT.type),
    filter(() => process.env.NODE_ENV === 'production'),
    exhaustMap(() =>
      forkJoin([
        from(import('@sentry/react')),
        from(import('@sentry/tracing')),
      ]).pipe(
        map(([Sentry, { Integrations }]) => {
          Sentry.init({
            dsn:
              'https://fea9d643474f4a7db2d8691508a8da14@o466270.ingest.sentry.io/5480378',
            integrations: [new Integrations.BrowserTracing()],
            tracesSampleRate: 1.0,
            environment: process.env.NODE_ENV,
          });
          sentry$.next(Sentry);
          return SENTRY_LOADED();
        }),
      ),
    ),
  );

const lazyLoadEpics = action$ =>
  action$.pipe(
    ofType(LAZY_LOAD_EPICS.type),
    switchMap(() =>
      forkJoin([
        from(import('store/Authentication/epics')),


      ]).pipe(
        map(epics => {
          for (let i = 0; i < epics.length; i++) {
            const epicsModule = epics[i].default;
            if (!Array.isArray(epicsModule)) epic$.next(epicsModule);
            else
              for (let j = 0; j < epicsModule.length; j++)
                epic$.next(epicsModule[j]);
          }
          return LAZY_LOAD_COMPLETE();
        }),
      ),
    ),
  );

export default [lazyLoadFirebaseEpic, lazyLoadEpics, lazyLoadSentry];
