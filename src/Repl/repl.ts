import repl from 'repl';

import config from '../../halva';
import { init } from './../index';

(async () => {
  const api = await init(config);

  const r = repl.start('> ');

  Object.defineProperty(r.context, 'api', {
    configurable: false,
    enumerable: true,
    value: api
  });
})()
