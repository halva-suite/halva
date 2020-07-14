// tslint:disable: no-implicit-dependencies
// tslint:disable: no-submodule-imports
import { ApiPromise, WsProvider } from '@polkadot/api';
import testKeyring from '@polkadot/keyring/testing';
import { KeyringPair } from '@polkadot/keyring/types';
import { Address } from '@polkadot/types/interfaces';
import BN from 'bn.js';
import { HalvaTestConfig } from '../TestRunner';
import { ALICE, CREATION_FEE, GAS_REQUIRED } from './consts';
import { Contract } from './Contract';
import {
  GetAbiData,
  getAbiObj,
  GetByteArray,
  sendAndReturnFinalized
} from './utils';

export const UploadContract = async (
  filePath: string,
  polkadot: ApiPromise,
  account: KeyringPair
) => {
  const tx = polkadot.tx.contracts.putCode(`0x${GetByteArray(filePath)}`);
  const result = await sendAndReturnFinalized(account, tx);
  const record = result.findRecord('contracts', 'CodeStored');

  if (!record) {
    console.error(
      '\x1b[31m%s\x1b[0m',
      'ERROR: No code stored after executing putCode()'
    );
    console.warn(
      '\x1b[31m%s\x1b[0m',
      'Check block for more info: \n Block hash: ' + result.status.asFinalized
    );
    process.exit(126);
  }
  // Return code hash.
  return record.event.data[0];
};

export const instantiate = async (
  api: ApiPromise,
  signer: KeyringPair,
  codeHash: string,
  inputData: any,
  endowment: BN,
  gasRequired: number = GAS_REQUIRED
): Promise<Address> => {
  const tx = api.tx.contracts.instantiate(
    endowment,
    gasRequired,
    codeHash,
    inputData
  );
  const result: any = await sendAndReturnFinalized(signer, tx);
  const record = result.findRecord('contracts', 'Instantiated');

  if (!record) {
    console.error('\x1b[31m%s\x1b[0m', 'ERROR: No new instantiated contract');
    console.warn(
      '\x1b[31m%s\x1b[0m',
      'Check block for more info: \n Block hash: ' + result.status.asFinalized
    );
    process.exit(126);
  }
  // Return the Address of  the instantiated contract.
  return record.event.data[1];
};

export const callContract = async (
  api: ApiPromise,
  signer: KeyringPair,
  contractAddress: Address,
  inputData: any,
  gasRequired: number = GAS_REQUIRED,
  endowment: number = 0
): Promise<void> => {
  const tx = api.tx.contracts.call(
    contractAddress,
    endowment,
    gasRequired,
    inputData
  );

  await sendAndReturnFinalized(signer, tx);
};

export const deployContract = async (
  contract: string,
  abi: string,
  constructorIndex: number,
  args: any,
  config: HalvaTestConfig
): Promise<Contract> => {
  const provider = new WsProvider(config.network.ws);
  const polkadot = await ApiPromise.create({ provider });
  const keyring = testKeyring({ type: 'sr25519' });
  const alicePair = keyring.getPair(ALICE);
  const hash = await UploadContract(contract, polkadot, alicePair);
  console.log('\x1b[33m%s\x1b[0m', 'WASM code hash ' + hash);
  const address = await instantiate(
    polkadot,
    alicePair,
    hash.toString(),
    GetAbiData(abi, constructorIndex, args),
    CREATION_FEE
  );
  console.log('\x1b[33m%s\x1b[0m', `Contract address: ${address}`);
  return { address, abi: getAbiObj(require(abi)) };
};
