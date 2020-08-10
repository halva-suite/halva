#!/usr/bin/env node
import { Init } from './Commands/init';
import yargs from 'yargs';
import { Console } from './Commands/console';
import { Exec } from './Commands/exec';
import { Migrate } from './Commands/migrate';
import { Networks } from './Commands/networks';
import { Test } from './Commands/test';
import { getConfigureModule } from './Configure';
import { CreateArtifact } from './CreateArtifact/CreateArtifact';
import { configChange } from './TestRunner/Config/configChange';

// tslint:disable-next-line: no-unused-expression
yargs
  .usage('Usage: $0 <cmd> [args]')
  .command(new Test())
  .command(new Console())
  .command(new Migrate())
  .command(new Networks())
  .command(new Exec())
  .command(new Init())
  .command(
    'create <artifact_type> <ArtifactName>',
    'Create artifact',
    yargs => {
      yargs
        .positional('artifact_type', {
          describe: 'Artifact type',
          default: 'test'
        })
        .positional('ArtifactName', {
          describe: 'Artifact name',
          default: 'defaultTemplate'
        });
    },
    argv => {
      CreateArtifact([
        argv.artifact_type as string,
        'new',
        '--name',
        argv.ArtifactName as string
      ]);
    }
  )
  .command(
    'config <get|set> <key> <value>',
    'Config changer',
    yargs => {
      yargs
        .positional('accessor', {
          describe: 'get or set'
        })
        .positional('key', {
          describe: 'key'
        })
        .positional('value', {
          describe: 'value'
        });
    },
    argv => {
      configChange(
        argv.get as string,
        argv.key as string,
        argv.value as string,
        getConfigureModule(null)
      );
    }
  )
  .help().argv;
