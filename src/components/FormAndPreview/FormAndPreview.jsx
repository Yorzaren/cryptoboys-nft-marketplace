import React, { Component } from "react";
import CryptoPawNFTImagePreview from "../CryptoPawNFTImagePreview/CryptoPawNFTImagePreview";

const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

class FormAndPreview extends Component {
  constructor(props) {
    super(props);
    this.svgelement = React.createRef();
    this.state = {
      userSelectedColors: [
        {
          cardBorderColor: this.getRandomColor(),
          cardBackgroundColor: this.getRandomColor(),
          digitOneColor: this.getRandomColor(),
          digitOneBorder: this.getRandomColor(),
          digitTwoColor: this.getRandomColor(),
          digitTwoBorder: this.getRandomColor(),
          digitThreeColor: this.getRandomColor(),
          digitThreeBorder: this.getRandomColor(),
          digitFourColor: this.getRandomColor(),
          digitFourBorder: this.getRandomColor(),
          digitcarpalPadColor: this.getRandomColor(),
          digitcarpalPadBorder: this.getRandomColor(),
        },
      ],
      cryptoPawName: "",
      cryptoPawPrice: "",
    };
  }

  componentDidMount = async () => {
    await this.props.setMintBtnTimer();
  };

  callMintMyNFTFromApp = async (e) => {
    e.preventDefault();
    var s = new XMLSerializer();
    let svg = s.serializeToString(this.svgelement.current);
    const cid = await ipfs.add(svg);
    let uri = `https://ipfs.infura.io/ipfs/${cid.path}`;
    this.props.mintMyNFT(
      this.state.userSelectedColors[0],
      this.state.cryptoPawName,
      this.state.cryptoPawPrice,
      uri
    );
  };
  
  callMassMintFromApp = async (e) => {
	e.preventDefault();
	// These match the bulkMint() in CyptoPaws.sol
	var arrayOfBulkColors = ["#daa520#76276c#b1af1c#ebfd00#1c4de#530ee1#398142#d75777#f51a19#cf4a9#a89851#12aefc", "#daa520#be530f#ffca1f#bb4a2#b0fa8#9cc016#1bca0#ff91ee#e81f31#8786c3#9b91ef#d0c9ac", "#daa520#2de31b#4ae7e#e923d1#7248b7#c130e0#5a977e#cc5f82#8b1aee#5397fd#dc6c06#5e5c5f", "#daa520#d28220#f7aef7#eccdf9#16dd8c#fc164e#60ba6c#6458d7#62e85e#8e9b85#d25ed4#391d2a", "#daa520#b93cd7#278f81#9bfea7#557f55#a25f96#3e274e#4d374#72d658#4f98bf#4e52c7#f203cc", "#daa520#ba4a87#ef1b7d#8fd4a0#6d506b#7e5895#fb9ca9#4624da#164f40#59fb23#12afe4#91288b", "#daa520#52a501#d56ea6#171951#a7978f#6d9da2#e4a28d#b3ec02#85f2ca#2ebad0#89b414#720d06", "#daa520#2ec4dc#852557#ddd64d#5c386f#994c0c#94ba64#745d73#292280#cfb5d9#287402#3afc46", "#daa520#5a0638#9f3780#c09d36#87def7#460e9f#6c1ae2#feff04#fa921b#7807de#33cfa6#24bec3", "#daa520#aa5d70#37bffe#3058fa#cece03#ed492a#ea4628#f63d5d#8618a8#93a510#a96078#f2f2e0", "#daa520#feddcc#65b28f#1b18bc#121d54#a5f50f#b2ddb#b7c0b6#97d59e#67956f#3d99f5#cc5981", "#daa520#970b08#b585e9#960696#5f4cd#a4bf56#e36c07#9cecd9#9e1d4c#6afecf#62edc2#f87384", "#daa520#420c35#26f503#b58a1a#7b0a67#ee15a3#ac0bf8#fcf5b1#e73962#7471d#969a4e#9a71ca", "#daa520#8a2b9d#f98acb#6bf37f#3f7e9e#6ca6fa#ea23ad#36c1ef#278fb9#a5d218#35de18#1110a6", "#daa520#cbf4cb#f706f7#d421b0#4f028d#cbc6#da6138#538c3#7236cc#99f779#aa8af6#dec561", "#daa520#96f58a#1cf17a#f830c7#8daa7c#1d4987#70990#3597d3#6ef3be#21daf9#6516ca#f1de17", "#daa520#9980ca#a6d5b1#b62dac#38e952#3092e4#6c223f#c3a910#779852#cb697a#914712#1cb470", "#daa520#111f7e#7a8292#2003fe#d5239#a8545a#b10d75#e04d9e#67dffc#ef627#d1f31a#dafb3b", "#daa520#ace3#aa9bb5#3672d8#c74f95#cbff69#6350ae#b4346f#c1e828#30cead#99ae8c#65ee53", "#daa520#7c6500#d8b310#ebb65e#a21ad9#ff968c#635f74#b226b6#af0800#bc0eee#c2c4ce#71be1f"];
	
	// Dont Hard code IPFS to a static address. 
	var arrayOfIpfs = [];
	for (var i=0; i<20; i++) {
		// Set back things to the color
		var colors = arrayOfBulkColors[i].substring(1).split("#");		
		document.getElementById("cardBorderColor").value = colors[0];
        document.getElementById("cardBackgroundColor").value = colors[1];
        document.getElementById("digitOneColor").value = colors[2];
        document.getElementById("digitOneBorder").value = colors[3];
        document.getElementById("digitTwoColor").value = colors[4];
        document.getElementById("digitTwoBorder").value = colors[5];
        document.getElementById("digitThreeColor").value = colors[6];
        document.getElementById("digitThreeBorder").value = colors[7];
        document.getElementById("digitFourColor").value = colors[8];
        document.getElementById("digitFourBorder").value = colors[9];
        document.getElementById("digitcarpalPadColor").value = colors[10];
        document.getElementById("digitcarpalPadBorder").value = colors[11];
		var s = new XMLSerializer();
		let svg = s.serializeToString(this.svgelement.current);
		const cid = await ipfs.add(svg);
		let uri = `https://ipfs.infura.io/ipfs/${cid.path}`;
		console.log(uri);
		arrayOfIpfs.push(uri);
	}
	console.log(arrayOfIpfs);
	this.props.bulkMint(
		arrayOfIpfs
    );
  }
  
