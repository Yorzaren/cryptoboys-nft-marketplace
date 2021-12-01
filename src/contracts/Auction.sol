//SPDX-License-Identifier: MIT

pragma solidity >=0.8.0;
pragma abicoder v2;

import "./AuctionFactory.sol";

contract Auction{
    uint256 public tokenId;
    address payable public owner;
    mapping(address => uint256) bids;
    address public highestbidder;
    uint256 public highestbid;
    uint256 public highestbinding;
    address[] public bidders;
    uint256 public totalbids;
    uint256 public bindincrement;
    address public factory;
    bool public finished;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor(uint256 _id, uint256 _inc, address payable _owner) {
        factory = msg.sender;
        tokenId = _id;
        owner = _owner;
        highestbid = 0;
        highestbinding = 0;
        totalbids = 0;
        bindincrement = _inc;
    }

    function placeBid() public payable {
        require(msg.value > highestbinding, "Must bet higher than highest binding bet");
        require(msg.sender != owner, "Cannot bet on own auction");
        bids[msg.sender] = msg.value;
        if (bids[msg.sender] == 0) {
            bidders.push(msg.sender);
        }
        if (msg.value > highestbid) {
            highestbinding = highestbinding + bindincrement;
            highestbid = msg.value;
            highestbidder = msg.sender;
        } else {
            highestbinding = highestbinding + bindincrement;
        }
    }

    function endAuction() public onlyOwner {
        finished = true;
        AuctionFactory fact = AuctionFactory(factory);
        fact.claim(tokenId, highestbidder);
        owner.transfer(highestbinding);

        for (uint256 i = 0; i < bidders.length; i++) {
            if (bidders[i] == highestbidder) {
                bidders[i].transfer(highestbid - highestbinding);
            } else {
                bidders[i].transfer(bids[bidders[i]]);
            }
        }
    }
}