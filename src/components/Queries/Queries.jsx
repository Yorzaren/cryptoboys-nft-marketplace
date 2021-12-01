import React, { useState } from "react";

const Queries = (props) => {
  const [tokenIdForOwner, setTokenIdForOwner] = useState("");
  const [tokenOwner, setTokenOwner] = useState("");
  const [tokenIdForOwnerNotFound, setTokenIdForOwnerNotFound] = useState(false);

  const [tokenIdForImage, setTokenIdForImage] = useState("");
  const [tokenImageLink, setTokenImageLink] = useState("");
  const [tokenIdForImageNotFound, setTokenIdForImageNotFound] = useState(
    false
  );

  const getTokenOwner = async (e) => {
    e.preventDefault();
    try {
      const owner = await props.cryptoPawsContract.methods
        .getTokenOwner(tokenIdForOwner)
        .call();
      setTokenOwner(owner);
      setTimeout(() => {
        setTokenOwner("");
        setTokenIdForOwner("");
      }, 5000);
    } catch (e) {
      setTokenIdForOwnerNotFound(true);
      setTokenIdForOwner("");
    }
  };

  const getTokenImage = async (e) => {
    e.preventDefault();
    try {
      const image = await props.cryptoPawsContract.methods
        .getTokenImg(tokenIdForImage)
        .call();
      setTokenImageLink(image);
      setTimeout(() => {
        setTokenImageLink("");
      }, 5000);
    } catch (e) {
      setTokenIdForImageNotFound(true);
      setTokenIdForImage("");
    }
  };

  return (
    <div>
      <div className="card mt-1">
        <div className="card-body align-items-center d-flex justify-content-center">
          <h5>Queries</h5>
        </div>
      </div>
      <div className="p-4 mt-1 border">
        <div className="row">
          <div className="col-md-5">
            <h5>Get Token Owner</h5>
            <form onSubmit={getTokenOwner}>
              <div className="form-group">
                <input
                  required
                  type="text"
                  className="form-control"
                  value={tokenIdForOwner}
                  placeholder="Enter Token Id"
                  onChange={(e) => setTokenIdForOwner(e.target.value)}
                />
              </div>
              <button className="mt-3 btn btn-outline-primary" type="submit">
                Get Owner
              </button>
              {tokenIdForOwnerNotFound ? (
                <div className="alert alert-danger alert-dissmissible mt-4">
                  <button type="button" className="close" data-dismiss="alert">
                    <span>&times;</span>
                  </button>
                  <strong>Non-Existent Token Id</strong>
                </div>
              ) : null}
            </form>
            <p className="mt-4">{tokenOwner}</p>
          </div>
          <div className="col-md-7">
            <h5>Get Token Image</h5>
            <form onSubmit={getTokenImage}>
              <div className="form-group">
                <input
                  required
                  type="text"
                  className="form-control"
                  value={tokenIdForImage}
                  placeholder="Enter Token Id"
                  onChange={(e) => setTokenIdForImage(e.target.value)}
                />
              </div>
              <button className="mt-3 btn btn-outline-primary" type="submit">
                Get Image
              </button>
              {tokenIdForImageNotFound ? (
                <div className="alert alert-danger alert-dissmissible mt-4">
                  <button type="button" className="close" data-dismiss="alert">
                    <span>&times;</span>
                  </button>
                  <strong>Non-Existent Token Id</strong>
                </div>
              ) : null}
            </form>
            <p className="mt-4">
              <a
                href={`${tokenImageLink}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={tokenImageLink} alt="CryptoPaw Token" />
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Queries;
