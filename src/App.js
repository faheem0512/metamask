import logo from './logo.svg';
import './App.css';

import { Button } from './components/button';
import { UserAddressDisplay } from './components/userAddressDisplay';
import {getMaskedUserAddress} from "./Utility";


function App() {
  return (
    <div className="App">
      <Button
      label={'tat'}
      onClick={()=>{
        console.log(' i am clicked');
      }}
      />
      <UserAddressDisplay
          userAddress={'CmAPVRXdXPZWzDvei6X90PxMV3yOmH5rchA8ABld'}
          userAddressToDisplay={getMaskedUserAddress('CmAPVRXdXPZWzDvei6X90PxMV3yOmH5rchA8ABld')}
      />
    </div>
  );
}

export default App;
