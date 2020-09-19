import { ApiPromise, WsProvider } from '@polkadot/api';
import { KeyringPair } from '@polkadot/keyring/types';
import { Metadata } from '@polkadot/types';
import { expect, assert } from 'chai';
import Mocha from 'mocha';
import path from 'path';
import { generateAccounts } from '../Accounts';
import {
  eventEmitted,
  eventNotEmitted,
  passes,
  fails
} from '../Assert/Asserts';
import { artifacts } from '../Migrator/Artifacts';
import { HalvaTestConfig } from './Config/HalvaTestConfig';
import testKeyring from '@polkadot/keyring/testing';
import { ALICE, CHARLIE, BOB } from '../Deployer/consts';
// tslint:disable: variable-name
declare global {
  var expect;
  var assert;
  var artifacts: artifacts;
  var networkName: string;
  var mochaConfigure: Mocha;
  var alicePair: KeyringPair;
  var bobPair: KeyringPair;
  var charliePair: KeyringPair;
  var halva: halva;
  var verbose: boolean;
  var eventNotEmitted;
  var eventEmitted;
  var passes;
  var fails;
  var chainMetadata: Metadata;
}

export const HalvaRunTests = async (
  config: HalvaTestConfig,
  onlyGlobal = false
) => {
  config.testingFiles = config.testingFiles.map(testFile => {
    return path.resolve(testFile);
  });
  const provider = new WsProvider(config.halvaJs.ws);
  const polkadot = await ApiPromise.create({ provider, types: config.types });
  const accounts = await generateAccounts(10, config.halvaJs.mnemonic);
  const mocha = CreateMocha(config);
  const keyring = testKeyring({ type: 'sr25519' });
  const alicePair = keyring.getPair(ALICE);
  const charliePair = keyring.getPair(CHARLIE);
  let metadata: Metadata;
  try {
    // @ts-ignore
    metadata = await polkadot.rpc.state.getMetadata();
  } catch (err) {
    console.log('Metadata is undefined');
    process.exit(0);
  }
  const bobPair = keyring.getPair(BOB);
  SetTestGlobal(
    accounts,
    polkadot,
    config,
    alicePair,
    bobPair,
    charliePair,
    mocha,
    metadata
  );
  if (!onlyGlobal) {
    config.testingFiles = config.testingFiles.map(testFile => {
      return path.resolve(testFile);
    });
    config.testingFiles.forEach(file => {
      mocha.addFile(file);
    });
    console.log('Run tests: ' + config.testingFiles);
    const runner = mocha.run();
    Promise.resolve(resolve => {
      runner.run(fail => {
        resolve(fail);
      });
    });
  }
};

export const SetTestGlobal = (
  accounts: KeyringPair[],
  polkadot: ApiPromise,
  config: HalvaTestConfig,
  alicePair: KeyringPair,
  bobPair: KeyringPair,
  charliePair: KeyringPair,
  mochaConfigure: Mocha,
  metadata: Metadata
) => {
  global.halva = { polkadot, accounts };
  global.expect = expect;
  global.artifacts = artifacts;
  global.alicePair = alicePair;
  global.bobPair = bobPair;
  global.charliePair = charliePair;
  global.assert = assert;
  global.eventEmitted = eventEmitted;
  global.eventNotEmitted = eventNotEmitted;
  global.networkName = config.networkName;
  global.mochaConfigure = mochaConfigure;
  global.passes = passes;
  global.verbose = config.verbose;
  global.chainMetadata = metadata;
  global.fails = fails;
};

export const CreateMocha = (config: HalvaTestConfig): Mocha => {
  const mochaConfig = config.mocha || {};
  // Propagate --bail option to mocha
  mochaConfig.bail = config.bail;

  // If the command line overrides color usage, use that.
  if (config.colors != null) {
    mochaConfig.useColors = config.colors;
  }
  // Default to true if configuration isn't set anywhere.
  if (mochaConfig.useColors == null) {
    mochaConfig.useColors = true;
  }
  mochaConfig.timeout = config.timeout;
  const mocha = new Mocha(mochaConfig);

  return mocha;
};

interface halva {
  accounts: KeyringPair[];
  polkadot: ApiPromise;
}
