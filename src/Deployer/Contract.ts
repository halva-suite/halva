import { Abi } from '@polkadot/api-contract';
import { Address } from '@polkadot/types/interfaces';
import { MigrationContract } from '../Migrator/Migration';

export class Contract {
  public path: MigrationContract;
  public address: Address;
  public abiJSON: string;
  public abi: Abi;
}
