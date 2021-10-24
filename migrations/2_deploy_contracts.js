<<<<<<< HEAD
const CryptoPaws = artifacts.require("./CryptoPaws.sol");
var PawAuctionFactory = artifacts.require("./PawAuctionFactory.sol");
var PawAuction = artifacts.require("./PawAuction.sol");
=======
const CryptoPaws = artifacts.require("./CryptoPaws");
var PawAuctionFactory = artifacts.require("./PawAuctionFactory.sol");
var PawAuction = artifacts.require("./PawAuction.sol")
>>>>>>> 70733ce65cdc2daab70eefe5f517706fecdf48f3

module.exports = async function(deployer) {
  await deployer.deploy(CryptoPaws);
  await deployer.deploy(PawAuctionFactory);
<<<<<<< HEAD
  await deployer.deploy(PawAuction);

=======
  await deployer.deploY(PawAuction);
>>>>>>> 70733ce65cdc2daab70eefe5f517706fecdf48f3
};



// Possible additions necessary for the auction contract

// var AuctionFactory = artifacts.require("./PawAuctionFactory.sol");
// var Auction = artifacts.require("./PawAuction.sol");

module.exports = function(deployer) {
  // deployer.deploy(ConvertLib);
  // deployer.autolink();
  // deployer.deploy(MetaCoin);
  deployer.deploy(AuctionFactory);
  // deployer.deploy(Auction);
};
