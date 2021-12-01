const CryptoPaws = artifacts.require("CryptoPaws");
const lotteryfactory = artifacts.require("LotteryFactory");
const auctionfactory = artifacts.require("AuctionFactory");

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(CryptoPaws);
  const pawc = await CryptoPaws.deployed();
  
  await deployer.deploy(lotteryfactory, pawc.address, { value: "1000000000000000000"});
  const lfc = await lotteryfactory.deployed();

  await deployer.deploy(auctionfactory, pawc.address, {value: "1000000000000000000"});
  const afc = await auctionfactory.deployed();

  await pawc.setLottFactoryAddress(lfc.address);
  await pawc.setAucFactoryAddress(afc.address);
};
