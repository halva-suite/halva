import { readdirSync, lstatSync } from 'fs';
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
  public networkList: any;
  constructor(
    filesPath: string[],
    mocha?: MochaOptions,
    network?: string,
    networkName?: string,
    bail = false,
    timeout = 0,
    colors = false,
    debug = true
  ) {
    this.testingFiles = [];
    if (filesPath && filesPath.length > 0) {
      if(lstatSync(filesPath[0]).isDirectory()) {
        filesPath.forEach(path => {
          this.testingFiles.push(...readdirSync(resolve(path)).map( f => join(path, f)));
        })
      }
      else if(lstatSync(filesPath[0]).isFile()) {
        this.testingFiles = filesPath.map( f => resolve(f));
      }
    }
    this.mocha = mocha || {};
    this.bail = bail;
    this.debug = debug;
    this.timeout = timeout;
    this.networkList = require(network == null
      ? getConfigureModule(null)
      : resolve(network));
    this.network = this.networkList.networks[
      networkName == null ? Object.keys(this.networkList.networks)[0] : networkName
    ];
    this.networkName = networkName;
    this.colors = colors;
  }
}
