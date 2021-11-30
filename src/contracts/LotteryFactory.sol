//SPDX-License-Identifier: MIT
pragma solidity  >=0.8.0;

import "./CryptoPaws.sol";
import "./Lottery.sol";

contract LotteryFactory {
    CryptoPaws cp;
    
    uint256[] public lotteriesarray;
    mapping(uint256 => address) public lotteries;
    mapping(uint256 => address) public owners;
    mapping(uint256 => bool) public active;
    uint256 public totalactive;
    uint256 public lottoPrice = 8000000000000000 wei;

    constructor(address _pawaddress) payable {
        cp = CryptoPaws(_pawaddress);
        totalactive = 0;
    } 

    function createLottery(uint256 _id, uint256 _enterPrice) public payable {
        bool exist = cp.getTokenExists(_id);
        require(exist, "Token not found");
        require(!(active[_id]), "Lottery is already active");
        address owner = cp.getTokenOwner(_id);
        require(msg.sender == owner, "Can't lottery a token you don't own");
        require(msg.value >= lottoPrice, "You must pay the price to create an auction");
        address payable add = payable(msg.sender);
        Lottery lotto = new Lottery(_id, _enterPrice, add);
        cp.lottoTransferTo(_id, address(lotto));
        owners[_id] = msg.sender;
        lotteries[_id] = address(lotto);
        active[_id] = true;
        lotteriesarray.push(_id);
        totalactive = totalactive + 1;
    }

    function claim(uint256 _id) public {
        address cont = lotteries[_id];
        Lottery lottoCont = Lottery(cont);
        address Lwinner = lottoCont.winner();
        require(msg.sender == Lwinner, "You are not the winner");
        cp.lottoTransferFrom(_id, cont, Lwinner);
        for (uint256 i = 0; i < lotteriesarray.length; i++) {
            if (lotteriesarray[i] == _id) {
                lotteriesarray[i] == lotteriesarray[lotteriesarray.length-1];
                lotteriesarray.pop();
            }
        }
        active[_id] = false;
        totalactive = totalactive - 1;
    }
}