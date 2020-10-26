import { createNamedAction } from 'utils/redux';
import { compose } from 'ramda';
import { createAction } from '@reduxjs/toolkit';

const themes = createNamedAction('[ Themes ]');
const namedAction = compose(createAction, themes);

export const CYCLE_THEME = namedAction('Cycle theme');
