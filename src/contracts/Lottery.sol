//SPDX-License-Identifier: MIT
pragma solidity  >=0.8.0;
pragma abicoder v2;

import '@openzeppelin/upgrades/contracts/Initializable.sol';

contract Lottery is Initializable {
    uint256 public tokenId;
    address public owner;
    uint256 public entryPrice;
    mapping(address => bool) private entered;
    address[] public entrants;
    uint256 private key;
    address public winner;
    bool public finished;


    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    function initialize(uint256 _id, uint256 _price, address _owner) public Initializer {
        tokenId = _id;
        entryPrice = _price;
        owner = _owner;
        key = 0;
        winner = 0x0;
        finished = false;
    }

    function enterLottery() payable {
        require(!finished, "Lottery is over");
        require(!entered[msg.sender], "You have already entered");
        require(msg.value >= entryPrice, "Must pay full entry price");
        entered[msg.sender] = true;
        entrants.push(msg.sender);
    }

    function endLottery() public onlyOwner {
        uint256 rand = uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, entrants)));
        winner = entrants[rand % entrants.length];
        finished = true;
        owner.transfer(address(this).balance);
    }
}