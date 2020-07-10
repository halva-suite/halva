// tslint:disable: no-implicit-dependencies
// tslint:disable: no-submodule-imports
import { ApiPromise, WsProvider } from '@polkadot/api';
import testKeyring from '@polkadot/keyring/testing';
import { KeyringPair } from '@polkadot/keyring/types';
import { Address, Hash } from '@polkadot/types/interfaces';
import BN from 'bn.js';
import { ALICE, CREATION_FEE, GAS_REQUIRED } from './consts';
import { GetAbiData, GetByteArray, sendAndReturnFinalized } from './utils';

export const UploadContract = async (
  filePath: string,
  polkadot: ApiPromise,
  account: KeyringPair
) => {
  const tx = polkadot.tx.contracts.putCode(`0x${GetByteArray(filePath)}`);
  const result: any = await sendAndReturnFinalized(account, tx);
  const record = result.findRecord('contracts', 'CodeStored');

  if (!record) {
    console.error('ERROR: No code stored after executing putCode()');
  }
  // Return code hash.
  return record.event.data[0];
};

export const instantiate = async (
  api: ApiPromise,
  signer: KeyringPair,
  codeHash: Hash,
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
    console.error('ERROR: No new instantiated contract');
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

export const run = async (contract: string, abi: string) => {
  const provider = new WsProvider('ws://127.0.0.1:9944');
  const polkadot = await ApiPromise.create({ provider });
  const keyring = testKeyring({ type: 'sr25519' });
  const alicePair = keyring.getPair(ALICE);
  const hash = await UploadContract(contract, polkadot, alicePair);
  console.log('\x1b[33m%s\x1b[0m', 'Contract hash ' + hash);
  const address = await instantiate(
    polkadot,
    alicePair,
    hash,
    GetAbiData(abi),
    CREATION_FEE
  );
  console.log('\x1b[33m%s\x1b[0m', `Contract address: ${address}`);
};

run(
  '/home/staler/ink/examples/erc20/target/erc20.wasm',
  '/home/staler/ink/examples/erc20/target/metadata.json'
);
