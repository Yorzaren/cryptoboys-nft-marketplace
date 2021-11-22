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
		
		string[20] memory arrayOfBulkColors = ["#daa520#7e3909#fa8813#3b2d3c#8dfcc7#caf4b2#245985#16b5cf#8bb47f#396fbf#a1c33d#94d39a", "#daa520#776ff5#bfda1b#315230#a06326#63fe#eaba1c#ed4405#cbda48#36ec36#edc6e4#361200", "#daa520#ade1e#bfbf45#9e2081#25c3b8#960997#22fe10#7e10dc#e40830#40d018#b11f8#65d0f8", "#daa520#541891#89cb51#6c21a4#cc5c0a#8de62#6e2b69#850329#5d018e#df88b0#e27eef#154600", "#daa520#63b1ef#e07133#1bcd46#9407e0#bb48cb#d7a178#205b34#8f1d56#206661#37d736#720725", "#daa520#f28cda#f886a4#000000#fdde42#2c9cf2#f95618#8ac1d4#b47aa3#105854#121d6a#d7bf5", "#daa520#1b4d46#40cff0#825fe2#f6e753#ad10eb#fb7cfd#59ac62#499fe1#165ac8#91a0fa#cf118f", "#daa520#9b56#8992e7#9f0004#6a8359#185587#ed943a#497a31#797527#f81e1b#612044#fe9e36", "#daa520#13a124#a62908#b5c7b2#2188a2#e508a7#79d59c#2d903e#ecc430#78847e#d09275#3157ef", "#daa520#b96b64#396c90#04c45a#fc4668#5afc5f#65e9f9#41df38#b7ac8d#5d3121#aceca4#536c4c", "#daa520#d26722#b67abe#925b27#777ade#49a122#5e885c#af9994#1e28ca#e186eb#a9396b#c66ef1", "#daa520#84aa02#9391fc#9fcdcf#8b1e42#bc4588#49451c#93cb#8ac55e#d1f58b#ef73b9#7c8491", "#daa520#56ba94#f367e3#1eac92#1ad7b0#1b9e86#f06df7#dae34e#eb1521#251815#6426b7#3f304f", "#daa520#9204a0#c4bd1d#89feb4#9e3444#d81158#4cd76d#5f385d#4ccfb9#97da21#3b93c9#bb6f5e", "#daa520#5a0371#000000#e5bcad#429689#4c110b#e9cada#30ec52#f0dc5#3c982b#da38b1#d206a1", "#daa520#21fbbb#c86f0b#828147#be7406#30c0a2#ec01a#71f6e3#a847bd#7b32d6#aa3783#cb949c", "#daa520#92e5#110c98#88e341#39f511#1a275b#175cd4#4aa403#7f489c#5a3c10#4b296d#bf0292", "#daa520#c422bb#ab41c6#15fb5b#fdcbda#ea11a8#e07e28#9fb5ad#54d63c#d47d6e#d2f72#a2b96a", "#daa520#669b7b#10cec0#cd019a#36df4c#85ef43#ddcc4e#3b76f0#3d7d90#8fe803#dd981b#26d70c", "#daa520#9d58ec#7a7a46#944917#39466b#b3258a#7c3ce4#317a3b#f6f675#e0b0ff#4f54d2#e905ef"];
		
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