// This sample PawAuctionFactory contract will be an example and template only contract.
// Destiny Graham and Tyler Landau will be collaborating on this contract with additional tutelage
// from James Tackett and Faith Nice

pragma solidity >=0.8.0;
pragma abicoder v2;

import "./CryptoPaws.sol";
import "./PawAuction.sol";
import './ProxyFactory.sol';

contract PawAuctionFactory is ProxyFactory {
    CryptoPaws cp;
    address public implementationContract;

    uint256[] public auctionArray;
    mapping(uint256 => address) public auctions;
    mapping(uint256 => address) public owners;
    mapping(uint256 => bool) public active;
    uint256 public totalactive;
    uint256 public auctionPrice = 8000000000000000 wei;

    constructor(address _pawaddress, address _implementationcontract) {
        implementationContract = _implementationcontract;
        cp = CryptoPaws(_pawaddress);
        totalactive = 0;
    }

    function createAuction(uint256 _id, uint256 _enterPrice) public payable {
        bool exist = cp.getTokenExists(_id);
        require(exist, "Token not found");
        address owner = cp.getTokenOwner(_id);
        require(msg.sender == owner, "Can't sell a token you don't own");
        require(msg.value >= auctionPrice, "You must pay the price to create an auction");
        bytes memory payload = abi.encodeWithSignature("initialize(uint256, uint256, address)", _id, _enterPrice, msg.sender);
        address auction = deployMinimal(implementationContract, payload);
        cp.auctionTransferTo(_id, auction);
        owners[_id] = msg.sender;
        auctions[_id] = auction;
        active[_id] = true;
        auctionArray.push(_id);
    }

    function claim(uint256 _id) public {
        address cont = auctions[_id];
        PawAuction auctionCont = PawAuction(cont);
        address Awinner = auctionCont.highestBidder();
        require(msg.sender == Awinner, "You are not the highest bidder");
        cp.auctionTransferFrom(_id, cont, Awinner);
        for (uint256 i = 0; i < auctionArray.length; i++) {
            if (auctionArray[i] == _id) {
                auctionArray[i] == auctionArray[auctionArray.length-1];
                auctionArray.pop();
            }
        }
        active[_id] = false;
    }
}