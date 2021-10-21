const CryptoBoys = artifacts.require("CryptoBoys");

module.exports = async function(deployer) {
  await deployer.deploy(CryptoBoys);
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
