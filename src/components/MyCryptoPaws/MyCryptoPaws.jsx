import React, { useState, useEffect } from "react";
import CryptoPawNFTImage from "../CryptoPawNFTImage/CryptoPawNFTImage";
import MyCryptoPawNFTDetails from "../MyCryptoPawNFTDetails/MyCryptoPawNFTDetails";
import Loading from "../Loading/Loading";

const MyCryptoPaws = ({
    accountAddress,
    cryptoPaws,
    totalTokensOwnedByAccount
}) => {
    const [loading, setLoading] = useState(false);
    const [myCryptoPaws, setMyCryptoPaws] = useState([]);

    useEffect(() => {
        if(cryptoPaws.length !== 0) {
            if (cryptoPaws[0].tokenURI !== undefined) {
                setLoading(loading);
            } else {
                setLoading(false);
            }
        }
        const my_crypto_paws = cryptoPaws.filter(
            (cryptopaw) => cryptopaw.currentOwner === accountAddress
        );
        setMyCryptoPaws(my_crypto_paws);
    }, [cryptoPaws]);

    return (
        <div>
            <div className="card mt-1">
                <div className="card-body align-items-center d-flex justify-content-center">
                    <h5>
                        Total No. of CryptoPaws You Own: {totalTokensOwnedByAccount}
                    </h5>
                </div>
            </div>
            <div className="d-flex flex-wrap mb-2">
                {myCryptoPaws.map((cryptopaw) => {
                    return (
                        <div
                            key={cryptopaw.tokenId.toNumber()}
                            className="w-50 p-4 mt-1 border"
                        >
                            <div className="row">
                                <div className="col-md-6">
                                    {!loading ? (
                                        <CryptoPawNFTImage cryptoPaw={cryptopaw}/>
                                    ) : (
                                        <Loading />
                                    )}
                                </div>
                                <div className="col-md-6 text-center">
                                    <MyCryptoPawNFTDetails
                                    cryptoPaw={cryptopaw}
                                    accountAddress={accountAddress}
                                />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MyCryptoPaws;