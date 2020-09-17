import { readdirSync, lstatSync } from 'fs';
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
  public mnemonic: string;
  constructor(
    filesPath: string[],
    mocha?: MochaOptions,
    network?: string,
    networkName?: string,
    bail = false,
    timeout = 0,
    colors = false,
    verbose = false,
    isTest = false
  ) {
    if (filesPath && filesPath.length > 0) {
      if (lstatSync(filesPath[0]).isDirectory()) {
        filesPath.forEach(path => {
          this.testingFiles.push(
            ...readdirSync(resolve(path)).map(f => join(path, f))
          );
        });
      } else if (lstatSync(filesPath[0]).isFile()) {
        this.testingFiles = filesPath.map(f => resolve(f));
      }
    } else {
      if (isTest) throw new Error('No files for test');
    }
    this.mocha = mocha || {};
    this.bail = bail;
    this.verbose = verbose;
    this.timeout = timeout;
    this.halvaJs = require(network == null
      ? getConfigureModule(null)
      : resolve(network));
    this.mnemonic = this.halvaJs.mnemonic;
    this.types =
      this.halvaJs.polkadotjs?.types == undefined
        ? null
        : this.halvaJs.polkadotjs.types;
    this.halvaJs = this.halvaJs.networks[
      networkName == null ? Object.keys(this.halvaJs.networks)[0] : networkName
    ];
    this.networkName = networkName;
    this.colors = colors;
  }
}
