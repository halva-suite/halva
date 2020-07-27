import yargs from 'yargs';
import { run } from '../Repl/repl';

export class Console implements yargs.CommandModule {
  public command = 'console';
  public describe = 'Run console';

  public builder(args: yargs.Argv) {
    return args.option('p', {
      alias: 'path',
      type: 'string',
      required: true,
      describe: 'Path to configure file'
    });
  }

  public async handler(args: yargs.Arguments) {
    run(args.p as string);
  }
}
