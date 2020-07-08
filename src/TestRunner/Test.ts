import { ApiPromise, WsProvider } from '@polkadot/api';
import { KeyringPair } from '@polkadot/keyring/types';
import Mocha from 'mocha';
import path from 'path';
import { generateAccounts } from '../Accounts';
import { HalvaTestConfig } from "./Config/HalvaTestConfig";
 // tslint:disable: variable-name
declare global {
    var halva_polkadot: ApiPromise;
   
    var halva_accounts: KeyringPair[];
  }

export const Run = async (config: HalvaTestConfig) => {
    config.testingFiles = config.testingFiles.map(testFile => {
        return path.resolve(testFile);
      });
      const provider = new WsProvider(config.network.test.ws);
      const polkadot = await ApiPromise.create({ provider });
      const accounts = await generateAccounts(10, config.network.test.mnemonic);
      const mocha = this.CreateMocha(config);
      config.testingFiles.forEach(file => {
        mocha.addFile(file);
      });
      SetTestGlobal(accounts, polkadot)
      console.log('Run tests: '+ config.testingFiles);
      const runner =  mocha.run();
      runner.run();
};

export const SetTestGlobal = (accounts: KeyringPair[], polkadot: ApiPromise) => {
    globalThis.halva_accounts = accounts;
    globalThis.halva_polkadot = polkadot;
}


export const CreateMocha = (config: HalvaTestConfig): Mocha => {
    const mochaConfig = config.mocha || {};
 // Propagate --bail option to mocha
    mochaConfig.bail = config.bail;

    // If the command line overrides color usage, use that.
    if (config.colors != null) { mochaConfig.useColors = config.colors; }
    // Default to true if configuration isn't set anywhere.
    if (mochaConfig.useColors == null) {
     mochaConfig.useColors = true;
    }

    const mocha = new Mocha(mochaConfig);

    return mocha;
}

Run({testingFiles: ['./src/tests/example.test.js'], network: { test: {ws: "ws://127.0.0.1:9944",
mnemonic: "bottom drive obey lake curtain smoke basket hold race lonely fit walk"}}, bail: false, mocha: {}});