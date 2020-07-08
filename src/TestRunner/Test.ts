import { ApiPromise, WsProvider } from '@polkadot/api';
import { KeyringPair } from '@polkadot/keyring/types';
import path from 'path';
import { generateAccounts } from '../Accounts';
import { HalvaTestConfig } from "./Config/HalvaTestConfig";
import { CreateMocha } from './TestRunner';
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
      const mocha = CreateMocha(config);
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

Run({testingFiles: ['/home/staler/halva/src/tests/example.test.js'], network: { test: {ws: "ws://127.0.0.1:9944",
mnemonic: "bottom drive obey lake curtain smoke basket hold race lonely fit walk"}}, bail: false, mocha: {}});