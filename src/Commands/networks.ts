import yargs from 'yargs';
import { run } from '../Networks/GetNetworkList';
import { getConfigureModule } from '../Configure/FindConfigFile';
import { HalvaTestConfig } from '../TestRunner';

export class Networks implements yargs.CommandModule {
  public command = 'networks';
  public describe = 'Get network list';

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
    run(new HalvaTestConfig(null, null, path, null));
  }
}
