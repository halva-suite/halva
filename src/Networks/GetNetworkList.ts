import { HalvaTestConfig } from '../TestRunner';
import { readFileSync, existsSync } from 'fs';
import { DeployData } from '../Migrator/DeployData';

export const GetNetworks = (config: HalvaTestConfig): NetworkGet[] => {
  let networks = [];
  for (const [key, value] of Object.entries(config.networkList.networks)) {
    let x = value;
    x = x;
    networks.push(key);
  }
  let deployData : any;
  if(existsSync(process.cwd() + '/deployData.json')) {
    deployData= JSON.parse(
    readFileSync(process.cwd() + '/deployData.json').toString()
  ) as DeployData;
  }
  if (!deployData) {
    deployData = [];
    let nets_noDeploy: NetworkGet[];
    nets_noDeploy = [];
    networks.forEach(n => {
      nets_noDeploy.push({
        name: n,
        address: config.halvaJs.networks[n].ws as string,
        contracts: null
      });
    });
    return nets_noDeploy;
  }
  for (let i = 0; i < deployData.networks.length; i++) {
    if (!networks.includes(deployData.networks[i].networkName)) {
      networks.push(deployData.networks[i].networkName);
    }
  }
  if (networks.length == 0) {
    console.warn('Networks not found');
  }
  let networkList: NetworkGet[];
  networkList = [];
  networks.forEach(net => {
    let currentNetwork = deployData.networks.find(x => x.networkName == net);
    let currentContracts: ContractGet[];
    currentContracts = [];
    currentNetwork.contracts.forEach(c => {
      currentContracts.push({
        name: c.path.contractPath,
        address: c.address.toString(),
        deployed: true
      });
    });
    networkList.push({
      name: net,
      address: currentNetwork.networkAddress,
      contracts: currentContracts
    });
  });
  return networkList;
};

export const run = (config: HalvaTestConfig) => {
  const networkList = GetNetworks(config);
  networkList.forEach(n => {
    console.log(`\nNetwork: ${n.name} : WS: ${n.address}`);
    if(n.contracts) {
      n.contracts.forEach(c => {
        console.log(
          `\nContract name: ${c.name} : Address: ${c.address} : Deployed ${c.deployed}`
        );
      });
    }
  });
};
interface NetworkGet {
  name: string;
  address: string;
  contracts: ContractGet[];
}

interface ContractGet {
  name: string;
  address: string;
  deployed: boolean;
}
