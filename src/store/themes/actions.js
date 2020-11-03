import { compose } from 'ramda';
import { createAction } from '@reduxjs/toolkit';
import { createNamedAction } from '../../utils/redux';

const namedAction = compose(createAction, createNamedAction('Themes'));

export const CYCLE_THEME = namedAction('Cycle theme');
