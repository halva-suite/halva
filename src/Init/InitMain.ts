import { existsSync, mkdirSync } from 'fs';
import { runner } from 'hygen';
import { join } from 'path';
const Git = require('nodegit');
const Logger = require('hygen/lib/logger');
const defaultTemplates = join(__dirname, '../_templates');
const SubstrateRepo = 'https://github.com/paritytech/substrate.git';
export const InitMain = async (
  force: boolean,
  boxName?: string,
  projectName?: string
) => {
  if (boxName) {
    // TODO
  }

  if (!projectName) {
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
  }

  if (projectName) {
    if (force) {
      await CreateProject(projectName);
      templateRunner(['init', 'tests'], `/${projectName}`);
      templateRunner(['init', 'new'], `/${projectName}`);
    } else if (!force) {
      if (existsSync(join(process.cwd(), projectName))) {
        console.log(projectName + ' directory already exists! Using --force');
        process.exit(0);
      }
      await CreateProject(projectName);
      templateRunner(['init', 'tests'], `/${projectName}`);
      templateRunner(['init', 'new'], `/${projectName}`);
    }
  }
};

export const CreateProject = async (projectName: string) => {
  try {
    mkdirSync(join(process.cwd(), projectName));
    console.log('Clone the substrate repository, it can take a long time :)');
    await Git.Clone(
      SubstrateRepo,
      join(process.cwd(), projectName)
    );
  } catch (err) {
    console.log(err);
    process.exit(0);
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
