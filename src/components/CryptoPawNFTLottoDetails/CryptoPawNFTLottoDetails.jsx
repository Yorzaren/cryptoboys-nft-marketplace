import React, { Component } from "react";
import Web3 from "web3";
import Lottery from "../../abis/Lottery.json";

class CryptoPawNFTLottoDetails extends Component {

    constructor(props) {
        super(props);
        const LotteryContract = Web3.eth.Contract(
            Lottery.abi,
            props.lotto.address
        )
        this.state ={
            lottoContract: LotteryContract,
            entryprice: "",
        }
    }

    async componentDidMount() {
        var entryprice = await this.state.lottoContract.methods.entryPrice().call();
        this.setState({ entryprice });
        var entrants = await this.state.lottoContract.methods.entrantscount().call();
        this.setState({ entrants });
    }

    enterlottery = (price) => {
        this.state.lottoContract.methods.enterlottery().send({ from: this.props.account, value: price})
    }

    endlottery() {
        this.state.lottoContract.methods.endlottery().call()
    }

    claimPaw() {
        this.props.factory.methods.claim(this.props.lotto.id).call();
    }

    render() {
        return (
            <div key={this.props.lotto.id.toNumber()} className="mt-4">
                <p>
                    <span className="font-weight-bold">Token Id</span>: {" "}{this.props.lotto.id.toNumber()}
                </p>
                <p>
                    <span className="font-weight-bold">Minted By</span>:{" "}{this.props.lotto.paw.mintedBy.substr(0, 5)+ "..." + this.props.lotto.paw.mintedBy.slice(this.props.lotto.paw.mintedBy.length - 5)}
                </p>
                <p>
                    <span className="font-weight-bold">Owned By</span> :{" "}
                    {this.props.lotto.paw.currentOwner.substr(0, 5) + "..." + this.props.lotto.paw.currentOwner.slice(this.props.lotto.paw.currentOwner.length - 5)}
                </p>
                <p>
                    <span className="font-weight-bold">Entry Fee</span>: {" "}
                    {this.state.entryprice}
                </p>
                <p>
                    <span className="font-weight-bold">Number of Entrants</span>: {" "}
                    {this.state.entrants}
                </p>
                <div>
                    {this.props.account === this.props.lotto.owner ? (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                this.endlottery();
                            }}
                        >
                        <button
                            type="submit"
                            style={{ fontsize: "0.8rem", letterSpacing: "0.14rem"}}
                            className="btn btn-outline-info mt-0 w-50"
                        >
                            End Auction
                        </button>
                        </form>
                    ): 
                        <button
                            className="btn btn-outline-primary mt-3 w-50"
                            value={this.props.lotto.increment}
                            style={{ fontsize: "0.8rem", letterSpacing: "0.14rem"}}
                            onClick={(e) =>
                                this.enterlottery(e.target.value).bind(this)}
                        >
                            Enter Auction For {" "}{window.web3.utils.fromWei(this.props.lotto.increment.toString(), "ether")}{" "}Ξ
                        </button>}
                </div>
                <div>
                    {this.props.lotto.winner == this.props.lotto.account && this.props.lotto.finished?
                        <button
                            className="btn btn-outline-primary mt-3 w-50"
                            style={{ fontsize: "0.8rem", letterSpacing: "0.14rem"}}
                            onClick={(e) =>
                                this.claimPaw().bind(this)}
                        >
                            You won! Click to claim reward
                        </button>: null}
                </div>
            </div>
        )
    }
}

export default CryptoPawNFTLottoDetails;