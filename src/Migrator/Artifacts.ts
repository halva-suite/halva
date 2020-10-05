import { SubmittableResult } from '@polkadot/api';
import { KeyringPair } from '@polkadot/keyring/types';
import { ContractExecResultSuccess } from '@polkadot/types/interfaces/contracts/types';
import { stringCamelCase } from '@polkadot/util';
import { readFileSync } from 'fs';
import { basename, extname } from 'path';
import { Contract } from '../Deployer/Contract';
import { callContract, callContractRPC } from '../Deployer/Deployer';
import { getAbiObj } from '../Deployer/utils';
import { DeployData } from './DeployData';
export class artifacts {
  public static require(contract: string): any {
    const contractObj = JSON.parse(
      readFileSync(process.cwd() + '/deployData.json', 'utf-8')
    );
    return this.CreateContractObject(
      contractObj as DeployData,
      contract,
      globalThis.networkName
    );
  }

  public static async ReturnTxResult(
    abiMethod: string,
    signer: KeyringPair,
    contract: Contract,
    args: any
  ) {
    const fn = contract.abi.messages[stringCamelCase(abiMethod)];
    let data: any;
    if (args == null) {
      data = fn();
    } else {
      data = fn(args);
    }
    return callContract(halva.polkadot, signer, contract.address, data);
  }

  public static async ReturnRPCResult(
    abiMethod: string,
    signer: KeyringPair,
    contract: Contract,
    args: any
  ) {
    const fn = contract.abi.messages[stringCamelCase(abiMethod)];
    let data: any;
    if (args == null) {
      data = fn();
    } else {
      data = fn(args);
    }
    return callContractRPC(halva.polkadot, signer, contract.address, data);
  }
  private static CreateContractObject(
    contract: DeployData,
    contractName: string,
    networkName: string
  ): Object {
    let deployed = false;
    const ContractData = contract.networks
      .find(x => x.networkName == networkName)
      .contracts.find(
        c =>
          basename(c.path.contractPath, extname(c.path.contractPath)) ==
          contractName
      );
    if (ContractData) {
      deployed = true;
    }
    ContractData.abi = getAbiObj(JSON.parse(ContractData.abiJSON));
    // @ts-ignore currently unused local ignore
    for (const [key, value] of Object.entries(
      ContractData.abi.abi.contract.messages
    )) {
      ContractPrimitive.prototype[value.name] = async function(
        signer: KeyringPair,
        args: any
      ): Promise<CallContractResult> {
        const txResult = await artifacts.ReturnTxResult(
          value.name,
          signer,
          ContractData,
          args
        );
        const rpcResult = await artifacts.ReturnRPCResult(
          value.name,
          signer,
          ContractData,
          args
        );
        return { txResult, rpcResult };
      };
    }
    const ContractObject = new ContractPrimitive(deployed, contractName);
    return ContractObject;
  }
}

// tslint:disable-next-line: max-classes-per-file
export class ContractPrimitive {
  private deployed: boolean;
  private contract: string;

  constructor(deployed: boolean, contract: string) {
    this.deployed = deployed;
    this.contract = contract;
  }
  public new() {
    return this.contract;
  }

  public Deployed() {
    return this.deployed;
  }
}

export interface CallContractResult {
  txResult: SubmittableResult;
  rpcResult: ContractExecResultSuccess;
}
