import { ApiPromise, WsProvider } from '@polkadot/api';
import { KeyringPair } from '@polkadot/keyring/types';
import { Metadata } from '@polkadot/types';
import { expect, assert } from 'chai';
import Mocha from 'mocha';
import path from 'path';
import { generateAccounts } from '../Accounts';
import { eventEmitted, eventNotEmitted, passes, fails } from '../Assert/Asserts';
import { artifacts } from '../MIgrator/Artifacts';
import { HalvaTestConfig } from './Config/HalvaTestConfig';
import testKeyring from '@polkadot/keyring/testing';
import { ALICE, CHARLIE, BOB } from '../Deployer/consts';
// tslint:disable: variable-name
declare global {
  var halva_polkadot: ApiPromise;
  var expect;
  var assert;
  var artifacts: artifacts;
  var networkName: string;
  var mochaConfigure: Mocha;
  var alicePair: KeyringPair;
  var bobPair: KeyringPair;
  var charliePair: KeyringPair;
  var halva_accounts: KeyringPair[];
  var eventNotEmitted;
  var eventEmitted;
  var passes;
  var fails;
  var chainMetadata: Metadata;
}

export const HalvaRunTests = async (config: HalvaTestConfig) => {
  config.testingFiles = config.testingFiles.map(testFile => {
    return path.resolve(testFile);
  });
  const provider = new WsProvider(config.network.ws);
  const polkadot = await ApiPromise.create({ provider });
  const accounts = await generateAccounts(10, config.network.mnemonic);
  const mocha = CreateMocha(config);
  config.testingFiles.forEach(file => {
    mocha.addFile(file);
  });
  const keyring = testKeyring({ type: 'sr25519' });
  const alicePair = keyring.getPair(ALICE);
  const charliePair = keyring.getPair(CHARLIE);
  const metadata = await polkadot.rpc.state.getMetadata();
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
  console.log('Run tests: ' + config.testingFiles);
  const runner = mocha.run();
  Promise.resolve(resolve => {
    runner.run(fail => {
      resolve(fail);
    });
  });
};

export const SetTestGlobal = (
  accounts: KeyringPair[],
  polkadot: ApiPromise,
  config: HalvaTestConfig,
  alicePair: KeyringPair,
  bobPair: KeyringPair,
  charliePair: KeyringPair,
  mochaConfigure: Mocha,
  metadata: Metadata,
) => {
  globalThis.halva_accounts = accounts;
  globalThis.expect = expect;
  globalThis.artifacts = artifacts;
  globalThis.alicePair = alicePair;
  globalThis.bobPair = bobPair;
  globalThis.charliePair = charliePair;
  globalThis.assert = assert;
  globalThis.eventEmitted = eventEmitted;
  globalThis.eventNotEmitted = eventNotEmitted;
  globalThis.halva_polkadot = polkadot;
  globalThis.networkName = config.networkName;
  globalThis.mochaConfigure = mochaConfigure;
  globalThis.passes = passes;
  globalThis.chainMetadata = metadata;
  globalThis.fails = fails;
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
