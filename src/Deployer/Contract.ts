import { Abi } from '@polkadot/api-contract';
import { Address } from '@polkadot/types/interfaces';
import { MigrationContract } from '../MIgrator/Migration';

export class Contract {
  public path: MigrationContract;
  public address: Address;
  public abi: Abi;
}
