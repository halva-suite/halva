#!/usr/bin/env node
import yargs from 'yargs';
import { Console } from './Commands/console';
import { Exec } from './Commands/exec';
import { Migrate } from './Commands/migrate';
import { Networks } from './Commands/networks';
import { Test } from './Commands/test';
import { CreateArtifact } from './CreateArtifact/CreateArtifact';

// tslint:disable-next-line: no-unused-expression
yargs
  .usage('Usage: $0 <cmd> [args]')
  .command(new Test())
  .command(new Console())
  .command(new Migrate())
  .command(new Networks())
  .command(new Exec())
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
  .help().argv;
