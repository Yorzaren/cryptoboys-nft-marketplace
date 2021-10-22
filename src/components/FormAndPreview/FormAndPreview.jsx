import React, { Component } from "react";
import CryptoBoyNFTImage from "../CryptoBoyNFTImage/CryptoBoyNFTImage";

class FormAndPreview extends Component {
  constructor(props) {
    super(props);
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
      cryptoBoyName: "",
      cryptoBoyPrice: "",
    };
  }

  componentDidMount = async () => {
    await this.props.setMintBtnTimer();
  };

  callMintMyNFTFromApp = (e) => {
    e.preventDefault();
    this.props.mintMyNFT(
      this.state.userSelectedColors[0],
      this.state.cryptoBoyName,
      this.state.cryptoBoyPrice
    );
  };
  getRandomColor = () => {
	  return "#"+Math.floor(Math.random()*16777215).toString(16);
  };
  render() {
    return (
      <div>
        <div className="card mt-1">
          <div className="card-body align-items-center d-flex justify-content-center">
            <h5>Color Your CryptoPaw As You Want It To be!</h5>
          </div>
        </div>
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
              <CryptoBoyNFTImage colors={this.state.userSelectedColors[0]} />
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
                <label htmlFor="cryptoBoyName">Name</label>
                <input
                  required
                  type="text"
                  value={this.state.cryptoBoyName}
                  className="form-control"
                  placeholder="Enter Your CryptoPaw's Name"
                  onChange={(e) =>
                    this.setState({ cryptoBoyName: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="price">Price</label>
                <input
                  required
                  type="number"
                  name="price"
                  id="cryptoBoyPrice"
                  value={this.state.cryptoBoyPrice}
                  className="form-control"
                  placeholder="Enter Price In Ξ"
                  onChange={(e) =>
                    this.setState({ cryptoBoyPrice: e.target.value })
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
