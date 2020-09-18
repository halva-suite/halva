import yargs from 'yargs';
import { HalvaTestConfig } from '../TestRunner';
import { StartMain } from '../StartSubstrate/Start';
export class Start implements yargs.CommandModule {
  command = 'start';
  describe = 'Start substrate with custom spec';

  builder(args: yargs.Argv) {
    return args
      .option('p', {
        alias: 'path',
        type: 'string',
        required: true,
        describe: 'Path to substrate'
      })
      .option('w', {
        alias: 'wsport',
        type: 'number',
        required: false,
        default: 9944,
        describe: 'ws-port'
      });
  }

  async handler(args: yargs.Arguments) {
    StartMain(args.p as string, new HalvaTestConfig(null), args.w as number);
  }
}
