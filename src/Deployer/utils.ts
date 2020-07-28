// tslint:disable: no-implicit-dependencies
// tslint:disable: no-submodule-imports
import { SubmittableResult } from '@polkadot/api';
import { Abi } from '@polkadot/api-contract';
import { KeyringPair } from '@polkadot/keyring/types';
import { TypeRegistry } from '@polkadot/types';
import { existsSync, readFileSync } from 'fs';

export const GetByteArray = (filePath: string) => {
  if (!existsSync(filePath)) {
    throw new Error(`File ${filePath} not exist`);
  }
  const fileData = readFileSync(filePath).toString('hex');
  return fileData;
};

export async function sendAndReturnFinalized(
  signer: KeyringPair,
  tx: any
): Promise<SubmittableResult> {
  return new Promise((resolve, reject) => {
    tx.signAndSend(signer, (result: SubmittableResult) => {
      if (result.status.isInBlock) {
        if(debug)
        console.log(`Write in block: ${result.status.asInBlock}`);
        // Return the result of the submittable extrinsic after the transfer is finalized
      }
      if (result.status.isFinalized) {
        if(debug)
        console.log(`Finalized in: ${result.status.asFinalized}`);
        resolve(result as SubmittableResult);
      }
      if (
        result.status.isDropped ||
        result.status.isInvalid ||
        result.status.isUsurped
      ) {
        reject(result as SubmittableResult);
        if(debug)
        console.error('ERROR: Transaction could not be finalized.');
      }
    });
  });
}

export async function sendAndReturnSignFinalized(
  tx: any
): Promise<SubmittableResult> {
  return new Promise((resolve, reject) => {
    tx.send((result: SubmittableResult) => {
      if (result.status.isInBlock) {
        console.log(`Write in block: ${result.status.asInBlock}`);
        // Return the result of the submittable extrinsic after the transfer is finalized
      }
      if (result.status.isFinalized) {
        console.log(`Finalized in: ${result.status.asFinalized}`);
        resolve(result as SubmittableResult);
      }
      if (
        result.status.isDropped ||
        result.status.isInvalid ||
        result.status.isUsurped
      ) {
        reject(result as SubmittableResult);
        console.error('ERROR: Transaction could not be finalized.');
      }
    });
  });
}

export const GetAbiData = (
  path: string,
  constructorIndex: number,
  arg: any
) => {
  const metadata = require(path);
  const selector = getAbiObj(metadata);
  const data = selector.constructors[constructorIndex](arg);
  return data;
};

export const getAbiObj = obj => {
  const registry = new TypeRegistry();
  const contractAbi = new Abi(registry, obj);
  return contractAbi;
};
