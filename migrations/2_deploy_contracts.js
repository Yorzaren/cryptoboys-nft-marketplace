const CryptoPaws = artifacts.require("CryptoPaws");

module.exports = async function(deployer) {
  await deployer.deploy(CryptoPaws);
};
