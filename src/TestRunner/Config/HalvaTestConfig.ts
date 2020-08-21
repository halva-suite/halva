import { readdirSync, existsSync} from 'fs';
import { MochaOptions } from 'mocha';
import { join, resolve } from 'path';
import { getConfigureModule } from '../../Configure/FindConfigFile';
export class HalvaTestConfig {
  public testingFiles: string[];
  public mocha: MochaOptions;
  public bail: boolean;
  public halvaJs: any;
  public colors?: boolean;
  public networkName: string;
  public timeout: number;
  public verbose: boolean;
  public types: any;
  constructor(
    filesPath: string,
    mocha?: MochaOptions,
    network?: string,
    networkName?: string,
    bail = false,
    timeout = 0,
    colors = false,
    verbose = false
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
    this.verbose = verbose;
    this.timeout = timeout;
    this.halvaJs = require(network == null
      ? getConfigureModule(null)
      : resolve(network));
    this.types = this.halvaJs.polkadotjs?.types == undefined ? null : this.halvaJs.polkadotjs.types;
    this.halvaJs = this.halvaJs.networks[
      networkName == null ? Object.keys(this.halvaJs.networks)[0] : networkName
    ];
    this.networkName = networkName;
    this.colors = colors;
  }
}
