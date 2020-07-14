#!/usr/bin/env node
import yargs from 'yargs';
import { Console } from './Commands/console';
import { Migrate } from './Commands/migrate';
import { Test } from './Commands/test';

// tslint:disable-next-line: no-unused-expression
yargs
  .usage('Usage: $0 <cmd> [args]')
  .command(new Test())
  .command(new Console())
  .command(new Migrate())
  .help().argv;
