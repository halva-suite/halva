import { ApiPromise, WsProvider } from '@polkadot/api';

import { generateAccounts } from './Accounts';

export async function init(config: any) {
  const { ws, mnemonic } = config.networks.test;

  const provider = new WsProvider(ws);

  const polkadot = await ApiPromise.create({ provider });
  const accounts = await generateAccounts(10, mnemonic);

  return { polkadot, accounts };
}
