import { compose } from 'ramda';
import { createAction } from '@reduxjs/toolkit';

import { generateBaseName } from 'utils/redux';

const firebaseName = generateBaseName('Auth');
const namedAction = compose(createAction, firebaseName);

export const SET_AUTHENTICATED = namedAction('Authenticated');
export const SET_UNAUTHENTICATED = namedAction('Unauthenticated');
