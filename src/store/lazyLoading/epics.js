import { ofType } from 'redux-observable';
import { map, switchMap } from 'rxjs/operators';
import { forkJoin, from } from 'rxjs';

import { LAZY_LOAD_COMPLETE, LAZY_LOAD_INIT } from './actions';
import { epic$ } from '../index';

export const lazyLoadEpics = action$ =>
  action$.pipe(
    ofType(LAZY_LOAD_INIT.type),
    switchMap(() =>
      forkJoin([
        from(import('../Authentication/epics')),
        from(import('../libraries/epics')),
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
