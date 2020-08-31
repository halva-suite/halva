// tslint:disable: no-implicit-dependencies
// tslint:disable: no-submodule-imports
import { ApiPromise, SubmittableResult, WsProvider } from '@polkadot/api';
import testKeyring from '@polkadot/keyring/testing';
import { KeyringPair } from '@polkadot/keyring/types';
import { Address } from '@polkadot/types/interfaces';
import { ContractExecResultSuccess } from '@polkadot/types/interfaces/contracts';
import BN from 'bn.js';
import { readFileSync } from 'fs';
import { HalvaTestConfig } from '../TestRunner';
import { ALICE, CREATION_FEE, GAS_REQUIRED } from './consts';
import { Contract } from './Contract';
import {
  GetAbiData,
  getAbiObj,
  GetByteArray,
  sendAndReturnFinalized
} from './utils';

export async function UploadContract(
  filePath: string,
  polkadot: ApiPromise,
  account: KeyringPair,
): Promise<string> {
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

  return record.event.data[0].toString();
}

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
  contractAddress: any,
  inputData: any,
  gasRequired: number = GAS_REQUIRED,
  endowment: number = 0
): Promise<SubmittableResult> => {
  const tx = api.tx.contracts.call(
    contractAddress,
    endowment,
    gasRequired,
    inputData
  );
  const result = await sendAndReturnFinalized(signer, tx);
  return result;
};

export async function callContractRPC(
  api: ApiPromise,
  signer: KeyringPair,
  contractAddress: Address,
  inputData: any,
  gasRequired: number = GAS_REQUIRED,
  endowment: number = 0
): Promise<ContractExecResultSuccess> {
  signer = signer;
  const rpc = await api.rpc.contracts.call({
    origin: signer.address,
    dest: contractAddress,
    value: endowment,
    gasLimit: gasRequired,
    inputData
  });

  if (rpc.isError) {
    throw new Error('RPC cal is error');
  }
  return rpc.asSuccess;
}

export const deployContract = async (
  contract: string,
  abi: string,
  constructorIndex: number,
  args: any,
  config: HalvaTestConfig
): Promise<Contract> => {
  const provider = new WsProvider(config.halvaJs.ws);
  const polkadot = await ApiPromise.create({ provider, types: config.types });
  const keyring = testKeyring({ type: 'sr25519' });
  const alicePair = keyring.getPair(ALICE);
  const hash = await UploadContract(contract, polkadot, alicePair);
  console.log('\x1b[33m%s\x1b[0m', 'WASM code hash ' + hash);
  const address = await instantiate(
    polkadot,
    alicePair,
    hash,
    GetAbiData(abi, constructorIndex, args),
    CREATION_FEE
  );
  console.log('\x1b[33m%s\x1b[0m', `Contract address: ${address}`);
  return {
    address,
    abiJSON: readFileSync(abi, 'utf-8'),
    abi: getAbiObj(require(abi)),
    path: { contractPath: contract, AbiPath: abi }
  };
};
