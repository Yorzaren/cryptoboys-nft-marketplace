//SPDX-License-Identifier: MIT
pragma solidity  >=0.8.0;

import "./CryptoPaws.sol";
import "./Lottery.sol";
import './ProxyFactory.sol';

contract LotteryFactory is ProxyFactory {
    CryptoPaws cp;
    address public implementationContract;
    
    uint256[] public lotteriesarray;
    mapping(uint256 => address) public lotteries;
    mapping(uint256 => address) public owners;
    mapping(uint256 => bool) public active;
    uint256 public totalactive;
    uint256 public lottoPrice = 8000000000000000 wei;

    constructor(address _pawaddress, address _implementationcontract) {
        implementationContract = _implementationcontract;
        cp = CryptoPaws(_pawaddress);
        totalactive = 0;
    } 

    function createLottery(uint256 _id, uint256 _enterPrice) public payable {
        bool exist = cp.getTokenExists(_id);
        require(exist, "Token not found");
        address owner = cp.getTokenOwner(_id);
        require(msg.sender == owner, "Can't lottery a token you don't own");
        require(msg.value >= lottoPrice, "You must pay the price to create an auction");
        bytes memory payload = abi.encodeWithSignature("initialize(uint256, uint256, address)", _id, _enterPrice, msg.sender);
        address lotto = deployMinimal(implementationContract, payload);
        cp.lottoTransferTo(_id, lotto);
        owners[_id] = msg.sender;
        lotteries[_id] = lotto;
        active[_id] = true;
        lotteriesarray.push(_id);
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
    }
}