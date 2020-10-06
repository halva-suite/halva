import Keyring from '@polkadot/keyring';
import { cryptoWaitReady } from '@polkadot/util-crypto';

export async function generateAccounts(count: number, mnemonic: string) {
  await cryptoWaitReady();
  const keyring = new Keyring({ type: 'sr25519' });
  return new Array(count).fill(null).map((_, index) => {
    return keyring.createFromUri(`${mnemonic}//${index}`);
  });
}
