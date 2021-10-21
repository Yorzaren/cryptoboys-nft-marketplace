const Migrations = artifacts.require("Migrations"); // Noticed in GitHub that this is listed as ./Migrations.sol
                                                    // Is this no longer necessary?

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
