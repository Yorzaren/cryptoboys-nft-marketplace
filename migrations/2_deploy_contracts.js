const CryptoPaws = artifacts.require("CryptoPaws");
const lotteryfactory = artifacts.require("LotteryFactory.sol");

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(CryptoPaws);
  const pawc = await CryptoPaws.deployed();
  await deployer.deploy(lotteryfactory, pawc.address, { value: "1000000000000000000"});
  const lfc = await lotteryfactory.deployed();
  await pawc.setFactoryAddress(lfc.address);
};
