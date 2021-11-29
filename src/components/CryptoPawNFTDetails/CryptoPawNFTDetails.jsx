import React, { Component } from "react";

class CryptoPawNFTDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newCryptoPawPrice: "",
            newLotteryPrice: "",
            lotteryContract: this.props.lotteryContract,
        }
        console.log(typeof(this.props.lotteryContract))
    }

    async componentDidMount() {
        let x = await this.state.lotteryContract.methods.active(this.props.cryptoPaw.tokenId.toNumber()).call();
        this.setState({active: x});
    }

    callChangeTokenPriceFromApp = (tokenId, newPrice) => {
        this.props.changeTokenPrice(tokenId, newPrice);
    };

    async createAuction() {
        let Price = window.web3.utils.toWei(this.state.newLotteryPrice, "Ether");
        let lottoPrice = await this.state.lotteryContract.methods.lottoPrice().call();
        let token = this.props.cryptoPaw.tokenId.toNumber();
        this.state.lotteryContract.methods.createLottery(token, Price).send({ from: this.props.accountAddress, value: lottoPrice});
    }

    render() {
        return (
            <div key={this.props.cryptoPaw.tokenId.toNumber()} className="mt-4">
                <p>
                    <span className="font-weight-bold">Token Id</span> :{" "}
                    {this.props.cryptoPaw.tokenId.toNumber()}
                </p>
                <p>
                    <span className="font-weight-bold">Minted By</span> :{" "}
                    {this.props.cryptoPaw.mintedBy.substr(0, 5) + "..." + this.props.cryptoPaw.mintedBy.slice(this.props.cryptoPaw.mintedBy.length - 5)}
                </p>
                <p>
                    <span className="font-weight-bold">Owned By</span> :{" "}
                    {this.props.cryptoPaw.currentOwner.substr(0, 5) + "..." + this.props.cryptoPaw.currentOwner.slice(this.props.cryptoPaw.currentOwner.length - 5)}
                </p>
                <p>
                    <span className="font-weight-bold">Price</span> :{" "}
                    {window.web3.utils.fromWei(this.props.cryptoPaw.price.toString(), "Ether")}{" "}Ξ
                </p>
                <p>
                    <span className="font-weight-bold">No. of Transfers</span> :{" "}
                    {this.props.cryptoPaw.timesTransferred.toNumber()}
                </p>
                <div>
                    {this.props.accountAddress === this.props.cryptoPaw.currentOwner ? (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                this.callChangeTokenPriceFromApp(
                                    this.props.cryptoPaw.tokenId.toNumber(),
                                    this.state.newCryptoPawPrice
                                );
                            }}
                        >
                            <div className="form-group mt-4">
                                <label htmlFor="newCryptoPawPrice">
                                    <span className="font-weight-bold">Change Token Price</span> :
                                </label>{" "}
                                <input
                                    required
                                    type="number"
                                    name="newCryptoPawPrice"
                                    id="newCryptoPawPrice"
                                    value={this.state.newCryptoPawPrice}
                                    className="form-control w-50"
                                    placeholder="Enter new price"
                                    onChange={(e) =>
                                        this.setState({
                                            newCryptoPawPrice: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <button
                                type="submit"
                                style={{ fontSize: "0.8rem", letterSpacing: "0.14rem"}}
                                className="btn btn-outline-info mt-0 w-50"
                            >
                                change price
                            </button>
                        </form>
                    ) : null}
                </div>
                <div>
                    {this.props.accountAddress === this.props.cryptoPaw.currentOwner ? (
                        this.props.cryptoPaw.forSale ? 
                            <button
                                className="btn btn-outline-danger mt-4 w-50"
                                style={{ fontsize: "0.8rem", letterSpacing: "0.14rem"}}
                                onClick={() =>
                                    this.props.toggleForSale(
                                        this.props.cryptoPaw.tokenId.toNumber()
                                    )
                                }
                            >
                                Remove from sale
                            </button>
                         : 
                            <button
                                className="btn btn-outline-success mt-4 w-50"
                                style={{ fontsize: "0.8rem", letterSpacing: "0.14rem"}}
                                onClick={() =>
                                    this.props.toggleForSale(
                                        this.props.cryptoPaw.tokenId.toNumber()
                                    )
                                }
                            >
                                Make For Sale
                            </button>
                        
                        
                    ) : null}
                </div>
                <div>
                {this.state.x == true ? 
                        (
                            null
                        ):(
                            <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                this.createAuction()
                            }}
                            >
                            <div className="form-group mt-4">
                                <label htmlFor="newLotteryPrice">
                                    <span className="font-weight-bold">Lottery Entry Price</span> :
                                </label>{" "}
                                <input
                                    required
                                    type="number"
                                    name="newLotteryPrice"
                                    id="newLotteryPrice"
                                    value={this.state.newLotteryPrice}
                                    className="form-control w-50"
                                    placeholder="Enter new price"
                                    onChange={(e) =>
                                        this.setState({
                                            newLotteryPrice: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <button
                                type="submit"
                                style={{ fontSize: "0.8rem", letterSpacing: "0.14rem"}}
                                className="btn btn-outline-info mt-0 w-50"
                            >
                                Make Lottery
                            </button>
                            </form>
                        )}
                </div>
                <div>
                    {this.props.accountAddress !== this.props.cryptoPaw.currentOwner ? (
                        this.props.cryptoPaw.forSale ? (
                            <button
                                className="btn btn-outline-primary mt-3 w-50"
                                value={this.props.cryptoPaw.price}
                                style={{ fontsize: "0.8rem", letterSpacing: "0.14rem"}}
                                onClick={(e) =>
                                    this.props.buyCryptoPaw(
                                        this.props.cryptoPaw.tokenId.toNumber(),
                                        e.target.value
                                    )
                                }
                            >
                                Buy For{" "}
                                {window.web3.utils.fromWei(
                                    this.props.cryptoPaw.price.toString(), "Ether"
                                )}{" "}Ξ
                            </button>
                        ) : (
                            <>
                                <button
                                    disabled
                                    style={{ fontsize: "0.8rem", letterSpacing: "0.14rem"}}
                                    className="btn btn-outline-primary mt-3 w-50"
                                >
                                    Buy For{" "}
                                    {window.web3.utils.fromWei(
                                        this.props.cryptoPaw.price.toString(), "Ether"
                                    )}{" "}Ξ
                                </button>
                                <p className="mt-2">Currently not for sale!</p>
                            </>
                        )
                    ) : null}
                </div>
            </div>
        )
    }
}

export default CryptoPawNFTDetails;