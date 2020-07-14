import { Abi } from '@polkadot/api-contract';
import { Address } from '@polkadot/types/interfaces';

export class Contract {
  public address: Address;
  public abi: Abi;
}
