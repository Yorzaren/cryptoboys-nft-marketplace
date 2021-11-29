const CryptoPaws = artifacts.require("CryptoPaws");
const lottery = artifacts.require("Lottery.sol");
const lotteryfactory = artifacts.require("LotteryFactory.sol");

module.exports = async function(deployer) {
  let pawContract = await deployer.deploy(CryptoPaws);
  let lotterycontract = await deployer.deploy(lottery);
  let factore = await deployer.deploy(lotteryfactory, CryptoPaws.address, lottery.address);
};
