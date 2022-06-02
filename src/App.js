import {useCallback, useEffect, useState} from "react";
import { ethers } from 'ethers';
import ReactDOM from 'react-dom';
import {QRCodeSVG} from 'qrcode.react';

import './App.css';
import { Button } from './components/button';
import { UserAddressDisplay } from './components/userAddressDisplay';
import {getMaskedUserAddress, getFormattedBalance, getCurrencySymbol, getNetworkName} from "./utility";
import {UserBalanceDisplay} from "./components/userBalanceDisplay";
import {SelectedNetwork} from "./components/selectedNetwork";
import copySVG from "./assets/copy.svg";


function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [isWaiting,setIsWaiting] = useState(false);
  const [userAddress,setUserAddress] = useState('');
  const [userBalance,setUserBalance] = useState(0);
  const [selectedNetwork,setSelectedNetwork] = useState({});

  useEffect(() => {
    window.ethereum.on('chainChanged', () => {
      onConnectPressORChainChange();
    });
  }, []);

  const onConnectPressORChainChange = useCallback(async () => {
    try {
      setIsWaiting(true);
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        setIsConnected(true);
        const signer = provider.getSigner();
        const account = await signer.getAddress();
        const balance = await provider.send("eth_getBalance", [account,'latest']);
        const network = await provider.getNetwork();
        setUserAddress(account);
        setUserBalance( getFormattedBalance(balance));
        setSelectedNetwork(network);
      } else {
        alert('install meta mask extension');
      }

    } catch (e) {
      console.log('some error occurred',e);
    } finally {
      setIsWaiting(false);
    }

  }, [isConnected]);

  const onCopyClick = () => {
    window.navigator.clipboard.writeText(userAddress).then(()=>{
      alert('copied');
    }).catch((e)=>{
      console.log(e);
      alert('copy failed');
    });
  };

  const onDepositPress = () => {
    ReactDOM.render(
        <div className='qr-container'>
          <QRCodeSVG value={userAddress} />
          <div className={'text-address-container'}>
            <span className='user-address'>{userAddress}</span>
            <img src={copySVG} className="copy-svg" alt="copy" onClick={onCopyClick}/>
          </div>
        </div>,
        document.getElementById('QR-mount-node')
    );
  };

  const onSendPress = () => {

  };

  return (
    <div className="App">
      {!isConnected?<Button
          label="Connect"
          onClick={onConnectPressORChainChange}
          loading={isWaiting}
      />:<div className='container'>
        <SelectedNetwork
            name={getNetworkName(selectedNetwork.chainId)}
        />
        <UserAddressDisplay
            userAddress={userAddress}
            userAddressToDisplay={getMaskedUserAddress(userAddress)}
        />
        <UserBalanceDisplay
            balance={userBalance}
            unit={getCurrencySymbol(selectedNetwork.chainId)}
        />
        <footer>
          <Button
              label="Send"
              onClick={onSendPress}
          />
          <Button
              label="Deposit"
              onClick={onDepositPress}
          />
        </footer>
        <div id='QR-mount-node'>

        </div>
      </div>  }
    </div>
  );
}

export default App;
