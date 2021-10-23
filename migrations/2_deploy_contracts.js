const CryptoPaws = artifacts.require("./CryptoPaws");
var PawAuctionFactory = artifacts.require("./PawAuctionFactory.sol");
var PawAuction = artifacts.require("./PawAuction.sol")

module.exports = async function(deployer) {
  await deployer.deploy(CryptoPaws);
  await deployer.deploy(PawAuctionFactory);
  await deployer.deploY(PawAuction);
};



// Possible additions necessary for the auction contract

/*
// var AuctionFactory = artifacts.require("./PawAuctionFactory.sol");
// var Auction = artifacts.require("./PawAuction.sol");

module.exports = function(deployer) {
  // deployer.deploy(ConvertLib);
  // deployer.autolink();
  // deployer.deploy(MetaCoin);
  deployer.deploy(AuctionFactory);
  // deployer.deploy(Auction);
};
/*
