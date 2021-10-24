import React from "react";

class CryptoPawNFTImage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <img src={this.props.cryptoPaw.tokenURI}/>
        )
    }
}

export default CryptoPawNFTImage;