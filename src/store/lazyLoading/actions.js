import { createAction } from '@reduxjs/toolkit';
import { compose } from 'ramda';
import { createNamedAction } from '../../utils/redux';

const namedAction = compose(createAction, createNamedAction('Lazy loading'));

export const LAZY_LOAD_INIT = namedAction('Init lazyLoading');
export const LAZY_LOAD_COMPLETE = namedAction('Complete');
export const LAZY_LOAD_EPICS = namedAction('Complete loading firebase');
export const SENTRY_LOADED = namedAction('Sentry loaded');
