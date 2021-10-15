# CryptoPaw NFT Marketplace
<i>A Fork of the CryptoBoys NFT marketplace DApp where users mint ERC721 implemented NFTs. See: [Main Project](https://github.com/devpavan04/cryptoboys-nft-marketplace)</i>
#
### Quick Testing Guide
Use after installation.

I highly recommend installing and using ganache-cli

### Hardcode the Mnemonic
Perm set the mnemonic so you dont have to reset your metamask. (The example mnemonic would be not secure; don't use it on a public blockchain)
```
ganache-cli --port 7545 --mnemonic "thought lion icon outdoor human west tongue brief grape glory network earth"
```
### Compile, Migrate and Start the DApp
Open another terminal and use it to compile and migrate the contracts and then start the DApp
```
truffle compile
```
```
truffle migrate
```
```
npm start
```
### Initially Run the DApp Locally
#### Install truffle and ganache-cli
```
npm install -g truffle
```
```
npm i ganache-cli
```
#### Open new terminal window and clone this repository
```
git clone https://github.com/Yorzaren/cryptoboys-NFT-marketplace.git
```
#### Install dependencies
```
cd cryptoboys-NFT-marketplace
npm install
```
#### Compile smart contract
```
truffle compile
```
#### Deploy smart contract to ganache
```
truffle migrate
```
#### Start DApp
```
npm start
```
- Open metamask browser wallet and connect network to Localhost 7545.
- Import accounts from ganache-cli into the metamask browser wallet to make transactions on the DApp.
