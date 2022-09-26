import Web3Modal from "web3modal";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Authereum from "authereum";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';

let web3Modal;

const providerOptions = {

  coinbasewallet: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: "hello",// Required
      infuraId: "https://eth-rinkeby.alchemyapi.io/v2/upT2f1F4Su-8-UFq3DYqCsXZxvoVvSpI", // Required
      rpc: "", // Optional if `infuraId` is provided; otherwise it's required
      chainId: 1, // Optional. It defaults to 1 if not provided
      darkMode: false // Optional. Use dark theme, defaults to false
    }
  },

  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      rpc: { 42: "https://eth-rinkeby.alchemyapi.io/v2/upT2f1F4Su-8-UFq3DYqCsXZxvoVvSpI" }, // required
    },
  },

  binancechainwallet: {
    package: true
  },
  
  authereum: {
    package: Authereum // required
  },
      
};

if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    cacheProvider: false,
    providerOptions, // required
  });
}


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="top" ref={ref} {...props} />;
});

const WalletModal = () => {
  const { connectToMetamask, walletModal, openCoinbaseModal, closeWalletModal, } = useContext(CelebrityContext);

  const [isConnected, setIsConnected] = useState(false);
  const [hasMetamask, setHasMetamask] = useState(false);
  const [signer, setSigner] = useState(undefined);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  });
//use clearcachedprovider for modal to appear
  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        const web3ModalProvider = await web3Modal.clearCachedProvider();
        await web3Modal.connect()
        setIsConnected(true);
        const provider = new ethers.providers.Web3Provider(web3ModalProvider);
        setSigner(provider.getSigner());
      } catch (e) {
        console.log(e);
      }
    } else {
      setIsConnected(false);
    }
  }
 return (
    <div>
      {hasMetamask ? (
        isConnected ? (
          "Connected! "
        ) : (
          <button onClick={() => connect()}>Connect</button>
        )
      ) : (
        "Please install metamask"
      )}

{token === "bnb" &&
                      <button disabled={availableNft < 1} className="card_button button_dtl" onClick={() => mintCelebrityNft(bnbTwoDec, "0x0000000000000000000000000000000000000000", affiliateWalletAddress, mealnId)} href="#!">{availableNft < 1 ? "No Nft available" : `BUY THIS NFT FOR ${bnbTwoDec} BNB`}</button>}
    </div>
  );
}
