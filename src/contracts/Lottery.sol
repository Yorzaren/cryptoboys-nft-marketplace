// File: @openzeppelin\upgrades\contracts\Initializable.sol

pragma solidity >=0.4.24;


/**
 * @title Initializable
 *
 * @dev Helper contract to support initializer functions. To use it, replace
 * the constructor with a function that has the `initializer` modifier.
 * WARNING: Unlike constructors, initializer functions must be manually
 * invoked. This applies both to deploying an Initializable contract, as well
 * as extending an Initializable contract via inheritance.
 * WARNING: When used with inheritance, manual care must be taken to not invoke
 * a parent initializer twice, or ensure that all initializers are idempotent,
 * because this is not dealt with automatically as with constructors.
 */
contract Initializable {

  /**
   * @dev Indicates that the contract has been initialized.
   */
  bool private initialized;

  /**
   * @dev Indicates that the contract is in the process of being initialized.
   */
  bool private initializing;

  /**
   * @dev Modifier to use in the initializer function of a contract.
   */
  modifier initializer() {
    require(initializing || isConstructor() || !initialized, "Contract instance has already been initialized");

    bool isTopLevelCall = !initializing;
    if (isTopLevelCall) {
      initializing = true;
      initialized = true;
    }

    _;

    if (isTopLevelCall) {
      initializing = false;
    }
  }

  /// @dev Returns true if and only if the function is running in the constructor
  function isConstructor() private view returns (bool) {
    // extcodesize checks the size of the code stored in an address, and
    // address returns the current address. Since the code is still not
    // deployed when running a constructor, any checks on its code size will
    // yield zero, making it an effective way to detect if a contract is
    // under construction or not.
    address self = address(this);
    uint256 cs;
    assembly { cs := extcodesize(self) }
    return cs == 0;
  }

  // Reserved storage space to allow for layout changes in the future.
  uint256[50] private ______gap;
}

// File: src\contracts\Lottery.sol

//SPDX-License-Identifier: MIT
pragma solidity  >=0.8.0;
pragma abicoder v2;

contract Lottery is Initializable {
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

    function initialize(uint256 _id, uint256 _price, address payable _owner) public initializer {
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
        winner = entrants[rand % entrants.length];
        finished = true;
        owner.transfer(address(this).balance);
    }
}