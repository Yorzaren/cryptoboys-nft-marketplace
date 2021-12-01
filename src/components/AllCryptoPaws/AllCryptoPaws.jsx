import React, { Component } from "react";
import CryptoPawNFTImage from "../CryptoPawNFTImage/CryptoPawNFTImage";
import CryptoPawNFTDetails from "../CryptoPawNFTDetails/CryptoPawNFTDetails";

class AllCryptoPaws extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            allpaws: [],
            account: this.props.accountAddress,
            pawContract: this.props.cryptoPawsContract
        }
    }

    async getpaws() {
        let totalpaws = await this.state.pawContract.methods.pawCounter().call();
        let allpaws = [];
        for (var i = 1; i <= totalpaws; i++) {
            let x = await this.state.pawContract.methods.allPaws(i).call();
            allpaws = [...allpaws, x]; 
            let a = await this.state.pawContract.methods.getTokenOwner(x.tokenId).call();
            console.log(x)
        }
        this.setState( { allpaws });
    }

    componentDidMount() {
        this.getpaws();
    }
    
    componentDidUpdate() {
        console.log(this.state.allpaws)
    }

    render() {
        return (
            <div>
            <div className="card mt-1">
                <div className="card-body align-items-center d-flex justify-content-center">
                    <h5>
                    Total No. of CryptoPaws Minted On The Platform :{" "}
                        {this.state.allpaws.length}
                    </h5>
                </div>
            </div>
            <div className="d-flex flex-wrap mb-2">
                {this.state.allpaws.map((cryptopaw) => {
                    return (
                        <div
                            key={cryptopaw.tokenId.toNumber()+cryptopaw.currentOwner}
                            className="w-50 p-4 mt-1 border"
                        >
                            

                                <CryptoPawNFTImage cryptoPaw={cryptopaw}/>
                                    <CryptoPawNFTDetails
                                    cryptoPaw={cryptopaw}
                                    accountAddress={this.state.account}
                                    changeTokenPrice={this.props.changeTokenPrice}
                                    toggleForSale={this.props.toggleForSale}
                                    buyCryptoPaw={this.props.buyCryptoPaw}
                                    lotteryContract={this.props.lotteryContract}
                                    auctionContract={this.props.auctionContract}
                                    />
                        </div>
                    );
                })}
            </div>
            </div>
        );
    }
}

export default AllCryptoPaws;