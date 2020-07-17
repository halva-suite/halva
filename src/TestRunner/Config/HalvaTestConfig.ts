import { readdirSync } from 'fs';
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
  constructor(
    filesPath: string,
    mocha?: MochaOptions,
    network?: string,
    networkName?: string,
    bail = false,
    timeout = 0,
    colors = false
  ) {
    if (filesPath) {
      this.testingFiles = readdirSync(filesPath).map(file =>
        join(filesPath, file)
      );
    }
    this.mocha = mocha || {};
    this.bail = bail;
    this.timeout = timeout;
    this.network = require(network == null
      ? getConfigureModule('halva.js')
      : resolve(network));
    this.network = this.network.networks[
      networkName == null ? Object.keys(this.network.networks)[0] : networkName
    ];
    this.networkName = networkName;
    this.colors = colors;
  }
}
