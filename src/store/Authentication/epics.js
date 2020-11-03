import { ofType } from 'redux-observable';
import { authState } from 'rxfire/auth';
import { exhaustMap, map, withLatestFrom } from 'rxjs/operators';

import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from './actions';
import { LAZY_LOAD_COMPLETE } from '../lazyLoading/actions';

const customAuth = firebase =>
  authState(firebase.auth()).pipe(
    map(user => (user ? SET_AUTHENTICATED(user) : SET_UNAUTHENTICATED())),
  );

const authListenerEpic = (action$, state$, { firebase$ }) =>
  action$.pipe(
    ofType(LAZY_LOAD_COMPLETE.type),
    withLatestFrom(firebase$),
    exhaustMap(([, firebase]) => customAuth(firebase)),
  );

export default [authListenerEpic];
