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
	console.log(uri);
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
	var arrayOfBulkColors = ["#daa520#7e3909#fa8813#3b2d3c#8dfcc7#caf4b2#245985#16b5cf#8bb47f#396fbf#a1c33d#94d39a", "#daa520#776ff5#bfda1b#315230#a06326#63fe#eaba1c#ed4405#cbda48#36ec36#edc6e4#361200", "#daa520#ade1e#bfbf45#9e2081#25c3b8#960997#22fe10#7e10dc#e40830#40d018#b11f8#65d0f8", "#daa520#541891#89cb51#6c21a4#cc5c0a#8de62#6e2b69#850329#5d018e#df88b0#e27eef#154600", "#daa520#63b1ef#e07133#1bcd46#9407e0#bb48cb#d7a178#205b34#8f1d56#206661#37d736#720725", "#daa520#f28cda#f886a4#000000#fdde42#2c9cf2#f95618#8ac1d4#b47aa3#105854#121d6a#d7bf5", "#daa520#1b4d46#40cff0#825fe2#f6e753#ad10eb#fb7cfd#59ac62#499fe1#165ac8#91a0fa#cf118f", "#daa520#9b56#8992e7#9f0004#6a8359#185587#ed943a#497a31#797527#f81e1b#612044#fe9e36", "#daa520#13a124#a62908#b5c7b2#2188a2#e508a7#79d59c#2d903e#ecc430#78847e#d09275#3157ef", "#daa520#b96b64#396c90#04c45a#fc4668#5afc5f#65e9f9#41df38#b7ac8d#5d3121#aceca4#536c4c", "#daa520#d26722#b67abe#925b27#777ade#49a122#5e885c#af9994#1e28ca#e186eb#a9396b#c66ef1", "#daa520#84aa02#9391fc#9fcdcf#8b1e42#bc4588#49451c#93cb#8ac55e#d1f58b#ef73b9#7c8491", "#daa520#56ba94#f367e3#1eac92#1ad7b0#1b9e86#f06df7#dae34e#eb1521#251815#6426b7#3f304f", "#daa520#9204a0#c4bd1d#89feb4#9e3444#d81158#4cd76d#5f385d#4ccfb9#97da21#3b93c9#bb6f5e", "#daa520#5a0371#000000#e5bcad#429689#4c110b#e9cada#30ec52#f0dc5#3c982b#da38b1#d206a1", "#daa520#21fbbb#c86f0b#828147#be7406#30c0a2#ec01a#71f6e3#a847bd#7b32d6#aa3783#cb949c", "#daa520#92e5#110c98#88e341#39f511#1a275b#175cd4#4aa403#7f489c#5a3c10#4b296d#bf0292", "#daa520#c422bb#ab41c6#15fb5b#fdcbda#ea11a8#e07e28#9fb5ad#54d63c#d47d6e#d2f72#a2b96a", "#daa520#669b7b#10cec0#cd019a#36df4c#85ef43#ddcc4e#3b76f0#3d7d90#8fe803#dd981b#26d70c", "#daa520#9d58ec#7a7a46#944917#39466b#b3258a#7c3ce4#317a3b#f6f675#e0b0ff#4f54d2#e905ef"];
	
	// Dont Hard code IPFS to a static address. 
	var arrayOfIpfs = ["https://bafybeicvrmkangk3tmwd2an3biipr2whwwsbnisyxbbjqy5xipodqiybka.ipfs.infura-ipfs.io/", "https://bafybeiav7hfw3slcsqfgylxf3t3jbvnwsylnxrkxdypjyhmtdcjfzsdyme.ipfs.infura-ipfs.io/", "https://bafybeidswbcdooixkfh6s42wyvztqensmg357ohk2ibslwwcgetkxvpc34.ipfs.infura-ipfs.io/", "https://bafybeihovm4jpnd7ulerunvhfjjtffotpzvfv7k7wj7s6yxguqd7o6paaq.ipfs.infura-ipfs.io/", "https://bafybeicrqfccqrfn4sx6vs3pedodknu6bvfz4nucx6ug6ore7vjexrid4m.ipfs.infura-ipfs.io/", "https://bafybeibkjb5ppzhi6f7ezzcikagcikvwklx3a6hl7bnwkcjg53xcjb3uoq.ipfs.infura-ipfs.io/", "https://bafybeian4lkb6gdwk2fe7xveszuzfwyi77nspgjflblfr2bwv3b7jgmuce.ipfs.infura-ipfs.io/", "https://bafybeiexmxcbne6y4babgtpjmltmtndqpvemukh6zddvph3dfbtdyin7h4.ipfs.infura-ipfs.io/", "https://bafybeiful7ggxukoctsey6qnfzow2d5os5tzjfcgbzq65iuknr5ubkerqu.ipfs.infura-ipfs.io/", "https://bafybeidb3pkux3eeq6lnlk4osdsnj5pp6rdxc7juxrgoatk3jq3h4xjtby.ipfs.infura-ipfs.io/", "https://bafybeicedrjf5i7ediq4gr3ezot4x2rbsu6gjcpkpvdgdeplanto6q4da4.ipfs.infura-ipfs.io/", "https://bafybeico54x4j6qapdk2hz4odn3z5k3hcvw23kxpxdazwoemkf4isxsqjm.ipfs.infura-ipfs.io/", "https://bafybeibmyef35hldz76nfqf7a7wn7sg644xc2yji6uf6ndqqmihuj56uhy.ipfs.infura-ipfs.io/", "https://bafybeidi62brmpxum5nsfmdd2puosyn7f3uawpo2oirqbe2e7emmosxytm.ipfs.infura-ipfs.io/", "https://bafybeifmdtqegplgjaptlarebmkoh4ki37neq4xhsj674tuttvsasgamzy.ipfs.infura-ipfs.io/", "https://bafybeicto42ox4xubts6zgrybtsbnlcwqii5ozqpjufc6kedrvawwzewrq.ipfs.infura-ipfs.io/", "https://bafybeidnwy3ei7j7w6ldhaw5oghyrgqorwzgc7yigvnksbqjti7prc6soy.ipfs.infura-ipfs.io/", "https://bafybeieba54ab6o7dhbtfush7fxucmzjs5djrudabe5lxkfqsqqwctgrf4.ipfs.infura-ipfs.io/", "https://bafybeibx7wazzmjue4tcvvdt3zsb6vxajmf4sjuefjpg2cowdnejdy3oyy.ipfs.infura-ipfs.io/", "https://bafybeib3xnnr7fzlh64r5mpmhouf55wajq3iac7zenu6r77dwwnkerg6ru.ipfs.infura-ipfs.io/"];
	console.log(arrayOfIpfs);
	this.props.massMintNTFs(
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
        <form onSubmit={this.callMassMintFromApp} className="pt-4 mt-1">
		<button
                id="massMintBtn"
                style={{ fontSize: "0.9rem", letterSpacing: "0.14rem" }}
                type="submit"
                className="btn mt-4 btn-block btn-outline-primary"
              >
                Mass Mint
              </button>
		</form>
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
