import React, {Component} from "react";

class CryptoPawNFTImage extends Component {
	// Disabled for debugger warning -- If something breaks uncomment this.
    //constructor(props) {
    //    super(props);
    //}

    render() {
        return (
            <div>
                <img alt="NTF Token" src={this.props.cryptoPaw.tokenURI}/>
            </div>
        )
    }
}

export default CryptoPawNFTImage;