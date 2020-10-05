import yargs from 'yargs';
import { HalvaTestConfig } from '../TestRunner';
import { Start as StartSubstrate } from '../Substrate';

export class Start implements yargs.CommandModule {
  command = 'start';
  describe = 'Start substrate with custom spec';

  builder(args: yargs.Argv) {
    return args
      .option('p', {
        alias: 'path',
        type: 'string',
        required: false,
        default: 'target/debug/node-template',
        describe: 'Path to substrate'
      });
  }

  async handler(args: yargs.Arguments) {
    StartSubstrate(args.p as string, new HalvaTestConfig(null));
  }
}
