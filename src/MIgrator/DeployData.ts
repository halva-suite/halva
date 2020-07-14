import { Contract } from '../Deployer/Contract';

export class DeployData {
  public networks: HalvaNetwork[];
}

// tslint:disable-next-line: max-classes-per-file
export class HalvaNetwork {
  public networkName: string;
  public contracts: Contract[];
}
