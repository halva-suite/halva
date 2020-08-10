import { existsSync } from 'fs';
import { runner } from 'hygen';
import { join } from 'path';
const Logger = require('hygen/lib/logger');
const defaultTemplates = join(__dirname, '../_templates');

export const InitMain = (force: boolean, boxName?: string) => {
  if (boxName) {
    // TODO
  }
  if (force) {
    templateRunner(['test', 'new', '--name', 'example'], '/halva');
    templateRunner(['init', 'new'], '/halva');
  } else if (!force) {
    if (existsSync(process.cwd() + '/halva')) {
      console.log('Halva directory already exists! Using --force');
      process.exit(0);
    }
    templateRunner(['test', 'new', '--name', 'example'], '/halva');
    templateRunner(['init', 'new'], '/halva');
  }
};

export const templateRunner = (argv: string[], path?: string) => {
  runner(argv, {
    templates: defaultTemplates,
    cwd: process.cwd() + path,
    logger: new Logger(console.log.bind(console)),
    createPrompter: () => require('enquirer'),
    exec: (action, body) => {
      const opts = body && body.length > 0 ? { input: body } : {};
      return require('execa').shell(action, opts);
    }
  });
};
