import yargs from 'yargs';
import { InitMain } from '../Init/InitMain';

export class Init implements yargs.CommandModule {
  public command = 'init';
  public describe = 'init new project';

  public builder(args: yargs.Argv) {
    return args
      .option('b', {
        alias: 'box_name',
        type: 'string',
        required: false,
        describe: 'Box name'
      })
      .option('f', {
        alias: 'force',
        type: 'boolean',
        required: false,
        default: false,
        describe: 'Overwriting files in the directory if names match'
      });
  }

  public async handler(args: yargs.Arguments) {
    InitMain(args.f as boolean, args.b as string);
  }
}
