import yargs from 'yargs';
import { run } from '../Repl/repl';

export class Console implements yargs.CommandModule {
  command = 'console';
  describe = 'Run console';

  builder(args: yargs.Argv) {
    return args.option('p', {
      alias: 'path',
      type: 'string',
      required: true,
      describe: 'Path to configure file'
    });
  }

  async handler(args: yargs.Arguments) {
    run(args.p as string);
  }
}
