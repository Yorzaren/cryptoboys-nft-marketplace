import React, { Component } from "react";
class CryptoPawNFTLottoDetails extends Component {

    constructor(props) {
        super(props);
        this.state ={
            entrants: "",
            entryprice: ""
        }
    }

    async componentDidMount() {
        var entryprice = await this.props.lotto.contract.methods.entryPrice().call();
        this.setState({ entryprice: entryprice._hex });
        var entrants = await this.props.lotto.contract.methods.entrantscount().call();
        this.setState({ entrants: parseInt(entrants._hex, 16) });
        console.log(this.props.lotto.winner)
        console.log(this.props.account)
    }

    enterlottery = (price) => {
        this.props.lotto.contract.methods.enterLottery().send({ from: this.props.account, value: price})
    }

    endlottery = () => {
        this.props.lotto.contract.methods.endLottery().send({ from: this.props.account });
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
                    {window.web3.utils.fromWei(this.state.entryprice, "Ether")}
                </p>
                <p>
                    <span className="font-weight-bold">Number of Entrants</span>: {" "}
                    {this.state.entrants}
                </p>
                <div>
                    {this.props.account === this.props.lotto.owner && !(this.props.lotto.finished)? (
                         <button
                         className="btn btn-outline-primary mt-3 w-50"
                         style={{ fontsize: "0.8rem", letterSpacing: "0.14rem"}}
                         onClick={(e) =>
                             this.endlottery()}
                     >
                         End Lottery
                     </button>
                    ): null}
                    {this.props.account !== this.props.lotto.owner && !(this.props.lotto.finished)?
                        <button
                            className="btn btn-outline-primary mt-3 w-50"
                            value={this.props.lotto.increment}
                            style={{ fontsize: "0.8rem", letterSpacing: "0.14rem"}}
                            onClick={(e) =>
                                this.enterlottery(e.target.value)}
                        >
                            Enter Lottery For {" "}{window.web3.utils.fromWei(this.props.lotto.increment.toString(), "ether")}{" "}Ξ
                        </button>:null}
                </div>
            </div>
        )
    }
}

export default CryptoPawNFTLottoDetails;