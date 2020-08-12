import yargs from 'yargs';
import { RunMigration } from '../Migrator/Migration';
import { HalvaTestConfig } from '../TestRunner';

export class Migrate implements yargs.CommandModule {
  command = 'migrate';
  describe = 'Run migrations';

  builder(args: yargs.Argv) {
    return args
      .option('p', {
        alias: 'path',
        type: 'string',
        required: true,
        describe: 'Path to migrations folder'
      })
      .option('c', {
        alias: 'config',
        type: 'string',
        required: false,
        default: null,
        describe: 'Path to configure file'
      })
      .option('n', {
        alias: 'network',
        type: 'string',
        required: false,
        default: null,
        describe: 'Network name'
      });
  }

  async handler(args: yargs.Arguments) {
    RunMigration(
      args.p as string,
      new HalvaTestConfig(null, null, args.c as string, args.n as string)
    );
  }
}
