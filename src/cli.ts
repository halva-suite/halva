#!/usr/bin/env node
import yargs from 'yargs';
import { run } from './Repl/repl';

yargs
  .usage('Usage: $0 <cmd> [args]')
  .command('console [path]', 'run console', (yargs) => {
    yargs.positional('path', {
      type: 'string',
      default: null,
      describe: 'path to configure file'
    })
  }, (argv: any) => {
    run(argv.path)
  })
  .help()
  .argv
