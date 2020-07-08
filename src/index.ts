import { ApiPromise, WsProvider } from '@polkadot/api';

import { generateAccounts } from './Accounts';
import { getConfigureModule } from './Configure/FindConfigFile';

export async function init(path?: string) {
  const { ws, mnemonic } = require(path == null
    ? getConfigureModule('halva.js')
    : path);
  const provider = new WsProvider(ws);
  const polkadot = await ApiPromise.create({ provider });
  const accounts = await generateAccounts(10, mnemonic);
  return { polkadot, accounts };
}
