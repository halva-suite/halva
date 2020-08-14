import { readdirSync, existsSync} from 'fs';
import { MochaOptions } from 'mocha';
import { join, resolve } from 'path';
import { getConfigureModule } from '../../Configure/FindConfigFile';
export class HalvaTestConfig {
  public testingFiles: string[];
  public mocha: MochaOptions;
  public bail: boolean;
  public network: any;
  public colors?: boolean;
  public networkName: string;
  public timeout: number;
  public debug: boolean;
  public types: any;
  constructor(
    filesPath: string,
    mocha?: MochaOptions,
    network?: string,
    networkName?: string,
    bail = false,
    timeout = 0,
    colors = false,
    debug = true
  ) {
    if (filesPath && existsSync(resolve(filesPath))) {
      this.testingFiles = readdirSync(filesPath).map(file =>
        join(filesPath, file)
      );
    }
    else {
      console.log('Nothing to test');
      process.exit(0);
    }
    this.mocha = mocha || {};
    this.bail = bail;
    this.debug = debug;
    this.timeout = timeout;
    this.network = require(network == null
      ? getConfigureModule(null)
      : resolve(network));
    this.types = this.network.polkadotjs.types;
    this.network = this.network.networks[
      networkName == null ? Object.keys(this.network.networks)[0] : networkName
    ];
    this.networkName = networkName;
    this.colors = colors;
  }
}
