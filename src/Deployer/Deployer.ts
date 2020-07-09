import { ApiPromise, Keyring, WsProvider } from '@polkadot/api';
import { Abi } from '@polkadot/api-contract';
import { KeyringPair } from '@polkadot/keyring/types';
import { TypeRegistry } from '@polkadot/types';
import { stringToU8a } from '@polkadot/util';
import { existsSync, readFileSync } from 'fs';
import { generateAccounts } from '../Accounts';

export const UploadContract = async (
  filePath: string,
  polkadot: ApiPromise,
  accounts: KeyringPair[]
) => {
  return polkadot.tx.contracts
    .putCode(GetByteArray(filePath))
    .signAndSend(accounts[0]);
};

export const DeployContract = async (
  polkadot: ApiPromise,
  accounts: KeyringPair[],
  codeHash: string,
  dataHash: Uint8Array
) => {
  const transaction = polkadot.tx.contracts
    .instantiate(500000, 1000000, codeHash, dataHash)
    .sign(accounts[0]);
  const txResult = await transaction.send(({ events = [], status }) => {
    console.log(`Current status is ${status.type}`);

    if (status.isFinalized) {
      console.log(`Transaction included at blockHash ${status.asFinalized}`);

      // Loop through Vec<EventRecord> to display all events
      console.log('MAybe address: ' + events[events.length -1].event.data[1]);
      txResult();
    }
  });
};

export const GetByteArray = (filePath: string) => {
  if (!existsSync(filePath)) {
    throw new Error(`File ${filePath} not exist`);
  }
  const fileData = readFileSync(filePath);

  return new Uint8Array(fileData);
};

export const GetAbiData = (path: string) => {
  const app = JSON.parse(readFileSync(path, 'utf-8'));
  const abi = getAbiObj(app);
  return abi.constructors[0](stringToU8a('test'));
};

export const getAbiObj = obj => {
  const registry = new TypeRegistry();
  const contractAbi = new Abi(registry, obj);
  return contractAbi;
};

export const run = async (contract: string, abi: string) => {
  const provider = new WsProvider('ws://127.0.0.1:9944');
  const polkadot = await ApiPromise.create({ provider });
  let accounts = await generateAccounts(
    10,
    'bottom drive obey lake curtain smoke basket hold race lonely fit walk'
  );
  const keyring = new Keyring({ type: 'sr25519' });
  const alice = keyring.addFromUri('//Alice');
  accounts.push(alice);
  accounts = accounts.reverse();
  const hash = await UploadContract(contract, polkadot, accounts);
  console.log('Contract hash ' + hash);
  await DeployContract(polkadot, accounts, hash.toString(), GetAbiData(abi));

};

run(
  '/home/staler/ink/examples/erc20/target/erc20.wasm',
  '/home/staler/ink/examples/erc20/target/metadata.json'
);
