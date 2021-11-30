// File: src\contracts\Lottery.sol

//SPDX-License-Identifier: MIT
pragma solidity  >=0.8.0;
pragma abicoder v2;

contract Lottery{
    uint256 public tokenId;
    address payable public owner;
    uint256 public entryPrice;
    mapping(address => bool) private entered;
    address[] public entrants;
    uint256 private key;
    address public winner;
    uint256 public entrantscount;
    bool public finished;


    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor(uint256 _id, uint256 _price, address payable _owner) {
        tokenId = _id;
        entryPrice = _price;
        owner = _owner;
        key = 0;
        winner = address(0);
        finished = false;
        entrantscount = 0;
    }

    function enterLottery() public payable {
        require(!finished, "Lottery is over");
        require(!entered[msg.sender], "You have already entered");
        require(msg.value >= entryPrice, "Must pay full entry price");
        entered[msg.sender] = true;
        entrants.push(msg.sender);
        entrantscount += 1;
    }

    function endLottery() public onlyOwner {
        uint256 rand = uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, entrants)));
        winner = entrants[rand % entrantscount];
        finished = true;
        owner.transfer(address(this).balance);
    }
}