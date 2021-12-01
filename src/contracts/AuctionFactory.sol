//SPDX-License-Identifier: MIT
pragma solidity  >=0.8.0;

import "./CryptoPaws.sol";
import "./Auction.sol";

contract AuctionFactory {
    CryptoPaws cp;

    uint256[] public auctionarray;
    mapping(uint256 => address) public auctions;
    mapping(uint256 => address) public owners;
    mapping(uint256 => bool) public active;
    uint256 public totalactive;
    uint256 public auctionPrice = 8000000000000000 wei;
    uint256 public default_inc = 8000000000000000 wei;

    constructor(address _pawaddress) payable {
        cp = CryptoPaws(_pawaddress);
        totalactive = 0;
    }

    function createAuction(uint256 _id) public payable {
        bool exist = cp.getTokenExists(_id);
        require(exist, "Token not found");
        require(!(active[_id]), "Auction already active");
        address owner = cp.getTokenOwner(_id);
        require(msg.sender == owner, "Can't auction what you don't own");
        require(msg.value >= auctionPrice, "You must pay the price to create an auction");
        address payable add = payable(msg.sender);
        Auction auct = new Auction(_id, default_inc, add);
        cp.auctionTransferTo(_id, address(auct));
        owners[_id] = msg.sender;
        auctions[_id] = address(auct);
        active[_id] = true;
        auctionarray.push(_id);
        totalactive = totalactive + 1;
    }

    function claim(uint256 _id, address _winner) public {
        address cont = auctions[_id];
        cp.auctionTransferFrom(_id, cont, _winner);
        active[_id] = false;
        totalactive = totalactive - 1;
        for (uint256 i = 0; i < auctionarray.length; i++) {
            if (auctionarray[i] == _id) {
                auctionarray[i] == auctionarray[auctionarray.length-1];
                auctionarray.pop();
            }
        }
    }
}