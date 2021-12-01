import React, {useState, useEffect } from "react";
import CryptoPawNFTImage from "../CryptoPawNFTImage/CryptoPawNFTImage";
import CryptoPawNFTDetails from "../CryptoPawNFTDetails/CryptoPawNFTDetails";
import Loading from "../Loading/Loading";

const AllCryptoPaws = ({
    cryptoPaws,
    accountAddress,
    totalTokensMinted,
    changeTokenPrice,
    toggleForSale,
    buyCryptoPaw,
    lotteryContract
}) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(cryptoPaws.length !== 0) {
            if(cryptoPaws[0].tokenURI !== undefined) {
                setLoading(loading);
            } else {
                setLoading(false);
            }
        }
    }, [cryptoPaws]);

    return (
        <div>
            <div className="card mt-1">
                <div className="card-body align-items-center d-flex justify-content-center">
                    <h5>
                        Total No. of CryptoPaws Minted On The Platform :{" "}
                        {totalTokensMinted}
                    </h5>
                </div>
            </div>
            <div className="d-flex flex-wrap mb-2">
                {cryptoPaws.map((cryptopaw) => {
                    return (
                        <div
                            key={cryptopaw.tokenId.toNumber()}
                            className="w-50 p-4 mt-1 border"
                        >
                            {!loading ? (
                                <CryptoPawNFTImage cryptoPaw={cryptopaw} />
                            ) : (
                                <Loading />
                            )}
                            <CryptoPawNFTDetails
                                cryptoPaw= {cryptopaw}
                                accountAddress={accountAddress}
                                changeTokenPrice={changeTokenPrice}
                                toggleForSale={toggleForSale}
                                buyCryptoPaw={buyCryptoPaw}
                                lotteryContract={lotteryContract}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AllCryptoPaws;