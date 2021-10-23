// This sample PawAuctionFactory contract will be an example and template only contract.
// Destiny Graham and Tyler Landau will be collaborating on this contract with additional tutelage
// from James Tackett and Faith Nice

pragma solidity >=0.8.0;
pragma abicoder v2;

import { PawAuction } from './PawAuction.sol';

contract PawAuctionFactory {
    address[] public auctions;

    event AuctionCreated(address auctionContract, address owner, uint numAuctions, address[] allAuctions);

    function AuctionFactory() {
    }

    function createAuction(uint bidIncrement, uint startBlock, uint endBlock, string ipfsHash) {
        Auction newAuction = new Auction(msg.sender, bidIncrement, startBlock, endBlock, ipfsHash);
        auctions.push(newAuction);

        AuctionCreated(newAuction, msg.sender, auctions.length, auctions);
    }

    function allAuctions() constant returns (address[]) {
        return auctions;
    }
}