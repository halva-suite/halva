import { readdirSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { Contract } from '../Deployer/Contract';
import { deployContract } from '../Deployer/Deployer';
import { HalvaTestConfig } from '../TestRunner';
import { DeployData } from './DeployData';
export class Migration {
  public data: DeployData;
  // Made in order to give each migration a relevant object
  public parent: Migration;
  private config: HalvaTestConfig;
  constructor(config: HalvaTestConfig) {
    this.config = config;
  }
  public async deploy(
    contract: MigrationContract,
    args?: any,
    constructorIndex = 0
  ): Promise<Contract> {
    const data = await deployContract(
      resolve(contract.contractPath),
      resolve(contract.AbiPath),
      constructorIndex,
      args,
      this.config
    );
    const network = this.parent.data.networks.find(
      f => f.networkName == this.config.networkName
    );
    if (network) {
      network.contracts.push(data);
    } else {
      this.parent.data.networks.push({
        networkName: this.config.networkName,
        networkAddress: this.config.network.ws as string,
        contracts: [data]
      });
    }
    return data;
  }
}

export const RunMigration = async (
  migrationsPath: string,
  config: HalvaTestConfig
) => {
  const migrations = readdirSync(resolve(migrationsPath));
  const deployer = new Migration(config);
  deployer.data = new DeployData();
  deployer.data.networks = [];
  deployer.parent = deployer;
  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < migrations.length; i++) {
    const migration = require(join(resolve(migrationsPath), migrations[i]));
    await migration(deployer);
  }
  writeFileSync(
    process.cwd() + '/deployData.json',
    JSON.stringify(deployer.data)
  );
  process.exit(0);
};

export interface MigrationContract {
  contractPath: string;
  AbiPath: string;
}
