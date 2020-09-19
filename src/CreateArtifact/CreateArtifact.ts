import { runner } from 'hygen';
import { join } from 'path';
const Logger = require('hygen/lib/logger');
const defaultTemplates = join(__dirname, '../_templates');

export const CreateArtifact = (argv: string[]) => {
  runner(argv, {
    templates: defaultTemplates,
    cwd: process.cwd(),
    logger: new Logger(console.log.bind(console)),
    createPrompter: () => require('enquirer'),
    exec: (action, body) => {
      const opts = body && body.length > 0 ? { input: body } : {};
      return require('execa').shell(action, opts);
    }
  });
};
