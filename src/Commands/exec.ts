import yargs from 'yargs';
import { getConfigureModule } from '../Configure/FindConfigFile';
import { HalvaTestConfig } from '../TestRunner';
import { execFile } from '../TestRunner/exec';

export class Exec implements yargs.CommandModule {
  public command = 'exec';
  public describe = 'Execute js file';

  public builder(args: yargs.Argv) {
    return args.option('p', {
      alias: 'path',
      type: 'string',
      required: false,
      describe: 'Path to configure file'
    })
    .option('f', {
      alias: 'file',
      type: 'string',
      required: true,
      describe: 'Path to execute file'
    });
  }

  public async handler(args: yargs.Arguments) {
    const path = getConfigureModule(args.p as string);
    execFile(args.f as string, new HalvaTestConfig(null, null, path, null));
  }
}
