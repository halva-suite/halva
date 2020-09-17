import yargs from 'yargs';
import { HalvaTestConfig } from '../TestRunner';
import { StartMain } from '../StartSubstrate/Start';
export class Start implements yargs.CommandModule {
  command = 'start';
  describe = 'Start substrate with custom spec';

  builder(args: yargs.Argv) {
    return args.option('p', {
      alias: 'path',
      type: 'string',
      required: true,
      describe: 'Path to substrate'
    });
  }

  async handler(args: yargs.Arguments) {
    StartMain(args.p as string, new HalvaTestConfig(null));
  }
}
