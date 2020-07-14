import { deployContract } from "../Deployer/Deployer";
import { HalvaTestConfig } from "../TestRunner";


export class Migration {
    
    private config: HalvaTestConfig;
    public async deploy(contract: MigrationContract, args?: any, constructorIndex = 0) {
        await deployContract(contract.contractPath, contract.AbiPath, constructorIndex, args, this.config);
    }
}

export interface MigrationContract {
    contractPath: string;
    AbiPath: string;
}