import yargs from 'yargs';
import { run } from '../Repl/repl';
import { getConfigureModule } from '../Configure/FindConfigFile';

export class Console implements yargs.CommandModule {
  public command = 'console';
  public describe = 'Run console';

  public builder(args: yargs.Argv) {
    return args.option('p', {
      alias: 'path',
      type: 'string',
      required: false,
      describe: 'Path to configure file'
    });
  }

  public async handler(args: yargs.Arguments) {
    const path = getConfigureModule(args.p as string);
    run(path as string);
  }
}
