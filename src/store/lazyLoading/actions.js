import { createAction } from '@reduxjs/toolkit';
import { compose } from 'ramda';

import { generateBaseName } from 'utils/redux';

const lazyLoading = generateBaseName('Lazy loading');
const namedAction = compose(createAction, lazyLoading);

export const LAZY_LOAD_INIT = namedAction('Init lazyLoading');
export const LAZY_LOAD_COMPLETE = namedAction('Complete');
export const LAZY_LOAD_EPICS = namedAction('Complete loading firebase');
