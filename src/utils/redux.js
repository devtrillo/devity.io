import { curry } from 'ramda';

export const createNamedAction = curry((baseName, name) => {
  return `[${baseName}] - ${name}`;
});
