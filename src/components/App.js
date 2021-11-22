import React, { Component } from "react";
import { HashRouter, Route } from "react-router-dom";
import "./App.css";
import Web3 from "web3";
import CryptoPaws from "../abis/CryptoPaws.json";

import FormAndPreview from "../components/FormAndPreview/FormAndPreview";
import AllCryptoPaws from "./AllCryptoPaws/AllCryptoPaws";
import AccountDetails from "./AccountDetails/AccountDetails";
import ContractNotDeployed from "./ContractNotDeployed/ContractNotDeployed";
import ConnectToMetamask from "./ConnectMetamask/ConnectToMetamask";
import Loading from "./Loading/Loading";
import Navbar from "./Navbar/Navbar";
import MyCryptoPaws from "./MyCryptoPaws/MyCryptoPaws";
import Queries from "./Queries/Queries";
import Auction from "./Auction/Auction";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountAddress: "",
      accountBalance: "",
      cryptoPawsContract: null,
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
    };
  }

  componentWillMount = async () => {
    await this.loadWeb3();
    await this.loadBlockchainData();
    await this.setMintBtnTimer();
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
      if (networkData) {
        this.setState({ loading: true });
        const cryptoPawsContract = web3.eth.Contract(
          CryptoPaws.abi,
          networkData.address
        );
        this.setState({ cryptoPawsContract });
        this.setState({ contractDetected: true });
        const cryptoPawsCount = await cryptoPawsContract.methods
          .pawCounter()
          .call();
        this.setState({ cryptoPawsCount });
        for (var i = 1; i <= cryptoPawsCount; i++) {
          const cryptoPaw = await cryptoPawsContract.methods
            .allPaws(i)
            .call();
          this.setState({
            cryptoPaws: [...this.state.cryptoPaws, cryptoPaw],
          });
        }
        let totalTokensMinted = await cryptoPawsContract.methods
          .getTotalNumberMinted()
          .call();
        totalTokensMinted = totalTokensMinted.toNumber();
        this.setState({ totalTokensMinted });
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

  mintMyNFT = async (colors, name, tokenPrice, uri) => {
    this.setState({ loading: true });
    const colorsArray = Object.values(colors);
    let colorString = "";
    for (let i = 0; i < colorsArray.length; i++) {
      colorString += colorsArray[i].toString;
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
      <div className="container">
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
                  />
                )}
              />
              <Route
                path="/marketplace"
                render={() => (
                  <AllCryptoPaws
                    accountAddress={this.state.accountAddress}
                    cryptoPaws={this.state.cryptoPaws}
                    totalTokensMinted={this.state.totalTokensMinted}
                    changeTokenPrice={this.changeTokenPrice}
                    toggleForSale={this.toggleForSale}
                    buyCryptoPaw={this.buyCryptoPaw}
                  />
                )}
              />
              <Route
                path="/my-tokens"
                render={() => (
                  <MyCryptoPaws
                    accountAddress={this.state.accountAddress}
                    cryptoPaws={this.state.cryptoPaws}
                    totalTokensOwnedByAccount={
                      this.state.totalTokensOwnedByAccount
                    }
                  />
                )}
              />
              <Route
                path="/queries"
                render={() => (
                  <Queries cryptoPawsContract={this.state.cryptoPawsContract} />
                )}
              />
              <Route
                path="/auction"
                render={() => (
                  <Auction />
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
