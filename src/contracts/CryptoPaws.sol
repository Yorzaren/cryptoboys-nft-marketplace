//SPDX-License-Identifier: MIT
pragma solidity  >=0.8.0;
pragma abicoder v2;

import "./ERC721.sol";

contract CryptoPaws is ERC721 {

    // name of paw collection for contract
    string public collectionName;
    // symbol for paw tokens
    string public collectionNameSymbol;
    // total number of paws
    uint256 public pawCounter;

    //set a default mint price
    uint256 public mintPrice = 4000000000000000 wei;

    // define paw struct
    struct CryptoPaw {
        //unique tokenid
        uint256 tokenId;

        string tokenName;
        //string that specifies unique color combination
        string creationStr;
        //string that holds URI that points to image file on ipfs
        string tokenURI;
        //address of the account that minted the token
        address payable mintedBy;
        //address of current token owner
        address payable currentOwner;
        //set price of token
        uint256 price;
        //tracks number of times token changed ownership
        uint256 timesTransferred;
        bool forSale;
    }

    // map tokenId to a Paw
    mapping(uint256 => CryptoPaw) public allPaws;

    mapping(string => bool) public nameExists;
    // check if a selector number already exists
    mapping(string => bool) public creationStrs;
    // check if a URI exists
    mapping(string => bool) public tokenURIExists;

    // constructor that creates the ERC721
    constructor() ERC721("Original CryptoPaws Collection","PAW") {
        collectionName = name();
        collectionNameSymbol = symbol();
    }

    // minting function for new PAW
    function mintPaw(string memory _name, string memory _creationStr, uint _price, string memory _tokenURI) external payable{
        //make sure address exists and isnt a 0 address
        require(msg.sender != address(0), "Non-zero addresses only");
        //make sure the mint price is paid
        require(msg.value >= mintPrice, "You must pay the actual mint price");
        //increment the collection counter
        pawCounter++;
        //pawCounter is the tokenid in this case
        require(!_exists(pawCounter), "collection counter not found");
        //checks that color combo does not already exist
        require(!creationStrs[_creationStr], "this paw print already exists");
        //checks that uri is new
        require(!tokenURIExists[_tokenURI], "the URI already exists");

        //mint time baby
        _mint(msg.sender, pawCounter);
        //set the URI for the token
        _setTokenURI(pawCounter, _tokenURI);
        
        //add URI to URI list
        tokenURIExists[_tokenURI] = true;
        
        
        CryptoPaw memory newCryptoPaw = CryptoPaw(
            pawCounter,
            _name,
            _creationStr,
            _tokenURI,
            payable(msg.sender),
            payable(msg.sender),
            _price,
            0,
            false);

            allPaws[pawCounter] = newCryptoPaw;
    }

    //get the owner of a token
    function getTokenOwner(uint256 _tokenId) public view returns(address) {
        address tokenOwner = ownerOf(_tokenId);
        return tokenOwner;
    }

    //get token image
    function getTokenImg(uint256 _tokenId) public view returns(string memory) {
        string memory tokenImg = tokenURI(_tokenId);
        return tokenImg;
    }

    //get total number of tokens
    function getTotalNumberMinted() public view returns(uint256) {
        uint256 totalNumberOfTokensMinted = totalSupply();
        return totalNumberOfTokensMinted;
    }

    //get number of tokens owned by an address
    function getTotalNumberOwnedByAddress(address _owner) public view returns(uint256) {
        uint totalNumberOfTokensOwned = balanceOf(_owner);
        return totalNumberOfTokensOwned;
    }

    //check if token exists
    function getTokenExists(uint256 _tokenId) public view returns(bool) {
        bool tokenExists = _exists(_tokenId);
        return tokenExists;
    }

    function buyToken(uint256 _tokenId) public payable {
        //check for nonzero account
        require(msg.sender != address(0), "non-zero addresses only");
        // check if tokenId exists
        require(_exists(_tokenId), "this paw does not exist");

        //get token owner's address
        address payable tokenOwner = payable(ownerOf(_tokenId));

        //check if token owner is nonzero
        require(tokenOwner != address(0), "non-zero addresses only");
        //check that buyer is not token owner
        require(tokenOwner != msg.sender, "you can't buy your own token");


        //verify price sent is equal to or more than asking price
        require(msg.value >= allPaws[_tokenId].price, "please send the correct amount of eth");
        //verify paw is for sale
        require(allPaws[_tokenId].forSale, "this paw is not for sale");

        //transfer token ownership
        _transfer(tokenOwner, msg.sender, _tokenId);

        //send previous owner the payment
        tokenOwner.transfer(msg.value);

        //set new owner
        allPaws[_tokenId].currentOwner = payable(msg.sender);
        //increase transfer counter
        allPaws[_tokenId].timesTransferred++;
    }

    function changeTokenPrice(uint256 _tokenId, uint256 _newPrice) public {
        //require caller is not zero address
        require(msg.sender != address(0), "non-zero addresses only");
        //require token exists
        require(_exists(_tokenId), "token does not exist");
        
        //get token owner
        address tokenOwner = ownerOf(_tokenId);
        //check sender is owner
        require(tokenOwner == msg.sender, "you cannot edit a token that is not yours");

        //update price
        allPaws[_tokenId].price = _newPrice;
    }

    function toggleForSale(uint256 _tokenId) public {
        //address 0 safeguard
        require(msg.sender != address(0), "non-zero addresses only");
        //require token exists
        require(_exists(_tokenId), "token does not exist");

        //get token owner
        address tokenOwner = ownerOf(_tokenId);
        //check that owner is sender
        require(tokenOwner == msg.sender, "you cannot edit a token that is not yours");
        
        //toggle the sale state
        if(allPaws[_tokenId].forSale) {
            allPaws[_tokenId].forSale = false;
        } else {
            allPaws[_tokenId].forSale = true;
        }
    }
	
	function bulkMint(string[] memory _tokenURI) external payable{
		// Testing -- Create 20 Rare Paws
		string[20] memory arrayOfBulkNames = ["Limited CryptoPaw 1 of 20", "Limited CryptoPaw 2 of 20", "Limited CryptoPaw 3 of 20", "Limited CryptoPaw 4 of 20", "Limited CryptoPaw 5 of 20", "Limited CryptoPaw 6 of 20", "Limited CryptoPaw 7 of 20", "Limited CryptoPaw 8 of 20", "Limited CryptoPaw 9 of 20", "Limited CryptoPaw 10 of 20", "Limited CryptoPaw 11 of 20", "Limited CryptoPaw 12 of 20", "Limited CryptoPaw 13 of 20", "Limited CryptoPaw 14 of 20", "Limited CryptoPaw 15 of 20", "Limited CryptoPaw 16 of 20", "Limited CryptoPaw 17 of 20", "Limited CryptoPaw 18 of 20", "Limited CryptoPaw 19 of 20", "Limited CryptoPaw 20 of 20"];
		
		string[20] memory arrayOfBulkColors = ["#daa520#76276c#b1af1c#ebfd00#1c4de#530ee1#398142#d75777#f51a19#cf4a9#a89851#12aefc", "#daa520#be530f#ffca1f#bb4a2#b0fa8#9cc016#1bca0#ff91ee#e81f31#8786c3#9b91ef#d0c9ac", "#daa520#2de31b#4ae7e#e923d1#7248b7#c130e0#5a977e#cc5f82#8b1aee#5397fd#dc6c06#5e5c5f", "#daa520#d28220#f7aef7#eccdf9#16dd8c#fc164e#60ba6c#6458d7#62e85e#8e9b85#d25ed4#391d2a", "#daa520#b93cd7#278f81#9bfea7#557f55#a25f96#3e274e#4d374#72d658#4f98bf#4e52c7#f203cc", "#daa520#ba4a87#ef1b7d#8fd4a0#6d506b#7e5895#fb9ca9#4624da#164f40#59fb23#12afe4#91288b", "#daa520#52a501#d56ea6#171951#a7978f#6d9da2#e4a28d#b3ec02#85f2ca#2ebad0#89b414#720d06", "#daa520#2ec4dc#852557#ddd64d#5c386f#994c0c#94ba64#745d73#292280#cfb5d9#287402#3afc46", "#daa520#5a0638#9f3780#c09d36#87def7#460e9f#6c1ae2#feff04#fa921b#7807de#33cfa6#24bec3", "#daa520#aa5d70#37bffe#3058fa#cece03#ed492a#ea4628#f63d5d#8618a8#93a510#a96078#f2f2e0", "#daa520#feddcc#65b28f#1b18bc#121d54#a5f50f#b2ddb#b7c0b6#97d59e#67956f#3d99f5#cc5981", "#daa520#970b08#b585e9#960696#5f4cd#a4bf56#e36c07#9cecd9#9e1d4c#6afecf#62edc2#f87384", "#daa520#420c35#26f503#b58a1a#7b0a67#ee15a3#ac0bf8#fcf5b1#e73962#7471d#969a4e#9a71ca", "#daa520#8a2b9d#f98acb#6bf37f#3f7e9e#6ca6fa#ea23ad#36c1ef#278fb9#a5d218#35de18#1110a6", "#daa520#cbf4cb#f706f7#d421b0#4f028d#cbc6#da6138#538c3#7236cc#99f779#aa8af6#dec561", "#daa520#96f58a#1cf17a#f830c7#8daa7c#1d4987#70990#3597d3#6ef3be#21daf9#6516ca#f1de17", "#daa520#9980ca#a6d5b1#b62dac#38e952#3092e4#6c223f#c3a910#779852#cb697a#914712#1cb470", "#daa520#111f7e#7a8292#2003fe#d5239#a8545a#b10d75#e04d9e#67dffc#ef627#d1f31a#dafb3b", "#daa520#ace3#aa9bb5#3672d8#c74f95#cbff69#6350ae#b4346f#c1e828#30cead#99ae8c#65ee53", "#daa520#7c6500#d8b310#ebb65e#a21ad9#ff968c#635f74#b226b6#af0800#bc0eee#c2c4ce#71be1f"];
		
		uint d_price = 100;
		
		for (uint i=0; i<20; i++) {
			//make sure address exists and isnt a 0 address
			require(msg.sender != address(0), "Non-zero addresses only");
			// Because this is special disable the mint price...
			//make sure the mint price is paid
			//require(msg.value >= mintPrice, "You must pay the actual mint price");
			//increment the collection counter
			pawCounter++;
			//pawCounter is the tokenid in this case
			require(!_exists(pawCounter), "collection counter not found");
			//checks that color combo does not already exist
			require(!creationStrs[arrayOfBulkColors[i]], "this paw print already exists");
			//checks that uri is new
			require(!tokenURIExists[_tokenURI[i]], "the URI already exists");

			//mint time baby
			_mint(msg.sender, pawCounter);
			//set the URI for the token
			_setTokenURI(pawCounter, _tokenURI[i]);
			
			//add URI to URI list
			tokenURIExists[_tokenURI[i]] = true;
			
			
			CryptoPaw memory newCryptoPaw = CryptoPaw(
				pawCounter,
				arrayOfBulkNames[i],
				arrayOfBulkColors[i],
				_tokenURI[i],
				payable(msg.sender),
				payable(msg.sender),
				d_price,
				0,
				false);

				allPaws[pawCounter] = newCryptoPaw;
		}
    }
}