import React, { Component } from "react";

class CryptoPawNFTAuctionDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bid: "",
            totalbids: "",
            currentbid: "",
            yourcurrentbid: ""
        }
    }

    async componentDidMount() {
        var totalbids = await this.props.auction.contract.methods.totalbids().call()
        totalbids = parseInt(totalbids, 16);
        this.setState({ totalbids });
        var currentbid = await this.props.auction.contract.methods.highestbinding().call();
        currentbid = parseInt(currentbid, 16);        this.setState({ currentbid });
        let acc = this.props.account;
        var yourcurrentbid = await this.props.auction.contract.methods.bids(acc).call();
        this.setState({ yourcurrentbid });
        console.log(currentbid)
        console.log(yourcurrentbid)
    }

    async placebid() {
        let price = await window.web3.utils.toWei(this.state.bid, "Ether");
        this.props.auction.contract.methods.placeBid().send({from: this.props.account, value: price});
    }

    endauction() {
        this.props.auction.contract.methods.endAuction().send({from: this.props.account});
    }

    render() {
        return (
            <div key={this.props.auction.id.toNumber()} className="mt-4">
                <p>
                    <span className="font-weight-bold">Token Id</span>: {" "}{this.props.auction.id.toNumber()}
                </p>
                <p>
                    <span className="font-weight-bold">Minted By</span>:{" "}{this.props.auction.paw.mintedBy.substr(0, 5)+ "..." + this.props.auction.paw.mintedBy.slice(this.props.auction.paw.mintedBy.length - 5)}
                </p>
                <p>
                    <span className="font-weight-bold">Owned By</span> :{" "}
                    {this.props.auction.paw.currentOwner.substr(0, 5) + "..." + this.props.auction.paw.currentOwner.slice(this.props.auction.paw.currentOwner.length - 5)}
                </p>
                <p>
                    <span className="font-weight-bold">Current Bid</span>: {" "}
                    {window.web3.utils.fromWei(this.state.currentbid.toString(), "Ether")}
                </p>
                <p>
                    <span className="font-weight-bold">Your Current Bid</span>: {" "}
                    {window.web3.utils.fromWei(this.state.yourcurrentbid.toString(), "Ether")}
                </p>
                <p>
                    <span className="font-weight-bold">Number of bids</span>: {" "}
                    {this.state.totalbids}
                </p>
                <div>
                    {this.props.account === this.props.auction.owner && !(this.props.auction.finished)? (
                         <button
                         className="btn btn-outline-primary mt-3 w-50"
                         style={{ fontsize: "0.8rem", letterSpacing: "0.14rem"}}
                         onClick={(e) =>
                             this.endauction()}
                     >
                         End Auction
                     </button>
                    ): null}
                    {this.props.account !== this.props.auction.owner && !(this.props.auction.finished)?
                        <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            this.placebid();
                            
                        }}
                        >
                        <div className="form-group mt-4">
                            <label htmlFor="newAuctionPrice">
                                <span className="font-weight-bold">Bid</span> :
                            </label>{" "}
                            <input
                                required
                                type="number"
                                name="newAuctionPrice"
                                id="newAuctionPrice"
                                value={this.state.bid}
                                className="form-control w-50"
                                placeholder="Enter bid"
                                onChange={(e) =>
                                    this.setState({
                                        bid: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <button
                            type="submit"
                            style={{ fontSize: "0.8rem", letterSpacing: "0.14rem"}}
                            className="btn btn-outline-info mt-0 w-50"
                        >
                            Place Bid
                        </button>
                        </form>:null}
                </div>
            </div>
        )
    }
}

export default CryptoPawNFTAuctionDetails;