
module.exports = async function(deployer) {
  console.log('Deploy erc20');
  await deployer.deploy({ contractPath: './contracts/erc20.wasm', 
  AbiPath: './contracts/metadata.json' }, 1000);
};
