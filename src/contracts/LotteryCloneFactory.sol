//SPDX-License-Identifier: MIT
pragma solidity  >=0.8.0;

import "./CryptoPaws.sol";
import "./Lottery.sol";
import './ProxyFactory.sol';

contract LotteryFactory is ProxyFactory {
    CryptoPaws cp;
    address public implementationContract;
    
    mapping(uint256 => address) public lotteries;
    mapping(address => uint256) public owners;

    constructor(address _pawaddress, address _implementationcontract) public {
        implementationContract = _implementationcontract;
        cp = CryptoPaws(_pawaddress);
    } 

    function createLottery(uint256 _id, uint256 _enterPrice) public payable {
        bool exist = cp.getTokenExists(_id);
        require(exist, "Token not found");
        address owner = cp.getTokenOwner(_id);
        require(msg.sender == owner, "Can't lottery a token you don't own");
        require(msg.value >= 8000000000000000 wei, "You must pay the price to create an auction");
        bytes memory payload = abi.encodeWithSignature("initialize(uint256, uint256, address)", _id, _enterPrice, msg.sender);
        address lotto = deployMinimal(implementationContract, payload);
        cp.lottoTransferTo(_id, lotto);
        owners[msg.sender] = _id;
        lotteries[_id] = lotto;
    }

    function claim(uint256 _id) public {
        address cont = lotteries[_id];
        Lottery lottoCont = Lottery(cont);
        address Lwinner = lottoCont.winner();
        require(msg.sender == Lwinner, "You are not the winner");
        cp.lottoTransferFrom(_id, cont, Lwinner);

    }
}