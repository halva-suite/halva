#!/usr/bin/env node
import yargs from 'yargs';
import { run } from './Repl/repl'
// tslint:disable-next-line: no-unused-expression
yargs
  .usage('Usage: $0 <cmd> [args]')
  .command('console [path]', 'run console', (yargs) => {
    yargs.positional('path', {
      type: 'string',
      // tslint:disable-next-line: object-literal-sort-keys
      default: null,
      describe: 'path to configure file'
    })
  // tslint:disable-next-line: only-arrow-functions
  }, function (argv) {
    run(argv.path)
  })
  .help()
  .argv