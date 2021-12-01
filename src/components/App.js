import React, { Component } from "react";
import { HashRouter, Route } from "react-router-dom";
import "./App.css";
import Web3 from "web3";
import CryptoPaws from "../abis/CryptoPaws.json";
import LotteryFactory from "../abis/LotteryFactory.json";
import AuctionFactory from "../abis/AuctionFactory.json";

import FormAndPreview from "../components/FormAndPreview/FormAndPreview";
import AllCryptoPaws from "./AllCryptoPaws/AllCryptoPaws";
import AccountDetails from "./AccountDetails/AccountDetails";
import ContractNotDeployed from "./ContractNotDeployed/ContractNotDeployed";
import ConnectToMetamask from "./ConnectMetamask/ConnectToMetamask";
import Loading from "./Loading/Loading";
import Navbar from "./Navbar/Navbar";
import MyCryptoPaws from "./MyCryptoPaws/MyCryptoPaws";
import Queries from "./Queries/Queries";
import Lotteries from "./Lottery/Lotteries";
import Auctions from "./Auctions/Auctions";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountAddress: "",
      accountBalance: "",
      FactoryContract: null,
      cryptoPawsContract: null,
      auctionContract: null,
      cryptoPawsCount: 0,
      cryptoPaws: [],
      loading: true,
      metamaskConnected: false,
      contractDetected: false,
      totalTokensMinted: 0,
      totalTokensOwnedByAccount: 0,
      nameIsUsed: false,
      colorIsUsed: false,
      colorsUsed: [],
      lastMintTime: null,
	  startTime: 0,
    };
  }

  componentWillMount = async () => {
    await this.loadWeb3();
    await this.loadBlockchainData();
    await this.setMintBtnTimer();
	await this.checkIfPresaleActive();
  };

  setMintBtnTimer = () => {
    const mintBtn = document.getElementById("mintBtn");
    if (mintBtn !== undefined && mintBtn !== null) {
      this.setState({
        lastMintTime: localStorage.getItem(this.state.accountAddress),
      });
      this.state.lastMintTime === undefined || this.state.lastMintTime === null
        ? (mintBtn.innerHTML = "Mint My CryptoPaw")
        : this.checkIfCanMint(parseInt(this.state.lastMintTime));
    }
  };

  checkIfCanMint = (lastMintTime) => {
    const mintBtn = document.getElementById("mintBtn");
    const timeGap = 300000; //5min in milliseconds
    const countDownTime = lastMintTime + timeGap;
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = countDownTime - now;
      if (diff < 0) {
        mintBtn.removeAttribute("disabled");
        mintBtn.innerHTML = "Mint My CryptoPaw";
        localStorage.removeItem(this.state.accountAddress);
        clearInterval(interval);
      } else {
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        mintBtn.setAttribute("disabled", true);
        mintBtn.innerHTML = `Next mint in ${minutes}m ${seconds}s`;
      }
    }, 1000);
  };

  loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      this.setState({ metamaskConnected: false });
    } else {
      this.setState({ metamaskConnected: true });
      this.setState({ loading: true });
      this.setState({ accountAddress: accounts[0] });
      let accountBalance = await web3.eth.getBalance(accounts[0]);
      accountBalance = web3.utils.fromWei(accountBalance, "Ether");
      this.setState({ accountBalance });
      this.setState({ loading: false });
      const networkId = await web3.eth.net.getId();
      const networkData = CryptoPaws.networks[networkId];
      const factoryNetworkData = LotteryFactory.networks[networkId];
      const auctfactoryData = AuctionFactory.networks[networkId];
      if (networkData && factoryNetworkData && auctfactoryData) {
        this.setState({ loading: true });
        const cryptoPawsContract = web3.eth.Contract(
          CryptoPaws.abi,
          networkData.address
        );
        const FactoryContract = web3.eth.Contract(
          LotteryFactory.abi,
          factoryNetworkData.address
        );
        const auctionContract = web3.eth.Contract(
          AuctionFactory.abi,
          auctfactoryData.address
        );
        this.setState({ auctionContract });
        this.setState({ FactoryContract });
        this.setState({ cryptoPawsContract });
        this.setState({ contractDetected: true });
        const cryptoPawsCount = await cryptoPawsContract.methods
          .pawCounter()
          .call();
        this.setState({ cryptoPawsCount });
        let pawsx = [];
        for (var i = 1; i <= cryptoPawsCount; i++) {
          const cryptoPaw = await cryptoPawsContract.methods
            .allPaws(i)
            .call();
          console.log(cryptoPaw)
          pawsx = [...pawsx, cryptoPaw];
        }
        this.setState({
          cryptoPaws: pawsx,
        });
        let totalTokensMinted = await cryptoPawsContract.methods
          .getTotalNumberMinted()
          .call();
        totalTokensMinted = totalTokensMinted.toNumber();
        this.setState({ totalTokensMinted });
		let startTime = await cryptoPawsContract.methods
          .getStartTime()
          .call();
        startTime = startTime.toNumber();
        this.setState({ startTime });
        let totalTokensOwnedByAccount = await cryptoPawsContract.methods
          .getTotalNumberOwnedByAddress(this.state.accountAddress)
          .call();
        totalTokensOwnedByAccount = totalTokensOwnedByAccount.toNumber();
        this.setState({ totalTokensOwnedByAccount });
        this.setState({ loading: false });
      } else {
        this.setState({ contractDetected: false });
      }
    }
  };

  connectToMetamask = async () => {
    await window.ethereum.enable();
    this.setState({ metamaskConnected: true });
    window.location.reload();
  };
  
  // If the presale is active show the presale button otherwise, hide it and display the regular button.
  checkIfPresaleActive = async () => {
	const presaleMint = document.getElementById("presaleMint");
	const mintBtn = document.getElementById("mintBtn");
	if (mintBtn !== undefined && mintBtn !== null) {
		var theContractStarted = this.state.startTime*1000; // This come from the contract; Times 1000 to make it a modern date.
		// This is related to the contract which will fail if people call it after the presale ends.
		// SEE: CryptoPaws.sol -- presalePaw()
		var untilEndInMinutes = (5*60)*1000; // Sale Lasts for 5 minutes; 
		var saleEndsAt = theContractStarted+untilEndInMinutes;
		console.log("Presale Started at: "+theContractStarted);
		console.log("Presale Ends: "+saleEndsAt);
		console.log("Current time: "+Date.now());
		var allowed = Date.now()<=saleEndsAt;
		this.calcPresaleRemainingTimer();
		console.log("Presale is active: "+ allowed);
		if (Date.now()<=saleEndsAt) { // If presale is active show the presale button
			presaleMint.hidden=false;
			mintBtn.hidden=true;
		} else {
			presaleMint.hidden=true;
			mintBtn.hidden=false;
		}	
	}
  }
  
  calcPresaleRemainingTimer = () => {
	const presaleMint = document.getElementById("presaleMint");
	const mintBtn = document.getElementById("mintBtn");
	var theContractStarted = this.state.startTime*1000; // This come from the contract; Times 1000 to make it a modern date.
	const saleTime = (5*60)*1000; // Sale Lasts for 5 minutes; 
	const saleEnds = theContractStarted+saleTime;
	const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = saleEnds - now;
      if (diff < 0) { // If the person is on the page as it finished change it so the button is different.
		presaleMint.setAttribute("disabled", true);
		presaleMint.hidden=true;
		mintBtn.hidden=false;
        clearInterval(interval);
      } else {
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        presaleMint.innerHTML = `<span style="color:red;fontWeight:bold;">Presale Lasts ${minutes}m ${seconds}s</span>`;
      }
    }, 1000);
  }
  
  mintMyNFT = async (colors, name, tokenPrice, uri) => {
    this.setState({ loading: true });
    const colorsArray = Object.values(colors);
    let colorString = "";
    for (let i = 0; i < colorsArray.length; i++) {
      colorString += colorsArray[i].toString();
    }
    const colorsUsed = await this.state.cryptoPawsContract.methods
      .creationStrs(colorString)
      .call();
    const nameIsUsed = await this.state.cryptoPawsContract.methods
      .nameExists(name)
      .call();
    if (!colorsUsed && !nameIsUsed) {

      const price = window.web3.utils.toWei(tokenPrice.toString(), "Ether");
      let mintPrice;
      mintPrice = await this.state.cryptoPawsContract.methods.mintPrice.call();
      this.state.cryptoPawsContract.methods
        .mintPaw(name, colorString, price, uri)
        .send({ from: this.state.accountAddress, value: mintPrice })
        .on("confirmation", () => {
          localStorage.setItem(this.state.accountAddress, new Date().getTime());
          this.setState({ loading: false });
          window.location.hash = "#/my-tokens"; // Move them to their token page after minting
		  window.location.reload(); // Sometimes it doesn't have the most up to date info so just refresh to fix it.
        });
    } else {
      if (nameIsUsed) {
        this.setState({ nameIsUsed: true });
        this.setState({ loading: false });
      } else if (colorsUsed) {
        this.setState({ colorIsUsed: true });
        this.setState({ colorsUsed });
        this.setState({ loading: false });
      }
    }
  };

  presaleMint = async (colors, name, tokenPrice, uri) => {
    this.setState({ loading: true });
    const colorsArray = Object.values(colors);
    let colorString = "";
    for (let i = 0; i < colorsArray.length; i++) {
      colorString += colorsArray[i].toString();
    }
    const colorsUsed = await this.state.cryptoPawsContract.methods
      .creationStrs(colorString)
      .call();
    const nameIsUsed = await this.state.cryptoPawsContract.methods
      .nameExists(name)
      .call();
    if (!colorsUsed && !nameIsUsed) {

      const price = window.web3.utils.toWei(tokenPrice.toString(), "Ether");
      this.state.cryptoPawsContract.methods
        .presalePaw(name, colorString, price, uri)
        .send({ from: this.state.accountAddress })
        .on("confirmation", () => {
          this.setState({ loading: false });
          window.location.hash = "#/my-tokens"; // Move them to their token page after minting
		  window.location.reload(); // Sometimes it doesn't have the most up to date info so just refresh to fix it.
        });
    } else {
      if (nameIsUsed) {
        this.setState({ nameIsUsed: true });
        this.setState({ loading: false });
      } else if (colorsUsed) {
        this.setState({ colorIsUsed: true });
        this.setState({ colorsUsed });
        this.setState({ loading: false });
      }
    }
  };
  
  toggleForSale = (tokenId) => {
    this.setState({ loading: true });
    this.state.cryptoPawsContract.methods
      .toggleForSale(tokenId)
      .send({ from: this.state.accountAddress })
      .on("confirmation", () => {
        this.setState({ loading: false });
        window.location.reload();
      });
  };

  changeTokenPrice = (tokenId, newPrice) => {
    this.setState({ loading: true });
    const newTokenPrice = window.web3.utils.toWei(newPrice, "Ether");
    this.state.cryptoPawsContract.methods
      .changeTokenPrice(tokenId, newTokenPrice)
      .send({ from: this.state.accountAddress })
      .on("confirmation", () => {
        this.setState({ loading: false });
        window.location.reload();
      });
  };

  buyCryptoPaw = (tokenId, price) => {
    this.setState({ loading: true });
    this.state.cryptoPawsContract.methods
      .buyToken(tokenId)
      .send({ from: this.state.accountAddress, value: price })
      .on("confirmation", () => {
        this.setState({ loading: false });
        window.location.reload();
      });
  };

  render() {
    return (
      <div className="ml-25 mr-25">
        {!this.state.metamaskConnected ? (
          <ConnectToMetamask connectToMetamask={this.connectToMetamask} />
        ) : !this.state.contractDetected ? (
          <ContractNotDeployed />
        ) : this.state.loading ? (
          <Loading />
        ) : (
          <>
            <HashRouter basename="/">
              <Navbar />
              <Route
                path="/"
                exact
                render={() => (
                  <AccountDetails
                    accountAddress={this.state.accountAddress}
                    accountBalance={this.state.accountBalance}
                  />
                )}
              />
              <Route
                path="/mint"
                render={() => (
                  <FormAndPreview
                    mintMyNFT={this.mintMyNFT}
                    nameIsUsed={this.state.nameIsUsed}
                    colorIsUsed={this.state.colorIsUsed}
                    colorsUsed={this.state.colorsUsed}
                    setMintBtnTimer={this.setMintBtnTimer}
					presaleMint={this.presaleMint}
					checkIfPresaleActive={this.checkIfPresaleActive}
                  />
                )}
              />
              <Route
                path="/marketplace"
                render={() => (
                  <AllCryptoPaws
                    accountAddress={this.state.accountAddress}
                    cryptoPawsContract={this.state.cryptoPawsContract}
                    changeTokenPrice={this.changeTokenPrice}
                    toggleForSale={this.toggleForSale}
                    buyCryptoPaw={this.buyCryptoPaw}
                    lotteryContract={this.state.FactoryContract}
                    auctionContract={this.state.auctionContract}
                  />
                )}
              />
              <Route
                path="/my-tokens"
                render={() => (
                  <MyCryptoPaws
                    accountAddress={this.state.accountAddress}
                    cryptoPawsContract={this.state.cryptoPawsContract}
                  />
                )}
              />
              <Route
                path="/auctions"
                render={() => (
                  <Auctions
                  cryptoPawsContract={this.state.cryptoPawsContract}
                  accountAddress={this.state.accountAddress}
                  auctionContract={this.state.auctionContract}/>
                )}
              />
              <Route
                path="/lotteries"
                render={() => (
                  <Lotteries
                  cryptoPawsContract={this.state.cryptoPawsContract}
                  accountAddress={this.state.accountAddress}
                  lotteryContract={this.state.FactoryContract}/>
                )}
              />
              <Route
                path="/queries"
                render={() => (
                  <Queries cryptoPawsContract={this.state.cryptoPawsContract} />
                )}
              />
            </HashRouter>
          </>
        )}
      </div>
    );
  }
}

export default App;
