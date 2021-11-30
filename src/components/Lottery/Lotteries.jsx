import React, { Component} from "react";
import Lottery from "../../abis/Lottery.json";
import Web3 from "web3";
import CryptoPawNFTImage from "../CryptoPawNFTImage/CryptoPawNFTImage";
import CryptoPawNFTLottoDetails from "../CryptoPawNFTLottoDetails/CryptoPawNFTLottoDetails";

    class Lotteries extends Component {

        constructor(props) {
            super(props);
            this.state ={
                lotteryinfo: [],
                accountAddress: this.props.accountAddress,
                cryptoPawsContract: this.props.cryptoPawsContract,
                factoryContract: this.props.lotteryContract,
            }
        }

        async componentDidMount() {
            const web3 = window.web3;
            const LotteriesSize = await this.state.factoryContract.methods.totalactive.call();
            console.log(LotteriesSize)
            let lotteryinfo = [];
            let x = {
                id: "",
                paw: "",
                address: "",
                owner: "",
                active: "",
                winner: "",
                contract: ""
            };
            for (var i = 0; i < LotteriesSize; i++) {
                
                
                let id = await this.state.factoryContract.methods.lotteriesarray(i).call();
                x.id = id;

                x.paw = await this.state.cryptoPawsContract.methods.allPaws(id).call();

                let address = await this.state.factoryContract.methods.lotteries(id).call();
                x.address = address;
                
                x.owner = await this.state.factoryContract.methods.owners(id).call();
                x.active = await this.state.factoryContract.methods.active(id).call();

                const lotteryContract = await web3.eth.Contract(Lottery.abi, address);

                x.increment = await lotteryContract.methods.entryPrice.call();
                x.finished = await lotteryContract.methods.finished.call();
                x.winner = await lotteryContract.methods.winner.call();
                x.contract = lotteryContract;

                lotteryinfo.push(x);
            }
            this.setState({ lotteryinfo });
            console.log(lotteryinfo)
        }

        render() {
            return (
                <div className="d-flex flex-wrap mb-2">
                    {this.state.lotteryinfo.length == 0 ?
                    <p className="mt-4 mx-auto align-self-center">No lotteries currently active</p>:
                    <div className="d-flex flex-wrap mb-2">
                        {this.state.lotteryinfo.map((lotteryid) => {
                            return (
                                <div
                                    key={lotteryid.id.toNumber()+lotteryid.active+lotteryid.finished}
                                    className="w-100 p-4 mt-1 border"
                                >
                                    <CryptoPawNFTImage cryptoPaw={lotteryid.paw} />

                                    <CryptoPawNFTLottoDetails
                                        lotto={lotteryid}
                                        account={this.state.accountAddress}
                                        factory={this.state.factoryContract}
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