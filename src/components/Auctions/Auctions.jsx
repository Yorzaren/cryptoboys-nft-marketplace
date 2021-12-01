import React, { Component } from "react";
import Auction from "../../abis/Auction.json";
import CryptoPawNFTImage from "../CryptoPawNFTImage/CryptoPawNFTImage";
import CryptoPawNFTAuctionDetails from "../CryptoPawNFTAuctionDetails/CryptoPawNFTAuctionDetails";

class Auctions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            auctioninfo: [],
            accountAddress: this.props.accountAddress,
            cryptoPawsContract: this.props.cryptoPawsContract,
            factoryContract: this.props.auctionContract,
            auctionssize: ""
        }
    }

    async componentDidMount() {
        const Web3 = window.web3;
        const auctionssize = await this.state.factoryContract.methods.totalactive.call();
        this.setState({ auctionssize });
        let auctioninfo = [];

        console.log(auctionssize)
        for (var i = 0; i < auctionssize; i++) {
            let x = {
                id: "",
                paw: "",
                address: "",
                owner: "",
                active: "",
                constract: ""
            }
            let id = await this.state.factoryContract.methods.auctionarray(i).call();
            x.id = id;

            x.paw = await this.state.cryptoPawsContract.methods.allPaws(id).call();

            let address = await this.state.factoryContract.methods.auctions(id).call();
            x.address = address;
            x.owner = await this.state.factoryContract.methods.owners(id).call();
            x.active = await this.state.factoryContract.methods.active(id).call();

            const auctionContract = await Web3.eth.Contract(Auction.abi, address);

            x.contract = auctionContract;

            console.log(x)
            if(x.active) {
                auctioninfo = [...auctioninfo, x];
            }
        }
        this.setState({ auctioninfo });
        console.log(auctioninfo)
    }

    render() {
        return (
            <div>
                           <div className="card mt-1">
                <div className="card-body align-items-center d-flex justify-content-center">
                    <h5>
                    Total No. of Ongoing Auctions :{" "}
                        {this.state.auctionssize.toString()}
                    </h5>
                </div>
            </div>
            <div className="d-flex flex-wrap mb-2">
            {this.state.auctioninfo.length == 0 ?
            <p className="mt-4 mx-auto align-self-center">No auctions currently active</p>:
            <div className="d-flex flex-wrap mb-2">
                {this.state.auctioninfo.map((auctionid) => {
                    return (
                        <div
                            key={auctionid.id.toNumber()}
                            className="w-100 p-4 mt-1 border"
                        >
                            <CryptoPawNFTImage cryptoPaw={auctionid.paw} />

                            <CryptoPawNFTAuctionDetails
                                auction={auctionid}
                                account={this.state.accountAddress}
                                factory={this.state.factoryContract}
                            />
                        </div>
                    );
                })}
            </div>}
        </div>
        </div>
        )
    }
}

export default Auctions;