  getRandomColor = () => {
	  return "#"+Math.floor(Math.random()*16777215).toString(16);
  };
  render() {
    return (
      <div>
        <div className="card mt-1">
          <div className="card-body align-items-center d-flex justify-content-center">
            <h5>Make your own CryptoPaw!</h5>
          </div>
        </div>
		<button onSubmit={this.callMassMintFromApp}>Mass Mint</button>
        <form onSubmit={this.callMintMyNFTFromApp} className="pt-4 mt-1">
          <div className="row">
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="cardBackgroundColor">
                  Card Background Color
                </label>
                <input
                  required
                  type="color"
                  name="cardBackgroundColor"
                  id="cardBackgroundColor"
                  value={this.state.userSelectedColors[0].cardBackgroundColor}
                  className="form-control"
                  onChange={(e) =>
                    this.setState({
                      userSelectedColors: [
                        {
                          ...this.state.userSelectedColors[0],
                          cardBackgroundColor: e.target.value,
                        },
                      ],
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="digitOneColor">Digit One Color</label>
                <input
                  required
                  type="color"
                  name="digitOneColor"
                  id="digitOneColor"
                  value={this.state.userSelectedColors[0].digitOneColor}
                  className="form-control"
                  onChange={(e) =>
                    this.setState({
                      userSelectedColors: [
                        {
                          ...this.state.userSelectedColors[0],
                          digitOneColor: e.target.value,
                        },
                      ],
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="digitTwoColor">
                  Digit Two Color
                </label>
                <input
                  required
                  type="color"
                  name="digitTwoColor"
                  id="digitTwoColor"
                  value={this.state.userSelectedColors[0].digitTwoColor}
                  className="form-control"
                  onChange={(e) =>
                    this.setState({
                      userSelectedColors: [
                        {
                          ...this.state.userSelectedColors[0],
                          digitTwoColor: e.target.value,
                        },
                      ],
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="digitThreeColor">
                  Digit Three Color
                </label>
                <input
                  required
                  type="color"
                  name="digitThreeColor"
                  id="digitThreeColor"
                  value={
                    this.state.userSelectedColors[0].digitThreeColor
                  }
                  className="form-control"
                  onChange={(e) =>
                    this.setState({
                      userSelectedColors: [
                        {
                          ...this.state.userSelectedColors[0],
                          digitThreeColor: e.target.value,
                        },
                      ],
                    })
                  }
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="cardBorderColor">Card Border Color</label>
                <input
                  required
                  type="color"
                  name="cardBorderColor"
                  id="cardBorderColor"
                  value={this.state.userSelectedColors[0].cardBorderColor}
                  className="form-control"
                  onChange={(e) =>
                    this.setState({
                      userSelectedColors: [
                        {
                          ...this.state.userSelectedColors[0],
                          cardBorderColor: e.target.value,
                        },
                      ],
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="digitOneBorder">
                  Digit One Border Color
                </label>
                <input
                  required
                  type="color"
                  name="digitOneBorder"
                  id="digitOneBorder"
                  value={this.state.userSelectedColors[0].digitOneBorder}
                  className="form-control"
                  onChange={(e) =>
                    this.setState({
                      userSelectedColors: [
                        {
                          ...this.state.userSelectedColors[0],
                          digitOneBorder: e.target.value,
                        },
                      ],
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="digitTwoBorder">
                  Digit Two Border Color
                </label>
                <input
                  required
                  type="color"
                  name="digitTwoBorder"
                  id="digitTwoBorder"
                  value={this.state.userSelectedColors[0].digitTwoBorder}
                  className="form-control"
                  onChange={(e) =>
                    this.setState({
                      userSelectedColors: [
                        {
                          ...this.state.userSelectedColors[0],
                          digitTwoBorder: e.target.value,
                        },
                      ],
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="digitThreeBorder">
                  Digit Three Border Color
                </label>
                <input
                  required
                  type="color"
                  name="digitThreeBorder"
                  id="digitThreeBorder"
                  value={
                    this.state.userSelectedColors[0].digitThreeBorder
                  }
                  className="form-control"
                  onChange={(e) =>
                    this.setState({
                      userSelectedColors: [
                        {
                          ...this.state.userSelectedColors[0],
                          digitThreeBorder: e.target.value,
                        },
                      ],
                    })
                  }
                />
              </div>
            </div>
            <div className="col-md-6 d-flex justify-content-center align-items-center">
              <CryptoPawNFTImagePreview colors={this.state.userSelectedColors[0]} svgref={this.svgelement} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="digitFourColor">
                  Digit Four Color
                </label>
                <input
                  required
                  type="color"
                  name="digitFourColor"
                  id="digitFourColor"
                  value={
                    this.state.userSelectedColors[0].digitFourColor
                  }
                  className="form-control"
                  onChange={(e) =>
                    this.setState({
                      userSelectedColors: [
                        {
                          ...this.state.userSelectedColors[0],
                          digitFourColor: e.target.value,
                        },
                      ],
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="digitcarpalPadColor">Carpal Pad Color</label>
                <input
                  required
                  type="color"
                  name="digitcarpalPadColor"
                  id="digitcarpalPadColor"
                  value={this.state.userSelectedColors[0].digitcarpalPadColor}
                  className="form-control"
                  onChange={(e) =>
                    this.setState({
                      userSelectedColors: [
                        {
                          ...this.state.userSelectedColors[0],
                          digitcarpalPadColor: e.target.value,
                        },
                      ],
                    })
                  }
                />
              </div>
            </div>
            <div className="col-md-3">
            	<div className="form-group">
                <label htmlFor="digitFourBorder">
                  Digit Four Border Color
                </label>
                <input
                  required
                  type="color"
                  name="digitFourBorder"
                  id="digitFourBorder"
                  value={
                    this.state.userSelectedColors[0].digitFourBorder
                  }
                  className="form-control"
                  onChange={(e) =>
                    this.setState({
                      userSelectedColors: [
                        {
                          ...this.state.userSelectedColors[0],
                          digitFourBorder: e.target.value,
                        },
                      ],
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="digitcarpalPadBorder">
                  Carpal Pad Border Color
                </label>
                <input
                  required
                  type="color"
                  name="digitcarpalPadBorder"
                  id="digitcarpalPadBorder"
                  value={this.state.userSelectedColors[0].digitcarpalPadBorder}
                  className="form-control"
                  onChange={(e) =>
                    this.setState({
                      userSelectedColors: [
                        {
                          ...this.state.userSelectedColors[0],
                          digitcarpalPadBorder: e.target.value,
                        },
                      ],
                    })
                  }
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="cryptoPawName">Name</label>
                <input
                  required
                  type="text"
                  value={this.state.cryptoPawName}
                  className="form-control"
                  placeholder="Enter Your CryptoPaw's Name"
                  onChange={(e) =>
                    this.setState({ cryptoPawName: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="price">Price</label>
                <input
                  required
                  type="number"
                  name="price"
                  id="cryptoPawPrice"
                  value={this.state.cryptoPawPrice}
                  className="form-control"
                  placeholder="Enter Price In Ξ"
                  onChange={(e) =>
                    this.setState({ cryptoPawPrice: e.target.value })
                  }
                />
              </div>
              <button
                id="mintBtn"
                style={{ fontSize: "0.9rem", letterSpacing: "0.14rem" }}
                type="submit"
                className="btn mt-4 btn-block btn-outline-primary"
              >
                Mint My CryptoPaw
              </button>
              <div className="mt-4">
                {this.props.nameIsUsed ? (
                  <div className="alert alert-danger alert-dissmissible">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="alert"
                    >
                      <span>&times;</span>
                    </button>
                    <strong>This name is taken!</strong>
                  </div>
                ) : this.props.colorIsUsed ? (
                  <>
                    <div className="alert alert-danger alert-dissmissible">
                      <button
                        type="button"
                        className="close"
                        data-dismiss="alert"
                      >
                        <span>&times;</span>
                      </button>
                      {this.props.colorsUsed.length > 1 ? (
                        <strong>These colors are taken!</strong>
                      ) : (
                        <strong>This color is taken!</strong>
                      )}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        marginTop: "1rem",
                        marginBottom: "3rem",
                      }}
                    >
                      {this.props.colorsUsed.map((color, index) => (
                        <div
                          key={index}
                          style={{
                            background: `${color}`,
                            width: "50%",
                            height: "50px",
                          }}
                        ></div>
                      ))}
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default FormAndPreview;
