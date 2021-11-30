const CryptoPaws = artifacts.require("CryptoPaws");
const lottery = artifacts.require("Lottery.sol");
const lotteryfactory = artifacts.require("LotteryFactory.sol");
const auction = artifacts.require("PawAuction.sol");
const auctionfactory = artifacts.require("PawAuctionFactory.sol");

module.exports = async function(deployer) {
  let pawContract = await deployer.deploy(CryptoPaws);
  let lotterycontract = await deployer.deploy(lottery);
  let factore = await deployer.deploy(lotteryfactory, CryptoPaws.address, lottery.address);
  let auctioncontract = await deployer.deploy(auction);
  let factory = await deployer.deploy(auctionfactory, CryptoPaws.address, auction.address);
};
