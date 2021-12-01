import React, { Component } from "react";
import CryptoPawNFTImage from "../CryptoPawNFTImage/CryptoPawNFTImage";
import MyCryptoPawNFTDetails from "../MyCryptoPawNFTDetails/MyCryptoPawNFTDetails";

class MyCryptoPaws extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            mypaws: [],
            account: this.props.accountAddress,
            pawContract: this.props.cryptoPawsContract
        }
    }

    async componentDidMount() {
        let totalpaws = await this.state.pawContract.methods.pawCounter().call();
        let mypaws = [];
        for (var i = 1; i <= totalpaws; i++) {
            let x = await this.state.pawContract.methods.allPaws(i).call();
            if(x.currentOwner === this.state.account) {
               mypaws = [...mypaws, x]; 
            }
        }
        this.setState( { mypaws });
    }

    render() {
        return (
            <div>
            <div className="card mt-1">
                <div className="card-body align-items-center d-flex justify-content-center">
                    <h5>
                        Total No. of CryptoPaws You Own: {this.state.mypaws.length}
                    </h5>
                </div>
            </div>
            <div className="d-flex flex-wrap mb-2">
                {this.state.mypaws.map((cryptopaw) => {
                    return (
                        <div
                            key={cryptopaw.tokenId.toNumber()}
                            className="w-50 p-4 mt-1 border"
                        >
                            <div className="row">
                                <div className="col-md-6">

                                        <CryptoPawNFTImage cryptoPaw={cryptopaw}/>
            
                                </div>
                                <div className="col-md-6 text-center">
                                    <MyCryptoPawNFTDetails
                                    cryptoPaw={cryptopaw}
                                    accountAddress={this.state.account}
                                />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
        );
    }
}

export default MyCryptoPaws;