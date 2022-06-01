import {useCallback, useEffect, useState} from "react";
import { ethers } from 'ethers';

import './App.css';
import { Button } from './components/button';
import { UserAddressDisplay } from './components/userAddressDisplay';
import {getMaskedUserAddress, getFormattedBalance, getCurrencySymbol, getNetworkName} from "./utility";
import {UserBalanceDisplay} from "./components/userBalanceDisplay";
import {SelectedNetwork} from "./components/selectedNetwork";


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
        const balance = await signer.getBalance();
        const chainId = await signer.getChainId();
        const network = await provider.getNetwork();

        setUserAddress(account);
        setUserBalance( getFormattedBalance(balance));
        setSelectedNetwork(network);

        console.log('provider', provider,'account',account,'network',network,'chainId',chainId);
        console.log('balance', balance, getFormattedBalance(balance));
      } else {
        alert('install meta mask extension');
      }

    } catch (e) {
      console.log('some error occurred',e);
    } finally {
      setIsWaiting(false);
    }

  }, [isConnected]);

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
      </div>  }
    </div>
  );
}

export default App;
