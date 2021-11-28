const CryptoPaws = artifacts.require("CryptoPaws");
const lottery = artifacts.require("Lottery.sol");
const lotteryfactory = artifacts.require("LotteryCloneFactory.sol");

module.exports = async function(deployer) {
  let pawContract = await deployer.deploy(CryptoPaws);
  let lotterycontract = await deployer.deploy(lottery);
  deployer.deploy(lotteryfactory, pawContract, lotterycontract);
};
