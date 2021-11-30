import React from "react";

const MyCryptoPawNFTDetails = (props) => {
    const {
        tokenId,
        tokenName,
        price,
        mintedBy,
        timesTransferred
    } = props.cryptoPaw;

    return (
        <div key={tokenId.toNumber()} className="mt-4 ml-3">
            <p>
                <span className="font-weight-bold">Token Id</span> :{" "}
                {tokenId.toNumber()}
            </p>
            <p>
                <span className="font-weight-bold">Name</span> : {tokenName}
            </p>
            <p>
                <span className="font-weight-bold">Price</span> :{" "}
                {window.web3.utils.fromWei(price.toString(), "Ether")} Ξ
            </p>
            <p>
                <span className="font-weigth-bold">No. of Transfers</span> :{" "}
                {timesTransferred.toNumber()}
            </p>
            {props.accountAddress === mintedBy ? (
                <div className="alert alert-success w-50 text-center m-auto">
                    Minted
                </div>
            ) : (
                <div classname="alert alert-info w-50 text-center m-auto">Bought</div>
            )}
        </div>
    );
};

export default MyCryptoPawNFTDetails;