import React, { Component} from "react";
import CryptoPawNFTImage from "../CryptoPawNFTImage/CryptoPawNFTImage";
import CryptoPawNFTLottoDetails from "../CryptoPawNFTLottoDetails/CryptoPawNFTLottoDetails";

    class Lotteries extends Component {

        constructor(props) {
            super(props);
            this.state ={
                lotteryinfo: [],
                accountAddress: this.props.accountAddress,
                cryptoPawsContract: this.props.cryptoPawsContract,
                lotteryContract: this.props.lotteryContract,
            }
        }

        async componentDidMount() {
            const LotteriesSize = await this.state.lotteryContract.methods.totalactive().call();
            let lotteryinfo = [];
            let x = {
                id: "",
                paw: "",
                address: "",
                owner: "",
                active: "",
                winner: "",
            };
            for (var i = 1; i < LotteriesSize; i++) {
                let id = await this.state.lotteryContract.methods.lotteriesarray(i).call();
                x.id = id;
                x.finished = await this.state.lotteryContract.methods.finished().call();
                x.winner = await this.state.lotteryContract.methods.winner().call();
                x.paw = await this.state.cryptoPawsContract.methods.allPaws(id).call();
                x.address = await this.state.lotteryContract.methods.lotteries(id).call();
                x.owner = await this.state.lotteryContract.methods.owners(id).call();
                x.active = await this.state.lotteryContract.methods.active(id).call();
                x.increment = await this.state.lotteryContract.methods.entryPrice().call();
                lotteryinfo.push(x);
            }
            this.setState({ lotteryinfo });
        }

        render() {
            return (
                <div className="d-flex">
                    {this.state.lotteryinfo.length == 0 ?
                    <p className="mt-4 mx-auto align-self-center">No lotteries currently active</p>:
                    <div className="d-flex flex-wrap mb-2">
                        {this.state.lotteryinfo.map((lotteryid) => {
                            return (
                                <div
                                    key={lotteryid.id.toNumber()}
                                    className="w-50 p-4 mt-1 border"
                                >
                                    <CryptoPawNFTImage cryptoPaw={lotteryid.paw} />

                                    <CryptoPawNFTLottoDetails
                                        lotto={lotteryid}
                                        account={this.state.accountAddress}
                                        factory={this.state.lotteryContract}
                                    />
                                </div>
                            );
                        })}
                    </div>}
                </div>
            );
        }
    }

export default Lotteries;