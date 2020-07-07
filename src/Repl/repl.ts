import repl from 'repl';

import { init } from './../index';

export const run = (async (path?: string) => {
  const api = await init(path);

  const r = repl.start('> ');

  Object.defineProperty(r.context, 'api', {
    configurable: false,
    enumerable: true,
    value: api
  });
});
